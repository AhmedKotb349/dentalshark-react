import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const [role, setRole] = useState('dentist');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ email, password, role });
  };

  const handleSocialLogin = (provider) => {
    onLogin({ provider });
  };

  return (
    <div id="login-screen" className="screen active" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '20px' }}>
      <div className="login-card">
        <div className="login-header">
          <div className="login-logo">🦈</div>
          <h1 className="login-title">Welcome to DentalShark</h1>
          <p className="login-sub">Select your clinical role to continue</p>
        </div>

        <div className="role-tabs">
          {['dentist', 'vendor', 'student', 'admin'].map(r => (
            <div 
              key={r} 
              className={`rt ${role === r ? 'active' : ''}`} 
              onClick={() => setRole(r)}
            >
              {r.toUpperCase()}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>Email Address</label>
            <input 
              className="form-input" 
              type="email" 
              placeholder={`Enter your ${role} email`} 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <div style={{ position: 'relative' }}>
              <input 
                className="form-input" 
                type={showPassword ? 'text' : 'password'} 
                placeholder="Enter your password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
              <button 
                type="button" 
                className="pw-toggle" 
                onClick={() => setShowPassword(!showPassword)}
                style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer' }}
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--text2)', cursor: 'pointer' }}>
              <input type="checkbox" /> Remember me
            </label>
            <a href="#" onClick={(e) => { e.preventDefault(); /* handle forgot pw */ }} style={{ fontSize: '12px', color: 'var(--teal)', fontWeight: 600 }}>Forgot Password?</a>
          </div>

          <button type="submit" className="btn-login">Sign In</button>
        </form>

        <div className="login-sep"><span>OR CONTINUE WITH</span></div>

        <div className="social-login">
          <button className="social-btn" onClick={() => handleSocialLogin('google')}>
            <img src="https://www.svgrepo.com/show/355037/google.svg" alt="Google" style={{ width: '18px' }} /> Google
          </button>
          <button className="social-btn" onClick={() => handleSocialLogin('apple')}>
            <img src="https://www.svgrepo.com/show/442930/apple.svg" alt="Apple" style={{ width: '18px' }} /> Apple
          </button>
        </div>

        <button className="btn-guest" onClick={() => handleSocialLogin('guest')}>Continue as Guest</button>

        <p className="login-footer">
          Don't have an account? <a href="#" style={{ color: 'var(--teal)', fontWeight: 700 }}>Create Account</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
