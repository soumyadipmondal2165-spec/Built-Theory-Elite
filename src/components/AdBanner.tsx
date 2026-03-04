import React, { useEffect } from 'react';

const AdBanner = () => {
  useEffect(() => {
    // This creates the script element dynamically
    const script = document.createElement('script');
    script.src = "//pl28840645.effectivegatecpm.com/f181f8202f2db4d829e57a7b53e2226b/invoke.js";
    script.async = true;
    script.setAttribute('data-cfasync', 'false');
    
    // This appends it to the body so it can run
    document.body.appendChild(script);

    return () => {
      // Cleanup when the user leaves the page to keep the site fast
      try {
        document.body.removeChild(script);
      } catch (e) {
        console.error("Script cleanup failed", e);
      }
    };
  }, []);

  return (
    <div className="flex justify-center my-8">
      {/* This MUST match your Adsterra container ID */}
      <div id="container-f181f8202f2db4d829e57a7b53e2226b"></div>
    </div>
  );
};

export default AdBanner;
