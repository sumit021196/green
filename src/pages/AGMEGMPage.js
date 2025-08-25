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
          <Link to="#" className="notice-title">First AGM Notice</Link>
        </div>
      </div>
    </div>
  );
}

export default AGMEGMPage;
