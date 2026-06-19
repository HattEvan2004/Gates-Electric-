import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { motion } from 'motion/react';
import ElectricHero from '../components/ElectricHero';

const info = [
  { icon: Phone, label: 'Phone', value: '(902) 277-0458', href: 'tel:9022770458' },
  { icon: Mail, label: 'Email', value: 'kyledgates@hotmail.com', href: 'mailto:kyledgates@hotmail.com' },
  { icon: MapPin, label: 'Location', value: '436 Highway 14\nChester, NS B0J 1J0' },
  { icon: Clock, label: 'Hours', value: 'Monday – Friday, 8 am – 5 pm', sub: 'Saturday & Sunday Closed' },
];

export default function ContactPage() {
  return (
    <>
      {/* Banner */}
      <ElectricHero full={false}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 text-center">
          <p className="text-brand-red font-semibold tracking-[.15em] uppercase text-xs mb-3">Get in Touch</p>
          <h1 className="font-display text-4xl md:text-6xl font-extrabold text-white">Contact Us</h1>
          <p className="mt-5 text-lg text-slate-400 font-light max-w-xl mx-auto leading-relaxed">
            Reach out for a free quote on your next electrical project.
          </p>
        </div>
      </ElectricHero>

      {/* ═══ CONTACT ═══ */}
      <section className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="w-full lg:w-5/12"
            >
              <h2 className="font-display text-3xl md:text-4xl font-extrabold text-slate-900 mb-5 leading-tight">
                Need Electrical Work? Let's Talk.
              </h2>
              <p className="text-lg text-slate-500 mb-12 leading-relaxed">
                Reach out for a free, no-obligation quote on your residential or
                commercial project. We'll get back to you promptly.
              </p>

              <div className="space-y-9">
                {info.map((item) => {
                  const Icon = item.icon;
                  const lines = item.value.split('\n');
                  return (
                    <div key={item.label} className="flex items-start gap-5">
                      <div className="w-12 h-12 bg-red-50 text-brand-red rounded-xl flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-[.12em] mb-1">{item.label}</p>
                        {item.href ? (
                          <a href={item.href} className="text-lg font-bold text-slate-900 hover:text-brand-red transition-colors">
                            {item.value}
                          </a>
                        ) : (
                          <>
                            <p className="text-lg font-semibold text-slate-900 leading-snug">
                              {lines.map((l, i) => (<span key={i}>{i > 0 && <br />}{l}</span>))}
                            </p>
                            {item.sub && <p className="text-sm text-slate-400 mt-1">{item.sub}</p>}
                          </>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: .1 }}
              className="w-full lg:w-7/12"
            >
              <div className="bg-slate-50 rounded-3xl border border-slate-200/80 p-8 sm:p-12">
                <h3 className="font-display text-2xl font-bold text-slate-900 mb-8">Request a Quote</h3>
                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-600 mb-2">Full Name</label>
                      <input type="text" placeholder="John Doe" className="w-full px-5 py-3.5 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-brand-red/30 focus:border-brand-red outline-none transition-all text-slate-900" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-600 mb-2">Phone Number</label>
                      <input type="tel" placeholder="(902) 555-0123" className="w-full px-5 py-3.5 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-brand-red/30 focus:border-brand-red outline-none transition-all text-slate-900" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-600 mb-2">Email Address</label>
                    <input type="email" placeholder="john@example.com" className="w-full px-5 py-3.5 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-brand-red/30 focus:border-brand-red outline-none transition-all text-slate-900" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-600 mb-2">Project Type</label>
                    <select defaultValue="" className="w-full px-5 py-3.5 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-brand-red/30 focus:border-brand-red outline-none transition-all text-slate-900">
                      <option value="" disabled>Select a project type…</option>
                      <option value="residential">Residential Service</option>
                      <option value="commercial">Commercial Service</option>
                      <option value="new-build">New Build / Construction</option>
                      <option value="renovation">Renovation</option>
                      <option value="panel">Panel Upgrade / Generator</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-600 mb-2">Message</label>
                    <textarea rows={5} placeholder="Tell us about your electrical needs…" className="w-full px-5 py-3.5 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-brand-red/30 focus:border-brand-red outline-none transition-all resize-none text-slate-900" />
                  </div>
                  <button type="button" className="w-full bg-brand-red hover:bg-brand-red-hover text-white font-bold py-4 rounded-xl shadow-lg shadow-red-600/15 hover:shadow-red-600/30 transition-all text-lg tracking-wide">
                    Request Quote
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
