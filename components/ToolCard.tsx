import React from 'react';
import { Tool } from '../types';

interface ToolCardProps {
  tool: Tool;
  onClick: (tool: Tool) => void;
}

const ToolCard: React.FC<ToolCardProps> = ({ tool, onClick }) => {
  return (
    <div 
      onClick={() => onClick(tool)}
      className={`
        bg-white p-6 rounded-2xl shadow-sm border border-gray-100 cursor-pointer 
        transition-all duration-200 hover:-translate-y-1 hover:shadow-xl group relative overflow-hidden flex flex-col h-full
      `}
      role="button"
      tabIndex={0}
      aria-label={`Select tool: ${tool.title}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick(tool);
        }
      }}
    >
        {tool.isPro && (
            <div className="absolute top-0 right-0 bg-yellow-400 text-xs font-bold px-2 py-1 rounded-bl-lg text-black z-10 shadow-sm">
                PRO
            </div>
        )}
      <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-red-100 transition-colors shrink-0">
        <i className={`fas ${tool.icon} text-2xl text-primary`}></i>
      </div>
      <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-primary transition-colors">{tool.title}</h3>
      <p className="text-sm text-gray-500 leading-relaxed line-clamp-3 group-hover:line-clamp-none transition-all duration-300">
        {tool.description}
      </p>
    </div>
  );
};

export default ToolCard;
