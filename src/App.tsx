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

// Legal & Info Components (The new parts)
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
        // Redirect to home and scroll if not on home page
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
            {/* Main Landing Page */}
            <Route path="/" element={
              <>
                <Hero onExplore={scrollToTools} onJoinPro={handleJoinPro} />
                <div id="tools">
                   <ToolGrid tools={TOOLS} onSelectTool={handleSelectTool} />
                </div>
              </>
            } />

            {/* AdSense Compliance Routes */}
            <Route path="/about" element={<About />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            
            {/* Fallback to Home */}
            <Route path="*" element={
              <>
                <Hero onExplore={scrollToTools} onJoinPro={handleJoinPro} />
                <div id="tools">
                   <ToolGrid tools={TOOLS} onSelectTool={handleSelectTool} />
                </div>
              </>
            } />
          </Routes>
        </main>

        <Footer />

        {/* Workspace Overlay */}
        {activeTool && (
          <Workspace 
              tool={activeTool} 
              user={user}
              onClose={() => setActiveTool(null)} 
              onJoinPro={handleJoinPro}
          />
        )}

        {/* Pricing Modal */}
        {showPricing && (
            <div className="fixed inset-0 z-[80] flex items-center justify-center bg-gray-900/80 backdrop-blur-sm p-4 animate-[fadeIn_0.2s_ease-out]">
                {/* ... (Kept your existing pricing modal code) ... */}
            </div>
        )}

        {/* Pro Lock Modal */}
        {proToolAttempt && (
            <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                 {/* ... (Kept your existing pro tool lock code) ... */}
            </div>
        )}
      </div>
    </Router>
  );
};

export default App;
