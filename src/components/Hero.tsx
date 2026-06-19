import { useState, useEffect } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';

const slides = ['/gallery-1.jpg', '/gallery-2.jpg', '/gallery-3.jpg'];
const KB_CLASSES = ['slide-kb-1', 'slide-kb-2', 'slide-kb-3'];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setCurrent((c) => (c + 1) % slides.length), 7000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative w-full h-screen min-h-[700px] overflow-hidden bg-black">
      {/* ── Slideshow layers ──────────────────────────── */}
      {slides.map((src, i) => (
        <div
          key={src}
          className={`absolute inset-0 transition-opacity duration-[2000ms] ease-in-out ${
            i === current ? 'slide-active' : 'slide-inactive'
          }`}
        >
          <img
            src={src}
            alt=""
            className={`absolute inset-0 w-full h-full object-cover ${
              i === current ? KB_CLASSES[i] : ''
            }`}
          />
        </div>
      ))}

      {/* ── Video layer (uncomment when you have hero-video.mp4) ── */}
      {/*
      <video
        autoPlay muted loop playsInline
        className="absolute inset-0 w-full h-full object-cover"
        poster="/gallery-1.jpg"
      >
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>
      */}

      {/* ── Gradient overlays ─────────────────────────── */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />

      {/* ── Content ───────────────────────────────────── */}
      <div className="relative z-10 h-full flex flex-col justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl pt-20">
          {/* Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-sm text-white/90 text-sm font-medium mb-8">
            <span className="w-2 h-2 rounded-full bg-brand-red animate-pulse" />
            Serving Chester &amp; the South Shore
          </div>

          {/* Headline */}
          <h1 className="font-display text-[clamp(2.5rem,6vw,5rem)] font-extrabold leading-[1.05] tracking-tight text-white mb-6">
            Reliable Residential &amp;&nbsp;Commercial{' '}
            <span className="glow-red text-brand-red">
              Electrical Services
            </span>
          </h1>

          {/* Sub */}
          <p className="text-lg sm:text-xl text-white/70 max-w-xl mb-10 leading-relaxed font-light">
            Professional electrical work for homes, businesses, renovations,
            and new builds across Nova Scotia's South Shore.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#contact"
              className="group inline-flex justify-center items-center gap-3 bg-brand-red hover:bg-brand-red-hover text-white px-9 py-4 rounded-lg font-bold text-lg transition-all shadow-2xl shadow-red-600/25 hover:shadow-red-600/40"
            >
              Get a Free Quote
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="tel:9022770458"
              className="inline-flex justify-center items-center gap-3 bg-white/10 hover:bg-white/20 text-white border border-white/20 px-9 py-4 rounded-lg font-semibold text-lg transition-all backdrop-blur-sm"
            >
              Call (902) 277-0458
            </a>
          </div>
        </div>
      </div>

      {/* ── Slide indicators ──────────────────────────── */}
      <div className="absolute bottom-28 sm:bottom-24 left-1/2 -translate-x-1/2 z-10 flex gap-2.5">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Slide ${i + 1}`}
            className={`h-1 rounded-full transition-all duration-500 ${
              i === current ? 'w-10 bg-brand-red' : 'w-4 bg-white/40 hover:bg-white/60'
            }`}
          />
        ))}
      </div>

      {/* ── Scroll indicator ──────────────────────────── */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 scroll-indicator">
        <ChevronDown className="w-7 h-7 text-white/50" />
      </div>
    </section>
  );
}
