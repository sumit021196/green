import React from 'react';
import './PDFCard.css';

function PDFCard({ file }) {
  const year = file.year || file.name.match(/(\d{4})/)[1];
  const quarter = file.quarter || file.name.match(/Q(\d)/)[1];
  const size = (file.metadata?.size / 1024).toFixed(1);
  const date = new Date(file.uploaded_at || file.created_at).toLocaleDateString();

  return (
    <div className="pdf-card">
      <div className="pdf-card-header">
        <h3>Financial Report {year} Q{quarter}</h3>
      </div>
      <div className="pdf-card-body">
        <div className="pdf-info">
          <p className="date">Uploaded: {date}</p>
          <p className="size">Size: {size} KB</p>
        </div>
        <div className="pdf-actions">
          <a
            href={`/view-pdf?year=${year}&quarter=Q${quarter}`}
            className="btn btn-primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            View
          </a>
          <a
            href={`/api/download-report?year=${year}&quarter=Q${quarter}`}
            className="btn btn-secondary"
          >
            Download
          </a>
        </div>
      </div>
    </div>
  );
}

export default PDFCard; 