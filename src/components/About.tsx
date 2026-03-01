import React from 'react';

const About = () => {
  return (
    <div className="pt-32 pb-20 px-6 md:px-12 bg-white min-h-screen font-sans">
      <div className="max-w-4xl mx-auto">
        
        {/* 1. HERO SECTION: PERSONAL AUTHORITY */}
        <section className="mb-16 text-center md:text-left">
          <span className="text-blue-600 font-black uppercase tracking-[4px] text-[10px] mb-4 block">
            The Mission Behind Built-Theory
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter leading-none mb-8">
            Bridging the Gap Between <span className="text-blue-600">Theory</span> and <span className="text-slate-400">Construction.</span>
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed font-medium">
            Built-Theory was founded by a Civil Engineering student at <strong>MAKAUT</strong> (Maulana Abul Kalam Azad University of Technology, West Bengal) to provide students with the high-precision tools and practical insights they need for modern engineering documentation.
          </p>
        </section>

        {/* 2. THE STORY: PROOF OF EXPERTISE (E-E-A-T) */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20 items-center">
          <div className="space-y-6">
            <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Our Academic Roots</h2>
            <p className="text-slate-600 leading-relaxed">
              As engineering students in Kolkata, we realized that while textbooks provide the formulas, the industry requires fast, digital, and accurate execution. From analyzing <strong>structural loads</strong> to researching <strong>Waffle Roof Technology</strong> at programs like IIT Kharagpur, our journey is rooted in the actual grit of civil engineering.
            </p>
            <p className="text-slate-600 leading-relaxed">
              Built-Theory isn't just a website; it’s a specialized workspace designed to handle the heavy technical documentation required in 2026's engineering landscape.
            </p>
          </div>
          <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-blue-50/50">
            <div className="space-y-4">
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">01</div>
                  <span className="font-black text-slate-800 uppercase text-xs tracking-widest">Student Centric</span>
               </div>
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center text-white font-bold">02</div>
                  <span className="font-black text-slate-800 uppercase text-xs tracking-widest">Industry Standard</span>
               </div>
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">03</div>
                  <span className="font-black text-slate-800 uppercase text-xs tracking-widest">AES-256 Secured</span>
               </div>
            </div>
          </div>
        </section>

        {/* 3. CORE PILLARS FOR GOOGLE ADSENSE CRAWLER */}
        <section className="mb-20">
          <h2 className="text-center text-sm font-black text-slate-400 uppercase tracking-[5px] mb-12">What We Solve</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 border border-slate-100 rounded-3xl hover:shadow-lg transition-all">
              <h3 className="font-black text-blue-600 mb-4 uppercase text-sm tracking-widest">Theory Lab</h3>
              <p className="text-sm text-slate-500 leading-relaxed">Deep structural analysis and simplified engineering concepts for West Bengal students.</p>
            </div>
            <div className="p-8 border border-slate-100 rounded-3xl hover:shadow-lg transition-all">
              <h3 className="font-black text-blue-600 mb-4 uppercase text-sm tracking-widest">Digital Tools</h3>
              <p className="text-sm text-slate-500 leading-relaxed">High-performance PDF and calculation suites optimized for engineering drawings.</p>
            </div>
            <div className="p-8 border border-slate-100 rounded-3xl hover:shadow-lg transition-all">
              <h3 className="font-black text-blue-600 mb-4 uppercase text-sm tracking-widest">Student Support</h3>
              <p className="text-sm text-slate-500 leading-relaxed">Curated resources specifically for MAKAUT semester mastery and career guidance.</p>
            </div>
          </div>
        </section>

        {/* 4. CALL TO ACTION */}
        <section className="bg-slate-900 rounded-[3rem] p-12 text-center text-white">
          <h2 className="text-3xl font-black mb-6">Building the Future Together</h2>
          <p className="text-slate-400 mb-8 max-w-xl mx-auto">
            Whether you are a student looking for notes or a professional needing fast document tools, Built-Theory is your technical partner.
          </p>
          <a href="/contact" className="inline-block bg-blue-600 text-white px-10 py-4 rounded-full font-black uppercase text-sm tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20">
            Contact the Founder
          </a>
        </section>

      </div>
    </div>
  );
};

export default About;
