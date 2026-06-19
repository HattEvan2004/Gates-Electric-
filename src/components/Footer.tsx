import { Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0a0f1a] border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-12 border-b border-white/5">
          {/* Brand */}
          <div className="lg:col-span-5">
            <img
              src="/logo.png"
              alt="Gates Electric"
              className="h-16 w-auto brightness-0 invert mb-5"
            />
            <p className="text-slate-400 max-w-sm leading-relaxed">
              Your dependable electrical contractor for upgrades, renovations,
              and new builds on the South Shore of Nova Scotia.
            </p>
          </div>

          {/* Links */}
          <div className="lg:col-span-3">
            <h4 className="text-white font-display font-bold text-sm uppercase tracking-widest mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3.5">
              {['Home', 'Services', 'About', 'Contact'].map((l) => (
                <li key={l}>
                  <a
                    href={l === 'Home' ? '#' : `#${l.toLowerCase()}`}
                    className="text-slate-400 hover:text-white transition-colors text-sm"
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-4">
            <h4 className="text-white font-display font-bold text-sm uppercase tracking-widest mb-6">
              Contact
            </h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors">
                <Phone className="w-4 h-4 text-brand-red flex-shrink-0" />
                <a href="tel:9022770458">(902) 277-0458</a>
              </li>
              <li className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors">
                <Mail className="w-4 h-4 text-brand-red flex-shrink-0" />
                <a href="mailto:kyledgates@hotmail.com">kyledgates@hotmail.com</a>
              </li>
              <li className="flex items-start gap-3 text-slate-400">
                <MapPin className="w-4 h-4 text-brand-red flex-shrink-0 mt-0.5" />
                <span>
                  436 Highway 14
                  <br />
                  Chester, NS B0J 1J0
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} Gates Electric Ltd. All rights reserved.</p>
          <p className="mt-3 md:mt-0">Serving Chester &amp; the South Shore</p>
        </div>
      </div>
    </footer>
  );
}
