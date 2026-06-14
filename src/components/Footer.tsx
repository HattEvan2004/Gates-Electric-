import React from 'react';
import { useSiteContent } from '../sanity/useSiteContent';

export default function Footer() {
  const site = useSiteContent();
  return (
    <footer className="bg-slate-900 border-t border-slate-800 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 text-slate-400">
          
          {/* Brand Col */}
          <div className="lg:col-span-5">
            <h2 className="text-2xl font-serif font-bold text-white tracking-widest mb-2">GATES ELECTRIC</h2>
            <p className="text-sm text-slate-500 mb-6">Residential & Commercial Services</p>
            <p className="text-slate-400 max-w-sm">
              Your dependable electrical contractor for upgrades, renovations, and new builds on the South Shore of Nova Scotia.
            </p>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3">
            <h3 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">Quick Links</h3>
            <ul className="space-y-4">
              <li><a href="#" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Services</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-4">
            <h3 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">Contact Information</h3>
            <ul className="space-y-4">
              <li>
                <a href="tel:9022770458" className="hover:text-white transition-colors block">
                  {site?.phone || '(902) 277-0458'}
                </a>
              </li>
              <li>
                <a href="mailto:kyledgates@hotmail.com" className="hover:text-white transition-colors block">
                  {site?.email || 'kyledgates@hotmail.com'}
                </a>
              </li>
              <li className="pt-2">
                {(site?.address || '436 Highway 14\nChester, NS B0J 1J0').split('\n').map((line, i) => <React.Fragment key={i}>{i > 0 && <br />}{line}</React.Fragment>)}
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-slate-800 mt-12 flex flex-col md:flex-row justify-between items-center text-sm">
          <p>&copy; {new Date().getFullYear()} Gates Electric Ltd. All rights reserved.</p>
          <p className="mt-4 md:mt-0 text-slate-500">{site?.serviceArea || 'Serving Chester & the South Shore'}</p>
        </div>
      </div>
    </footer>
  );
}
