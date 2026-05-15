import React from 'react';
import { Link } from 'react-router-dom';

const MobileDrawer = ({ isOpen, onClose, user, onLogout, openProfileModal }) => {
  return (
    <>
      <div id="mob-drawer" className={`mob-drawer ${isOpen ? 'open' : ''}`}>
        <div className="mob-head">
          <div className="nav-logo">
            <span className="logo-text">Dental<span className="teal-text">Shark</span></span>
          </div>
          <button className="mob-close" onClick={onClose}>✕</button>
        </div>
        
        <div className="mob-body">
          <div className="mob-sec-label">Navigation</div>
          <Link to="/" className="mob-link" onClick={onClose}><span className="mi">🏠</span>Home</Link>
          <Link to="/shop" className="mob-link" onClick={onClose}><span className="mi">🛍️</span>Shop All</Link>
          <Link to="/ai" className="mob-link" onClick={onClose}><span className="mi">🤖</span>AI Scanner</Link>
          <Link to="/engineers" className="mob-link" onClick={onClose}><span className="mi">🔧</span>Engineers</Link>
          
          <div className="mob-divider"></div>
          
          <div className="mob-sec-label">Account</div>
          <div id="mob-user-wrap">
            {user ? (
              <>
                <button className="mob-link" onClick={() => { onClose(); openProfileModal(user.id); }}>
                  <span className="mi">👤</span>{user.name.split(" ").slice(-2).join(" ")}
                </button>
                <Link to="/dashboard" className="mob-link" onClick={onClose}><span className="mi">📊</span>Dashboard</Link>
                <button className="mob-link" onClick={() => { onClose(); onLogout(); }}>
                  <span className="mi">🚪</span>Sign Out
                </button>
              </>
            ) : (
              <Link to="/login" className="mob-link" onClick={onClose}><span className="mi">🔑</span>Sign In</Link>
            )}
          </div>
          
          <div className="mob-divider"></div>
          
          <div className="mob-sec-label">Support</div>
          <Link to="/contact" className="mob-link" onClick={onClose}><span className="mi">💬</span>Contact Us</Link>
          <a href="#" className="mob-link" onClick={(e) => { e.preventDefault(); /* show faq */ onClose(); }}><span className="mi">❓</span>FAQ</a>
        </div>
      </div>
      {isOpen && <div className="mob-overlay open" onClick={onClose}></div>}
    </>
  );
};

export default MobileDrawer;
