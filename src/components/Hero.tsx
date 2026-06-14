import React from 'react';
import { ArrowRight, Phone } from 'lucide-react';
import { useSiteContent } from '../sanity/useSiteContent';

export default function Hero() {
  const site = useSiteContent();
  const headline = site?.heroHeadline || 'Reliable Residential & Commercial Electrical Services in Chester, Nova Scotia';
  return (
    <div className="relative bg-brand-dark overflow-hidden">
      {/* Background Graphic Pattern overlay */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-slate-600 via-brand-dark to-brand-dark"></div>
        {/* Subtle grid pattern for a structural, technical feel */}
        <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" strokeOpacity="0.3" />
                </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-pattern)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pt-20 pb-24 md:pt-32 md:pb-40 flex flex-col lg:flex-row lg:items-center lg:gap-12">
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left lg:w-1/2">
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-red/10 border border-brand-red/20 text-red-400 font-medium text-sm mb-6">
             <span className="w-2 h-2 rounded-full bg-brand-red animate-pulse"></span>
             {site?.heroBadge || 'Serving the South Shore'}
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-6 leading-tight">
            {headline.split(/(Electrical Services)/).map((part, i) => part === 'Electrical Services' ? <span key={i} className="text-brand-red text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600">{part}</span> : part)}
          </h1>
          
          <p className="mt-4 max-w-2xl text-lg sm:text-xl text-slate-300 mb-10 leading-relaxed font-light">
            {site?.heroSubtitle || 'Gates Electric Ltd. provides professional electrical services for homes, businesses, renovations, upgrades, new builds, and more across the South Shore and surrounding areas.'}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <a 
              href="#contact" 
              className="inline-flex justify-center items-center gap-2 bg-brand-red hover:bg-brand-red-hover text-white px-8 py-3.5 rounded-md font-semibold transition-all shadow-lg hover:shadow-brand-red/25"
            >
              Get a Free Quote
              <ArrowRight className="w-5 h-5" />
            </a>
            
            <a 
              href="tel:9022770458" 
              className="inline-flex justify-center items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-3.5 rounded-md font-semibold transition-all backdrop-blur-sm"
            >
              <Phone className="w-5 h-5" />
              Call (902) 277-0458
            </a>
          </div>

        </div>

        <div className="w-full mt-12 lg:mt-0 lg:w-1/2 flex justify-center">
          <img src="/hero.png" alt="Gates Electric electrical work" className="w-full max-w-md rounded-2xl border border-white/10 shadow-2xl object-cover" />
        </div>

        </div>
      </div>
    </div>
  );
}
