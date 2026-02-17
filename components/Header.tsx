import React from 'react';
import { User } from '../types';

interface HeaderProps {
  user: User | null;
  onLogin: () => void;
  onLogout: () => void;
  onJoinPro: () => void;
  scrollToTools: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogin, onLogout, onJoinPro, scrollToTools }) => {
  return (
    <header className="h-[72px] flex items-center justify-between px-6 md:px-10 bg-white/80 backdrop-blur-md shadow-sm fixed w-full top-0 z-40 transition-all duration-300">
      <a href="/" className="text-xl font-extrabold text-primary no-underline tracking-tight">
        Built-Theory<span className="text-dark font-light ml-1">PRO</span>
      </a>

      <div className="hidden md:flex items-center gap-8">
        <button onClick={scrollToTools} className="text-gray-600 hover:text-primary font-medium transition-colors">
          All Tools
        </button>
        {!user?.isPremium && (
          <button onClick={onJoinPro} className="text-primary font-bold hover:text-red-700 transition-colors">
            JOIN PRO
          </button>
        )}
      </div>

      <div className="flex items-center gap-4">
        {!user ? (
          <button 
            onClick={onLogin} 
            className="bg-dark text-white px-5 py-2 rounded-lg font-medium hover:bg-gray-800 transition-transform active:scale-95"
          >
            Login
          </button>
        ) : (
          <div className="flex items-center gap-3">
            {user.isPremium && (
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs px-2 py-1 rounded-full font-bold shadow-sm">
                PRO
              </span>
            )}
            <img 
              src={user.photoURL || "https://picsum.photos/40/40"} 
              alt="Avatar" 
              className="w-9 h-9 rounded-full border border-gray-200"
            />
            <button 
              onClick={onLogout} 
              className="hidden md:block text-sm text-gray-500 hover:text-dark"
            >
              Logout
            </button>
            {!user.isPremium && (
              <button 
                onClick={onJoinPro} 
                className="bg-yellow-400 text-black px-4 py-2 rounded-lg text-sm font-bold hover:bg-yellow-500 transition-transform active:scale-95 shadow-md"
              >
                Go Pro
              </button>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
