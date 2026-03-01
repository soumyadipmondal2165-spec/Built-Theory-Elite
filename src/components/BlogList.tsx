import React from 'react';
import { Link } from 'react-router-dom';

const BlogList = () => {
  // Mock data - eventually move this to a constants file or CMS
  const articles = [
    {
      id: 1,
      title: "The Structural Engineering of Waffle Slabs",
      category: "Structural Design",
      excerpt: "Deep dive into the 2-way joist system and why it's the future of large-span construction...",
      date: "March 2026",
      readTime: "8 min read"
    },
    {
      id: 2,
      title: "Ground Improvement: Stone Column Practice",
      category: "Geotechnical",
      excerpt: "Step-by-step site guide for Vibro-replacement in soft West Bengal soil conditions...",
      date: "Feb 2026",
      readTime: "12 min read"
    }
  ];

  return (
    <div className="pt-32 pb-20 px-6 md:px-12 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        <header className="mb-16 border-b border-slate-100 pb-10">
          <span className="text-blue-600 font-black uppercase tracking-[4px] text-[10px] mb-4 block">Research & Insights</span>
          <h1 className="text-5xl font-black text-slate-900 tracking-tighter">Theory Lab</h1>
          <p className="text-slate-500 mt-4 max-w-2xl font-medium italic">"Bridging the gap between MAKAUT academic theory and on-site reality."</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {articles.map((post) => (
            <article key={post.id} className="group cursor-pointer">
              <div className="aspect-video bg-slate-100 rounded-[2rem] mb-6 overflow-hidden border border-slate-100 group-hover:shadow-2xl transition-all duration-500 relative">
                 <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-black uppercase text-blue-600 tracking-widest">
                    {post.category}
                 </div>
              </div>
              <h3 className="text-2xl font-black text-slate-900 leading-tight mb-3 group-hover:text-blue-600 transition-colors">
                <Link to={`/theory-lab/${post.id}`}>{post.title}</Link>
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-2">{post.excerpt}</p>
              <div className="flex items-center gap-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                <span>{post.date}</span>
                <span className="w-1 h-1 bg-slate-200 rounded-full"></span>
                <span>{post.readTime}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogList;
