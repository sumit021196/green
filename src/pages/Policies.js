import React from 'react';

const policies = [
  { name: 'Dividend Distribution Policy', file: 'Dividend Distribution Policy.pdf' },
  { name: 'Criteria for making payment to Non- Executive Director', file: 'Criteria for making payment to Non- Executive Director.pdf' },
  { name: 'Policy on Prevention of sexual harassment at work place', file: 'Policy on Prevention of sexual harassment at work place.pdf' },
  { name: 'Risk Management Policy', file: 'Risk Management Policy.pdf' },
  { name: 'Board Diversity Policy', file: 'Board Diversity Policy.pdf' },
  { name: 'Policy for Material Subsidiary', file: 'Policy for Material Subsidiary.pdf' },
  { name: 'Related Party Transaction Policy', file: 'Related Party Transaction Policy.pdf' },
  { name: 'Vigil Mechanism Whistle Blower Policy', file: 'Vigil Mechanism Whistle Blower Policy.pdf' },
  { name: 'Materiality Policy as per Regulation 30 (4)', file: 'Materiality Policy as per Regulation 30 (4).pdf' },
  { name: 'Nomination Remuneration Policy', file: 'Nomination Remuneration Policy.pdf' },
  { name: 'Archival policy', file: 'Archival policy.pdf' },
];

const Policies = () => {
  return (
    <div className="policies-container" style={{ padding: '2rem' }}>
      <h2>Company Policies</h2>
      <div className="policies-grid" style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem' }}>
        {policies.map((policy, idx) => (
          <div key={idx} className="policy-card" style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '1rem', width: '250px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>{policy.name}</h3>
            <a href={`/pdf/${policy.file}`} download className="download-btn" style={{ background: '#2e7d32', color: '#fff', padding: '0.5rem 1rem', borderRadius: '4px', textDecoration: 'none' }}>Download PDF</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Policies; 