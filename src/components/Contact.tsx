import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // This is where you'd integrate your email service (like EmailJS or a backend)
    console.log('Form Submitted:', formData);
    alert('Thank you! Your message has been sent to the Built-Theory team.');
  };

  return (
    <div className="pt-32 pb-20 px-6 md:px-12 bg-slate-50 min-h-screen font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <span className="text-blue-600 font-black uppercase tracking-[4px] text-[10px] mb-4 block">
            Get In Touch
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter">
            We're Here to Help <br className="hidden md:block" /> Engineering Students.
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* 1. CONTACT INFO CARDS (Trust Signals) */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 text-xl">
                <i className="fas fa-envelope"></i>
              </div>
              <h3 className="font-black text-slate-900 uppercase text-xs tracking-widest mb-2">Email Us</h3>
              <p className="text-slate-500 text-sm mb-4">For tool support or collaborations.</p>
              <a href="mailto:support@built-theory.com" className="text-blue-600 font-bold hover:underline">
                support@built-theory.com
              </a>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
              <div className="w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center mb-6 text-xl">
                <i className="fas fa-location-dot"></i>
              </div>
              <h3 className="font-black text-slate-900 uppercase text-xs tracking-widest mb-2">Location</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Park Street, Kolkata<br />
                West Bengal, India
              </p>
            </div>

            <div className="bg-blue-600 p-8 rounded-3xl text-white shadow-xl shadow-blue-200">
              <h3 className="font-black uppercase text-xs tracking-[2px] mb-4 opacity-80">Student Hub</h3>
              <p className="text-sm leading-relaxed font-medium">
                Are you a MAKAUT student with feedback on our tools? Reach out for a chance to contribute to the Theory Lab!
              </p>
            </div>
          </div>

          {/* 2. THE CONTACT FORM */}
          <div className="lg:col-span-2 bg-white p-8 md:p-12 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Full Name</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Engineering Student"
                    className="bg-slate-50 border-none rounded-2xl p-4 text-sm focus:ring-2 focus:ring-blue-500 transition-all"
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Email Address</label>
                  <input 
                    type="email" 
                    required
                    placeholder="student@makaut.com"
                    className="bg-slate-50 border-none rounded-2xl p-4 text-sm focus:ring-2 focus:ring-blue-500 transition-all"
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Subject</label>
                <input 
                  type="text" 
                  required
                  placeholder="Tool Suggestion / Theory Question"
                  className="bg-slate-50 border-none rounded-2xl p-4 text-sm focus:ring-2 focus:ring-blue-500 transition-all"
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Your Message</label>
                <textarea 
                  required
                  rows={5}
                  placeholder="How can we help you today?"
                  className="bg-slate-50 border-none rounded-2xl p-4 text-sm focus:ring-2 focus:ring-blue-500 transition-all resize-none"
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="w-full md:w-auto px-12 py-4 bg-slate-900 text-white rounded-2xl font-black uppercase text-xs tracking-[3px] hover:bg-blue-600 hover:shadow-xl hover:shadow-blue-200 transition-all active:scale-95"
              >
                Send Message
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;
