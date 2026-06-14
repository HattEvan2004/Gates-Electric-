import React from 'react';
import { 
  Home, 
  Wrench, 
  Zap, 
  ShieldCheck, 
  Cable, 
  TrendingUp, 
  Wind, 
  Speaker, 
  Lightbulb, 
  Plug, 
  Store, 
  Building2 
} from 'lucide-react';

export default function Services() {
  const services = [
    { icon: Home, title: 'New Home Builds', desc: 'Complete electrical rough-ins and finishing for custom homes.' },
    { icon: Wrench, title: 'Renovations', desc: 'Safe electrical upgrades for kitchens, bathrooms, and additions.' },
    { icon: Zap, title: 'Generator Panels', desc: 'Backup power solutions to keep your home running during outages.' },
    { icon: ShieldCheck, title: 'Panel Upgrades', desc: 'Modernize your electrical panel for safety and increased capacity.' },
    { icon: Cable, title: 'Underground Service', desc: 'Installation and repair of underground electrical lines.' },
    { icon: TrendingUp, title: 'Service Upgrades', desc: 'Upgrade your electrical service to handle modern household loads.' },
    { icon: Wind, title: 'Heat Pump Power', desc: 'Dedicated circuits and wiring for heat pumps and mini-splits.' },
    { icon: Speaker, title: 'Appliance Wiring', desc: 'Correct sizing and proper wiring for heavy-duty appliances.' },
    { icon: Lightbulb, title: 'Lighting', desc: 'Indoor and outdoor lighting installations and retrofits.' },
    { icon: Plug, title: 'Plugs & Outlets', desc: 'Adding or replacing standard, GFCI, and USB outlets securely.' },
    { icon: Store, title: 'Retail Spaces', desc: 'Lighting and power configurations optimized for storefronts.' },
    { icon: Building2, title: 'Commercial Work', desc: 'Professional electrical servicing for commercial buildings.' },
  ];

  return (
    <section id="services" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center mb-16">
          <h2 className="text-brand-red font-semibold tracking-wide uppercase text-sm mb-2">Our Services</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Professional Electrical Solutions</h3>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            Comprehensive electrical contractor services for residential and commercial projects across Chester and the South Shore.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div 
                key={index} 
                className="group bg-white p-6 rounded-xl border border-slate-200 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:border-brand-red/30 transition-all duration-300 flex flex-col"
              >
                <div className="w-12 h-12 bg-slate-50 text-slate-700 group-hover:bg-brand-red group-hover:text-white rounded-lg flex items-center justify-center mb-5 transition-colors duration-300">
                  <Icon className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-slate-900 mb-2">{service.title}</h4>
                <p className="text-slate-600 text-sm leading-relaxed flex-grow">
                  {service.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
