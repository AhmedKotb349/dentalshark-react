import React from 'react';
import { SERVICES, USERS } from '../data';

const Engineers = () => {
  const engineers = USERS.filter(u => u.role === 'Engineer' || u.role === 'Vendor');

  return (
    <div id="engineers-screen" className="screen active">
      <div className="container sec">
        <div className="sec-head">
          <div>
            <h2 className="sec-title">Maintenance & Repair Hub</h2>
            <p className="sec-sub">Expert certified engineers for all your clinic equipment</p>
          </div>
          <button className="btn-primary">Book Urgent Repair ⚡</button>
        </div>

        <div className="serv-grid">
          {SERVICES.map((s, i) => (
            <div key={i} className="serv-card">
              <div className="serv-icon">{s.ic}</div>
              <h3 className="serv-name">{s.nm}</h3>
              <div className="serv-price">{s.pr}</div>
              <p className="serv-desc">{s.ds}</p>
              <button className="btn-outline" style={{ width: '100%', marginTop: 'auto' }}>Select Service</button>
            </div>
          ))}
        </div>

        <div className="sec-head" style={{ marginTop: '60px' }}>
          <div>
            <h2 className="sec-title">Certified Partners</h2>
            <p className="sec-sub">Our network of verified maintenance experts</p>
          </div>
        </div>

        <div className="eng-grid">
          {engineers.map(e => (
            <div key={e.id} className="eng-card">
              <div className="eng-av" style={{ background: e.color }}>{e.initials}</div>
              <div className="eng-body">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '8px' }}>
                  <div>
                    <h3 className="eng-name">{e.name}</h3>
                    <div className="eng-role">{e.dept}</div>
                  </div>
                  <div className="eng-stat">🟢 Online</div>
                </div>
                <div className="eng-meta">
                  <span>📍 Cairo & Giza</span>
                  <span>⭐ 4.9 (124 reviews)</span>
                </div>
                <div className="eng-actions">
                  <button className="btn-primary" onClick={() => window.open(`https://wa.me/${e.phone.replace(/\D/g,'')}`)}>WhatsApp</button>
                  <button className="btn-outline">View Profile</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Engineers;
