import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#060609] border-t border-white/5 pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-14 lg:gap-8 pb-14 border-b border-white/5">
          {/* Brand */}
          <div className="lg:col-span-5">
            <img src="/logo.png" alt="Gates Electric" className="h-16 w-auto brightness-0 invert mb-6" />
            <p className="text-slate-400 max-w-sm leading-relaxed text-[15px]">
              Your dependable electrical contractor for upgrades, renovations,
              and new builds on the South Shore of Nova Scotia.
            </p>
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
                  <Link to={l.to} className="text-slate-400 hover:text-white transition-colors text-sm">
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
              <li className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors">
                <Phone className="w-4 h-4 text-brand-red" />
                <a href="tel:9022770458">(902) 277-0458</a>
              </li>
              <li className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors">
                <Mail className="w-4 h-4 text-brand-red" />
                <a href="mailto:kyledgates@hotmail.com">kyledgates@hotmail.com</a>
              </li>
              <li className="flex items-start gap-3 text-slate-400">
                <MapPin className="w-4 h-4 text-brand-red mt-0.5" />
                <span>436 Highway 14<br />Chester, NS B0J 1J0</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} Gates Electric Ltd. All rights reserved.</p>
          <p className="mt-3 md:mt-0">Serving Chester &amp; the South Shore of Nova Scotia</p>
        </div>
      </div>
    </footer>
  );
}
