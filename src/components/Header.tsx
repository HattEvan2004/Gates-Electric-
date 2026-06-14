import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [imageError, setImageError] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center">
            <a href="#" className="flex items-center">
              {!imageError ? (
                <img 
                  src="/logo.png" 
                  alt="Gates Electric Ltd. Logo" 
                  className="h-16 w-auto object-contain"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="flex flex-col items-center">
                  <span className="text-3xl font-bold font-serif tracking-widest text-black leading-none">GATES</span>
                  <div className="flex items-center gap-1">
                    <span className="text-2xl font-serif text-slate-700 leading-none">ELEC</span>
                    <span className="text-brand-red text-xl leading-none px-1">💡</span>
                    <span className="text-2xl font-serif text-slate-700 leading-none">TRIC</span>
                  </div>
                  <div className="bg-brand-red text-white text-[0.6rem] font-bold px-3 py-0.5 mt-1 tracking-widest w-full text-center uppercase">
                    Residential & Commercial
                  </div>
                </div>
              )}
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="#" className="text-slate-700 hover:text-brand-red font-medium transition-colors">Home</a>
            <a href="#services" className="text-slate-700 hover:text-brand-red font-medium transition-colors">Services</a>
            <a href="#about" className="text-slate-700 hover:text-brand-red font-medium transition-colors">About</a>
            <a href="#contact" className="text-slate-700 hover:text-brand-red font-medium transition-colors">Contact</a>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center">
            <a 
              href="#contact" 
              className="bg-brand-red hover:bg-brand-red-hover text-white px-6 py-2.5 rounded-md font-medium transition-colors shadow-sm"
            >
              Get a Free Quote
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              type="button"
              className="text-slate-700 hover:text-brand-red focus:outline-none"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-7 w-7" aria-hidden="true" />
              ) : (
                <Menu className="h-7 w-7" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-slate-50 absolute w-full shadow-lg">
          <div className="px-4 pt-2 pb-6 space-y-1 sm:px-3">
            <a 
              href="#" 
              className="block px-3 py-3 text-base font-medium text-slate-800 hover:text-brand-red hover:bg-slate-100 rounded-md"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </a>
            <a 
              href="#services" 
              className="block px-3 py-3 text-base font-medium text-slate-800 hover:text-brand-red hover:bg-slate-100 rounded-md"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Services
            </a>
            <a 
              href="#about" 
              className="block px-3 py-3 text-base font-medium text-slate-800 hover:text-brand-red hover:bg-slate-100 rounded-md"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </a>
            <a 
              href="#contact" 
              className="block px-3 py-3 text-base font-medium text-slate-800 hover:text-brand-red hover:bg-slate-100 rounded-md"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </a>
            <div className="mt-4 px-3">
              <a 
                href="#contact" 
                className="block w-full text-center bg-brand-red hover:bg-brand-red-hover text-white px-5 py-3 rounded-md font-medium shadow-sm"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Get a Free Quote
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
