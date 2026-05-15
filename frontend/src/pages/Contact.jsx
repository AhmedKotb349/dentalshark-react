import React from 'react';

const Contact = () => {
  return (
    <div id="contact-screen" className="screen active">
      <div className="container sec">
        <div className="contact-wrap">
          <div className="contact-info">
            <h2 className="sec-title" style={{ color: '#fff' }}>Get in Touch</h2>
            <p className="sec-sub">Have questions? We're here to help you 24/7.</p>
            
            <div className="ci-list">
              <div className="ci-item">
                <div className="ci-icon">📍</div>
                <div>
                  <h4>Visit Our Hub</h4>
                  <p>Building 42, Smart Village, Giza, Egypt</p>
                </div>
              </div>
              <div className="ci-item">
                <div className="ci-icon">📞</div>
                <div>
                  <h4>Call Us</h4>
                  <p>+20 2 1234 5678 (Sales)</p>
                  <p>+20 100 123 4567 (Technical Support)</p>
                </div>
              </div>
              <div className="ci-item">
                <div className="ci-icon">✉️</div>
                <div>
                  <h4>Email Us</h4>
                  <p>hello@dentalshark.eg</p>
                  <p>support@dentalshark.eg</p>
                </div>
              </div>
            </div>

            <div className="social-links" style={{ marginTop: '40px', display: 'flex', gap: '15px' }}>
              {['Facebook', 'LinkedIn', 'Twitter', 'Instagram'].map(s => (
                <div key={s} style={{ width: '40px', height: '40px', background: 'rgba(255,255,255,0.1)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>{s[0]}</div>
              ))}
            </div>
          </div>

          <div className="contact-form-box">
            <h3 style={{ marginBottom: '20px' }}>Send us a message</h3>
            <form>
              <div className="form-group">
                <label>Full Name</label>
                <input className="form-input" placeholder="Your name" />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input className="form-input" type="email" placeholder="email@example.com" />
              </div>
              <div className="form-group">
                <label>Subject</label>
                <select className="form-input">
                  <option>General Inquiry</option>
                  <option>Order Support</option>
                  <option>Technical Issue</option>
                  <option>Vendor Partnership</option>
                </select>
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea className="form-input" rows="4" placeholder="How can we help?"></textarea>
              </div>
              <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '10px' }}>Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
