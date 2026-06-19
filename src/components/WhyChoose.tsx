import { CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

const reasons = [
  'Professional electrical work you can trust',
  'Extensive residential and commercial experience',
  'Local service across Chester and the South Shore',
  'Clear communication from first call to final walkthrough',
  'Free, no-obligation quotes on every project',
];

export default function WhyChoose() {
  return (
    <section className="py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="w-full lg:w-1/2"
          >
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/hero.png"
                  alt="Gates Electric team at work"
                  className="w-full h-auto object-cover"
                />
              </div>
              {/* Accent corner element */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 border-2 border-brand-red/30 rounded-2xl -z-10" />
              <div className="absolute -top-4 -left-4 w-16 h-16 bg-brand-red/10 rounded-2xl -z-10" />
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="w-full lg:w-1/2"
          >
            <p className="text-brand-red font-semibold tracking-widest uppercase text-xs mb-3">
              Why Choose Us
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold text-slate-900 mb-6 leading-tight">
              Dedicated to Excellence in Every Project
            </h2>
            <p className="text-lg text-slate-500 mb-10 leading-relaxed">
              When you hire Gates Electric Ltd., you're partnering with a team
              focused on safety, quality code compliance, and customer
              satisfaction. We handle jobs of all sizes with the same level of
              professionalism.
            </p>

            <ul className="space-y-5">
              {reasons.map((r, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
                  className="flex items-start gap-4"
                >
                  <CheckCircle2 className="w-6 h-6 text-brand-red flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700 text-lg">{r}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
