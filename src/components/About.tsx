import { motion } from 'motion/react';

export default function About() {
  return (
    <section id="about" className="relative py-32 bg-brand-dark overflow-hidden">
      {/* Decorative blurs */}
      <div className="absolute top-0 right-0 -mr-32 -mt-32 w-[420px] h-[420px] rounded-full bg-slate-800/80 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-80 h-80 rounded-full bg-brand-red/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-brand-red font-semibold tracking-widest uppercase text-xs mb-4">
            About Us
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-extrabold text-white mb-10 leading-tight">
            Your Local Partner for Quality Electrical Work
          </h2>

          <div className="bg-white/[.04] border border-white/[.08] rounded-3xl p-8 sm:p-14 backdrop-blur-sm">
            <p className="text-xl md:text-2xl text-slate-300 leading-relaxed font-light">
              Gates Electric Ltd. is a local electrical company serving Chester,
              Nova Scotia and surrounding South Shore communities. From new
              builds and renovations to panel upgrades, lighting, plugs,
              generators, and commercial work — the team provides dependable
              electrical services for both homeowners and businesses.
            </p>
          </div>

          {/* Accent line */}
          <div className="mt-12 mx-auto w-20 h-1 rounded-full bg-gradient-to-r from-brand-red to-red-400" />
        </motion.div>
      </div>
    </section>
  );
}
