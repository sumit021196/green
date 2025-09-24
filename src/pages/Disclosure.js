import React from 'react';

function Disclosure() {
  const pdfPath = "/pdf/Newspaper Publication of Notice of Adjourned 1st AGM dated 26.09.2025_Globlegreen Power.pdf";
  const downloadHref = encodeURI(pdfPath);
  const title = "Newspaper Publication of Notice of Adjourned 1st AGM (26.09.2025) - Globlegreen Power";

  const fileName = 'Adjourned-1st-AGM-Notice-26-09-2025-Globlegreen-Power.pdf';

  return (
    <div className="disclosure-container" style={{ padding: '20px' }}>
      <h1>Disclosure</h1>
      <div className="pdf-card" style={{ maxWidth: 800, margin: '16px 0', padding: 16, border: '1px solid #e5e5e5', borderRadius: 8 }}>
        <div className="pdf-card-header">
          <h3 style={{ margin: 0 }}>{title}</h3>
        </div>
        <div className="pdf-card-body" style={{ marginTop: 12, display: 'flex', gap: 12 }}>
          <a href={downloadHref} download={fileName} className="btn btn-green">
            Download
          </a>
        </div>
      </div>
    </div>
  );
}

export default Disclosure;


