import React from 'react';
import { VALUES } from '../data';

const About = () => {
  return (
    <div id="about-screen" className="screen active">
      <div className="container sec">
        <div className="about-hero">
          <h1 className="about-title">Egypt's First Dental <span className="teal-text">Ecosystem</span></h1>
          <p className="about-sub">Revolutionizing dental practice through technology, community, and trust since 2022.</p>
        </div>

        <div className="about-grid">
          <div className="about-img">
             <img src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Dental Hub" style={{ width: '100%', borderRadius: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }} />
          </div>
          <div className="about-text">
            <h2>Our Story</h2>
            <p>DentalShark was founded by Eng. Ahmed Kotb with a simple vision: to bridge the gap between dental clinics and high-quality equipment vendors in Egypt. What started as a maintenance-focused platform has evolved into a comprehensive ecosystem including a marketplace, AI diagnostics, and professional networking.</p>
            <p>Today, we serve over 5,000 dental professionals across Egypt, providing them with the tools they need to deliver exceptional patient care.</p>
            <div className="about-stats">
              <div className="stat-item">
                <div className="stat-val">5k+</div>
                <div className="stat-lbl">Active Doctors</div>
              </div>
              <div className="stat-item">
                <div className="stat-val">120+</div>
                <div className="stat-lbl">Global Brands</div>
              </div>
              <div className="stat-item">
                <div className="stat-val">24h</div>
                <div className="stat-lbl">Support Response</div>
              </div>
            </div>
          </div>
        </div>

        <div className="values-sec">
          <h2 style={{ textAlign: 'center', marginBottom: '40px' }}>Our Core Values</h2>
          <div className="values-grid">
            {VALUES.map((v, i) => (
              <div key={i} className="val-card">
                <div className="val-icon">{v.ic}</div>
                <h3>{v.nm}</h3>
                <p>{v.ds}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
