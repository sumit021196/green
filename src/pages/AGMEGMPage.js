import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import './AGMEGMPage.css';

function AGMEGMPage() {
  // Function to handle the download
  const handleDownload = (e) => {
    e.preventDefault();
    const link = document.createElement('a');
    link.href = '/pdf/Notice of 1st AGM_Globlegreen Power Limited.pdf';
    link.download = 'Notice of 1st AGM_Globlegreen Power Limited.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="agm-egm-page">
      <h1>AGM / EGM Notices</h1>
      <div className="notice-list">
        <div className="notice-item">
          <a 
            href="/pdf/Notice of 1 st.pdf" 
            className="notice-title" 
            onClick={handleDownload}
            download
          >
            Notice of 1st AGM
          </a>
        </div>
      </div>
    </div>
  );
}

export default AGMEGMPage;
