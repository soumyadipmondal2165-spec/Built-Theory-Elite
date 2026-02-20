import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#0f0f0f', color: '#ffffff', padding: '60px 20px', borderTop: '4px solid #cc0000' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '40px' }}>
        
        {/* Brand Mission: Global Positioning */}
        <div style={{ flex: '1.5', minWidth: '300px' }}>
          <h2 style={{ fontSize: '26px', fontWeight: 'bold', marginBottom: '15px' }}>Built Theory</h2>
          <p style={{ color: '#bdbdbd', lineHeight: '1.7', fontSize: '15px' }}>
            Built Theory is a global digital ecosystem designed to streamline documentation for Civil Engineering students and industry professionals. We provide high-performance tools for managing structural reports, technical drawings, and academic research documents.
          </p>
        </div>

        {/* Global Productivity Tools (Keyword Focused) */}
        <div style={{ flex: '1', minWidth: '200px' }}>
          <h4 style={{ textTransform: 'uppercase', letterSpacing: '1px', fontSize: '14px', marginBottom: '20px', color: '#cc0000' }}>Engineering Solutions</h4>
          <ul style={{ listStyle: 'none', padding: 0, lineHeight: '2.4' }}>
            <li><Link to="/word-to-pdf" style={{ color: '#e0e0e0', textDecoration: 'none' }}>Technical Word to PDF</Link></li>
            <li><Link to="/ocr" style={{ color: '#e0e0e0', textDecoration: 'none' }}>AI-Powered OCR for Drawings</Link></li>
            <li><Link to="/compress-pdf" style={{ color: '#e0e0e0', textDecoration: 'none' }}>Compress Engineering Docs</Link></li>
            <li><Link to="/merge-pdf" style={{ color: '#e0e0e0', textDecoration: 'none' }}>Merge Structural Reports</Link></li>
          </ul>
        </div>

        {/* Global Academic Focus */}
        <div style={{ flex: '1', minWidth: '200px' }}>
          <h4 style={{ textTransform: 'uppercase', letterSpacing: '1px', fontSize: '14px', marginBottom: '20px', color: '#cc0000' }}>Academic Support</h4>
          <ul style={{ listStyle: 'none', padding: 0, lineHeight: '2.4' }}>
            <li><Link to="/guides" style={{ color: '#e0e0e0', textDecoration: 'none' }}>Engineering Study Resources</Link></li>
            <li><Link to="/templates" style={{ color: '#e0e0e0', textDecoration: 'none' }}>Global Standards & Templates</Link></li>
            <li><Link to="/support" style={{ color: '#e0e0e0', textDecoration: 'none' }}>Student Productivity Suite</Link></li>
          </ul>
        </div>

        {/* Global Channel Link */}
        <div style={{ flex: '1', minWidth: '200px' }}>
          <h4 style={{ textTransform: 'uppercase', letterSpacing: '1px', fontSize: '14px', marginBottom: '20px', color: '#cc0000' }}>Education</h4>
          <p style={{ color: '#bdbdbd', fontSize: '14px', marginBottom: '15px' }}>Watch our global engineering tutorials on YouTube.</p>
          <a href="https://www.youtube.com/@BuiltTheory" target="_blank" rel="noreferrer" 
             style={{ display: 'inline-block', backgroundColor: '#cc0000', color: '#fff', padding: '12px 20px', borderRadius: '4px', textDecoration: 'none', fontWeight: 'bold', fontSize: '14px' }}>
            Built Theory YouTube
          </a>
        </div>
      </div>

      <hr style={{ borderColor: '#222', margin: '40px 0' }} />
      
      {/* Global Meta Content for SEO Crawlers */}
      <div style={{ textAlign: 'center', color: '#555', fontSize: '12px' }}>
        <p style={{ marginBottom: '10px' }}>
          Global Keywords: Civil Engineering PDF Tools, Structural Analysis Documentation, Geotechnical Report Management, International Engineering Standards.
        </p>
        <p>&copy; {new Date().getFullYear()} BUILT-THEORY.COM | Empowering Future Engineers Across the Globe.</p>
      </div>
    </footer>
  );
};

export default Footer;
