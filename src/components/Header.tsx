import React, { useState, useEffect } from 'react';
import { User } from '../../types';

interface HeaderProps {
  user: User | null;
  onLogin: () => void;
  onLogout: () => void;
  onJoinPro: () => void;
  scrollToTools: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  user, 
  onLogin, 
  onLogout, 
  onJoinPro, 
  scrollToTools 
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Monitor scroll for visual feedback (Glassmorphism effect)
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`h-[72px] flex items-center justify-between px-6 md:px-12 fixed w-full top-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/90 backdrop-blur-lg shadow-lg border-b border-gray-200/50' 
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      {/* 1. BRAND IDENTITY SECTION */}
      <div className="flex items-center gap-2">
        <a href="/" className="flex flex-col no-underline group">
          <span className="text-2xl font-black text-slate-900 tracking-tighter leading-none group-hover:text-blue-700 transition-colors">
            BUILT<span className="text-blue-600">THEORY</span>
          </span>
          <span className="text-[10px] uppercase tracking-[2.5px] font-bold text-slate-500 mt-1">
            Engineering Excellence
          </span>
        </a>
      </div>

      {/* 2. CORE NAVIGATION (AdSense "Value" Links) */}
      <nav className="hidden lg:flex items-center gap-8">
        <a 
          href="/theory-lab" 
          className="text-slate-600 hover:text-blue-600 font-bold text-[13px] transition-all uppercase tracking-wider relative group"
        >
          Theory Lab
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
        </a>
        
        {/* We keep your scrollToTools logic but wrap it in a clean button style */}
        <button 
          onClick={() => {
            scrollToTools();
            setIsMobileMenuOpen(false);
          }}
          className="text-slate-600 hover:text-blue-600 font-bold text-[13px] transition-all uppercase tracking-wider relative group"
        >
          Engineering Tools
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
        </button>

        <a 
          href="/student-corner" 
          className="text-slate-600 hover:text-blue-600 font-bold text-[13px] transition-all uppercase tracking-wider relative group"
        >
          Student Corner
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
        </a>
      </nav>

      {/* 3. USER ACTIONS & AUTH SECTION */}
      <div className="flex items-center gap-3 md:gap-6">
        {!user ? (
          <div className="flex items-center gap-2">
            <button 
              onClick={onLogin} 
              className="text-slate-800 font-bold text-sm px-4 py-2 rounded-lg hover:bg-slate-100 transition-all"
            >
              Log In
            </button>
            <button 
              onClick={onJoinPro}
              className="hidden sm:block bg-slate-900 text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-200 transition-all active:scale-95"
            >
              Get Full Access
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            {/* Status Indicator */}
            <div className="hidden md:flex flex-col items-end leading-none">
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Status</span>
              <span className={`text-[11px] font-black px-2 py-0.5 rounded ${user.isPremium ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-600'}`}>
                {user.isPremium ? 'PRO MEMBER' : 'FREE ACCOUNT'}
              </span>
            </div>

            {/* Profile Section */}
            <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
              <div className="relative">
                <img 
                  src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName || 'User'}&background=020617&color=fff`} 
                  alt="Avatar" 
                  className="w-10 h-10 rounded-full border-2 border-white shadow-md"
                />
                {user.isPremium && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 border-2 border-white rounded-full flex items-center justify-center">
                    <span className="text-[8px] text-white">★</span>
                  </div>
                )}
              </div>
              
              <button 
                onClick={onLogout} 
                className="hidden md:block text-xs font-bold text-red-500 hover:text-red-700 transition-colors uppercase tracking-tighter"
              >
                Sign Out
              </button>
            </div>
          </div>
        )}

        {/* Mobile Menu Toggle (Essential for students using phones) */}
        <button 
          className="lg:hidden p-2 text-slate-900" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
          </svg>
        </button>
      </div>

      {/* 4. MOBILE DROPDOWN MENU */}
      {isMobileMenuOpen && (
        <div className="absolute top-[72px] left-0 w-full bg-white shadow-2xl border-b border-gray-200 flex flex-col p-6 gap-4 lg:hidden animate-in slide-in-from-top duration-300">
          <a href="/theory-lab" className="text-lg font-bold text-slate-800">Theory Lab</a>
          <button onClick={() => { scrollToTools(); setIsMobileMenuOpen(false); }} className="text-left text-lg font-bold text-slate-800">Engineering Tools</button>
          <a href="/student-corner" className="text-lg font-bold text-slate-800">Student Corner</a>
          <hr />
          {!user && (
            <button onClick={onJoinPro} className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold">Get Full Access</button>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
