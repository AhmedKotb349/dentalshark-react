import React from 'react';

const Dashboard = ({ user }) => {
  if (!user) return <div className="container sec">Please log in to view your dashboard.</div>;

  return (
    <div id="dashboard-screen" className="screen active">
      <div className="container sec">
        <div className="dash-head">
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <div className="dash-av" style={{ background: user.color }}>{user.initials}</div>
            <div>
              <h2 className="dash-welcome">Marhaba, {user.name.split(' ')[0]} 👋</h2>
              <p className="dash-sub">Here's what's happening with your account today.</p>
            </div>
          </div>
          <div className="dash-pts-box">
             <div style={{ fontSize: '12px', opacity: 0.8 }}>SHARK Points</div>
             <div style={{ fontSize: '24px', fontWeight: '800', color: 'var(--gold)' }}>1,450 ⚡</div>
          </div>
        </div>

        <div className="dash-grid">
          <div className="dash-stat-card">
            <div className="dsc-label">Active Orders</div>
            <div className="dsc-val">{user.orders || 0}</div>
            <div className="dsc-trend up">↑ 12% vs last month</div>
          </div>
          <div className="dash-stat-card">
            <div className="dsc-label">Total Spent</div>
            <div className="dsc-val">{user.spent || '0 EGP'}</div>
            <div className="dsc-trend">Safe & Secure</div>
          </div>
          <div className="dash-stat-card">
            <div className="dsc-label">Saved Items</div>
            <div className="dsc-val">12</div>
            <div className="dsc-trend">Check price drops</div>
          </div>
          <div className="dash-stat-card">
            <div className="dsc-label">Support Tickets</div>
            <div className="dsc-val">0</div>
            <div className="dsc-trend">All resolved</div>
          </div>
        </div>

        <div className="dash-main-grid">
          <div className="dash-sec">
            <h3 className="dash-sec-title">Recent Activity</h3>
            <div className="activity-list">
              {[
                { t: "Order #4592 placed", d: "2 hours ago", s: "Processing" },
                { t: "Handpiece repair completed", d: "Yesterday", s: "Shipped" },
                { t: "Wishlist price drop: NSK Turbine", d: "2 days ago", s: "Alert" }
              ].map((a, i) => (
                <div key={i} className="activity-item">
                  <div className="activity-icon">🛒</div>
                  <div className="activity-info">
                    <div className="activity-title">{a.t}</div>
                    <div className="activity-date">{a.d}</div>
                  </div>
                  <div className="activity-status">{a.s}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="dash-sec">
            <h3 className="dash-sec-title">Quick Actions</h3>
            <div className="qa-grid">
              <button className="qa-btn">📦 Track Orders</button>
              <button className="qa-btn">🔧 Repair Status</button>
              <button className="qa-btn">🎫 My Tickets</button>
              <button className="qa-btn">⚙️ Settings</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
