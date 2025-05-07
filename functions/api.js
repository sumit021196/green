const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing Supabase configuration');
}

const supabase = createClient(supabaseUrl, supabaseKey);

exports.handler = async (event, context) => {
    // Set CORS headers
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, Accept',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
    };

    // Handle OPTIONS request
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers,
            body: ''
        };
    }

    try {
        const path = event.path.replace('/.netlify/functions/api/', '');
        const { year, quarter } = event.queryStringParameters || {};

        // Handle different API endpoints
        switch (path) {
            case 'list-files':
                const { data: files, error: listError } = await supabase
                    .storage
                    .from('financial-results')
                    .list();

                if (listError) throw listError;

                const processedFiles = files.map(file => {
                    const match = file.name.match(/financial-results-(\d{4})-Q(\d)\.pdf/);
                    return {
                        name: file.name,
                        year: match ? parseInt(match[1]) : null,
                        quarter: match ? match[2] : null,
                        metadata: file.metadata,
                        uploaded_at: file.created_at
                    };
                });

                return {
                    statusCode: 200,
                    headers: {
                        ...headers,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(processedFiles)
                };

            case 'download-report':
                if (!year || !quarter) {
                    return {
                        statusCode: 400,
                        headers: {
                            ...headers,
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            error: 'Missing required parameters',
                            details: 'Year and quarter are required'
                        })
                    };
                }

                const fileName = `financial-results-${year}-${quarter}.pdf`;
                const { data: fileData, error: downloadError } = await supabase
                    .storage
                    .from('financial-results')
                    .download(fileName);

                if (downloadError) throw downloadError;

                if (!fileData) {
                    return {
                        statusCode: 404,
                        headers: {
                            ...headers,
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            error: 'File not found',
                            details: `No PDF found for year ${year} quarter ${quarter}`
                        })
                    };
                }

                const arrayBuffer = await fileData.arrayBuffer();
                const buffer = Buffer.from(arrayBuffer);

                return {
                    statusCode: 200,
                    headers: {
                        ...headers,
                        'Content-Type': 'application/pdf',
                        'Content-Disposition': `attachment; filename="${fileName}"`,
                        'Content-Length': buffer.length,
                        'Cache-Control': 'no-cache',
                        'Pragma': 'no-cache',
                        'Expires': '0'
                    },
                    body: buffer.toString('base64'),
                    isBase64Encoded: true
                };

            default:
                return {
                    statusCode: 404,
                    headers: {
                        ...headers,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        error: 'Not Found',
                        details: 'The requested resource was not found'
                    })
                };
        }
    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            headers: {
                ...headers,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                error: 'Internal server error',
                details: error.message
            })
        };
    }
}; 