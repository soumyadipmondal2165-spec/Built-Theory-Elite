import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "firebase/auth";

// UI Components
import Header from './components/Header';
import Hero from './components/Hero';
import ToolGrid from './components/ToolGrid';
import Workspace from './components/Workspace';
import Footer from './components/Footer';

// Legal & Info Components
import About from './components/About';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import SeoContent from './components/SeoContent';

// NEW: Placeholder Components for Content sections (Create these files later)
const TheoryLab = () => (
  <div className="pt-32 pb-20 px-6 md:px-20 min-h-screen bg-white">
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-black text-slate-900 mb-6">Theory Lab</h1>
      <p className="text-xl text-slate-600 leading-relaxed">
        Bridging the gap between engineering textbooks and site reality. 
        Explore deep-dives into structural analysis, materials, and modern construction tech.
      </p>
      {/* Blog list will go here */}
      <div className="mt-12 p-10 border-2 border-dashed border-slate-200 rounded-3xl text-center">
        <span className="text-slate-400 font-bold uppercase tracking-widest">New Articles Coming Weekly</span>
      </div>
    </div>
  </div>
);

const StudentCorner = () => (
  <div className="pt-32 pb-20 px-6 md:px-20 min-h-screen bg-slate-50">
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-black text-slate-900 mb-6">Student Corner</h1>
      <p className="text-xl text-slate-600 leading-relaxed">
        Dedicated resources for MAKAUT Civil Engineering students. Notes, semester guides, and career roadmaps for West Bengal engineers.
      </p>
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="font-bold text-blue-600">MAKAUT Resources</h3>
          <p className="text-sm text-slate-500 mt-2">Previous year papers and semester-wise theory notes.</p>
        </div>
      </div>
    </div>
  </div>
);

import { TOOLS } from './constants';
import { Tool, User } from './types';

// Firebase Config (Kept from your previous code)
const firebaseConfig = {
  apiKey: "AIzaSyAZvTrFE81bYQ2R7JxQZnV3x6tmh_j6yL0",
  authDomain: "built-theory-auth-439a4.firebaseapp.com",
  projectId: "built-theory-auth-439a4",
  storageBucket: "built-theory-auth-439a4.firebasestorage.app",
  messagingSenderId: "621216043890",
  appId: "1:621216043890:web:8446c3344595abc38e43eb",
  measurementId: "G-MRJEYBFVGZ"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Razorpay Config
const RZP_KEY = "rzp_live_SDvXBbpBeVUe5U";
declare var Razorpay: any;

// Helper to handle auto-scrolling to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [activeTool, setActiveTool] = useState<Tool | null>(null);
  const [showPricing, setShowPricing] = useState(false);
  const [proToolAttempt, setProToolAttempt] = useState<Tool | null>(null);

  // Authentication logic (Kept from your previous code)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser({
            uid: currentUser.uid,
            email: currentUser.email || '',
            photoURL: currentUser.photoURL || '',
            isPremium: localStorage.getItem('isPremium') === 'true'
        });
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try { await signInWithPopup(auth, provider); } 
    catch (error) { console.error("Login failed", error); }
  };

  const handleLogout = async () => {
    await signOut(auth);
    localStorage.removeItem('isPremium');
  };

  const handlePayment = (amount: number, planName: string) => {
      if (!user) { handleLogin(); return; }
      const options = {
          key: RZP_KEY,
          amount: amount * 100,
          currency: "INR",
          name: "Built-Theory PRO",
          description: `Subscription - ${planName}`,
          handler: function (response: any) {
              alert("Payment Successful! You are now a PRO member.");
              localStorage.setItem('isPremium', 'true');
              setUser(prev => prev ? ({ ...prev, isPremium: true }) : null);
              setShowPricing(false);
              setProToolAttempt(null);
          },
          prefill: { email: user.email },
          theme: { color: "#2563eb" } // Updated to professional Blue
      };
      const rzp1 = new Razorpay(options);
      rzp1.open();
  };

  const handleJoinPro = () => setShowPricing(true);

  const handleSelectTool = (tool: Tool) => {
    if (tool.isPro && !user?.isPremium) {
        setProToolAttempt(tool);
        return;
    }
    setActiveTool(tool);
  };

  const scrollToTools = () => {
    const toolsElement = document.getElementById('tools');
    if (toolsElement) {
        toolsElement.scrollIntoView({ behavior: 'smooth' });
    } else {
        window.location.href = "/#tools";
    }
  };

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col relative overflow-x-hidden">
        
        <Header 
          user={user} 
          onLogin={handleLogin} 
          onLogout={handleLogout} 
          onJoinPro={handleJoinPro} 
          scrollToTools={scrollToTools}
        />
        
        <main className="flex-grow">
          <Routes>
            {/* 1. PROFESSIONAL LANDING PAGE */}
            <Route path="/" element={
              <>
                <Hero onExplore={scrollToTools} onJoinPro={handleJoinPro} />
                <div id="tools" className="py-20 px-6 md:px-12 bg-white rounded-t-[3rem] shadow-2xl -mt-10 relative z-10">
                   <div className="max-w-7xl mx-auto">
                    <div className="mb-12 text-center md:text-left">
                      <h2 className="text-3xl font-black text-slate-900 tracking-tight">Engineering Tool Suite</h2>
                      <p className="text-slate-500 font-medium">Professional-grade document and calculation tools.</p>
                    </div>
                    <ToolGrid tools={TOOLS} onSelectTool={handleSelectTool} />
                   </div>
                </div>
                <SeoContent />
              </>
            } />

            {/* 2. CONTENT SECTIONS (CRITICAL FOR ADSENSE) */}
            <Route path="/theory-lab" element={<TheoryLab />} />
            <Route path="/theory-lab" element={<BlogList />} /> 
            <Route path="/theory-lab/:slug" element={<BlogPost />} />
            <Route path="/student-corner" element={<StudentCorner />} />
            <Route path="/about" element={<About />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            
            {/* 3. 404 / CATCH-ALL REDIRECT */}
            <Route path="*" element={<Hero onExplore={scrollToTools} onJoinPro={handleJoinPro} />} />
          </Routes>
        </main>

        <Footer />

        {/* --- WORKSPACE OVERLAY --- */}
        {activeTool && (
          <Workspace 
              tool={activeTool} 
              user={user}
              onClose={() => setActiveTool(null)} 
              onJoinPro={handleJoinPro}
          />
        )}

        {/* --- PROFESSIONAL PRICING MODAL --- */}
        {showPricing && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-y-auto">
            <div className="fixed inset-0 bg-slate-900/90 backdrop-blur-md" onClick={() => setShowPricing(false)}></div>
            <div className="bg-white rounded-[2.5rem] w-full max-w-4xl shadow-2xl relative z-[110] animate-in zoom-in duration-300">
                <button onClick={() => setShowPricing(false)} className="absolute top-6 right-6 w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-all">
                   <span className="text-2xl">&times;</span>
                </button>
                <div className="p-12">
                    <div className="text-center mb-10">
                        <span className="bg-blue-100 text-blue-700 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">Membership Plans</span>
                        <h2 className="text-4xl font-black text-slate-900 mt-4">Elevate Your Engineering</h2>
                        <p className="text-slate-500 mt-2">Unlimited processing and advanced structural tools.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Weekly Plan */}
                        <div className="p-8 border border-slate-100 rounded-3xl hover:border-blue-500 transition-all group cursor-pointer" onClick={() => handlePayment(59, "Weekly")}>
                            <h3 className="font-bold text-slate-400 text-xs tracking-widest uppercase mb-4">Weekly Access</h3>
                            <div className="text-4xl font-black text-slate-900 mb-6">₹59</div>
                            <button className="w-full py-3 bg-slate-100 group-hover:bg-blue-600 group-hover:text-white rounded-xl font-bold transition-all">Select</button>
                        </div>
                        {/* Monthly Plan - High Impact */}
                        <div className="p-8 border-4 border-blue-600 rounded-[2rem] shadow-2xl shadow-blue-100 relative bg-white transform md:scale-105 cursor-pointer" onClick={() => handlePayment(199, "Monthly")}>
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] font-black px-4 py-1.5 rounded-full shadow-lg">MOST POPULAR</div>
                            <h3 className="font-bold text-blue-600 text-xs tracking-widest uppercase mb-4">Monthly Pro</h3>
                            <div className="text-5xl font-black text-slate-900 mb-6">₹199</div>
                            <button className="w-full py-4 bg-blue-600 text-white rounded-xl font-black shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all">Get Pro Now</button>
                        </div>
                        {/* Yearly Plan */}
                        <div className="p-8 border border-slate-100 rounded-3xl hover:border-blue-500 transition-all group cursor-pointer" onClick={() => handlePayment(1999, "Yearly")}>
                            <h3 className="font-bold text-slate-400 text-xs tracking-widest uppercase mb-4">Full Year</h3>
                            <div className="text-4xl font-black text-slate-900 mb-6">₹1999</div>
                            <button className="w-full py-3 bg-slate-100 group-hover:bg-blue-600 group-hover:text-white rounded-xl font-bold transition-all">Select</button>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        )}

        {/* --- PRO LOCK MODAL --- */}
        {proToolAttempt && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm" onClick={() => setProToolAttempt(null)}></div>
            <div className="bg-white rounded-[2rem] max-w-md w-full p-10 relative z-[110] text-center shadow-2xl animate-in fade-in zoom-in duration-200">
                <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">
                    <span>🔒</span>
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-2 uppercase tracking-tight">{proToolAttempt.name}</h3>
                <p className="text-slate-500 mb-8 font-medium">This is a premium engineering module. Join Built-Theory PRO for unlimited access.</p>
                <div className="flex flex-col gap-4">
                    <button onClick={() => { setProToolAttempt(null); setShowPricing(true); }} className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all">
                        Unlock Now
                    </button>
                    <button onClick={() => setProToolAttempt(null)} className="w-full py-2 text-slate-400 font-bold hover:text-slate-600 transition-colors">
                        Maybe Later
                    </button>
                </div>
            </div>
          </div>
        )}
      </div>
    </Router>
  );
};

export default App;
