import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-100 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold">
                <i className="fas fa-cube"></i>
              </div>
              <span className="text-xl font-bold text-dark tracking-tight">Built-Theory</span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed max-w-sm">
              Advanced engineering PDF suite powered by intelligent conversion engines. 
              Designed for precision, security, and professional workflows.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-dark mb-4 uppercase text-xs tracking-wider">Policy & Specs</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Cookie Policy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">API Specifications</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-dark mb-4 uppercase text-xs tracking-wider">Connect</h4>
            <div className="flex gap-4">
              <a href="#" className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white transition-all">
                <i className="fab fa-github"></i>
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white transition-all">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white transition-all">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-400">
            &copy; {new Date().getFullYear()} Built-Theory. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-gray-400">
            <span>Server Status: <span className="text-green-500 font-bold">Operational</span></span>
            <span>v2.4.0 (Pro Engine)</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
