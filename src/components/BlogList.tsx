import React from 'react';
import { Link } from 'react-router-dom';
import { BLOG_POSTS } from '../data/blogData';

const BlogList: React.FC = () => {
  return (
    <div className="pt-32 pb-20 px-6 md:px-12 bg-[#fcfcfd] min-h-screen font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <header className="mb-16 text-center md:text-left">
          <span className="text-blue-600 font-black uppercase tracking-[4px] text-[10px] mb-4 block">
            Engineering Archive
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter">
            Theory Lab: <span className="text-slate-400 font-light">The Knowledge Base</span>
          </h1>
        </header>

        {/* Dynamic Article Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {BLOG_POSTS.map((post) => (
            <Link 
              to={`/theory-lab/${post.id}`} 
              key={post.id} 
              className="group bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden hover:shadow-2xl transition-all duration-500"
            >
              <div className="aspect-video bg-slate-100 relative overflow-hidden">
                {/* Image Placeholder - AdSense loves visual content */}
                <div className="absolute inset-0 flex items-center justify-center text-slate-300 text-[10px] font-black uppercase tracking-widest">
                  {post.category} Image
                </div>
              </div>
              <div className="p-8">
                <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-3 block">
                  {post.category}
                </span>
                <h3 className="text-xl font-black text-slate-900 leading-tight mb-4 group-hover:text-blue-600 transition-colors">
                  {post.title}
                </h3>
                <p className="text-slate-500 text-sm line-clamp-2 leading-relaxed mb-6 font-medium">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                   <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{post.date}</span>
                   <span className="text-blue-600 font-black text-[10px] uppercase tracking-widest group-hover:translate-x-1 transition-transform">Read More →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
};

export default BlogList;
