import React, { useState } from 'react';

const AI = () => {
  const [file, setFile] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);

  const handleUpload = (e) => {
    const f = e.target.files[0];
    if (f) {
      setFile(URL.createObjectURL(f));
      setAnalyzing(true);
      setResult(null);
      
      // Simulate AI analysis
      setTimeout(() => {
        setAnalyzing(false);
        setResult({
          findings: "Candidate for Class II Restoration",
          confidence: "94.2%",
          details: "Deep carious lesion detected on distal aspect of tooth #36. Pulpal involvement unlikely but periodic monitoring advised."
        });
      }, 3000);
    }
  };

  return (
    <div id="ai-screen" className="screen active">
      <div className="container sec">
        <div className="ai-hero">
          <h1 className="ai-title">DentalShark <span className="teal-text">AI Diagnostic</span></h1>
          <p className="ai-sub">Upload an X-ray or intraoral photo for instant AI-powered analysis and clinical insights.</p>
        </div>

        <div className="ai-upload-box">
          <div className="ai-dropzone" onClick={() => document.getElementById('ai-file').click()}>
            {file ? (
              <img src={file} style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '12px' }} alt="Uploaded" />
            ) : (
              <>
                <div style={{ fontSize: '48px', marginBottom: '15px' }}>📸</div>
                <div style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px' }}>Click or Drop X-ray Image</div>
                <div style={{ fontSize: '12px', color: 'var(--text3)' }}>Supports DICOM, JPEG, PNG (Max 10MB)</div>
              </>
            )}
            <input type="file" id="ai-file" hidden onChange={handleUpload} accept="image/*" />
          </div>

          {analyzing && (
            <div id="ai-loading" className="ai-loading">
              <div className="ai-spinner"></div>
              <div style={{ fontWeight: '700' }}>SharkAI is analyzing...</div>
              <div style={{ fontSize: '11px', color: 'var(--text3)' }}>Scanning 500k+ clinical data points</div>
            </div>
          )}

          {result && (
            <div id="ai-result" className="ai-result">
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                <span style={{ fontWeight: '800', color: 'var(--teal)' }}>AI FINDINGS</span>
                <span className="role-tag" style={{ background: 'var(--teal)', color: '#000' }}>Confidence: {result.confidence}</span>
              </div>
              <h3 style={{ marginBottom: '8px' }}>{result.findings}</h3>
              <p style={{ fontSize: '13px', color: 'var(--text2)', lineHeight: '1.6' }}>{result.details}</p>
              <div style={{ marginTop: '15px', display: 'flex', gap: '10px' }}>
                <button className="btn-primary" style={{ flex: 1 }}>Save to Patient Record</button>
                <button className="btn-outline" onClick={() => { setFile(null); setResult(null); }}>Scan New</button>
              </div>
            </div>
          )}
        </div>

        <div className="ai-features">
          <div className="ai-feat-card">
            <div className="ai-feat-icon">⚡</div>
            <h4>Instant Analysis</h4>
            <p>Get results in under 5 seconds with our GPU-accelerated cloud infrastructure.</p>
          </div>
          <div className="ai-feat-card">
            <div className="ai-feat-icon">🎯</div>
            <h4>98% Accuracy</h4>
            <p>Trained on over 500,000 verified clinical cases from leading Egyptian hospitals.</p>
          </div>
          <div className="ai-feat-card">
            <div className="ai-feat-icon">🔒</div>
            <h4>HIPAA Compliant</h4>
            <p>All data is encrypted end-to-end. Your patient's privacy is our top priority.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AI;
