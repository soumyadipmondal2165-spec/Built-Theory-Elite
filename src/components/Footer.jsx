import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white pt-24 pb-12 px-6 md:px-16 font-sans border-t border-slate-800">
      <div className="max-w-7xl mx-auto">
        {/* Main 4-Column Grid Structure */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          
          {/* Column 1: Brand Identity & Mission */}
          <div className="lg:col-span-1">
            <div className="flex flex-col gap-5 mb-8">
              <span className="text-3xl font-black tracking-tighter uppercase leading-none">
                BUILT<span className="text-blue-500">THEORY</span>
              </span>
              <p className="text-slate-400 text-sm leading-relaxed max-w-xs font-medium">
                The premier hub for Civil Engineering students. Bridging the gap between 
                University academic theory and real-world construction site reality.
              </p>
            </div>
            {/* Professional Social Connect */}
            <div className="flex gap-4">
              <a href="https://facebook.com" className="w-10 h-10 rounded-xl bg-slate-800/50 flex items-center justify-center hover:bg-blue-600 hover:-translate-y-1 transition-all duration-300">
                <i className="fab fa-facebook-f text-sm"></i>
              </a>
              <a href="https://linkedin.com" className="w-10 h-10 rounded-xl bg-slate-800/50 flex items-center justify-center hover:bg-blue-700 hover:-translate-y-1 transition-all duration-300">
                <i className="fab fa-linkedin-in text-sm"></i>
              </a>
              <a href="https://youtube.com/@built-theory" className="w-10 h-10 rounded-xl bg-slate-800/50 flex items-center justify-center hover:bg-red-600 hover:-translate-y-1 transition-all duration-300">
                <i className="fab fa-youtube text-sm"></i>
              </a>
            </div>
          </div>

          {/* Column 2: Educational Resources (High Value for Google) */}
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[4px] text-blue-500 mb-8 opacity-80">Knowledge Hub</h4>
            <ul className="flex flex-col gap-4 text-[13px] font-bold text-slate-300">
              <li><Link to="/theory-lab" className="hover:text-blue-400 transition-colors">Engineering Theory Lab</Link></li>
              <li><Link to="/student-corner" className="hover:text-blue-400 transition-colors">MAKAUT Semester Notes</Link></li>
              <li><Link to="/#tools" className="hover:text-blue-400 transition-colors">PDF Calculation Suite</Link></li>
              <li><Link to="/#tools" className="hover:text-blue-400 transition-colors">Structural Analysis Tools</Link></li>
            </ul>
          </div>

          {/* Column 3: Trust & Support (Critical for Manual Review) */}
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[4px] text-blue-500 mb-8 opacity-80">Support Center</h4>
            <ul className="flex flex-col gap-4 text-[13px] font-bold text-slate-300">
              <li><Link to="/about" className="hover:text-blue-400 transition-colors">About Our Mission</Link></li>
              <li><Link to="/contact" className="hover:text-blue-400 transition-colors">Contact Support</Link></li>
              <li><Link to="/help-center" className="hover:text-blue-400 transition-colors">Help & Documentation</Link></li>
              <li className="pt-2">
                <a href="mailto:support@built-theory.com" className="text-blue-400 hover:text-blue-300 flex items-center gap-2">
                  <i className="fas fa-envelope text-xs opacity-50"></i>
                  support@built-theory.com
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Legal Compliance & Security */}
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[4px] text-blue-500 mb-8 opacity-80">Legal & Security</h4>
            <ul className="flex flex-col gap-4 text-[13px] font-bold text-slate-300">
              <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy & Data Policy</Link></li>
              <li><Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link to="/cookies" className="hover:text-white transition-colors">Cookie Management</Link></li>
              <li className="mt-4">
                <div className="inline-flex items-center gap-2 bg-blue-500/10 px-4 py-2 rounded-lg border border-blue-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                  <span className="text-[10px] font-black uppercase tracking-widest text-blue-400">AES-256 Secured</span>
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Utility Bar */}
        <div className="pt-12 border-t border-slate-800/50 flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
          <div className="flex flex-col gap-1">
            <p className="text-slate-500 text-[11px] font-bold tracking-tight">
              © 2026 BUILT THEORY. ALL RIGHTS RESERVED.
            </p>
            <p className="text-slate-600 text-[10px] uppercase tracking-[3px] font-black">
              Kolkata, West Bengal, India
            </p>
          </div>
          
          {/* Trust Badges */}
          <div className="flex items-center gap-8">
             <div className="flex items-center gap-2.5">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Powered By</span>
                <span className="text-xs font-bold text-slate-300">Advanced AI Logic</span>
             </div>
             <div className="h-5 w-[1px] bg-slate-800 hidden md:block opacity-50"></div>
             <div className="flex items-center gap-2.5">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Verified By</span>
                <span className="text-xs font-bold text-slate-300">Razorpay</span>
             </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
