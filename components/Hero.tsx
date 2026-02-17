import React from 'react';

interface HeroProps {
  onExplore: () => void;
  onJoinPro: () => void;
}

const Hero: React.FC<HeroProps> = ({ onExplore, onJoinPro }) => {
  return (
    <div className="pt-32 pb-16 px-6 text-center bg-gradient-to-b from-[#fbfbfd] to-[#f4f6fb]">
      <h1 className="text-4xl md:text-5xl font-bold text-dark mb-4 leading-tight">
        Engineering & PDF <span className="text-primary">Intelligence</span>
      </h1>
      <p className="text-gray-500 text-lg max-w-2xl mx-auto mb-8">
        10GB file limits and professional AI academic tools for engineering students and professionals.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button 
          onClick={onExplore} 
          className="bg-primary text-white px-8 py-3 rounded-xl font-bold text-lg hover:bg-red-600 shadow-lg shadow-red-500/20 transition-all hover:-translate-y-1"
        >
          Get Started
        </button>
        <button 
          onClick={onJoinPro} 
          className="bg-dark text-white px-8 py-3 rounded-xl font-bold text-lg hover:bg-gray-800 shadow-lg shadow-gray-500/20 transition-all hover:-translate-y-1"
        >
          Explore Pro Plans
        </button>
      </div>
    </div>
  );
};

export default Hero;
