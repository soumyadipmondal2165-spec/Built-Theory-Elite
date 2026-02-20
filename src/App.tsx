import React, { useState, useEffect } from 'react';
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "firebase/auth";
import Header from './components/Header';
import Hero from './components/Hero';
import ToolGrid from './components/ToolGrid';
import Workspace from './components/Workspace';
import { TOOLS } from './constants';
import { Tool, User } from './types';
import Footer from './components/Footer';

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
            isPremium: localStorage.getItem('isPremium') === 'true' // Persist premium status locally for demo
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
          amount: amount * 100, // Amount in paise
          currency: "INR",
          name: "Built-Theory PRO",
          description: `Subscription - ${planName}`,
          handler: function (response: any) {
              // Payment Success
              alert("Payment Successful! You are now a PRO member.");
              localStorage.setItem('isPremium', 'true');
              setUser(prev => prev ? ({ ...prev, isPremium: true }) : null);
              setShowPricing(false);
          },
          prefill: {
              email: user.email,
          },
          theme: {
              color: "#e33b2f"
          }
      };
      
      const rzp1 = new Razorpay(options);
      rzp1.open();
  };

  const handleJoinPro = () => {
      setShowPricing(true);
  };

  const handleSelectTool = (tool: Tool) => {
    if (tool.isPro && !user?.isPremium) {
        setProToolAttempt(tool);
        return;
    }
    setActiveTool(tool);
  };

  const scrollToTools = () => {
    document.getElementById('tools')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#fbfbfd] text-dark font-sans relative">
      <Header 
        user={user} 
        onLogin={handleLogin} 
        onLogout={handleLogout} 
        onJoinPro={handleJoinPro} 
        scrollToTools={scrollToTools}
      />
      
<main>
        <Hero onExplore={scrollToTools} onJoinPro={handleJoinPro} />
        <ToolGrid tools={TOOLS} onSelectTool={handleSelectTool} />
      </main>

      {activeTool && (
        <Workspace 
            tool={activeTool} 
            user={user}
            onClose={() => setActiveTool(null)} 
            onJoinPro={handleJoinPro}
        />
      )}

      {/* Pricing and Pro popups go here as per your previous code... */}
      {proToolAttempt && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-[fadeIn_0.2s_ease-out]">
            <div className="bg-white rounded-3xl w-full max-w-md p-8 shadow-2xl relative text-center border-4 border-white ring-4 ring-yellow-400/30">
                <button onClick={() => setProToolAttempt(null)} className="absolute top-4 right-4 text-gray-400 hover:text-dark w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
                    <i className="fas fa-times"></i>
                </button>
                <div className="w-20 h-20 bg-gradient-to-br from-yellow-100 to-orange-100 text-yellow-600 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl shadow-inner">
                    <i className="fas fa-lock"></i>
                </div>
                <h3 className="text-2xl font-extrabold text-dark mb-2">Unlock {proToolAttempt.title}</h3>
                <p className="text-gray-500 mb-8 leading-relaxed">
                    This is a professional engineering tool. Upgrade your plan to get unlimited access to <b>{proToolAttempt.title}</b> and 27+ other premium tools.
                </p>
                <div className="flex flex-col gap-3">
                    <button 
                        onClick={() => { setProToolAttempt(null); setShowPricing(true); }}
                        className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-orange-200 hover:shadow-xl hover:scale-[1.02] transition-all"
                    >
                        Unlock Now
                    </button>
                    <button 
                         onClick={() => setProToolAttempt(null)}
                         className="text-gray-400 font-semibold hover:text-dark py-2 text-sm"
                    >
                        Maybe Later
                    </button>
                </div>
            </div>
        </div>
      )}

      {/* Pricing Modal */}
      {showPricing && (
          <div className="fixed inset-0 z-[80] flex items-center justify-center bg-gray-900/80 backdrop-blur-sm p-4 animate-[fadeIn_0.2s_ease-out]">
              <div className="bg-white rounded-3xl w-full max-w-4xl shadow-2xl overflow-hidden relative">
                  <button onClick={() => setShowPricing(false)} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500">
                      <i className="fas fa-times"></i>
                  </button>
                  <div className="text-center p-8 bg-gray-50 border-b border-gray-100">
                      <h2 className="text-3xl font-bold text-dark mb-2">Upgrade to <span className="text-primary">PRO</span></h2>
                      <p className="text-gray-500">Unlock 10GB limits, premium tools, and unlimited access.</p>
                  </div>
                  <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                      {/* Weekly */}
                      <div className="border rounded-2xl p-6 text-center hover:shadow-lg transition-all hover:border-primary cursor-pointer group" onClick={() => handlePayment(59, "Weekly")}>
                          <h3 className="font-bold text-gray-500 uppercase text-sm mb-2">Weekly</h3>
                          <div className="text-3xl font-bold text-dark mb-4">₹59<span className="text-sm font-normal text-gray-400">/week</span></div>
                          <ul className="text-left text-sm text-gray-600 space-y-2 mb-6">
                              <li><i className="fas fa-check text-green-500 mr-2"></i> 10GB File Limit</li>
                              <li><i className="fas fa-check text-green-500 mr-2"></i> All Pro Tools</li>
                              <li><i className="fas fa-check text-green-500 mr-2"></i> Priority Processing</li>
                          </ul>
                          <button className="w-full bg-gray-900 text-white py-2 rounded-lg font-bold group-hover:bg-primary transition-colors">Choose Weekly</button>
                      </div>
                       {/* Monthly */}
                       <div className="border-2 border-primary rounded-2xl p-6 text-center shadow-xl relative transform scale-105 bg-white cursor-pointer" onClick={() => handlePayment(199, "Monthly")}>
                          <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-bold px-3 py-1 rounded-b-lg">MOST POPULAR</div>
                          <h3 className="font-bold text-primary uppercase text-sm mb-2 mt-2">Monthly</h3>
                          <div className="text-4xl font-bold text-dark mb-4">₹199<span className="text-sm font-normal text-gray-400">/mo</span></div>
                          <ul className="text-left text-sm text-gray-600 space-y-2 mb-6">
                              <li><i className="fas fa-check text-green-500 mr-2"></i> 10GB File Limit</li>
                              <li><i className="fas fa-check text-green-500 mr-2"></i> All Pro Tools</li>
                              <li><i className="fas fa-check text-green-500 mr-2"></i> Priority Processing</li>
                              <li><i className="fas fa-check text-green-500 mr-2"></i> Cancel Anytime</li>
                          </ul>
                          <button className="w-full bg-primary text-white py-3 rounded-lg font-bold shadow-lg hover:bg-red-600 transition-colors">Choose Monthly</button>
                      </div>
                       {/* Yearly */}
                       <div className="border rounded-2xl p-6 text-center hover:shadow-lg transition-all hover:border-primary cursor-pointer group" onClick={() => handlePayment(1999, "Yearly")}>
                          <h3 className="font-bold text-gray-500 uppercase text-sm mb-2">Yearly</h3>
                          <div className="text-3xl font-bold text-dark mb-4">₹1999<span className="text-sm font-normal text-gray-400">/year</span></div>
                          <ul className="text-left text-sm text-gray-600 space-y-2 mb-6">
                              <li><i className="fas fa-check text-green-500 mr-2"></i> 10GB File Limit</li>
                              <li><i className="fas fa-check text-green-500 mr-2"></i> All Pro Tools</li>
                              <li><i className="fas fa-check text-green-500 mr-2"></i> Best Value</li>
                          </ul>
                          <button className="w-full bg-gray-900 text-white py-2 rounded-lg font-bold group-hover:bg-primary transition-colors">Choose Yearly</button>
                      </div>
                  </div>
              </div>
          </div>
      )}

      {/* FIXED FOOTER SECTION */}
      <footer className="bg-white border-t border-gray-200 py-12 mt-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
            <p className="text-primary font-bold text-lg mb-2">Built-Theory PRO</p>
            <p className="text-gray-400 text-sm">&copy; {new Date().getFullYear()} All Engineering Tools Reserved.</p>
        </div>
      </footer> {/* <--- You were missing this closing tag! */}

      <Footer /> {/* This is your custom professional footer component */}
    </div>
  );
};

export default App;
