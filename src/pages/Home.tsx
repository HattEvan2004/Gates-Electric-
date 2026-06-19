import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown, Shield, MapPin, Zap, ThumbsUp } from 'lucide-react';
import { motion } from 'motion/react';
import ElectricHero from '../components/ElectricHero';

const highlights = [
  { icon: Shield, title: 'Fully Licensed & Insured' },
  { icon: MapPin, title: 'Chester, Nova Scotia' },
  { icon: Zap, title: 'Residential & Commercial' },
  { icon: ThumbsUp, title: 'Free Quotes on Every Job' },
];

const photos = [
  { src: '/gallery-1.jpg', alt: 'Gates Electric service van' },
  { src: '/gallery-2.jpg', alt: 'Gates Electric headquarters' },
  { src: '/gallery-3.jpg', alt: 'Gates Electric team' },
];

export default function Home() {
  return (
    <>
      {/* ═══ HERO ═══ */}
      <ElectricHero full>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[.06] border border-white/10 text-white/80 text-sm font-medium mb-8">
              <span className="w-2 h-2 rounded-full bg-brand-red animate-pulse" />
              Serving Chester &amp; the South Shore
            </div>

            <h1 className="font-display text-[clamp(2.5rem,6vw,5rem)] font-extrabold leading-[1.05] tracking-tight text-white mb-6">
              Reliable Residential &amp;&nbsp;Commercial{' '}
              <span className="glow-red text-brand-red">Electrical Services</span>
            </h1>

            <p className="text-lg sm:text-xl text-white/60 max-w-xl mb-10 leading-relaxed font-light">
              Professional electrical work for homes, businesses, renovations,
              and new builds across Nova Scotia's South Shore.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/contact"
                className="group inline-flex justify-center items-center gap-3 bg-brand-red hover:bg-brand-red-hover text-white px-9 py-4 rounded-lg font-bold text-lg transition-all shadow-2xl shadow-red-600/25 hover:shadow-red-600/40"
              >
                Get a Free Quote
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <a
                href="tel:9022770458"
                className="inline-flex justify-center items-center gap-3 bg-white/[.07] hover:bg-white/[.14] text-white border border-white/15 px-9 py-4 rounded-lg font-semibold text-lg transition-all backdrop-blur-sm"
              >
                Call (902) 277-0458
              </a>
            </div>
          </div>
        </div>
        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 scroll-indicator">
          <ChevronDown className="w-7 h-7 text-white/40" />
        </div>
      </ElectricHero>

      {/* ═══ TRUST STRIP ═══ */}
      <section className="bg-white border-b border-slate-100">
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

      {/* ═══ PHOTO GALLERY ═══ */}
      <section className="py-28 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <p className="text-brand-red font-semibold tracking-[.15em] uppercase text-xs mb-3">Our Work</p>
            <h2 className="font-display text-3xl md:text-5xl font-extrabold text-slate-900">On the Job</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {photos.map((p, i) => (
              <motion.div
                key={p.src}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: .5, delay: i * .12 }}
                className="group relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg"
              >
                <img src={p.src} alt={p.alt} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
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
