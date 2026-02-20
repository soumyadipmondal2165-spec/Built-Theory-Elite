import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#0b0f19', color: '#ffffff', padding: '100px 40px 40px', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '80px', marginBottom: '80px' }}>
          
          {/* Brand section with AES-256 Badge */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '25px' }}>
              <div style={{ color: '#e33b2f', fontSize: '24px' }}><i className="fas fa-layer-group"></i></div>
              <h2 style={{ fontSize: '28px', fontWeight: '900', letterSpacing: '-1.2px', margin: 0 }}>BUILT-THEORY</h2>
            </div>
            <p style={{ color: '#9ca3af', lineHeight: '1.8', fontSize: '17px', maxWidth: '420px', marginBottom: '35px' }}>
              The most advanced PDF engine for the modern web. 100% Client-Side encryption for Civil Engineers.
            </p>
            <div style={{ display: 'flex', gap: '15px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: 'rgba(255,255,255,0.05)', padding: '12px 20px', borderRadius: '50px', border: '1px solid rgba(255,255,255,0.1)', fontSize: '12px', fontWeight: '800' }}>
                <i className="fas fa-shield-check" style={{ color: '#10b981' }}></i> AES-256 SECURED
              </div>
            </div>
          </div>

          {/* Solution & Company Columns from Screenshot */}
          <div>
            <h4 style={{ fontSize: '13px', fontWeight: '800', textTransform: 'uppercase', color: '#9ca3af', letterSpacing: '2.5px', marginBottom: '35px' }}>Solutions</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, lineHeight: '3' }}>
              {['COMBINE FILES', 'REDUCE SIZE', 'SEARCHABLE OCR', 'LOCK PDF'].map((item) => (
                <li key={item}><Link to="#tools" style={{ color: '#ffffff', textDecoration: 'none', fontSize: '15px', fontWeight: '600' }}>{item}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 style={{ fontSize: '13px', fontWeight: '800', textTransform: 'uppercase', color: '#9ca3af', letterSpacing: '2.5px', marginBottom: '35px' }}>Company</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, lineHeight: '3' }}>
              <li><Link to="#" style={{ color: '#e33b2f', textDecoration: 'none', fontSize: '15px', fontWeight: '800' }}>PRICING & PLANS</Link></li>
              {['DEVELOPER API', 'SECURITY SPECS', 'PRIVACY POLICY'].map((item) => (
                <li key={item}><Link to="#" style={{ color: '#ffffff', textDecoration: 'none', fontSize: '15px', fontWeight: '600' }}>{item}</Link></li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar with Razorpay & Gemini Verified labels */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
          <p style={{ color: '#4b5563', fontSize: '13px', fontWeight: '700' }}>© 2026 BUILT-THEORY™ | ALL RIGHTS RESERVED.</p>
          <div style={{ display: 'flex', gap: '10px', color: '#4b5563', fontSize: '13px', fontWeight: '800' }}>
            VERIFIED BY <span style={{ color: '#ffffff' }}>RAZORPAY</span> & <span style={{ color: '#ffffff' }}>GOOGLE GEMINI 3.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
