import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // লিঙ্কগুলো সচল করতে এটি প্রয়োজন
import App from './App';
import './index.css'; // আপনার সাইটের লেআউট এবং কালার ঠিক রাখতে এটি নিশ্চিত করুন

const rootElement = document.getElementById('root');

if (!rootElement) {
  // ইঞ্জিনিয়ারিং এরর লজিক
  console.error("CRITICAL: Root element '#root' not found in index.html.");
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    {/* BrowserRouter যুক্ত করা হয়েছে যাতে আপনার এলিট ফুটারের লিঙ্কগুলো কাজ করে */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
