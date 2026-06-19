import { motion } from 'motion/react';

const photos = [
  { src: '/gallery-1.jpg', alt: 'Gates Electric service van on job site' },
  { src: '/gallery-2.jpg', alt: 'Gates Electric shop and headquarters' },
  { src: '/gallery-3.jpg', alt: 'Gates Electric team' },
];

export default function Gallery() {
  return (
    <section className="py-28 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-brand-red font-semibold tracking-widest uppercase text-xs mb-3">
            Our Work
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-extrabold text-slate-900">
            On the Job
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {photos.map((p, i) => (
            <motion.div
              key={p.src}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="group relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg"
            >
              <img
                src={p.src}
                alt={p.alt}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Dark overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
