import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, ArrowRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative bg-[#060609] pt-20 pb-8 overflow-hidden">
      {/* top accent + subtle glow */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-red/40 to-transparent" />
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[520px] h-48 bg-brand-red/[.05] blur-[110px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-14 border-b border-white/10">
          {/* Brand */}
          <div className="lg:col-span-5">
            <img src="/logo-white.png" alt="Gates Electric Ltd." className="h-16 w-auto mb-6" />
            <p className="text-slate-400 max-w-sm leading-relaxed text-[15px]">
              Dependable residential and commercial electrical work for Chester and the South Shore of
              Nova Scotia — built on safety, quality, and trust.
            </p>
            <Link to="/contact"
              className="group inline-flex items-center gap-2 mt-7 bg-brand-red hover:bg-brand-red-hover text-white px-5 py-2.5 rounded-lg font-semibold text-sm transition-all shadow-lg shadow-red-600/20">
              Request a Free Quote
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Links */}
          <div className="lg:col-span-3">
            <h4 className="text-white font-display font-bold text-xs uppercase tracking-[.15em] mb-7">Navigation</h4>
            <ul className="space-y-4">
              {[
                { label: 'Home', to: '/' },
                { label: 'Services', to: '/services' },
                { label: 'About', to: '/about' },
                { label: 'Contact', to: '/contact' },
              ].map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="group inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-red/0 group-hover:bg-brand-red transition-colors" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-4">
            <h4 className="text-white font-display font-bold text-xs uppercase tracking-[.15em] mb-7">Contact</h4>
            <ul className="space-y-5 text-sm">
              <li>
                <a href="tel:9022770458" className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors">
                  <span className="w-8 h-8 rounded-lg bg-white/[.05] border border-white/10 flex items-center justify-center flex-none">
                    <Phone className="w-4 h-4 text-brand-red" />
                  </span>
                  (902) 277-0458
                </a>
              </li>
              <li>
                <a href="mailto:kyledgates@hotmail.com" className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors">
                  <span className="w-8 h-8 rounded-lg bg-white/[.05] border border-white/10 flex items-center justify-center flex-none">
                    <Mail className="w-4 h-4 text-brand-red" />
                  </span>
                  kyledgates@hotmail.com
                </a>
              </li>
              <li className="flex items-start gap-3 text-slate-400">
                <span className="w-8 h-8 rounded-lg bg-white/[.05] border border-white/10 flex items-center justify-center flex-none">
                  <MapPin className="w-4 h-4 text-brand-red" />
                </span>
                <span className="pt-1.5">436 Highway 14<br />Chester, NS B0J 1J0</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} Gates Electric Ltd. All rights reserved.</p>
          <p>Serving Chester &amp; the South Shore of Nova Scotia</p>
        </div>
      </div>
    </footer>
  );
}
