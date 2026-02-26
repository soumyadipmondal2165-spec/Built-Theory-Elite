import React from 'react';

const TermsOfService: React.FC = () => {
  return (
    <div className="bg-white min-h-screen pt-24 pb-16 font-sans">
      <div className="max-w-4xl mx-auto px-6 text-gray-800">
        <h1 className="text-3xl font-black text-dark mb-6">Terms of Service</h1>
        <p className="mb-8 text-gray-500">Last Updated: February 26, 2026</p>
        
        <div className="space-y-8 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-dark mb-3">1. Acceptance of Terms</h2>
            <p>By accessing and using Built-Theory, you accept and agree to be bound by the terms and provision of this agreement.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-dark mb-3">2. Use of Service</h2>
            <p>You agree to use our tools for lawful purposes only. Built-Theory is provided "as is" without any warranties regarding uptime or specific performance metrics.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-dark mb-3">3. PRO Subscriptions</h2>
            <p>PRO memberships are billed as described during the checkout process via Razorpay. Subscriptions grant access to advanced features and priority processing.</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
