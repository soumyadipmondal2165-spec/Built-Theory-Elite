import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; 

// Engineering Error Logic: Ensuring the DOM is ready
const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error("CRITICAL: Root element '#root' not found in index.html.");
  throw new Error("Could not find root element to mount the Built-Theory engine.");
}

const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    {/* NOTE: We removed <BrowserRouter> from here. 
        It is now handled inside App.tsx to resolve the 'Double Router' conflict.
    */}
    <App />
  </React.StrictMode>
);
