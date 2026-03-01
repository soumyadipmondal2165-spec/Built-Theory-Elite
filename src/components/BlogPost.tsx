import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Breadcrumbs from './Breadcrumbs';

const BlogPost = () => {
  return (
    <div className="pt-32 pb-20 px-6 md:px-12 bg-white min-h-screen">
      <article className="max-w-3xl mx-auto">
        <Breadcrumbs items={[{ label: 'Theory Lab', path: '/theory-lab' }, { label: 'Waffle Slabs', path: '' }]} />
        
        <header className="mt-8 mb-12">
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter leading-none mb-6">
            The Structural Engineering of Waffle Slab Systems.
          </h1>
          <div className="flex items-center gap-4 border-y border-slate-100 py-6 mt-10">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-black text-xs">BT</div>
            <div>
              <p className="text-sm font-black text-slate-900 uppercase tracking-wider">Built-Theory Research Team</p>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Academic & Site Analysis</p>
            </div>
          </div>
        </header>

        {/* This is where your 800-word content goes */}
        <div className="prose prose-slate max-w-none prose-h2:text-2xl prose-h2:font-black prose-p:text-slate-600 prose-p:leading-relaxed">
          <p className="text-xl text-slate-700 font-medium leading-relaxed italic border-l-4 border-blue-600 pl-6 mb-10">
            Waffle slabs represent a paradigm shift in material efficiency, allowing for large spans without the excessive dead weight of traditional solid slabs.
          </p>

          <h2>The Mathematical Theory</h2>
          <p>The core advantage lies in the two-way joist system. We calculate the moment capacity using standard MAKAUT structural formulas, where the reduction in volume ($V$) leads to a significant reduction in total load ($W$):</p>
          
          {/* Example of how you would display a formula */}
          <div className="bg-slate-50 p-8 rounded-3xl my-10 text-center font-mono text-blue-600 font-bold">
            M = (w * L^2) / 8
          </div>

          <p>Detailed site analysis shows that for spans exceeding 9 meters, the waffle system is 30% more cost-effective than flat slabs...</p>
          
          
        </div>
      </article>
    </div>
  );
};

export default BlogPost;
