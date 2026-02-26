import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

import { TOOLS } from './constants';
import { Tool, User } from './types';

// Firebase Config
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
    try {
        await signInWithPopup(auth, provider);
    } catch (error) {
        console.error("Login failed", error);
    }
  };

  const handleLogout = async () => {
      await signOut(auth);
      localStorage.removeItem('isPremium');
  };

  const handlePayment = (amount: number, planName: string) => {
      if (!user) {
          handleLogin();
          return;
      }
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
          theme: { color: "#e33b2f" }
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
      <div className="min-h-screen bg-[#fbfbfd] text-dark font-sans flex flex-col relative">
        <Header 
          user={user} 
          onLogin={handleLogin} 
          onLogout={handleLogout} 
          onJoinPro={handleJoinPro} 
          scrollToTools={scrollToTools}
        />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={
              <>
                <Hero onExplore={scrollToTools} onJoinPro={handleJoinPro} />
                <div id="tools">
                   <ToolGrid tools={TOOLS} onSelectTool={handleSelectTool} />
                </div>
              </>
            } />
            <Route path="/about" element={<About />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="*" element={<Hero onExplore={scrollToTools} onJoinPro={handleJoinPro} />} />
          </Routes>
        </main>

        <Footer />

        {activeTool && (
          <Workspace 
              tool={activeTool} 
              user={user}
              onClose={() => setActiveTool(null)} 
              onJoinPro={handleJoinPro}
          />
        )}

        {/* --- FIXED PRICING MODAL --- */}
        {showPricing && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-gray-900/80 backdrop-blur-sm" onClick={() => setShowPricing(false)}></div>
            <div className="bg-white rounded-3xl w-full max-w-4xl shadow-2xl overflow-hidden relative z-[110] animate-in fade-in zoom-in duration-200">
                <button onClick={() => setShowPricing(false)} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-colors">
                    <i className="fas fa-times"></i>
                </button>
                <div className="text-center p-8 bg-gray-50 border-b border-gray-100">
                    <h2 className="text-3xl font-bold text-dark mb-2">Upgrade to <span className="text-primary text-red-600">PRO</span></h2>
                    <p className="text-gray-500">Unlock 10GB limits and premium engineering tools.</p>
                </div>
                <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="border rounded-2xl p-6 text-center hover:shadow-lg transition-all cursor-pointer" onClick={() => handlePayment(59, "Weekly")}>
                        <h3 className="font-bold text-gray-500 text-sm mb-2">WEEKLY</h3>
                        <div className="text-3xl font-bold text-dark mb-4">₹59</div>
                        <button className="w-full bg-gray-900 text-white py-2 rounded-lg font-bold">Choose</button>
                    </div>
                    <div className="border-2 border-red-600 rounded-2xl p-6 text-center shadow-xl relative bg-white cursor-pointer" onClick={() => handlePayment(199, "Monthly")}>
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-red-600 text-white text-[10px] font-bold px-3 py-1 rounded-b-lg">POPULAR</div>
                        <h3 className="font-bold text-red-600 text-sm mb-2 mt-2">MONTHLY</h3>
                        <div className="text-4xl font-bold text-dark mb-4">₹199</div>
                        <button className="w-full bg-red-600 text-white py-3 rounded-lg font-bold">Choose</button>
                    </div>
                    <div className="border rounded-2xl p-6 text-center hover:shadow-lg transition-all cursor-pointer" onClick={() => handlePayment(1999, "Yearly")}>
                        <h3 className="font-bold text-gray-500 text-sm mb-2">YEARLY</h3>
                        <div className="text-3xl font-bold text-dark mb-4">₹1999</div>
                        <button className="w-full bg-gray-900 text-white py-2 rounded-lg font-bold">Choose</button>
                    </div>
                </div>
            </div>
          </div>
        )}

        {/* --- FIXED PRO LOCK MODAL --- */}
        {proToolAttempt && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setProToolAttempt(null)}></div>
            <div className="bg-white rounded-3xl max-w-md w-full p-8 relative z-[110] text-center shadow-2xl">
                <div className="w-20 h-20 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">
                    <i className="fas fa-lock"></i>
                </div>
                <h3 className="text-2xl font-bold text-dark mb-2">{proToolAttempt.name} is a PRO Tool</h3>
                <p className="text-gray-500 mb-8">Join Built-Theory PRO to unlock this tool and remove all processing limits.</p>
                <div className="flex flex-col gap-3">
                    <button onClick={() => { setProToolAttempt(null); setShowPricing(true); }} className="w-full bg-red-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-red-200 hover:bg-red-700 transition-colors">
                        View PRO Plans
                    </button>
                    <button onClick={() => setProToolAttempt(null)} className="w-full py-4 text-gray-400 font-bold hover:text-gray-600">
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
