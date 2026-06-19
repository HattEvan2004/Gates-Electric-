import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown, Shield, MapPin, Zap, ThumbsUp, Star } from 'lucide-react';
import { motion } from 'motion/react';
import ElectricHero from '../components/ElectricHero';

const highlights = [
  { icon: Shield, title: 'Fully Licensed & Insured' },
  { icon: MapPin, title: 'Chester, Nova Scotia' },
  { icon: Zap, title: 'Residential & Commercial' },
  { icon: ThumbsUp, title: 'Free Quotes on Every Job' },
];

const reviews = [
  {
    quote:
      'They rewired our older Chester home during a full reno and explained every step. Clean work, on schedule, and the inspection passed first time.',
    name: 'Sarah M.',
    location: 'Chester, NS',
  },
  {
    quote:
      'Gates handled the panel upgrade and lighting for our storefront. Tidy, professional, and they worked around our hours so we never had to close.',
    name: 'Dave R.',
    location: 'Mahone Bay, NS',
  },
  {
    quote:
      'Quick to quote, fair pricing, and they wired my new workshop exactly how I wanted it. Easily the best electrician we have used on the shore.',
    name: 'Karen L.',
    location: 'Hubbards, NS',
  },
];

export default function Home() {
  return (
    <>
      {/* ═══ HERO ═══ */}
      <ElectricHero full>
        <div className="max-w-7xl mx-auto w-full px-5 sm:px-6 lg:px-8 pt-28 md:pt-24 pb-0">
          <div className="max-w-3xl">
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="flex items-center gap-3 text-brand-red font-semibold tracking-[.24em] uppercase text-[11px] sm:text-xs mb-5 md:mb-6"
            >
              <span className="w-7 h-px bg-brand-red flex-none" />
              Residential &amp; Commercial Electrical Services
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="font-display font-extrabold tracking-tight text-white mb-5 md:mb-7 text-[clamp(2.6rem,11vw,3.25rem)] leading-[1.02] md:text-[clamp(2.05rem,7vw,5rem)] md:leading-[1.05]"
            >
              Powering Chester Homes &amp; Businesses With{' '}
              <span className="text-brand-red">Precision.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="text-[19px] md:text-xl text-slate-400 max-w-xl mb-8 md:mb-10 leading-relaxed font-light"
            >
              Gates Electric provides reliable residential and commercial
              electrical work built on safety, quality, and trust.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-3.5 sm:gap-4"
            >
              <Link
                to="/contact"
                className="group inline-flex w-full sm:w-auto min-h-[60px] md:min-h-0 justify-center items-center gap-3 bg-brand-red hover:bg-brand-red-hover text-white px-8 py-4 rounded-2xl md:rounded-xl font-bold text-lg transition-all shadow-[0_10px_40px_-8px_rgba(226,32,32,0.55)] hover:shadow-[0_12px_48px_-6px_rgba(226,32,32,0.7)] md:shadow-2xl md:shadow-red-600/25 md:hover:shadow-red-600/40"
              >
                Request a Quote
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/services"
                className="inline-flex w-full sm:w-auto min-h-[60px] md:min-h-0 justify-center items-center gap-3 bg-white/[.05] md:bg-white/[.07] hover:bg-white/[.12] text-white border border-white/15 px-8 py-4 rounded-2xl md:rounded-xl font-semibold text-lg transition-all backdrop-blur-md"
              >
                View Services
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Mobile blueprint band — gives the animation its own room under the buttons */}
        <div className="md:hidden h-[32vh] min-h-[240px]" aria-hidden="true" />

        {/* Mobile trust bar */}
        <div className="md:hidden border-t border-white/10 bg-[#070708]/85 backdrop-blur-sm"
          style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
        >
          <div className="grid grid-cols-2 divide-x divide-white/10">
            <div className="flex items-center gap-3 px-5 py-4">
              <Shield className="w-5 h-5 text-brand-red flex-none" />
              <span className="text-white text-sm font-semibold leading-tight">Fully Licensed<br />&amp; Insured</span>
            </div>
            <div className="flex items-center gap-3 px-5 py-4">
              <MapPin className="w-5 h-5 text-brand-red flex-none" />
              <span className="text-white text-sm font-semibold leading-tight">Chester,<br />Nova Scotia</span>
            </div>
          </div>
        </div>

        {/* Scroll hint (desktop/tablet only) */}
        <div className="hidden md:block absolute bottom-8 left-1/2 -translate-x-1/2 scroll-indicator">
          <ChevronDown className="w-7 h-7 text-white/40" />
        </div>
      </ElectricHero>

      {/* ═══ TRUST STRIP ═══ */}
      <section className="hidden md:block bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {highlights.map((h, i) => {
              const Icon = h.icon;
              return (
                <motion.div
                  key={h.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: .45, delay: i * .08 }}
                  className="flex items-center gap-4"
                >
                  <div className="w-11 h-11 rounded-xl bg-red-50 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-brand-red" />
                  </div>
                  <p className="font-display font-bold text-slate-800 text-sm leading-snug">{h.title}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ SERVICES PREVIEW ═══ */}
      <section className="py-28 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-brand-red font-semibold tracking-[.15em] uppercase text-xs mb-3">What We Do</p>
            <h2 className="font-display text-3xl md:text-5xl font-extrabold text-slate-900 mb-5">
              Professional Electrical Solutions
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto text-lg leading-relaxed">
              From panel upgrades to full commercial fit-outs, we handle it all with the same standard of care.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10 mb-16">
            {[
              { title: 'New Home Builds', desc: 'Complete rough-ins and finishing for custom homes.' },
              { title: 'Renovations', desc: 'Safe upgrades for kitchens, bathrooms, and additions.' },
              { title: 'Panel & Service Upgrades', desc: 'Modern panels for safety and increased capacity.' },
              { title: 'Generator Systems', desc: 'Backup power to keep you running during outages.' },
              { title: 'Lighting & Outlets', desc: 'Indoor, outdoor, and specialty installations.' },
              { title: 'Commercial Projects', desc: 'Full electrical servicing for commercial buildings.' },
            ].map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: .4, delay: i * .06 }}
                className="service-row pl-5 py-2"
              >
                <h3 className="font-display font-bold text-lg text-slate-900 mb-1">{s.title}</h3>
                <p className="text-slate-500 text-[15px] leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-brand-red font-semibold hover:gap-3 transition-all"
            >
              View All Services <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ REVIEWS ═══ */}
      <section id="reviews" className="py-28 bg-white scroll-mt-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <p className="text-brand-red font-semibold tracking-[.15em] uppercase text-xs mb-3">What People Say</p>
            <h2 className="font-display text-3xl md:text-5xl font-extrabold text-slate-900">Trusted Across the South Shore</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((r, i) => (
              <motion.figure
                key={r.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex flex-col h-full rounded-2xl border border-slate-100 bg-slate-50/60 p-8 shadow-sm"
              >
                <div className="flex gap-1 mb-5 text-brand-red">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <blockquote className="text-slate-700 leading-relaxed flex-grow">{r.quote}</blockquote>
                <figcaption className="mt-6 pt-5 border-t border-slate-200">
                  <p className="font-display font-bold text-slate-900">{r.name}</p>
                  <p className="text-sm text-slate-500">{r.location}</p>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA BANNER ═══ */}
      <section className="relative py-28 bg-brand-dark overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-brand-red/15 blur-[120px]" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="font-display text-3xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
              Ready to Start Your Project?
            </h2>
            <p className="text-xl text-slate-400 mb-10 leading-relaxed font-light">
              Whether it's a small repair or a full build, we're here to help.
              Get a free, no-obligation quote today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-flex justify-center items-center gap-2 bg-brand-red hover:bg-brand-red-hover text-white px-10 py-4 rounded-lg font-bold text-lg transition-all shadow-2xl shadow-red-600/25"
              >
                Request a Quote <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="tel:9022770458"
                className="inline-flex justify-center items-center gap-2 bg-white/10 hover:bg-white/15 text-white border border-white/15 px-10 py-4 rounded-lg font-semibold text-lg transition-all"
              >
                Call Us Now
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
