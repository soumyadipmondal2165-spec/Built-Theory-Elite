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

// Professional Content Components
import BlogList from './components/BlogList'; 
import BlogPost from './components/BlogPost';
import About from './components/About';
import Contact from './components/Contact';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import SeoContent from './components/SeoContent';
import AdBanner from './components/AdBanner';

// Types and Constants
import { TOOLS } from './constants';
import { Tool, User } from './types';

// 1. STUDENT CORNER COMPONENT
const StudentCorner = () => (
  <div className="pt-40 pb-20 px-6 md:px-20 min-h-screen bg-slate-50 text-center">
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-black text-slate-900 mb-6 uppercase tracking-tighter">Student Corner</h1>
      <p className="text-xl text-slate-600 leading-relaxed font-medium">
        Dedicated resources for Civil Engineering students coming soon.
      </p>
    </div>
  </div>
);

// 2. FIREBASE CONFIG
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

// 3. RAZORPAY CONFIG
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
          theme: { color: "#2563eb" }
      };
      const rzp1 = new Razorpay(options);
      rzp1.open();
  };

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
          onJoinPro={() => setShowPricing(true)} 
          scrollToTools={scrollToTools}
        />
        
        <main className="flex-grow">
          <Routes>
            {/* 1. HOME PAGE */}
            <Route path="/" element={
              <>
                <Hero onExplore={scrollToTools} onJoinPro={() => setShowPricing(true)} />
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

            {/* 2. DYNAMIC CONTENT PAGES */}
            <Route path="/theory-lab" element={<BlogList />} /> 
            <Route path="/theory-lab/:slug" element={<BlogPost />} />
            <Route path="/student-corner" element={<StudentCorner />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            
            {/* 3. 404 REDIRECT */}
            <Route path="*" element={<Hero onExplore={scrollToTools} onJoinPro={() => setShowPricing(true)} />} />
          </Routes>
        </main>

        <Footer />

        {/* --- PRICING MODAL --- */}
        {showPricing && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-y-auto">
            <div className="fixed inset-0 bg-slate-900/90 backdrop-blur-md" onClick={() => setShowPricing(false)}></div>
            <div className="bg-white rounded-[2.5rem] w-full max-w-4xl shadow-2xl relative z-[110] p-12 animate-in zoom-in duration-300">
                <button onClick={() => setShowPricing(false)} className="absolute top-6 right-6 text-2xl text-slate-400 hover:text-slate-600">&times;</button>
                <div className="text-center mb-10">
                    <h2 className="text-4xl font-black text-slate-900">Elevate Your Engineering</h2>
                    <p className="text-slate-500 mt-2">Unlimited processing and advanced structural tools.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-8 border border-slate-100 rounded-3xl cursor-pointer" onClick={() => handlePayment(59, "Weekly")}>
                        <h3 className="font-bold text-slate-400 text-xs mb-4">WEEKLY</h3>
                        <div className="text-4xl font-black text-slate-900 mb-6">₹59</div>
                        <button className="w-full py-3 bg-slate-100 rounded-xl font-bold">Select</button>
                    </div>
                    <div className="p-8 border-4 border-blue-600 rounded-[2rem] shadow-2xl relative bg-white transform md:scale-105" onClick={() => handlePayment(199, "Monthly")}>
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] font-black px-4 py-1 rounded-full">MOST POPULAR</div>
                        <h3 className="font-bold text-blue-600 text-xs mb-4">MONTHLY</h3>
                        <div className="text-5xl font-black text-slate-900 mb-6">₹199</div>
                        <button className="w-full py-4 bg-blue-600 text-white rounded-xl font-black">Get Pro Now</button>
                    </div>
                    <div className="p-8 border border-slate-100 rounded-3xl cursor-pointer" onClick={() => handlePayment(1999, "Yearly")}>
                        <h3 className="font-bold text-slate-400 text-xs mb-4">YEARLY</h3>
                        <div className="text-4xl font-black text-slate-900 mb-6">₹1999</div>
                        <button className="w-full py-3 bg-slate-100 rounded-xl font-bold">Select</button>
                    </div>
                </div>
            </div>
          </div>
        )}

        {/* --- PRO LOCK MODAL --- */}
        {proToolAttempt && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm" onClick={() => setProToolAttempt(null)}></div>
            <div className="bg-white rounded-[2rem] max-w-md w-full p-10 relative z-[110] text-center shadow-2xl">
                <div className="text-4xl mb-6">🔒</div>
                <h3 className="text-2xl font-black text-slate-900 mb-2">{proToolAttempt.name} is a PRO Tool</h3>
                <p className="text-slate-500 mb-8">Join Built-Theory PRO to unlock this tool and remove all limits.</p>
                <button onClick={() => { setProToolAttempt(null); setShowPricing(true); }} className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black shadow-lg">
                    Unlock Now
                </button>
            </div>
          </div>
        )}

        {activeTool && (
          <Workspace 
              tool={activeTool} 
              user={user}
              onClose={() => setActiveTool(null)} 
              onJoinPro={() => setShowPricing(true)}
          />
        )}
      </div>
    </Router>
  );
};

export default App;
