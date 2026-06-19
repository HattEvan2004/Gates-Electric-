import { Link } from 'react-router-dom';
import {
  ArrowRight, Shield, MessageSquare, Wrench, MapPin, BadgeCheck,
  Home, Building2, Lightbulb, BatteryCharging, PencilRuler, Zap, Clock, Phone,
} from 'lucide-react';
import { motion } from 'motion/react';

/* ═══════════════════════════════════════════════════════════
   ABOUT — Gates Electric
   Editorial, layered, dark-luxury. Black / white / red / cool grey.
   ═══════════════════════════════════════════════════════════ */

const values = [
  { icon: Shield, title: 'Safety First', desc: 'Every circuit installed to current code, with load calculations and inspections handled properly. No shortcuts, ever.' },
  { icon: MessageSquare, title: 'Clear Communication', desc: 'You know the scope, the schedule, and the cost before we start — and updates the whole way through.' },
  { icon: Wrench, title: 'Quality Workmanship', desc: 'Clean, labelled, durable wiring that passes inspection the first time and holds up for decades.' },
  { icon: BadgeCheck, title: 'Local Accountability', desc: 'We live and work on the South Shore. Our name is on every job, and our reputation is built one at a time.' },
];

const trust = [
  { icon: Building2, label: 'Residential & Commercial' },
  { icon: MapPin, label: 'Chester, Nova Scotia' },
  { icon: BadgeCheck, label: 'Free Estimates' },
  { icon: Shield, label: 'Code-Compliant Work' },
  { icon: Clock, label: 'Reliable Service' },
];

const work = [
  { icon: Home, title: 'New Home Builds', desc: 'Full rough-ins to final inspection.' },
  { icon: PencilRuler, title: 'Renovations', desc: 'Kitchens, baths, basements, additions.' },
  { icon: Zap, title: 'Panel Upgrades', desc: 'Modern panels and added capacity.' },
  { icon: BatteryCharging, title: 'Generator Systems', desc: 'Backup power for storm season.' },
  { icon: Lightbulb, title: 'Lighting', desc: 'Interior, exterior, and landscape.' },
  { icon: Building2, title: 'Commercial Electrical', desc: 'Fit-outs, service, and maintenance.' },
];

const areas = ['Chester', 'Mahone Bay', 'Bridgewater', 'Lunenburg', 'Hubbards', 'Surrounding communities'];

export default function AboutPage() {
  return (
    <>
      <style>{`
        @keyframes ab-flow { to { stroke-dashoffset: -300; } }
        .ab-flow { stroke-dasharray: 5 16; animation: ab-flow 7s linear infinite; }
      `}</style>

      {/* ═══ 1 · CINEMATIC HERO ═══ */}
      <section className="relative overflow-hidden bg-[#08080b] min-h-[82vh] flex items-center pt-32 pb-24">
        {/* blueprint grid */}
        <svg className="absolute inset-0 w-full h-full opacity-[.5] pointer-events-none" aria-hidden="true">
          <defs>
            <pattern id="ab-grid" width="46" height="46" patternUnits="userSpaceOnUse">
              <path d="M46 0L0 0 0 46" fill="none" stroke="rgba(170,196,222,.06)" strokeWidth=".6" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#ab-grid)" />
        </svg>
        {/* atmospheric blended image */}
        <div className="absolute inset-y-0 right-0 w-1/2 hidden lg:block">
          <img src="/gallery-2.jpg" alt="" className="w-full h-full object-cover opacity-[.22]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#08080b] via-[#08080b]/70 to-[#08080b]/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#08080b] via-transparent to-[#08080b]" />
        </div>
        {/* red circuit glows */}
        <div className="absolute -top-20 left-[20%] w-[520px] h-[520px] rounded-full bg-brand-red/[.10] blur-[150px] pointer-events-none" />
        <div className="absolute bottom-0 right-[10%] w-[460px] h-[460px] rounded-full bg-brand-red/[.07] blur-[150px] pointer-events-none" />
        {/* flowing circuit lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true">
          <g stroke="rgba(220,38,38,.25)" strokeWidth="1" fill="none">
            <path className="ab-flow" d="M0,120 L320,120 L360,160 L900,160" style={{ animationDuration: '9s' }} />
            <path className="ab-flow" d="M-20,80% L400,80% L440,72% L1200,72%" style={{ animationDuration: '12s' }} />
          </g>
        </svg>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-red/40 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 w-full">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="flex items-center gap-3 text-brand-red font-semibold tracking-[.24em] uppercase text-[11px] mb-6">
            <span className="w-8 h-px bg-brand-red" /> About Gates Electric
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display font-extrabold text-white max-w-4xl leading-[1.05] tracking-tight text-[clamp(2.3rem,5.5vw,4.5rem)]">
            Electrical Work Built on Trust, Precision, and <span className="text-brand-red">Local Reputation</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-7 text-lg md:text-xl text-slate-400 font-light leading-relaxed max-w-2xl">
            Serving Chester and the South Shore with dependable residential and commercial electrical services —
            delivered with safety, professionalism, and quality workmanship.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-10 flex flex-wrap gap-3">
            {['Residential & Commercial', 'Serving South Shore Nova Scotia', 'Free Quotes'].map((c) => (
              <span key={c} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/12 bg-white/[.04] text-slate-200 text-sm font-medium backdrop-blur-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-red" /> {c}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ 2 · BRAND STORY ═══ */}
      <section className="bg-white py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* copy */}
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="text-brand-red font-semibold tracking-[.2em] uppercase text-xs mb-4">Our Story</p>
            <h2 className="font-display text-3xl md:text-[2.75rem] font-extrabold text-slate-900 leading-[1.1] mb-7">
              Local Electricians Serving Chester and the South Shore
            </h2>
            <div className="space-y-5 text-lg text-slate-600 leading-relaxed">
              <p>
                Gates Electric Ltd. is a Chester-based electrical contractor trusted by homeowners and
                businesses across the South Shore. From new builds and renovations to panel upgrades,
                generators, lighting, and commercial work, we handle the electrical side so your project
                moves forward with confidence.
              </p>
              <p>
                We do the job right the first time — clean wiring, correct load calculations, code-compliant
                installations, and honest communication from the first call to the final walkthrough. It is
                straightforward, dependable work, and it is why our customers call us back and recommend us to
                their neighbours.
              </p>
            </div>
            <Link to="/contact" className="group inline-flex items-center gap-2.5 mt-9 text-brand-red font-bold">
              Talk to Gates Electric
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>

          {/* layered images */}
          <motion.div initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
            className="relative pl-6 pb-6 md:pl-10 md:pb-10">
            <div className="absolute -top-5 -right-3 w-24 h-24 rounded-2xl border-2 border-brand-red/30 hidden md:block" />
            <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]">
              <img src="/gallery-2.jpg" alt="Gates Electric on the job" className="w-full h-full object-cover" />
              <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-3xl" />
            </div>
            <div className="absolute -bottom-2 -left-2 md:bottom-4 md:-left-2 w-40 md:w-56 rounded-2xl overflow-hidden shadow-2xl ring-4 ring-white aspect-[4/3]">
              <img src="/gallery-3.jpg" alt="Gates Electric team" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -top-4 left-2 md:top-6 md:-left-4 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white shadow-xl border border-slate-100">
              <Shield className="w-4 h-4 text-brand-red" />
              <span className="text-sm font-bold text-slate-800">Safety-First Work</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ 3 · TRUST STRIP ═══ */}
      <section className="bg-slate-50 border-y border-slate-100 py-10">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5">
            {trust.map((t, i) => {
              const Icon = t.icon;
              return (
                <motion.div key={t.label} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="flex items-center gap-3 rounded-2xl bg-white border border-slate-100 shadow-sm px-4 py-4">
                  <span className="w-9 h-9 rounded-xl bg-brand-red/10 flex items-center justify-center flex-none">
                    <Icon className="w-[18px] h-[18px] text-brand-red" />
                  </span>
                  <span className="font-display font-bold text-[13.5px] text-slate-800 leading-tight">{t.label}</span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ 4 · VALUES ═══ */}
      <section className="relative bg-brand-dark py-24 md:py-32 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-32 bg-brand-red/[.06] blur-[90px] pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-red/40 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-2xl mb-16">
            <p className="text-brand-red font-semibold tracking-[.2em] uppercase text-xs mb-3">How We Work</p>
            <h2 className="font-display text-3xl md:text-5xl font-extrabold text-white leading-tight">The Standard Behind Every Job</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <motion.div key={v.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.08 }}
                  className="group relative rounded-2xl border border-white/[.08] bg-gradient-to-b from-white/[.05] to-white/[.01] p-7 md:p-8 transition-all duration-300 hover:border-brand-red/40 hover:-translate-y-1 hover:shadow-[0_24px_60px_-24px_rgba(220,38,38,.4)]">
                  <span className="inline-flex w-12 h-12 rounded-xl bg-brand-red/12 ring-1 ring-brand-red/20 items-center justify-center mb-5 transition-colors group-hover:bg-brand-red/20">
                    <Icon className="w-5 h-5 text-brand-red" />
                  </span>
                  <h3 className="font-display font-bold text-xl text-white mb-2.5">{v.title}</h3>
                  <p className="text-slate-400 leading-relaxed">{v.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ 5 · SERVICE AREA ═══ */}
      <section className="bg-white py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="text-brand-red font-semibold tracking-[.2em] uppercase text-xs mb-4">Service Area</p>
            <h2 className="font-display text-3xl md:text-[2.6rem] font-extrabold text-slate-900 leading-[1.12] mb-6">
              Proudly Serving Chester and the South Shore
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed mb-8 max-w-lg">
              From Chester to Lunenburg and the communities in between, Gates Electric works with homeowners and
              businesses across the region — bringing the same standard of safe, dependable workmanship to every job.
            </p>
            <div className="flex flex-wrap gap-2.5">
              {areas.map((a) => (
                <span key={a} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 border border-slate-200 text-slate-700 text-sm font-semibold hover:border-brand-red/40 hover:text-brand-red transition-colors">
                  <MapPin className="w-3.5 h-3.5 text-brand-red" /> {a}
                </span>
              ))}
            </div>
          </motion.div>

          {/* abstract region graphic */}
          <motion.div initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden bg-[#0b0c11] border border-white/[.06] aspect-[5/4] shadow-2xl">
            <svg viewBox="0 0 500 400" className="absolute inset-0 w-full h-full">
              <defs>
                <pattern id="sa-grid" width="34" height="34" patternUnits="userSpaceOnUse">
                  <path d="M34 0L0 0 0 34" fill="none" stroke="rgba(170,196,222,.07)" strokeWidth=".6" />
                </pattern>
                <radialGradient id="sa-glow" cx="50%" cy="55%" r="55%">
                  <stop offset="0%" stopColor="rgba(220,38,38,.18)" /><stop offset="100%" stopColor="rgba(220,38,38,0)" />
                </radialGradient>
              </defs>
              <rect width="500" height="400" fill="url(#sa-grid)" />
              <ellipse cx="250" cy="210" rx="190" ry="140" fill="url(#sa-glow)" />
              {/* connecting routes */}
              <path d="M120,150 L230,120 L330,180 L390,140 M230,120 L210,250 L330,290 M210,250 L120,260"
                fill="none" stroke="rgba(220,38,38,.45)" strokeWidth="1.5" strokeLinecap="round"
                className="ab-flow" style={{ strokeDasharray: '4 10' }} />
              {/* town nodes */}
              {[[120, 150, 'Hubbards'], [230, 120, 'Chester'], [330, 180, 'Mahone Bay'], [390, 140, 'Lunenburg'], [210, 250, 'Bridgewater'], [330, 290, 'South Shore'], [120, 260, '']].map(([x, y, name], i) => (
                <g key={i}>
                  <circle cx={x as number} cy={y as number} r={name === 'Chester' ? 7 : 4.5} fill="#ff4d4d"
                    style={{ filter: 'drop-shadow(0 0 6px rgba(255,80,80,.9))' }} />
                  {name === 'Chester' && <circle cx={x as number} cy={y as number} r="13" fill="none" stroke="rgba(255,80,80,.4)" strokeWidth="1.5" />}
                  {name && <text x={x as number} y={(y as number) - 12} textAnchor="middle" fill="rgba(226,238,255,.7)" fontSize="11" fontFamily="Inter" fontWeight="600">{name as string}</text>}
                </g>
              ))}
            </svg>
          </motion.div>
        </div>
      </section>

      {/* ═══ 6 · WHAT WE WORK ON ═══ */}
      <section className="relative bg-brand-dark py-24 md:py-32 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-red/40 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <p className="text-brand-red font-semibold tracking-[.2em] uppercase text-xs mb-3">What We Work On</p>
            <h2 className="font-display text-3xl md:text-5xl font-extrabold text-white">From One Outlet to the Whole Build</h2>
          </motion.div>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {work.map((w, i) => {
              const Icon = w.icon;
              return (
                <motion.div key={w.title} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  className="group rounded-2xl border border-white/[.07] bg-white/[.03] p-6 md:p-7 transition-all duration-300 hover:border-brand-red/40 hover:bg-white/[.05] hover:-translate-y-1">
                  <Icon className="w-7 h-7 text-brand-red mb-4 transition-transform group-hover:scale-110" />
                  <h3 className="font-display font-bold text-lg text-white mb-1.5">{w.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{w.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ 7 · FINAL CTA ═══ */}
      <section className="relative overflow-hidden">
        <img src="/gallery-1.jpg" alt="Gates Electric on site" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[#08080b]/85" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#08080b] via-[#08080b]/60 to-[#08080b]/80" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[560px] h-[560px] rounded-full bg-brand-red/[.12] blur-[160px] pointer-events-none" />
        <div className="relative z-10 max-w-3xl mx-auto px-5 text-center py-28 md:py-36">
          <motion.div initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="text-brand-red font-semibold tracking-[.2em] uppercase text-xs mb-4">Get Started</p>
            <h2 className="font-display text-3xl md:text-5xl font-extrabold text-white mb-5 leading-tight">Need Electrical Work Done Right?</h2>
            <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed font-light max-w-xl mx-auto">
              From new builds and renovations to panel upgrades and backup power, Gates Electric is ready to help with your next project.
            </p>
            <Link to="/contact"
              className="group inline-flex items-center gap-3 bg-brand-red hover:bg-brand-red-hover text-white px-10 py-4 rounded-2xl font-bold text-lg transition-all shadow-[0_12px_50px_-10px_rgba(226,32,32,0.7)] hover:shadow-[0_16px_60px_-8px_rgba(226,32,38,0.85)]">
              Request a Free Quote
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <p className="mt-6 text-sm text-slate-400 flex items-center justify-center gap-2">
              <Phone className="w-4 h-4 text-brand-red" /> Serving homeowners and businesses across Chester and the South Shore.
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
}
