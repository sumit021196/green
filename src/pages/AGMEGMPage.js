import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import './AGMEGMPage.css';

function AGMEGMPage() {
  return (
    <div className="agm-egm-page">
      <h1>AGM / EGM Notices</h1>
      <div className="notice-list">
        <div className="notice-item">
          <a 
            href={`${process.env.PUBLIC_URL}/pdf/Notice of 1st AGM_Globlegreen Power Limited.pdf`}
            className="notice-title" 
            download="Notice of 1st AGM_Globlegreen Power Limited.pdf"
          >
            Notice of 1st AGM
          </a>
        </div>
      </div>
    </div>
  );
}

export default AGMEGMPage;
