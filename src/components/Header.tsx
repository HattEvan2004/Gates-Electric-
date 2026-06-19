import { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const nav = [
    { label: 'Home', href: '#' },
    { label: 'Services', href: '#services' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-slate-200/60'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 lg:h-24">
          {/* Logo */}
          <a href="#" className="flex-shrink-0">
            <img
              src="/logo.png"
              alt="Gates Electric Ltd."
              className={`h-16 lg:h-20 w-auto object-contain transition-all duration-500 ${
                scrolled ? '' : 'brightness-0 invert'
              }`}
            />
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-10">
            {nav.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`text-sm font-medium tracking-wide uppercase transition-colors duration-300 ${
                  scrolled
                    ? 'text-slate-700 hover:text-brand-red'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-5">
            <a
              href="tel:9022770458"
              className={`flex items-center gap-2 text-sm font-semibold transition-colors ${
                scrolled ? 'text-slate-800' : 'text-white'
              }`}
            >
              <Phone className="w-4 h-4" />
              (902) 277-0458
            </a>
            <a
              href="#contact"
              className="relative bg-brand-red hover:bg-brand-red-hover text-white px-7 py-3 rounded-lg font-semibold text-sm tracking-wide transition-all shadow-lg shadow-red-600/20 hover:shadow-red-600/40 pulse-ring"
            >
              Free Quote
            </a>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="lg:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? (
              <X className={`w-7 h-7 ${scrolled ? 'text-slate-800' : 'text-white'}`} />
            ) : (
              <Menu className={`w-7 h-7 ${scrolled ? 'text-slate-800' : 'text-white'}`} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-white border-t border-slate-100 shadow-2xl">
          <div className="px-6 py-6 space-y-1">
            {nav.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="block py-3 text-lg font-medium text-slate-800 hover:text-brand-red transition-colors"
              >
                {item.label}
              </a>
            ))}
            <div className="pt-4 border-t border-slate-100 mt-4 space-y-3">
              <a
                href="tel:9022770458"
                className="flex items-center gap-2 text-slate-700 font-semibold"
              >
                <Phone className="w-5 h-5" />
                (902) 277-0458
              </a>
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="block text-center bg-brand-red text-white py-3.5 rounded-lg font-semibold shadow-lg"
              >
                Get a Free Quote
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
