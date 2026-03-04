import React, { useEffect } from 'react';

const AdBanner = () => {
  useEffect(() => {
    // This part triggers the Adsterra script once the component loads
    const script = document.createElement('script');
    script.src = "//pl28840645.effectivegatecpm.com/f181f8202f2db4d829e57a7b53e2226b/invoke.js";
    script.async = true;
    script.setAttribute('data-cfasync', 'false');
    document.body.appendChild(script);

    return () => {
      // Clean up the script when the user leaves the page
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="flex justify-center my-6">
      {/* This is your unique Adsterra container ID */}
      <div 
        id="container-f181f8202f2db4d829e57a7b53e2226b" 
        style={{ minHeight: '250px', width: '100%', backgroundColor: '#f0f0f0' }}
      ></div>
    </div>
  );
};

export default AdBanner;
