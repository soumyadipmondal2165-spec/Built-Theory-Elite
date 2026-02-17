import React from 'react';
import { Tool } from '../types';
import ToolCard from './ToolCard';

interface ToolGridProps {
  tools: Tool[];
  onSelectTool: (tool: Tool) => void;
}

const ToolGrid: React.FC<ToolGridProps> = ({ tools, onSelectTool }) => {
  const categories = [
    { id: 'academic', title: 'Academic AI Tools', icon: 'fa-graduation-cap' },
    { id: 'organize', title: 'Organize & Optimize', icon: 'fa-layer-group' },
    { id: 'converter', title: 'Engineering Converters', icon: 'fa-exchange-alt' },
    { id: 'security', title: 'Security & Pro Features', icon: 'fa-shield-alt' },
  ];

  return (
    <div id="tools" className="max-w-7xl mx-auto px-6 py-12">
      {categories.map(cat => {
        const catTools = tools.filter(t => t.category === cat.id);
        if (catTools.length === 0) return null;

        return (
          <div key={cat.id} className="mb-16">
             <div className="flex items-center gap-3 mb-6">
                <i className={`fas ${cat.icon} text-primary text-xl`}></i>
                <h2 className="text-2xl font-bold text-dark">{cat.title}</h2>
             </div>
             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {catTools.map(tool => (
                    <ToolCard key={tool.id} tool={tool} onClick={onSelectTool} />
                ))}
             </div>
          </div>
        );
      })}
    </div>
  );
};

export default ToolGrid;
