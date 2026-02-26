import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="bg-white min-h-screen pt-24 pb-16 font-sans">
      <div className="max-w-4xl mx-auto px-6 text-gray-800">
        <h1 className="text-3xl font-black text-dark mb-6">Privacy Policy</h1>
        <p className="mb-8 text-gray-500">Last Updated: February 26, 2026</p>
        
        <div className="space-y-8 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-dark mb-3">1. Information We Collect</h2>
            <p>When you use Built-Theory, we may collect basic account information via Firebase Auth (such as your email and profile picture) if you choose to create a PRO account. We do not store or read the contents of the PDF files you process, as all processing is done locally on your device.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-dark mb-3">2. Third-Party Services</h2>
            <p>We use third-party services like Google AdSense to display advertisements and Razorpay for processing secure payments. These services may use cookies to collect data about your browsing habits to provide relevant ads and ensure secure transactions.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-dark mb-3">3. Data Security</h2>
            <p>We implement industry-standard security measures to protect your data. Your files remain on your device and are never uploaded to our servers for processing.</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
