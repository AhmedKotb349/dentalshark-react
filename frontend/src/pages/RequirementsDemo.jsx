import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../hooks/useApp';
import { get } from '../utils/api';
import { StyledButton, Container, SectionTitle } from '../components/StyledComponents.js';

/**
 * FeatureItem Component
 */
function FeatureItem({ name, desc, status }) {
  return (
    <li className="list-group-item bg-transparent text-white d-flex justify-content-between align-items-center border-secondary">
      <div>
        <div className="fw-bold">{name}</div>
        <small className="text-muted">{desc}</small>
      </div>
      <span className="badge bg-success rounded-pill">{status}</span>
    </li>
  );
}

/**
 * RequirementsDemo Page
 * Demonstrates all technical project requirements.
 */
const RequirementsDemo = () => {
  const { theme, toggleTheme, cartCount } = useApp();
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const techStack = [
    { name: 'React Hooks', status: '✅ Done', desc: 'useState & useEffect in use.' },
    { name: 'Context API', status: '✅ Done', desc: 'Managing theme and cart state.' },
    { name: 'Styled Components', status: '✅ Done', desc: 'This page uses Styled Components.' },
    { name: 'Bootstrap', status: '✅ Done', desc: 'Using Bootstrap Grid & Utilities.' },
    { name: 'API Integration', status: '✅ Done', desc: 'Fetching data using async/await.' },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const data = await get('/products');
        setProducts(data.slice(0, 3));
      } catch (err) {
        console.error('Failed to fetch products for demo', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (feedback.trim()) setSubmitted(true);
  };

  return (
    <Container className="py-5" style={{ background: '#0f172a', minHeight: '100vh', color: 'white' }}>
      <SectionTitle className="text-center mb-4">
        Project <span>Requirements</span> Demo
      </SectionTitle>
      
      <div className="row g-4">
        <div className="col-md-6">
          <div className="card bg-dark text-white p-4 border-secondary h-100 shadow" style={{ borderRadius: '15px' }}>
            <h3 className="mb-3">Global State (Context)</h3>
            <p className="mb-2">Theme: <span className="text-info fw-bold">{theme.toUpperCase()}</span></p>
            <p className="mb-4">Items in Cart: <span className="text-info fw-bold">{cartCount}</span></p>
            <StyledButton onClick={toggleTheme}>Toggle Theme Hook</StyledButton>
            
            <hr className="my-4 border-secondary" />
            
            <h4 className="mb-3">Feedback Form</h4>
            {submitted ? (
              <div className="text-success fw-bold">✅ Feedback sent! Thank you.</div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <input 
                    type="text" 
                    className="form-control bg-transparent text-white border-secondary" 
                    placeholder="Enter your thoughts..."
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                  />
                </div>
                <button type="submit" className="btn btn-sm btn-primary">Submit Feedback</button>
              </form>
            )}
          </div>
        </div>
        
        <div className="col-md-6">
          <div className="card bg-dark text-white p-4 border-secondary h-100 shadow" style={{ borderRadius: '15px' }}>
            <h3 className="mb-3">Mapping & API Demo</h3>
            <ul className="list-group list-group-flush bg-transparent">
              {techStack.map((item, idx) => (
                <FeatureItem key={idx} name={item.name} desc={item.desc} status={item.status} />
              ))}
            </ul>
            <hr className="my-4 border-secondary" />
            <h5>Live API Data (GET):</h5>
            {loading ? <div className="spinner-border spinner-border-sm text-info"></div> : (
              <ul className="small text-muted">
                {products.map(p => <li key={p.id}>{p.name} - ${p.price}</li>)}
              </ul>
            )}
          </div>
        </div>
      </div>
      <div className="mt-5 text-center">
        <Link to="/" className="btn btn-outline-light px-4">← Back to Main Website</Link>
      </div>
    </Container>
  );
};

export default RequirementsDemo;
