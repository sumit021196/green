import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import './AGMEGMPage.css';

function AGMEGMPage() {
  // Function to handle the download
  const handleDownload = (e) => {
    e.preventDefault();
    const link = document.createElement('a');
    link.href = process.env.PUBLIC_URL + '/pdf/Notice of 1st AGM_Globlegreen Power Limited.pdf';
    link.download = 'Notice of 1st AGM_Globlegreen Power Limited.pdf';
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    
    // For mobile devices
    if (document.createEvent) {
      const event = document.createEvent('MouseEvents');
      event.initEvent('click', true, true);
      link.dispatchEvent(event);
    } else {
      link.click();
    }
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
