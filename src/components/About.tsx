import React from 'react';

const About: React.FC = () => {
  return (
    <div className="bg-white min-h-screen pt-24 pb-16 font-sans">
      <div className="max-w-4xl mx-auto px-6 text-gray-800">
        <h1 className="text-3xl font-black text-dark mb-6">About Built-Theory</h1>
        <div className="space-y-6 leading-relaxed">
          <p>
            Welcome to Built-Theory, a specialized platform designed to streamline workflows for the modern web. 
            The vision for this platform started taking shape during my time as a Civil Engineering student at MAKAUT, West Bengal. 
            I realized that engineers, students, and professionals needed faster, more secure tools to handle daily technical documents without relying on bloated software.
          </p>
          <p>
            Whether you are working on massive architectural PDFs or calculating load distributions, Built-Theory ensures your data is processed with 100% client-side encryption. We believe in high-performance tools that respect your privacy.
          </p>
          <p className="font-bold pt-4">
            Built by an engineer, for engineers.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
