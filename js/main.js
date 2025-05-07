// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('active');
    }
});

// Investor Relation Page Functionality
async function downloadReport() {
    try {
        const year = '2025';
        const quarter = 'Q3';
        
        // Create a temporary link element
        const link = document.createElement('a');
        link.href = `/api/download-report?year=${year}&quarter=${quarter}`;
        link.download = `financial-results-${year}-${quarter}.pdf`;
        
        // Append to body, click, and remove
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } catch (error) {
        console.error('Error downloading report:', error);
        alert('Failed to download the report. Please try again later.');
    }
}

// Add event listener to download button if it exists
const downloadBtn = document.querySelector('.download-btn');
if (downloadBtn) {
    downloadBtn.addEventListener('click', downloadReport);
} 