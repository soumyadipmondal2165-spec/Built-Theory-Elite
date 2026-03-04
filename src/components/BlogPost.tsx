import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Breadcrumbs from './Breadcrumbs';
import { BLOG_POSTS } from '../data/blogData';

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const postIndex = BLOG_POSTS.findIndex((p) => p.id === slug);
  const post = BLOG_POSTS[postIndex];

  if (!post) {
    return (
      <div className="pt-40 pb-20 text-center">
        <h2 className="text-2xl font-black text-slate-900 uppercase">Theory Not Found</h2>
        <Link to="/theory-lab" className="text-blue-600 font-bold mt-4 inline-block underline uppercase tracking-widest text-xs">Return to Lab</Link>
      </div>
    );
  }

  // Logic for Dynamic Previous/Next buttons
  const prevPost = postIndex > 0 ? BLOG_POSTS[postIndex - 1] : null;
  const nextPost = postIndex < BLOG_POSTS.length - 1 ? BLOG_POSTS[postIndex + 1] : null;

  return (
    <div className="pt-32 pb-20 px-6 md:px-12 bg-[#fcfcfd] min-h-screen font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-12">
        
        {/* --- MAIN CONTENT AREA (75% Width) --- */}
        <div className="lg:col-span-3">
          <div className="bg-white p-6 md:p-12 rounded-[2.5rem] shadow-sm border border-slate-100">
            
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

            {/* FEATURED DIAGRAM (Crucial for Engineering Blogs) */}
            {post.image && (
              <div className="mb-12 rounded-3xl overflow-hidden border border-slate-100 shadow-inner bg-slate-50">
                <img src={post.image} alt={post.title} className="w-full h-auto object-cover" />
                <p className="p-4 text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">Fig 1.1: Structural Diagram and Site Overview</p>
              </div>
            )}

            {/* Image of civil engineering foundation types diagram */}
            

          <div 
  className="prose prose-slate max-w-none 
    /* Scientific Line Spacing and Paragraph Gaps */
    prose-p:text-slate-700 prose-p:leading-[1.9] prose-p:mb-10 prose-p:text-justify
    
    /* Bold Headings with Colon Style */
    prose-h2:text-2xl prose-h2:font-black prose-h2:text-slate-900 prose-h2:mt-16 prose-h2:mb-6
    prose-h3:text-lg prose-h3:font-bold prose-h3:text-slate-800 prose-h3:mt-10 prose-h3:mb-4
    
    /* Technical Tables */
    prose-table:border-collapse prose-table:border prose-table:border-slate-200 prose-table:my-10
    prose-th:bg-slate-50 prose-th:p-3 prose-th:border prose-th:border-slate-200 prose-th:text-xs prose-th:uppercase
    prose-td:p-3 prose-td:border prose-td:border-slate-200 prose-td:text-sm
    
    /* Scientific Lists */
    prose-ul:my-10 prose-ul:list-square prose-ul:pl-8
    prose-li:mb-3"
  dangerouslySetInnerHTML={{ __html: post.content }} 
/>
            {/* DYNAMIC PREVIOUS / NEXT NAVIGATION */}
            <div className="mt-16 pt-8 border-t border-slate-100 flex justify-between items-center">
              {prevPost ? (
                <Link to={`/theory-lab/${prevPost.id}`} className="flex flex-col items-start group no-underline">
                  <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1 group-hover:text-blue-600 transition-colors">« Previous Article</span>
                  <span className="text-sm font-bold text-slate-500 group-hover:text-slate-800">{prevPost.title}</span>
                </Link>
              ) : <div />}

              {nextPost ? (
                <Link to={`/theory-lab/${nextPost.id}`} className="flex flex-col items-end group no-underline text-right">
                  <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1 group-hover:text-blue-600 transition-colors">Next Article »</span>
                  <span className="text-sm font-bold text-slate-500 group-hover:text-slate-800">{nextPost.title}</span>
                </Link>
              ) : <div />}
            </div>
          </div>
        </div>

        {/* --- SIDEBAR AREA --- */}
        <aside className="lg:col-span-1 space-y-8">
          
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <h4 className="text-[10px] font-black uppercase tracking-[3px] text-slate-400 mb-4">Search Theory</h4>
            <div className="relative">
              <input 
                type="text" 
                placeholder="Find a topic..." 
                className="w-full bg-slate-50 border-none rounded-xl p-3 text-sm focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
            <h4 className="text-[10px] font-black uppercase tracking-[3px] text-blue-600 mb-6 border-b border-slate-50 pb-4">Top Resources</h4>
            <ul className="space-y-4">
              {BLOG_POSTS.slice(0, 5).map((item) => (
                <li key={item.id} className="text-[13px] font-bold text-slate-600 hover:text-blue-600 cursor-pointer transition-colors border-b border-slate-50 pb-2 last:border-none">
                  <Link to={`/theory-lab/${item.id}`} className="no-underline text-inherit">{item.title}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-slate-900 p-8 rounded-[2rem] text-white shadow-xl shadow-blue-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-600/20 rounded-full -mr-12 -mt-12"></div>
            <h4 className="font-black text-xs uppercase tracking-widest mb-4">Engineering Hub</h4>
            <p className="text-[11px] leading-relaxed opacity-70 mb-6">Access professional PDF tools and calculation modules for your coursework.</p>
            <button onClick={() => navigate('/')} className="w-full bg-blue-600 text-white py-3 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-700 transition-all">Launch Tools</button>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default BlogPost;
