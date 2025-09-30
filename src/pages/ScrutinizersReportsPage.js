import React from 'react';
import '../App.css';
import './AGMEGMPage.css';

function ScrutinizersReportsPage() {
  const fileName = 'Scrutinizer Report_Globlegreen.pdf';
  const href = `${process.env.PUBLIC_URL}/pdf/${encodeURIComponent(fileName)}`;

  return (
    <div className="agm-egm-page">
      <h1>Scrutinizer's Reports</h1>
      <div className="notice-list">
        <div className="notice-item">
          <a
            href={href}
            className="notice-title"
            download="Scrutinizer-Report_Globlegreen.pdf"
          >
            Scrutinizer Report - 1st AGM
          </a>
        </div>
      </div>
    </div>
  );
}

export default ScrutinizersReportsPage;
