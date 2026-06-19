import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';

const nav = [
  { label: 'Home', to: '/' },
  { label: 'Services', to: '/services' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  useEffect(() => { setOpen(false); window.scrollTo(0, 0); }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const showSolid = scrolled || !isHome;

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      showSolid
        ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-slate-200/60'
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 lg:h-24">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img
              src="/logo.png"
              alt="Gates Electric Ltd."
              className={`h-14 lg:h-[4.5rem] w-auto object-contain transition-all duration-500 ${
                showSolid ? '' : 'brightness-0 invert drop-shadow-lg'
              }`}
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-10">
            {nav.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className={`text-[13px] font-semibold tracking-[.08em] uppercase transition-colors duration-300 ${
                  pathname === item.to
                    ? 'text-brand-red'
                    : showSolid
                      ? 'text-slate-600 hover:text-brand-red'
                      : 'text-white/80 hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-6">
            <a
              href="tel:9022770458"
              className={`flex items-center gap-2 text-sm font-semibold transition-colors ${
                showSolid ? 'text-slate-700' : 'text-white'
              }`}
            >
              <Phone className="w-4 h-4" />
              (902) 277-0458
            </a>
            <Link
              to="/contact"
              className="bg-brand-red hover:bg-brand-red-hover text-white px-7 py-3 rounded-lg font-semibold text-sm tracking-wide transition-all shadow-lg shadow-red-600/20 hover:shadow-red-600/40"
            >
              Free Quote
            </Link>
          </div>

          {/* Mobile toggle */}
          <button className="lg:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
            {open
              ? <X className={`w-7 h-7 ${showSolid ? 'text-slate-800' : 'text-white'}`} />
              : <Menu className={`w-7 h-7 ${showSolid ? 'text-slate-800' : 'text-white'}`} />
            }
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-white border-t border-slate-100 shadow-2xl">
          <div className="px-6 py-6 space-y-1">
            {nav.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                onClick={() => setOpen(false)}
                className={`block py-3 text-lg font-medium transition-colors ${
                  pathname === item.to ? 'text-brand-red' : 'text-slate-800 hover:text-brand-red'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-slate-100 mt-4 space-y-3">
              <a href="tel:9022770458" className="flex items-center gap-2 text-slate-700 font-semibold">
                <Phone className="w-5 h-5" /> (902) 277-0458
              </a>
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="block text-center bg-brand-red text-white py-3.5 rounded-lg font-semibold shadow-lg"
              >
                Get a Free Quote
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
