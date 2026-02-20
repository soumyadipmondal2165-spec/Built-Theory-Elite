import React from 'react';
// Remove the 'react-router-dom' import to stop the crash

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#0f0f0f', color: '#ffffff', padding: '60px 20px', borderTop: '4px solid #cc0000' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '40px' }}>
        
        {/* ... (Brand Mission section stays the same) ... */}

        {/* RECTIFIED: Engineering Solutions (Standard Links) */}
        <div style={{ flex: '1', minWidth: '200px' }}>
          <h4 style={{ textTransform: 'uppercase', letterSpacing: '1px', fontSize: '14px', marginBottom: '20px', color: '#cc0000' }}>Engineering Solutions</h4>
          <ul style={{ listStyle: 'none', padding: 0, lineHeight: '2.4' }}>
            <li><a href="#tools" style={{ color: '#e0e0e0', textDecoration: 'none' }}>Technical Word to PDF</a></li>
            <li><a href="#tools" style={{ color: '#e0e0e0', textDecoration: 'none' }}>AI-Powered OCR for Drawings</a></li>
            <li><a href="#tools" style={{ color: '#e0e0e0', textDecoration: 'none' }}>Compress Engineering Docs</a></li>
            <li><a href="#tools" style={{ color: '#e0e0e0', textDecoration: 'none' }}>Merge Structural Reports</a></li>
          </ul>
        </div>

        {/* RECTIFIED: Academic Support (Standard Links) */}
        <div style={{ flex: '1', minWidth: '200px' }}>
          <h4 style={{ textTransform: 'uppercase', letterSpacing: '1px', fontSize: '14px', marginBottom: '20px', color: '#cc0000' }}>Academic Support</h4>
          <ul style={{ listStyle: 'none', padding: 0, lineHeight: '2.4' }}>
            <li><a href="#tools" style={{ color: '#e0e0e0', textDecoration: 'none' }}>Engineering Study Resources</a></li>
            <li><a href="#tools" style={{ color: '#e0e0e0', textDecoration: 'none' }}>Global Standards & Templates</a></li>
            <li><a href="#tools" style={{ color: '#e0e0e0', textDecoration: 'none' }}>Student Productivity Suite</a></li>
          </ul>
        </div>

        {/* ... (Education and SEO sections stay the same) ... */}
