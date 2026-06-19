import { Shield, MapPin, Zap, ThumbsUp } from 'lucide-react';
import { motion } from 'motion/react';

const stats = [
  { icon: Shield, label: 'Licensed & Insured', value: 'Fully' },
  { icon: MapPin, label: 'Based in Chester, NS', value: 'Local' },
  { icon: Zap, label: 'Residential & Commercial', value: 'Full Service' },
  { icon: ThumbsUp, label: 'On Every Project', value: 'Free Quotes' },
];

export default function Trust() {
  return (
    <section className="relative bg-brand-dark border-b border-white/5">
      {/* Subtle red accent line at top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-red/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
          {stats.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex flex-col items-center text-center lg:flex-row lg:text-left lg:items-center gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-red/10 border border-brand-red/20 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-brand-red" />
                </div>
                <div>
                  <p className="text-white font-display font-bold text-lg leading-tight">
                    {s.value}
                  </p>
                  <p className="text-slate-400 text-sm mt-0.5">{s.label}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
