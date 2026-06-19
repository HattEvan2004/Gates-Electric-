import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import ElectricHero from '../components/ElectricHero';

const residential = [
  { title: 'New Home Builds', desc: 'Complete electrical rough-ins and finishing for custom homes. We work closely with builders and homeowners to ensure every circuit, switch, and fixture is planned and installed to code.' },
  { title: 'Renovations', desc: 'Upgrading a kitchen, adding a bathroom, or finishing a basement? We handle the electrical safely so your renovation runs smoothly from start to finish.' },
  { title: 'Panel Upgrades', desc: 'Older panels can be a fire risk and may not support modern loads. We replace and upgrade your panel to meet current safety standards and power demands.' },
  { title: 'Service Upgrades', desc: 'If your home is still running on 100-amp service, it\u2019s time for an upgrade. We size and install service entrances that handle today\u2019s household needs.' },
  { title: 'Generator Systems', desc: 'Transfer switches, generator panels, and full backup power solutions. Keep your home running through South Shore storms and outages.' },
  { title: 'Heat Pump Wiring', desc: 'Dedicated circuits properly sized for heat pumps and mini-split systems, including disconnect installation and load calculations.' },
  { title: 'Lighting', desc: 'Recessed, track, landscape, and specialty lighting. We design and install lighting layouts that work for your space, inside and out.' },
  { title: 'Plugs & Outlets', desc: 'Standard, GFCI, tamper-resistant, USB, and 240V outlets. New installations, replacements, and code-required upgrades.' },
  { title: 'Underground Service', desc: 'Installation and repair of underground electrical lines between buildings, garages, workshops, and service entrances.' },
  { title: 'Appliance Circuits', desc: 'Dedicated circuits for ranges, dryers, hot tubs, EV chargers, and other heavy-draw appliances, wired and sized correctly.' },
];

const commercial = [
  { title: 'Commercial Fit-Outs', desc: 'Full electrical builds for offices, shops, and restaurants. We handle permits, plans, and installation from rough-in to finishing.' },
  { title: 'Retail & Storefront', desc: 'Optimized lighting, signage power, and display circuits designed to make your retail space look its best and run efficiently.' },
  { title: 'Maintenance & Service Calls', desc: 'Troubleshooting, repairs, and routine maintenance for commercial buildings. Reliable response when you need it.' },
];

export default function ServicesPage() {
  return (
    <>
      {/* Banner */}
      <ElectricHero full={false}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 text-center">
          <p className="text-brand-red font-semibold tracking-[.15em] uppercase text-xs mb-3">What We Do</p>
          <h1 className="font-display text-4xl md:text-6xl font-extrabold text-white">Our Services</h1>
        </div>
      </ElectricHero>

      {/* ═══ RESIDENTIAL ═══ */}
      <section className="py-28 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16">
            <p className="text-brand-red font-semibold tracking-[.15em] uppercase text-xs mb-2">Residential</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold text-slate-900">For Your Home</h2>
          </motion.div>

          <div className="space-y-0">
            {residential.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: .4, delay: i * .04 }}
                className="service-row pl-6 py-8 border-b border-slate-100 last:border-0 hover:bg-slate-50/60 transition-colors -mx-6 px-6 rounded-lg"
              >
                <h3 className="font-display font-bold text-xl text-slate-900 mb-2">{s.title}</h3>
                <p className="text-slate-500 leading-relaxed max-w-2xl">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ COMMERCIAL ═══ */}
      <section className="py-28 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16">
            <p className="text-brand-red font-semibold tracking-[.15em] uppercase text-xs mb-2">Commercial</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold text-slate-900">For Your Business</h2>
          </motion.div>

          <div className="space-y-0">
            {commercial.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: .4, delay: i * .04 }}
                className="service-row pl-6 py-8 border-b border-slate-200/80 last:border-0 hover:bg-white/60 transition-colors -mx-6 px-6 rounded-lg"
              >
                <h3 className="font-display font-bold text-xl text-slate-900 mb-2">{s.title}</h3>
                <p className="text-slate-500 leading-relaxed max-w-2xl">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-brand-dark">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-extrabold text-white mb-5">
            Need something not listed?
          </h2>
          <p className="text-lg text-slate-400 mb-10">
            We take on a wide range of electrical work. Get in touch and tell us what you need.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-brand-red hover:bg-brand-red-hover text-white px-10 py-4 rounded-lg font-bold text-lg transition-all shadow-2xl shadow-red-600/25"
          >
            Get a Free Quote <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </>
  );
}
