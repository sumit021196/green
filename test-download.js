const fetch = require('node-fetch');
const fs = require('fs');

async function testDownload() {
    try {
        const response = await fetch('http://localhost:3000/api/download-report?year=2025&quarter=Q3');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const buffer = await response.buffer();
        fs.writeFileSync('financial-results-2025-Q3.pdf', buffer);
        console.log('File downloaded successfully as financial-results-2025-Q3.pdf');
    } catch (error) {
        console.error('Error:', error);
    }
}

testDownload(); 