import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#0b0f19', color: '#ffffff', padding: '100px 40px 40px', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Expanded Grid to 4 Columns for better AdSense Structure */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '60px', marginBottom: '80px' }}>
          
          {/* Column 1: Brand section with AES-256 Badge */}
          <div style={{ gridColumn: 'span 2' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '25px' }}>
              <div style={{ color: '#e33b2f', fontSize: '24px' }}><i className="fas fa-layer-group"></i></div>
              <h2 style={{ fontSize: '28px', fontWeight: '900', letterSpacing: '-1.2px', margin: 0 }}>BUILT-THEORY</h2>
            </div>
            <p style={{ color: '#9ca3af', lineHeight: '1.8', fontSize: '15px', maxWidth: '380px', marginBottom: '35px' }}>
              The most advanced PDF engine for the modern web. 100% Client-Side encryption optimized for heavy civil engineering workflows.
            </p>
            <div style={{ display: 'flex', gap: '15px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: 'rgba(255,255,255,0.05)', padding: '10px 18px', borderRadius: '50px', border: '1px solid rgba(255,255,255,0.1)', fontSize: '12px', fontWeight: '800' }}>
                <i className="fas fa-shield-check" style={{ color: '#10b981' }}></i> AES-256 SECURED
              </div>
            </div>
          </div>

          {/* Column 2: Solutions */}
          <div>
            <h4 style={{ fontSize: '13px', fontWeight: '800', textTransform: 'uppercase', color: '#9ca3af', letterSpacing: '2.5px', marginBottom: '35px' }}>Solutions</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, lineHeight: '3' }}>
              <li><Link to="/#tools" style={{ color: '#ffffff', textDecoration: 'none', fontSize: '14px', fontWeight: '600', transition: 'color 0.2s' }}>COMBINE FILES</Link></li>
              <li><Link to="/#tools" style={{ color: '#ffffff', textDecoration: 'none', fontSize: '14px', fontWeight: '600' }}>REDUCE SIZE</Link></li>
              <li><Link to="/#tools" style={{ color: '#ffffff', textDecoration: 'none', fontSize: '14px', fontWeight: '600' }}>SEARCHABLE OCR</Link></li>
              <li><Link to="/#tools" style={{ color: '#ffffff', textDecoration: 'none', fontSize: '14px', fontWeight: '600' }}>LOCK PDF</Link></li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h4 style={{ fontSize: '13px', fontWeight: '800', textTransform: 'uppercase', color: '#9ca3af', letterSpacing: '2.5px', marginBottom: '35px' }}>Company</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, lineHeight: '3' }}>
              <li><Link to="/about" style={{ color: '#ffffff', textDecoration: 'none', fontSize: '14px', fontWeight: '600' }}>ABOUT US</Link></li>
              <li><Link to="/" style={{ color: '#e33b2f', textDecoration: 'none', fontSize: '14px', fontWeight: '800' }}>PRICING & PLANS</Link></li>
              <li><Link to="/" style={{ color: '#ffffff', textDecoration: 'none', fontSize: '14px', fontWeight: '600' }}>DEVELOPER API</Link></li>
            </ul>
          </div>

          {/* Column 4: Legal (CRITICAL FOR ADSENSE) */}
          <div>
            <h4 style={{ fontSize: '13px', fontWeight: '800', textTransform: 'uppercase', color: '#9ca3af', letterSpacing: '2.5px', marginBottom: '35px' }}>Legal</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, lineHeight: '3' }}>
              <li><Link to="/privacy" style={{ color: '#ffffff', textDecoration: 'none', fontSize: '14px', fontWeight: '600' }}>PRIVACY POLICY</Link></li>
              <li><Link to="/terms" style={{ color: '#ffffff', textDecoration: 'none', fontSize: '14px', fontWeight: '600' }}>TERMS OF SERVICE</Link></li>
              <li><Link to="/cookies" style={{ color: '#ffffff', textDecoration: 'none', fontSize: '14px', fontWeight: '600' }}>COOKIE POLICY</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
          <p style={{ color: '#4b5563', fontSize: '13px', fontWeight: '700', margin: 0 }}>© 2026 BUILT-THEORY™ | ALL RIGHTS RESERVED.</p>
          <div style={{ display: 'flex', gap: '15px', color: '#4b5563', fontSize: '12px', fontWeight: '800', letterSpacing: '1px' }}>
            VERIFIED BY <span style={{ color: '#ffffff' }}>RAZORPAY</span> & <span style={{ color: '#ffffff' }}>GOOGLE GEMINI</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
