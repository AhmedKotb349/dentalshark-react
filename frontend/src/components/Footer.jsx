import React from 'react';
import { Link } from 'react-router-dom';

const Footer = ({ onShowInfo, openWishlist }) => {
  return (
    <footer>
      <div className="footer-grid">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '9px', marginBottom: '4px' }}>
            <img 
              id="footer-logo-img" 
              src="data:image/png;base64,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" 
              alt="DentalShark Logo" 
              style={{ width: '40px', height: '40px', objectFit: 'contain', borderRadius: '8px' }} 
            />
            <span style={{ fontSize: '18px', fontWeight: '800', color: '#fff' }}>Dental<span style={{ color: 'var(--teal)' }}>Shark</span></span>
          </div>
          <div className="free-ship-badge" style={{ cursor: 'pointer' }}>
            <span>🚚</span> Free shipping Egypt-wide on orders 500+ EGP
          </div>
          <p style={{ fontSize: '11px', color: 'var(--text2)', lineHeight: '1.8', maxWidth: '240px', marginTop: '10px' }}>
            Egypt's #1 dental equipment marketplace connecting clinics, doctors and vendors.
          </p>
          <div className="footer-pts" style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px', width: 'fit-content' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '24px', height: '24px', background: 'var(--gold)', color: '#000', borderRadius: '6px', fontSize: '14px', fontWeight: '900', boxShadow: '0 0 10px rgba(245,158,11,0.3)' }}>⚡</span>
            <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--gold)', letterSpacing: '0.5px' }}>SHARK Points</span>
          </div>
        </div>
        <div className="footer-col">
          <h4>Quick Links</h4>
          <Link to="/shop">Shop All</Link>
          <Link to="/shop?flash=true">Flash Deals</Link>
          <Link to="/ai">AI Scanner</Link>
          <Link to="/engineers">Engineers</Link>
          <a onClick={(e) => { e.preventDefault(); openWishlist(); }} href="#">My Wishlist ❤️</a>
          <Link to="/sharkpoints">SHARK Points ⚡</Link>
        </div>
        <div className="footer-col">
          <h4>Support</h4>
          <Link to="/contact">Contact Us</Link>
          <a onClick={(e) => { e.preventDefault(); onShowInfo('faq'); }} href="#">FAQ</a>
          <a onClick={(e) => { e.preventDefault(); onShowInfo('returns'); }} href="#">Returns</a>
          <a onClick={(e) => { e.preventDefault(); onShowInfo('track'); }} href="#">Track Order</a>
          <a onClick={(e) => { e.preventDefault(); onShowInfo('warranty'); }} href="#">Warranty</a>
          <a onClick={(e) => { e.preventDefault(); onShowInfo('payment'); }} href="#">Payment Methods</a>
        </div>
        <div className="footer-col">
          <h4>Newsletter</h4>
          <p style={{ fontSize: '11px', color: 'var(--text2)', marginBottom: '9px' }}>Exclusive deals and new products straight to your inbox.</p>
          <div className="nl-form">
            <input placeholder="your@email.com" />
            <button>Subscribe</button>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2025 DentalShark. CEO & Admin: Eng. Ahmed Kotb. All Rights Reserved.</span>
        <span>🦷 Made with precision in Egypt 🇪🇬</span>
      </div>
    </footer>
  );
};

export default Footer;
