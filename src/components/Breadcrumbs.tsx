import React from 'react';
import { Link } from 'react-router-dom';

interface BreadcrumbItem {
  label: string;
  path: string;
}

const Breadcrumbs: React.FC<{ items: BreadcrumbItem[] }> = ({ items }) => {
  return (
    <nav className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[2px] text-slate-400">
      <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <span className="opacity-30">/</span>
          {item.path ? (
            <Link to={item.path} className="hover:text-blue-600 transition-colors">{item.label}</Link>
          ) : (
            <span className="text-slate-900">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumbs;
