import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export default function WhyChoose() {
  const reasons = [
    "Professional electrical work you can trust",
    "Extensive residential and commercial experience",
    "Local service in Chester and surrounding areas",
    "Straightforward communication from start to finish",
    "Free, no-obligation quotes available"
  ];

  return (
    <section className="py-24 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* Left Column - Graphic/Pattern */}
          <div className="w-full lg:w-1/2">
            <div className="relative rounded-2xl bg-brand-dark overflow-hidden aspect-square sm:aspect-[4/3] lg:aspect-auto lg:h-[500px] shadow-2xl flex items-center justify-center">
              {/* Fallback graphic since we don't have a lifestyle photo */}
              <div className="absolute inset-0 opacity-30 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-500 via-brand-dark to-brand-dark"></div>
              
               <div className="relative z-10 flex flex-col items-center p-8 text-center border border-white/10 rounded-xl bg-white/5 backdrop-blur-sm">
                  <span className="text-6xl text-brand-red mb-4">💡</span>
                  <h3 className="text-2xl font-bold text-white mb-2 font-serif tracking-widest">GATES ELECTRIC</h3>
                  <p className="text-slate-300 max-w-xs">Dependable, high-quality contracting.</p>
               </div>
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="w-full lg:w-1/2">
            <h2 className="text-brand-red font-semibold tracking-wide uppercase text-sm mb-2">Why Choose Us</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Dedicated to Excellence in Every Project</h3>
            
            <p className="text-lg text-slate-600 mb-10 leading-relaxed">
              When you hire Gates Electric Ltd., you're partnering with a team focused on safety, quality code compliance, and customer satisfaction. We handle jobs of all sizes with the same level of professionalism.
            </p>

            <ul className="space-y-5">
              {reasons.map((reason, idx) => (
                <li key={idx} className="flex items-start">
                  <CheckCircle2 className="w-6 h-6 text-brand-red mr-4 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700 text-lg">{reason}</span>
                </li>
              ))}
            </ul>

          </div>

        </div>
      </div>
    </section>
  );
}
