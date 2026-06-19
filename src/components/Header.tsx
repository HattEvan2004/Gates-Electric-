import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';

type NavItem = { label: string; to?: string; hash?: string };

const nav: NavItem[] = [
  { label: 'Home', to: '/' },
  { label: 'Services', to: '/services' },
  { label: 'About', to: '/about' },
  { label: 'Projects', hash: 'projects' },
  { label: 'Reviews', hash: 'reviews' },
  { label: 'Contact', to: '/contact' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isHome = pathname === '/';

  useEffect(() => { setOpen(false); window.scrollTo(0, 0); }, [pathname]);

  const scrollToHash = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const goToHash = (id: string) => {
    setOpen(false);
    if (isHome) {
      scrollToHash(id);
    } else {
      navigate('/');
      // wait for the home route to mount before scrolling
      setTimeout(() => scrollToHash(id), 120);
    }
  };

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
            <span
              className={`inline-flex items-center rounded-xl transition-all duration-500 ${
                showSolid ? '' : 'bg-white/95 px-3 py-2 shadow-lg'
              }`}
            >
              <img
                src="/logo.png"
                alt="Gates Electric Ltd."
                className="h-12 lg:h-16 w-auto object-contain"
              />
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-7 xl:gap-9">
            {nav.map((item) => {
              const active = item.to ? pathname === item.to : false;
              const cls = `text-[13px] font-semibold tracking-[.08em] uppercase transition-colors duration-300 ${
                active
                  ? 'text-brand-red'
                  : showSolid
                    ? 'text-slate-600 hover:text-brand-red'
                    : 'text-white/80 hover:text-white'
              }`;
              return item.hash ? (
                <button key={item.label} onClick={() => goToHash(item.hash!)} className={cls}>
                  {item.label}
                </button>
              ) : (
                <Link key={item.label} to={item.to!} className={cls}>
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-5">
            <a
              href="tel:9022770458"
              className={`hidden xl:flex items-center gap-2 text-sm font-semibold transition-colors ${
                showSolid ? 'text-slate-700' : 'text-white'
              }`}
            >
              <Phone className="w-4 h-4" />
              (902) 277-0458
            </a>
            <Link
              to="/contact"
              className="bg-brand-red hover:bg-brand-red-hover text-white px-6 py-2.5 rounded-lg font-semibold text-sm tracking-wide transition-all shadow-lg shadow-red-600/20 hover:shadow-red-600/40"
            >
              Request a Quote
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
            {nav.map((item) => {
              const active = item.to ? pathname === item.to : false;
              const cls = `block w-full text-left py-3 text-lg font-medium transition-colors ${
                active ? 'text-brand-red' : 'text-slate-800 hover:text-brand-red'
              }`;
              return item.hash ? (
                <button key={item.label} onClick={() => goToHash(item.hash!)} className={cls}>
                  {item.label}
                </button>
              ) : (
                <Link key={item.label} to={item.to!} onClick={() => setOpen(false)} className={cls}>
                  {item.label}
                </Link>
              );
            })}
            <div className="pt-4 border-t border-slate-100 mt-4 space-y-3">
              <a href="tel:9022770458" className="flex items-center gap-2 text-slate-700 font-semibold">
                <Phone className="w-5 h-5" /> (902) 277-0458
              </a>
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="block text-center bg-brand-red text-white py-3.5 rounded-lg font-semibold shadow-lg"
              >
                Request a Quote
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
