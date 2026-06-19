import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import ElectricHero from '../components/ElectricHero';

const values = [
  { title: 'Safety First', desc: 'Every project follows current electrical code and best practices. No shortcuts.' },
  { title: 'Clear Communication', desc: "You\u2019ll know what we\u2019re doing, when, and what it costs \u2014 before we start." },
  { title: 'Quality Workmanship', desc: 'Neat, reliable wiring that passes inspection and lasts for decades.' },
  { title: 'Community Focus', desc: 'We live and work on the South Shore. Our reputation is built job by job.' },
];

export default function AboutPage() {
  return (
    <>
      {/* Banner */}
      <ElectricHero full={false}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 text-center">
          <p className="text-brand-red font-semibold tracking-[.15em] uppercase text-xs mb-3">Our Story</p>
          <h1 className="font-display text-4xl md:text-6xl font-extrabold text-white">About Gates Electric</h1>
        </div>
      </ElectricHero>

      {/* ═══ STORY ═══ */}
      <section className="py-28 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <h2 className="font-display text-3xl md:text-4xl font-extrabold text-slate-900 mb-8 leading-tight">
              Your Local Partner for Quality Electrical Work
            </h2>
            <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
              <p>
                Gates Electric Ltd. is a local electrical company serving Chester,
                Nova Scotia and surrounding South Shore communities. From new builds
                and renovations to panel upgrades, lighting, generators, and
                commercial work, we provide dependable electrical services for both
                homeowners and businesses.
              </p>
              <p>
                We believe in doing the job right the first time. That means clean
                wiring, proper load calculations, code-compliant installations, and
                clear communication from the first phone call to the final
                walkthrough. Our customers know what to expect, and we deliver on it.
              </p>
            </div>
          </motion.div>

          {/* Photos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-28">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl overflow-hidden shadow-xl aspect-[4/3]"
            >
              <img src="/gallery-2.jpg" alt="Gates Electric shop" className="w-full h-full object-cover" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: .1 }}
              className="rounded-2xl overflow-hidden shadow-xl aspect-[4/3]"
            >
              <img src="/gallery-3.jpg" alt="Gates Electric team" className="w-full h-full object-cover" />
            </motion.div>
          </div>

          {/* Values */}
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="text-brand-red font-semibold tracking-[.15em] uppercase text-xs mb-3">How We Work</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold text-slate-900 mb-12">
              What You Can Expect
            </h2>
          </motion.div>

          <div className="space-y-10">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: .4, delay: i * .08 }}
                className="flex gap-5"
              >
                <CheckCircle2 className="w-6 h-6 text-brand-red flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-display font-bold text-xl text-slate-900 mb-2">{v.title}</h3>
                  <p className="text-slate-500 leading-relaxed text-lg">{v.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Full-width van photo */}
      <section className="relative h-[50vh] min-h-[350px] overflow-hidden">
        <img src="/gallery-1.jpg" alt="Gates Electric van on site" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/40 to-transparent" />
      </section>

      {/* CTA */}
      <section className="py-24 bg-brand-dark">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-extrabold text-white mb-5">
            Let's Work Together
          </h2>
          <p className="text-lg text-slate-400 mb-10">
            Get in touch to discuss your next electrical project. Free quotes, always.
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
