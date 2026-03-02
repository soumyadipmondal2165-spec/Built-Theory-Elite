import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Breadcrumbs from './Breadcrumbs';
import { BLOG_POSTS } from '../data/blogData'; // We will create this file next

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  
  // This finds the correct article based on the URL (e.g., /theory-lab/types-of-foundation)
  const post = BLOG_POSTS.find((p) => p.id === slug);

  // If the link is broken or the post doesn't exist
  if (!post) {
    return (
      <div className="pt-40 pb-20 text-center">
        <h2 className="text-2xl font-bold text-slate-900">Article Not Found</h2>
        <Link to="/theory-lab" className="text-blue-600 font-bold mt-4 inline-block underline">Return to Theory Lab</Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 px-6 md:px-12 bg-[#fcfcfd] min-h-screen font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-12">
        
        {/* --- MAIN CONTENT AREA (75% Width) --- */}
        <div className="lg:col-span-3">
          <div className="bg-white p-6 md:p-12 rounded-[2.5rem] shadow-sm border border-slate-100">
            
            {/* SEO Breadcrumbs */}
            <Breadcrumbs items={[{ label: 'Theory Lab', path: '/theory-lab' }, { label: post.title, path: '' }]} />
            
            <header className="mt-8 mb-10">
              <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter leading-tight mb-6">
                {post.title}
              </h1>
              
              <div className="flex items-center gap-4 py-6 border-y border-slate-50">
                <div className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center text-white text-[10px] font-black">BT</div>
                <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4">
                  <span className="text-[11px] font-black uppercase tracking-widest text-slate-900">By {post.author}</span>
                  <span className="hidden md:block w-1 h-1 bg-slate-300 rounded-full"></span>
                  <span className="text-[11px] font-black uppercase tracking-widest text-blue-600">{post.category}</span>
                  <span className="hidden md:block w-1 h-1 bg-slate-300 rounded-full"></span>
                  <span className="text-[11px] font-black uppercase tracking-widest text-slate-400">{post.date}</span>
                </div>
              </div>
            </header>

            {/* THE CONTENT: Uses dangerouslySetInnerHTML so you can just paste HTML text */}
            <div 
              className="prose prose-slate max-w-none 
                prose-h2:text-2xl prose-h2:font-black prose-h2:text-slate-900 prose-h2:mt-12
                prose-h3:text-xl prose-h3:font-bold prose-h3:text-slate-800
                prose-p:text-slate-600 prose-p:leading-relaxed prose-p:text-[16px]
                prose-ul:text-slate-600 prose-li:mb-2"
              dangerouslySetInnerHTML={{ __html: post.content }} 
            />

            {/* PREVIOUS / NEXT NAVIGATION */}
            <div className="mt-16 pt-8 border-t border-slate-100 flex justify-between items-center">
              <button className="flex flex-col items-start group">
                <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1 group-hover:text-blue-600 transition-colors">« Previous</span>
                <span className="text-sm font-bold text-slate-500">Water Intake Structures</span>
              </button>
              <button className="flex flex-col items-end group">
                <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1 group-hover:text-blue-600 transition-colors">Next »</span>
                <span className="text-sm font-bold text-slate-500">Spillway Design</span>
              </button>
            </div>
          </div>
        </div>

        {/* --- SIDEBAR AREA (25% Width) --- */}
        <aside className="lg:col-span-1 space-y-8">
          
          {/* SEARCH BAR (Global Standard) */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <h4 className="text-[10px] font-black uppercase tracking-[3px] text-slate-400 mb-4">Search Theory</h4>
            <div className="relative">
              <input type="text" placeholder="Search..." className="w-full bg-slate-50 border-none rounded-xl p-3 text-sm focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>

          {/* TOP RESOURCES (As seen in your Civil E Blog screenshot) */}
          <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
            <h4 className="text-[10px] font-black uppercase tracking-[3px] text-blue-600 mb-6 border-b border-slate-50 pb-4">Top Resources</h4>
            <ul className="space-y-4">
              {['Top Civil Engineering Schools', 'Standard Brick Size & Dimensions', 'Concrete Mix Ratio', 'Types of Foundation', 'Ready Mix Concrete'].map((item, i) => (
                <li key={i} className="text-[13px] font-bold text-slate-600 hover:text-blue-600 cursor-pointer transition-colors border-b border-slate-50 pb-2 last:border-none">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* ADSENSE PLACEHOLDER (Manual Reviewers look for this structure) */}
          <div className="bg-slate-100/50 border-2 border-dashed border-slate-200 rounded-3xl p-10 text-center">
            <span className="text-[10px] font-black text-slate-300 uppercase tracking-[4px]">Ad Space</span>
          </div>

          {/* SOCIAL CONNECT */}
          <div className="bg-blue-600 p-8 rounded-[2rem] text-white shadow-xl shadow-blue-100">
            <h4 className="font-black text-xs uppercase tracking-widest mb-4">Join Our Community</h4>
            <p className="text-xs leading-relaxed opacity-80 mb-6">Stay updated with the latest in civil engineering theory and digital tools.</p>
            <button className="w-full bg-white text-blue-600 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 transition-all">Follow on LinkedIn</button>
          </div>

        </aside>

      </div>
    </div>
  );
};

export default BlogPost;
