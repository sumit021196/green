const fs = require('fs');
const path = require('path');
const FormData = require('form-data');
const fetch = require('node-fetch');

async function testUpload() {
    try {
        // Create a form
        const form = new FormData();
        
        // Add the PDF file
        form.append('pdf', fs.createReadStream(path.join(__dirname, 'test.pdf')));
        
        // Add other fields
        form.append('year', '2025');
        form.append('quarter', 'Q1');
        form.append('website', 'site1');

        // Send the request
        const response = await fetch('http://localhost:3000/api/upload', {
            method: 'POST',
            body: form
        });

        const result = await response.json();
        console.log('Upload Response:', result);
    } catch (error) {
        console.error('Error:', error);
    }
}

testUpload(); 