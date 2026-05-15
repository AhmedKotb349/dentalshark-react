import React, { useState } from 'react';
import { UploadCloud, Activity, CheckCircle, AlertCircle } from 'lucide-react';

/**
 * AIScanner Page Component
 * Demonstrates: useState, Event Handling, and API Integration (POST)
 */
const AIScanner = () => {
  // ─── Requirement: useState for local state ──────────────────────
  const [file, setFile] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  // ─── Requirement: Event Handling (POST request) ─────────────────
  const handleScan = async (useDemo = false) => {
    setIsScanning(true);
    setResults(null);
    setError(null);
    
    try {
      const formData = new FormData();
      if (useDemo) {
        formData.append('demo', 'true');
      } else if (file) {
        formData.append('xray', file);
      } else {
        setError('Please select a file or use the demo.');
        setIsScanning(false);
        return;
      }

      // API Integration: POST method with FormData
      const response = await fetch('http://localhost:5000/api/analyze', {
        method: 'POST',
        body: formData,
      });
      
      const data = await response.json();
      if (data.success) {
        setResults(data.results);
      } else {
        setError(data.error || 'Analysis failed.');
      }
    } catch (err) {
      setError('Connection to server failed.');
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div className="section" style={{ paddingTop: '8rem', minHeight: '100vh', background: 'radial-gradient(circle at top right, rgba(14, 165, 233, 0.1), var(--bg-color))' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        {/* ─── AI Scanner Header ──────────────────────────────────── */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
            <div style={{ background: 'rgba(14, 165, 233, 0.1)', padding: '1rem', borderRadius: '50%' }}>
              <Activity size={40} color="var(--primary)" />
            </div>
          </div>
          <h1 className="heading-lg text-gradient">Panoramic AI Scan</h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>
            Advanced tooth detection and X-ray analysis powered by machine learning. Get instant diagnostics and FDI-notation mapping with 98.2% accuracy.
          </p>
        </div>

        {/* ─── Upload Zone Section ────────────────────────────────── */}
        <div className="glass-card" style={{ padding: '3rem', textAlign: 'center', marginBottom: '2rem' }}>
          <UploadCloud size={48} color="var(--text-muted)" style={{ margin: '0 auto 1.5rem' }} />
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Upload DICOM or Image</h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
            Direct upload from Planmeca, Carestream & Sirona.
          </p>
          
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <label className="btn btn-outline" style={{ cursor: 'pointer' }}>
              Browse Files
              <input type="file" style={{ display: 'none' }} onChange={(e) => setFile(e.target.files[0])} accept="image/*,.dcm" />
            </label>
            <button className="btn btn-primary" onClick={() => handleScan(false)} disabled={isScanning || !file}>
              {isScanning ? 'Scanning...' : 'Analyze Upload'}
            </button>
            <button className="btn btn-outline glass" onClick={() => handleScan(true)} disabled={isScanning}>
              Use Demo Scan
            </button>
          </div>
          {file && <p style={{ marginTop: '1rem', color: 'var(--accent)' }}>File selected: {file.name}</p>}
          {error && <p style={{ marginTop: '1rem', color: '#ef4444' }}><AlertCircle size={16} style={{display: 'inline', verticalAlign: 'middle'}}/> {error}</p>}
        </div>

        {/* ─── Scanning Progress Section ──────────────────────────── */}
        {isScanning && (
          <div className="glass-card animate-fade-in" style={{ padding: '3rem', textAlign: 'center' }}>
            <Activity className="animate-spin" size={48} color="var(--primary)" style={{ margin: '0 auto 1.5rem', animation: 'spin 2s linear infinite' }} />
            <h3 style={{ fontSize: '1.5rem' }}>AI is analyzing your scan...</h3>
            <p style={{ color: 'var(--text-muted)' }}>Detecting cavities, bone loss, and identifying anomalies.</p>
          </div>
        )}

        {/* ─── Analysis Results Section ───────────────────────────── */}
        {results && !isScanning && (
          <div className="glass-card animate-fade-in" style={{ padding: '2rem', borderTop: '4px solid var(--primary)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle color="#10b981" /> Analysis Complete
              </h3>
              <span style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', padding: '0.3rem 0.8rem', borderRadius: '50px', fontWeight: 'bold' }}>
                {results.accuracy} Accuracy
              </span>
            </div>
            
            <div style={{ marginBottom: '2rem' }}>
              <h4 style={{ marginBottom: '1rem', color: 'var(--text-muted)' }}>Detected Findings:</h4>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                {results.findings.map((f, i) => (
                  <li key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: 'rgba(15, 23, 42, 0.5)', borderRadius: '8px' }}>
                    <span style={{ fontWeight: 'bold' }}>Tooth {f.tooth}</span>
                    <span>{f.issue}</span>
                    <span style={{ color: 'var(--accent)' }}>{(f.confidence * 100).toFixed(0)}% confidence</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div style={{ padding: '1.5rem', background: 'rgba(245, 158, 11, 0.1)', borderRadius: '8px', borderLeft: '4px solid #f59e0b' }}>
              <h4 style={{ color: '#f59e0b', marginBottom: '0.5rem' }}>Recommendations</h4>
              <p>{results.recommendations}</p>
            </div>
          </div>
        )}
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes spin { 100% { transform: rotate(360deg); } }
        .animate-spin { animation: spin 2s linear infinite; }
      `}} />
    </div>
  );
};

export default AIScanner;

