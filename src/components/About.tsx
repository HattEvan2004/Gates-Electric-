import React from 'react';

export default function About() {
  return (
    <section id="about" className="py-24 bg-brand-dark relative overflow-hidden">
        {/* Subtle background element */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-slate-800 opacity-50 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-brand-red opacity-10 blur-3xl"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <h2 className="text-brand-red font-semibold tracking-wide uppercase text-sm mb-4">About Us</h2>
        <h3 className="text-3xl md:text-5xl font-bold text-white mb-8 leading-tight">Your Local Partner for Quality Electrical Work</h3>
        
        <div className="bg-white/5 border border-white/10 p-8 sm:p-12 rounded-2xl backdrop-blur-sm">
            <p className="text-xl md:text-2xl text-slate-300 leading-relaxed font-light text-left sm:text-center">
            <strong>Gates Electric Ltd.</strong> is a local electrical company serving Chester, Nova Scotia and surrounding South Shore communities. From new builds and renovations to panel upgrades, lighting, plugs, generators, and commercial work, the team provides dependable electrical services for both homeowners and businesses.
            </p>
        </div>
      </div>
    </section>
  );
}
