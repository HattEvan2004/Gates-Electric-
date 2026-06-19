import {
  Home, Wrench, Zap, ShieldCheck, Cable, TrendingUp,
  Wind, Speaker, Lightbulb, Plug, Store, Building2,
} from 'lucide-react';
import { motion } from 'motion/react';

const services = [
  { icon: Home, title: 'New Home Builds', desc: 'Complete electrical rough-ins and finishing for custom homes.' },
  { icon: Wrench, title: 'Renovations', desc: 'Safe electrical upgrades for kitchens, bathrooms, and additions.' },
  { icon: Zap, title: 'Generator Panels', desc: 'Backup power solutions to keep your home running during outages.' },
  { icon: ShieldCheck, title: 'Panel Upgrades', desc: 'Modernize your electrical panel for safety and increased capacity.' },
  { icon: Cable, title: 'Underground Service', desc: 'Installation and repair of underground electrical lines.' },
  { icon: TrendingUp, title: 'Service Upgrades', desc: 'Upgrade your service to handle modern household loads.' },
  { icon: Wind, title: 'Heat Pump Power', desc: 'Dedicated circuits and wiring for heat pumps and mini-splits.' },
  { icon: Speaker, title: 'Appliance Wiring', desc: 'Correct sizing and proper wiring for heavy-duty appliances.' },
  { icon: Lightbulb, title: 'Lighting', desc: 'Indoor and outdoor lighting installations and retrofits.' },
  { icon: Plug, title: 'Plugs & Outlets', desc: 'Adding or replacing standard, GFCI, and USB outlets.' },
  { icon: Store, title: 'Retail Spaces', desc: 'Lighting and power configurations optimized for storefronts.' },
  { icon: Building2, title: 'Commercial Work', desc: 'Professional electrical servicing for commercial buildings.' },
];

export default function Services() {
  return (
    <section id="services" className="py-28 bg-white relative overflow-hidden">
      {/* Faint bg accent */}
      <div className="absolute top-0 right-0 -mr-40 -mt-40 w-[500px] h-[500px] rounded-full bg-red-50 blur-3xl opacity-60 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-brand-red font-semibold tracking-widest uppercase text-xs mb-3">
            What We Do
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-extrabold text-slate-900 mb-5">
            Professional Electrical Solutions
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto text-lg leading-relaxed">
            Comprehensive contractor services for residential and commercial
            projects across Chester and the South Shore.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
                className="group relative bg-white p-7 rounded-2xl border border-slate-100
                           hover:border-brand-red/30 transition-all duration-300
                           hover:shadow-[0_16px_48px_-12px_rgba(220,38,38,.12)]"
              >
                {/* Red top accent on hover */}
                <div className="absolute top-0 left-6 right-6 h-0.5 bg-brand-red rounded-b scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

                <div className="w-11 h-11 bg-slate-50 text-slate-600 group-hover:bg-brand-red group-hover:text-white rounded-xl flex items-center justify-center mb-5 transition-all duration-300">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2 font-display">
                  {s.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
