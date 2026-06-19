import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Home, Wrench, Zap, ShieldCheck, Cable, TrendingUp, Wind, Speaker, Lightbulb, Plug, Store, Building2, CircuitBoard } from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';
import ElectricHero from '../components/ElectricHero';

/* ── service data ─────────────────────────────────────────── */
const residential = [
  { icon: Home, title: 'New Home Builds', desc: 'Complete electrical rough-ins and finishing for custom homes. We work closely with builders and homeowners to ensure every circuit, switch, and fixture is planned and installed to code.' },
  { icon: Wrench, title: 'Renovations', desc: 'Upgrading a kitchen, adding a bathroom, or finishing a basement? We handle the electrical safely so your renovation runs smoothly from start to finish.' },
  { icon: ShieldCheck, title: 'Panel Upgrades', desc: 'Older panels can be a fire risk and may not support modern loads. We replace and upgrade your panel to meet current safety standards and power demands.' },
  { icon: TrendingUp, title: 'Service Upgrades', desc: 'If your home is still running on 100-amp service, it\u2019s time for an upgrade. We size and install service entrances that handle today\u2019s household needs.' },
  { icon: Zap, title: 'Generator Systems', desc: 'Transfer switches, generator panels, and full backup power solutions. Keep your home running through South Shore storms and outages.' },
  { icon: Wind, title: 'Heat Pump Wiring', desc: 'Dedicated circuits properly sized for heat pumps and mini-split systems, including disconnect installation and load calculations.' },
  { icon: Lightbulb, title: 'Lighting', desc: 'Recessed, track, landscape, and specialty lighting. We design and install lighting layouts that work for your space, inside and out.' },
  { icon: Plug, title: 'Plugs & Outlets', desc: 'Standard, GFCI, tamper-resistant, USB, and 240V outlets. New installations, replacements, and code-required upgrades.' },
  { icon: Cable, title: 'Underground Service', desc: 'Installation and repair of underground electrical lines between buildings, garages, workshops, and service entrances.' },
  { icon: Speaker, title: 'Appliance Circuits', desc: 'Dedicated circuits for ranges, dryers, hot tubs, EV chargers, and other heavy-draw appliances, wired and sized correctly.' },
];

const commercial = [
  { icon: Building2, title: 'Commercial Fit-Outs', desc: 'Full electrical builds for offices, shops, and restaurants. We handle permits, plans, and installation from rough-in to finishing.' },
  { icon: Store, title: 'Retail & Storefront', desc: 'Optimized lighting, signage power, and display circuits designed to make your retail space look its best and run efficiently.' },
  { icon: CircuitBoard, title: 'Maintenance & Service Calls', desc: 'Troubleshooting, repairs, and routine maintenance for commercial buildings. Reliable response when you need it.' },
];

/* ── circuit bus node (left-side dot + horizontal branch) ── */
function CircuitNode({ index, total }: { index: number; total: number }) {
  const isLast = index === total - 1;
  return (
    <div className="absolute left-0 top-0 bottom-0 w-14 md:w-20 flex flex-col items-center pointer-events-none">
      {/* Vertical segment above node */}
      {index > 0 && (
        <motion.div
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: index * 0.05 }}
          className="w-px flex-none bg-gradient-to-b from-brand-red/20 to-brand-red/40 origin-top"
          style={{ height: '50%' }}
        />
      )}
      {index === 0 && <div className="flex-1" />}

      {/* Node dot */}
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ type: 'spring', stiffness: 300, delay: 0.15 + index * 0.06 }}
        className="relative z-10 flex-none"
      >
        <div className="w-3.5 h-3.5 rounded-full bg-brand-red shadow-[0_0_12px_rgba(220,38,38,.45)] circuit-node-pulse" />
        {/* Horizontal branch */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.25 + index * 0.06 }}
          className="absolute left-full top-1/2 -translate-y-1/2 w-5 md:w-8 h-px bg-brand-red/50 origin-left"
        />
      </motion.div>

      {/* Vertical segment below node */}
      {!isLast && (
        <motion.div
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 + index * 0.05 }}
          className="w-px flex-1 bg-gradient-to-b from-brand-red/40 to-brand-red/20 origin-top"
        />
      )}
      {isLast && <div className="flex-1" />}
    </div>
  );
}

/* ── circuit divider between sections ─────────────────────── */
function CircuitDivider() {
  return (
    <div className="relative py-2 flex items-center justify-center overflow-hidden">
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: 'easeInOut' }}
        className="w-full max-w-md h-px origin-left"
        style={{ background: 'linear-gradient(90deg, transparent, #dc2626, transparent)' }}
      />
      {/* Center node */}
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8, type: 'spring', stiffness: 200 }}
        className="absolute left-1/2 -translate-x-1/2"
      >
        <div className="w-4 h-4 rounded-full bg-brand-red shadow-[0_0_20px_rgba(220,38,38,.5)]" />
        <div className="absolute inset-0 rounded-full bg-brand-red animate-ping opacity-20" />
      </motion.div>
    </div>
  );
}

/* ── parallax grid background ─────────────────────────────── */
function ParallaxGrid({ dark = true }: { dark?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const color = dark ? 'rgba(220,38,38,.03)' : 'rgba(220,38,38,.025)';

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div style={{ y }} className="absolute inset-[-60px_0]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id={`svc-grid-${dark?'d':'l'}`} width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M 80 0 L 0 0 0 80" fill="none" stroke={color} strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#svc-grid-${dark?'d':'l'})`} />
        </svg>
      </motion.div>
    </div>
  );
}

/* ── page ──────────────────────────────────────────────────── */
export default function ServicesPage() {
  return (
    <>
      {/* ═══ HERO BANNER ═══ */}
      <ElectricHero full={false}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-brand-red font-semibold tracking-[.2em] uppercase text-xs mb-3"
          >
            What We Do
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="font-display text-4xl md:text-6xl font-extrabold text-white"
          >
            Our Services
          </motion.h1>
        </div>
      </ElectricHero>

      {/* ═══ SERVICE INTRO ═══ */}
      <section className="py-20 bg-white border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xl md:text-2xl text-slate-600 leading-relaxed font-light">
              From a single outlet to a full commercial fit-out, every project gets the
              same standard of care. Licensed, insured, and built to last.
            </p>
            <div className="flex flex-wrap justify-center gap-8 md:gap-16 mt-12">
              {[
                { n: '10+', l: 'Residential Services' },
                { n: '3+', l: 'Commercial Services' },
                { n: '100%', l: 'Code Compliant' },
              ].map((stat, i) => (
                <motion.div
                  key={stat.l}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                >
                  <p className="font-display text-4xl md:text-5xl font-extrabold text-brand-red">{stat.n}</p>
                  <p className="text-sm text-slate-500 mt-1 tracking-wide">{stat.l}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <CircuitDivider />

      {/* ═══ RESIDENTIAL ═══ */}
      <section className="relative py-28 bg-brand-dark overflow-hidden">
        <ParallaxGrid dark />
        {/* Ambient glow */}
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full bg-brand-red/[.04] blur-[140px] pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <p className="flex items-center gap-3 text-brand-red font-semibold tracking-[.2em] uppercase text-xs mb-3">
              <span className="w-8 h-px bg-brand-red" />
              Residential
            </p>
            <h2 className="font-display text-3xl md:text-5xl font-extrabold text-white">For Your Home</h2>
            <p className="text-slate-400 mt-4 max-w-lg text-lg leading-relaxed font-light">
              Complete electrical services for new builds, renovations, upgrades, and everyday needs.
            </p>
          </motion.div>

          {/* Circuit-board service list */}
          <div className="relative">
            {residential.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.45, delay: i * 0.04 }}
                  className="relative pl-14 md:pl-24 group"
                >
                  {/* Circuit node + vertical bus */}
                  <CircuitNode index={i} total={residential.length} />

                  {/* Service content */}
                  <div className="py-7 border-b border-white/[.06] last:border-0 group-hover:border-brand-red/20 transition-colors duration-500">
                    <div className="flex items-start gap-4 md:gap-5">
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white/[.04] border border-white/[.06] flex items-center justify-center flex-shrink-0 group-hover:bg-brand-red/10 group-hover:border-brand-red/20 transition-all duration-500">
                        <Icon className="w-5 h-5 text-slate-400 group-hover:text-brand-red transition-colors duration-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-display font-bold text-lg md:text-xl text-white group-hover:text-brand-red transition-colors duration-300 mb-1.5">
                          {s.title}
                        </h3>
                        <p className="text-slate-400 leading-relaxed text-[15px] max-w-2xl group-hover:text-slate-300 transition-colors duration-500">
                          {s.desc}
                        </p>
                      </div>
                    </div>
                    {/* Hover glow bar */}
                    <div className="absolute left-14 md:left-24 right-0 bottom-0 h-px bg-gradient-to-r from-brand-red/0 via-brand-red/20 to-brand-red/0 scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <CircuitDivider />

      {/* ═══ COMMERCIAL ═══ */}
      <section className="relative py-28 bg-white overflow-hidden">
        <ParallaxGrid dark={false} />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <p className="flex items-center gap-3 text-brand-red font-semibold tracking-[.2em] uppercase text-xs mb-3">
              <span className="w-8 h-px bg-brand-red" />
              Commercial
            </p>
            <h2 className="font-display text-3xl md:text-5xl font-extrabold text-slate-900">For Your Business</h2>
            <p className="text-slate-500 mt-4 max-w-lg text-lg leading-relaxed font-light">
              Professional electrical work for offices, retail, restaurants, and commercial buildings.
            </p>
          </motion.div>

          {/* Commercial — larger format cards */}
          <div className="space-y-6">
            {commercial.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="group relative rounded-2xl border border-slate-100 hover:border-brand-red/20 p-8 md:p-10 transition-all duration-500 overflow-hidden hover:shadow-[0_20px_60px_-15px_rgba(220,38,38,.08)]"
                >
                  {/* Background glow on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-red/[.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                  {/* Top accent line */}
                  <div className="absolute top-0 left-8 right-8 h-px bg-brand-red scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                  <div className="relative flex flex-col md:flex-row md:items-center gap-6">
                    <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-red/10 group-hover:border-brand-red/20 transition-all duration-500">
                      <Icon className="w-6 h-6 text-slate-400 group-hover:text-brand-red transition-colors duration-500" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-display font-bold text-xl md:text-2xl text-slate-900 mb-2 group-hover:text-brand-red transition-colors duration-300">
                        {s.title}
                      </h3>
                      <p className="text-slate-500 leading-relaxed text-[15px] md:text-base max-w-2xl">
                        {s.desc}
                      </p>
                    </div>
                    <ArrowRight className="hidden md:block w-5 h-5 text-slate-300 group-hover:text-brand-red group-hover:translate-x-1 transition-all duration-300 flex-shrink-0" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="relative py-28 bg-brand-dark overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-brand-red/[.06] blur-[160px]" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl md:text-5xl font-extrabold text-white mb-5 leading-tight">
              Need Something Not Listed?
            </h2>
            <p className="text-lg md:text-xl text-slate-400 mb-10 leading-relaxed font-light">
              We take on a wide range of electrical work. Get in touch and tell us what you need.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="group inline-flex justify-center items-center gap-3 bg-brand-red hover:bg-brand-red-hover text-white px-10 py-4 rounded-xl font-bold text-lg transition-all shadow-[0_10px_40px_-8px_rgba(226,32,32,0.5)] hover:shadow-[0_14px_48px_-6px_rgba(226,32,32,0.65)]"
              >
                Get a Free Quote
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <a
                href="tel:9022770458"
                className="inline-flex justify-center items-center gap-3 bg-white/[.06] hover:bg-white/[.12] text-white border border-white/10 px-10 py-4 rounded-xl font-semibold text-lg transition-all"
              >
                Call (902) 277-0458
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
