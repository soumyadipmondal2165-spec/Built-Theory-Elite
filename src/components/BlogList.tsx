import React from 'react';
import { Link } from 'react-router-dom';
import { BLOG_POSTS } from '../data/blogData';

const BlogList: React.FC = () => {
  return (
    <div className="pt-32 pb-20 px-6 md:px-12 bg-[#fcfcfd] min-h-screen font-sans">
      <div className="max-w-7xl mx-auto">
        <header className="mb-16">
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase">Theory Lab</h1>
          <p className="text-slate-500 mt-2 font-medium border-l-4 border-blue-600 pl-4 italic">
            "Bridging the gap between engineering textbooks and site reality."
          </p>
        </header>

        {/* Dynamic Grid: Each card opens a full article */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post) => (
            <Link to={`/theory-lab/${post.id}`} key={post.id} className="group bg-white rounded-3xl border border-slate-100 overflow-hidden hover:shadow-2xl transition-all duration-300">
              <div className="aspect-video bg-slate-100 flex items-center justify-center text-slate-300 font-black uppercase text-[10px] tracking-widest">
                {post.category} DIAGRAM
              </div>
              <div className="p-8">
                <span className="text-blue-600 text-[10px] font-black uppercase tracking-widest mb-3 block">{post.category}</span>
                <h3 className="text-xl font-black text-slate-900 group-hover:text-blue-600 transition-colors mb-4">{post.title}</h3>
                <p className="text-slate-500 text-sm line-clamp-2 leading-relaxed mb-6 font-medium">{post.excerpt}</p>
                <div className="flex justify-between items-center pt-4 border-t border-slate-50">
                  <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">{post.date}</span>
                  <span className="text-blue-600 text-[10px] font-black uppercase tracking-widest">Read Article →</span>
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
