require('dotenv').config();
const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const path = require('path');
const multer = require('multer');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// Configure CORS
const corsOptions = {
    origin: [
        'http://localhost:3000',
        'http://localhost:8888',
        'https://*.netlify.app',
        'https://blue-hope-website.netlify.app',
        'https://bluehope.netlify.app',
        'https://blue-hope.netlify.app'
    ],
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Accept', 'Authorization'],
    credentials: true
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Error handling for JSON parsing
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).json({ 
            error: 'Invalid JSON',
            details: err.message 
        });
    }
    next();
});

// Configure multer for file uploads
const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    }
});

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase configuration. Please check your .env file.');
    process.exit(1);
}

console.log('Initializing Supabase with URL:', supabaseUrl);
const supabase = createClient(supabaseUrl, supabaseKey);

// Verify storage bucket exists
async function verifyStorageBucket() {
    try {
        const { data: buckets, error: bucketsError } = await supabase
            .storage
            .listBuckets();
        
        if (bucketsError) {
            console.error('Error listing buckets:', bucketsError);
            return;
        }

        console.log('Available buckets:', buckets);

        // Check if our bucket exists
        const bucketExists = buckets.some(bucket => bucket.name === 'financial-results');
        if (!bucketExists) {
            console.error('financial-results bucket not found. Creating it...');
            const { error: createError } = await supabase
                .storage
                .createBucket('financial-results', { public: false });
            
            if (createError) {
                console.error('Error creating bucket:', createError);
            } else {
                console.log('financial-results bucket created successfully');
            }
        } else {
            console.log('financial-results bucket exists');
        }
    } catch (error) {
        console.error('Error verifying storage bucket:', error);
    }
}

// Call verification on startup
verifyStorageBucket();

// GET /api/results endpoint
app.get('/api/results', async (req, res) => {
    try {
        const { site } = req.query;
        console.log('Fetching results for site:', site);

        if (!site) {
            return res.status(400).json({ error: 'Site parameter is required' });
        }

        const { data, error } = await supabase
            .from('financial_results')
            .select('*')
            .eq('website', site)
            .order('year', { ascending: false })
            .order('quarter', { ascending: false });

        if (error) {
            console.error('Database query error:', error);
            throw error;
        }

        console.log('Database results:', data);

        if (!data || data.length === 0) {
            return res.json([]);
        }

        // Add public URLs to the results
        const resultsWithUrls = data.map(result => ({
            ...result,
            file_url: `/view-pdf?year=${result.year}&quarter=${result.quarter}`
        }));

        console.log('Sending results:', resultsWithUrls);
        res.json(resultsWithUrls);
    } catch (error) {
        console.error('Error fetching results:', error);
        res.status(500).json({ error: 'Failed to fetch results', details: error.message });
    }
});

// GET /view-pdf endpoint to view PDF in browser
app.get('/view-pdf', async (req, res) => {
    try {
        const { year, quarter } = req.query;
        const fileName = `financial-results-${year}-${quarter}.pdf`;
        
        console.log('Attempting to view PDF:', fileName);

        const { data, error } = await supabase
            .storage
            .from('financial-results')
            .download(fileName);

        if (error) {
            console.error('Error downloading PDF:', error);
            throw error;
        }

        console.log('PDF data received, size:', data ? data.length : 'undefined');

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `inline; filename=${fileName}`);
        res.send(data);
    } catch (error) {
        console.error('Error viewing PDF:', error);
        res.status(500).json({ error: 'Failed to view PDF', details: error.message });
    }
});

// GET /api/download-report endpoint
app.get('/api/download-report', async (req, res) => {
    try {
        const { year, quarter } = req.query;
        const fileName = `financial-results-${year}-${quarter}.pdf`;
        
        console.log('Attempting to download PDF:', fileName);

        const { data, error } = await supabase
            .storage
            .from('financial-results')
            .download(fileName);

        if (error) {
            console.error('Error downloading PDF:', error);
            throw error;
        }

        // Convert Blob to Buffer
        const arrayBuffer = await data.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Set appropriate headers for PDF download
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
        res.setHeader('Content-Length', buffer.length);
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Pragma', 'no-cache');
        res.setHeader('Expires', '0');

        // Send the buffer
        res.send(buffer);
    } catch (error) {
        console.error('Error downloading report:', error);
        res.status(500).json({ error: 'Failed to download report', details: error.message });
    }
});

// POST /api/upload endpoint
app.post('/api/upload', upload.single('pdf'), async (req, res) => {
    try {
        const { year, quarter, website } = req.body;
        const file = req.file;

        if (!file || !year || !quarter || !website) {
            return res.status(400).json({ 
                error: 'Missing required fields: pdf file, year, quarter, and website are required' 
            });
        }

        // Upload file to Supabase Storage
        const fileName = `financial-results-${year}-${quarter}.pdf`;
        const { data: fileData, error: uploadError } = await supabase
            .storage
            .from('financial-results')
            .upload(fileName, file.buffer, {
                contentType: 'application/pdf',
                upsert: true
            });

        if (uploadError) throw uploadError;

        // Save record to database
        const { data: recordData, error: dbError } = await supabase
            .from('financial_results')
            .insert([
                {
                    year: parseInt(year),
                    quarter,
                    website,
                    file_path: fileName,
                    uploaded_at: new Date().toISOString()
                }
            ]);

        if (dbError) throw dbError;

        res.json({ 
            message: 'File uploaded successfully',
            data: {
                ...recordData[0],
                file_url: `/view-pdf?year=${year}&quarter=${quarter}`
            }
        });
    } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).json({ error: 'Failed to upload file' });
    }
});

// GET /api/list-files endpoint to check storage bucket
app.get('/api/list-files', async (req, res) => {
    try {
        console.log('Attempting to list files from storage...');
        
        // Verify Supabase connection
        if (!supabase) {
            console.error('Supabase client not initialized');
            return res.status(500).json({ 
                error: 'Server configuration error',
                details: 'Database connection not initialized'
            });
        }

        // Verify environment variables
        if (!process.env.SUPABASE_URL || !process.env.SUPABASE_KEY) {
            console.error('Missing Supabase configuration');
            return res.status(500).json({
                error: 'Server configuration error',
                details: 'Missing Supabase credentials'
            });
        }

        // First, get all files from storage
        const { data: storageFiles, error: storageError } = await supabase
            .storage
            .from('financial-results')
            .list();

        if (storageError) {
            console.error('Storage list error:', storageError);
            return res.status(500).json({ 
                error: 'Failed to list files',
                details: storageError.message,
                code: storageError.code,
                hint: storageError.hint
            });
        }

        if (!storageFiles || storageFiles.length === 0) {
            console.log('No files found in storage');
            return res.json([]);
        }

        // Get all records from the database
        const { data: dbRecords, error: dbError } = await supabase
            .from('financial_results')
            .select('*');

        if (dbError) {
            console.error('Database query error:', dbError);
            return res.status(500).json({
                error: 'Failed to fetch database records',
                details: dbError.message
            });
        }

        // Create a map of existing database records
        const dbRecordMap = new Map(
            (dbRecords || []).map(record => [
                record.file_path,
                record
            ])
        );

        // Combine storage files with database records
        const combinedFiles = storageFiles.map(file => {
            const dbRecord = dbRecordMap.get(file.name);
            return {
                ...file,
                year: dbRecord?.year || parseInt(file.name.match(/(\d{4})/)[1]),
                quarter: dbRecord?.quarter || file.name.match(/Q(\d)/)[1],
                website: dbRecord?.website || 'default',
                uploaded_at: dbRecord?.uploaded_at || file.created_at
            };
        });

        console.log('Combined files:', JSON.stringify(combinedFiles, null, 2));
        res.json(combinedFiles);
    } catch (error) {
        console.error('Error listing files:', error);
        res.status(500).json({ 
            error: 'Failed to list files',
            details: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        error: 'Not Found',
        details: 'The requested resource was not found'
    });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({
        error: 'Internal server error',
        details: process.env.NODE_ENV === 'development' ? err.message : 'An unexpected error occurred',
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
});

// For local development
if (process.env.NODE_ENV !== 'production') {
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
}

// For production (Vercel)
module.exports = app; 