import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, FileCheck, MapPin, Wrench, MessageCircle, CheckCircle2, ChevronDown } from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';
import ElectricHero from '../components/ElectricHero';

/* ═══════════════════════════════════════════════════════════
   THE POWER PLAN — Services Page
   Gates Electric powers the entire property.
   ═══════════════════════════════════════════════════════════ */

/* ── zone data (residential) ─────────────────────────────── */
const zones = [
  { title: 'New Home Builds', short: 'Full Structure', desc: 'Complete electrical rough-ins and finishing for custom homes. Every circuit, switch, and fixture planned and installed to code.' },
  { title: 'Renovations', short: 'Interior Spaces', desc: 'Kitchens, bathrooms, basements, and additions. We handle the electrical so your renovation runs smoothly from start to finish.' },
  { title: 'Panel Upgrades', short: 'Electrical Panel', desc: 'Modern panels for safety and capacity. We replace outdated breaker boxes to meet current code and power demands.' },
  { title: 'Service Upgrades', short: 'Service Entrance', desc: 'If your home still runs on 100-amp service, we size and install entrances that handle today\u2019s household needs.' },
  { title: 'Generator Systems', short: 'Backup Power', desc: 'Transfer switches, generator panels, and full backup power. Keep your home running through South Shore storms.' },
  { title: 'Heat Pump Wiring', short: 'Heat Pump', desc: 'Dedicated circuits properly sized for heat pumps and mini-splits, including disconnect and load calculations.' },
  { title: 'Lighting', short: 'Lighting Zones', desc: 'Recessed, track, landscape, and specialty lighting. Layouts designed for your space, inside and out.' },
  { title: 'Plugs & Outlets', short: 'Outlets', desc: 'Standard, GFCI, tamper-resistant, USB, and 240V outlets. New installations and code-required upgrades.' },
  { title: 'Underground Service', short: 'Underground', desc: 'Installation and repair of underground electrical lines between buildings, garages, and service entrances.' },
  { title: 'Appliance Circuits', short: 'Appliances', desc: 'Dedicated circuits for ranges, dryers, hot tubs, EV chargers, and heavy-draw appliances, wired correctly.' },
];

/* ── SVG house coordinates ───────────────────────────────── */
const H = {
  ground: 500, roofPeak: 68, eaveY: 168,
  left: 180, right: 700, mid: 440,
  floorY: 310,
  garageR: 930, garageTop: 208,
  panelX: 715, panelY: 350,
  mastX: 688, mastTop: 42,
  genX: 80, genY: 445,
  hpX: 770, hpY: 452,
};

/* zone highlight rects (x, y, w, h) and trace paths */
const zoneGfx: { area: string; trace: string; lx: number; ly: number }[] = [
  { /* 0 new builds - full house outline */
    area: `M${H.left},${H.eaveY} L${H.mid},${H.roofPeak} L${H.right},${H.eaveY} L${H.garageR},${H.garageTop} L${H.garageR},${H.ground} L${H.left},${H.ground} Z`,
    trace: `M${H.panelX},${H.panelY} L${H.panelX},${H.floorY} L${H.left+20},${H.floorY} M${H.panelX},${H.panelY} L${H.panelX},${H.ground-20} M${H.panelX},${H.floorY} L${H.panelX},${H.eaveY+10}`,
    lx: 38, ly: 42,
  },
  { /* 1 renovations - kitchen + bath */
    area: `M${H.left},${H.floorY} L430,${H.floorY} L430,${H.ground} L${H.left},${H.ground} Z M420,${H.eaveY} L${H.right},${H.eaveY} L${H.right},${H.floorY} L420,${H.floorY} Z`,
    trace: `M${H.panelX},${H.panelY} L430,${H.panelY} L300,${H.panelY} L300,${H.floorY+10} M${H.panelX},${H.panelY} L${H.panelX},${H.floorY} L560,${H.floorY} L560,${H.eaveY+20}`,
    lx: 28, ly: 58,
  },
  { /* 2 panel upgrades */
    area: `M${H.panelX-20},${H.panelY-30} L${H.panelX+30},${H.panelY-30} L${H.panelX+30},${H.panelY+50} L${H.panelX-20},${H.panelY+50} Z`,
    trace: `M${H.panelX},${H.panelY-30} L${H.panelX},${H.eaveY+5} M${H.panelX},${H.panelY+50} L${H.panelX},${H.ground-20}`,
    lx: 78, ly: 50,
  },
  { /* 3 service upgrades - mast */
    area: `M${H.mastX-12},${H.mastTop} L${H.mastX+12},${H.mastTop} L${H.mastX+12},${H.eaveY} L${H.mastX-12},${H.eaveY} Z`,
    trace: `M${H.mastX},${H.mastTop} L${H.mastX},${H.eaveY} L${H.panelX},${H.eaveY} L${H.panelX},${H.panelY}`,
    lx: 62, ly: 12,
  },
  { /* 4 generator */
    area: `M${H.genX-15},${H.genY-10} L${H.genX+65},${H.genY-10} L${H.genX+65},${H.ground} L${H.genX-15},${H.ground} Z`,
    trace: `M${H.panelX},${H.panelY} L${H.left},${H.panelY} L${H.left},${H.ground} L${H.genX+25},${H.ground} L${H.genX+25},${H.genY}`,
    lx: 2, ly: 72,
  },
  { /* 5 heat pump */
    area: `M${H.hpX-15},${H.hpY-10} L${H.hpX+55},${H.hpY-10} L${H.hpX+55},${H.ground} L${H.hpX-15},${H.ground} Z`,
    trace: `M${H.panelX},${H.panelY} L${H.hpX+20},${H.panelY} L${H.hpX+20},${H.hpY}`,
    lx: 82, ly: 72,
  },
  { /* 6 lighting - ceiling zones */
    area: `M${H.left+10},${H.floorY} L${H.right-10},${H.floorY} L${H.right-10},${H.floorY+12} L${H.left+10},${H.floorY+12} Z M${H.left+10},${H.eaveY} L${H.right-10},${H.eaveY} L${H.right-10},${H.eaveY+12} L${H.left+10},${H.eaveY+12} Z`,
    trace: `M${H.panelX},${H.panelY} L${H.panelX},${H.floorY+6} L${H.left+60},${H.floorY+6} M${H.panelX},${H.floorY} L${H.panelX},${H.eaveY+6} L${H.left+60},${H.eaveY+6}`,
    lx: 38, ly: 28,
  },
  { /* 7 plugs & outlets - wall zones */
    area: `M${H.left},${H.ground-70} L${H.left+15},${H.ground-70} L${H.left+15},${H.ground-40} L${H.left},${H.ground-40} Z M${H.right-15},${H.ground-70} L${H.right},${H.ground-70} L${H.right},${H.ground-40} L${H.right-15},${H.ground-40} Z M430,${H.ground-70} L445,${H.ground-70} L445,${H.ground-40} L430,${H.ground-40} Z`,
    trace: `M${H.panelX},${H.panelY} L${H.panelX},${H.ground-55} L${H.right},${H.ground-55} M${H.panelX},${H.ground-55} L430,${H.ground-55} L${H.left},${H.ground-55}`,
    lx: 50, ly: 78,
  },
  { /* 8 underground service */
    area: `M0,${H.ground+5} L${H.left},${H.ground+5} L${H.left},${H.ground+30} L0,${H.ground+30} Z`,
    trace: `M0,${H.ground+18} L${H.left},${H.ground+18} L${H.left},${H.ground} L${H.panelX},${H.ground} L${H.panelX},${H.panelY+50}`,
    lx: 5, ly: 88,
  },
  { /* 9 appliance circuits - kitchen/laundry */
    area: `M${H.left},${H.ground-100} L380,${H.ground-100} L380,${H.ground} L${H.left},${H.ground} Z`,
    trace: `M${H.panelX},${H.panelY} L430,${H.panelY} L280,${H.panelY} L280,${H.ground-20} M350,${H.panelY} L350,${H.ground-20}`,
    lx: 18, ly: 65,
  },
];

/* ── property blueprint SVG ──────────────────────────────── */
function PropertyBlueprint({ active }: { active: number }) {
  const line = 'rgba(160,185,210,';
  return (
    <svg viewBox="0 0 1000 560" className="w-full h-auto" preserveAspectRatio="xMidYMid meet">
      {/* ── subtle grid ── */}
      <defs>
        <pattern id="bp-grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M40 0L0 0 0 40" fill="none" stroke="rgba(160,185,210,.06)" strokeWidth=".5"/>
        </pattern>
      </defs>
      <rect width="1000" height="560" fill="url(#bp-grid)"/>

      {/* ── zone highlights (under structure) ── */}
      {zoneGfx.map((z, i) => (
        <motion.path
          key={`area-${i}`}
          d={z.area}
          fill={i === active ? 'rgba(220,38,38,.07)' : 'transparent'}
          stroke={i === active ? 'rgba(220,38,38,.15)' : 'transparent'}
          strokeWidth="1"
          fillRule="nonzero"
          initial={false}
          animate={{ fill: i === active ? 'rgba(220,38,38,.07)' : 'rgba(220,38,38,0)', stroke: i === active ? 'rgba(220,38,38,.18)' : 'rgba(220,38,38,0)' }}
          transition={{ duration: 0.6 }}
        />
      ))}

      {/* ── house structure ── */}
      <g stroke={`${line}0.35)`} strokeWidth="1.5" fill="none" strokeLinejoin="round" strokeLinecap="round">
        {/* foundation / ground */}
        <line x1="60" y1={H.ground} x2="960" y2={H.ground}/>
        {/* house walls */}
        <rect x={H.left} y={H.eaveY} width={H.right-H.left} height={H.ground-H.eaveY} rx="1"/>
        {/* roof */}
        <polyline points={`${H.left-25},${H.eaveY} ${H.mid},${H.roofPeak} ${H.right+25},${H.eaveY}`}/>
        {/* upper floor */}
        <line x1={H.left} y1={H.floorY} x2={H.right} y2={H.floorY}/>
        {/* interior walls */}
        <line x1="430" y1={H.floorY} x2="430" y2={H.ground} strokeDasharray="4 4" stroke={`${line}0.2)`}/>
        <line x1="470" y1={H.eaveY} x2="470" y2={H.floorY} strokeDasharray="4 4" stroke={`${line}0.2)`}/>
        {/* garage */}
        <rect x={H.right} y={H.garageTop} width={H.garageR-H.right} height={H.ground-H.garageTop} rx="1"/>
        <line x1={H.right} y1={H.garageTop} x2={H.garageR} y2={H.garageTop}/>
        {/* garage door */}
        <rect x="745" y="330" width="140" height="170" rx="2" stroke={`${line}0.22)`}/>
        <line x1="745" y1="385" x2="885" y2="385" stroke={`${line}0.12)`}/>
        <line x1="745" y1="440" x2="885" y2="440" stroke={`${line}0.12)`}/>
        {/* front door */}
        <rect x="410" y="400" width="50" height="100" rx="1"/>
        {/* windows */}
        <rect x="260" y="370" width="65" height="55" rx="2" stroke={`${line}0.25)`}/>
        <rect x="540" y="370" width="65" height="55" rx="2" stroke={`${line}0.25)`}/>
        <rect x="270" y="210" width="55" height="48" rx="2" stroke={`${line}0.25)`}/>
        <rect x="545" y="215" width="50" height="40" rx="2" stroke={`${line}0.25)`}/>
        {/* chimney */}
        <rect x="340" y={H.roofPeak+20} width="28" height={H.eaveY-H.roofPeak-45} stroke={`${line}0.22)`}/>
      </g>

      {/* ── external equipment (always visible, dim) ── */}
      <g stroke={`${line}0.3)`} strokeWidth="1.2" fill="none">
        {/* service mast */}
        <line x1={H.mastX} y1={H.eaveY} x2={H.mastX} y2={H.mastTop}/>
        <line x1={H.mastX-8} y1={H.mastTop} x2={H.mastX+8} y2={H.mastTop}/>
        {/* panel box */}
        <rect x={H.panelX-12} y={H.panelY-20} width="24" height="42" rx="2" stroke={`${line}0.3)`}/>
        {/* generator */}
        <rect x={H.genX} y={H.genY} width="55" height="52" rx="3"/>
        <text x={H.genX+27} y={H.genY+30} textAnchor="middle" fill={`${line}0.25)`} fontSize="9" fontFamily="Inter">GEN</text>
        {/* heat pump */}
        <rect x={H.hpX} y={H.hpY} width="48" height="46" rx="3"/>
        <circle cx={H.hpX+24} cy={H.hpY+23} r="12" stroke={`${line}0.2)`}/>
        {/* underground trench (dashed) */}
        <line x1="0" y1={H.ground+18} x2={H.left} y2={H.ground+18} strokeDasharray="6 4" stroke={`${line}0.15)`}/>
      </g>

      {/* ── room labels (very subtle) ── */}
      <g fill="rgba(160,185,210,.18)" fontSize="10" fontFamily="Inter" fontWeight="500">
        <text x="300" y="445">Kitchen</text>
        <text x="530" y="445">Living</text>
        <text x="290" y="265">Bedroom</text>
        <text x="530" y="265">Bath</text>
        <text x="790" y="395">Garage</text>
      </g>

      {/* ── electrical traces (active zone) ── */}
      {zoneGfx.map((z, i) => (
        <motion.path
          key={`trace-${i}`}
          d={z.trace}
          fill="none"
          stroke="#dc2626"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={i === active ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
          transition={i === active ? { pathLength: { duration: 1.2, ease: 'easeInOut' }, opacity: { duration: 0.3 } } : { duration: 0.4 }}
          style={{ filter: i === active ? 'drop-shadow(0 0 6px rgba(220,38,38,.5))' : 'none' }}
        />
      ))}

      {/* ── panel node (always subtly visible, brighter when active) ── */}
      <motion.circle
        cx={H.panelX}
        cy={H.panelY}
        r="5"
        fill="#dc2626"
        animate={{ opacity: active >= 0 ? 1 : 0.3, r: active === 2 ? 8 : 5 }}
        transition={{ duration: 0.5 }}
        style={{ filter: 'drop-shadow(0 0 8px rgba(220,38,38,.6))' }}
      />

      {/* ── fixture dots for lighting zone ── */}
      {active === 6 && [
        [250, H.floorY+6], [350, H.floorY+6], [500, H.floorY+6], [620, H.floorY+6],
        [280, H.eaveY+6], [400, H.eaveY+6], [550, H.eaveY+6],
      ].map(([cx,cy], j) => (
        <motion.circle
          key={`light-${j}`}
          cx={cx} cy={cy} r="4"
          fill="#dc2626"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.8 }}
          transition={{ delay: 0.3 + j * 0.08 }}
          style={{ filter: 'drop-shadow(0 0 10px rgba(255,200,120,.6))' }}
        />
      ))}

      {/* ── outlet symbols for outlet zone ── */}
      {active === 7 && [
        [H.left+5, H.ground-55], [430+5, H.ground-55], [H.right-10, H.ground-55],
        [H.left+5, H.eaveY+60], [470+5, H.eaveY+60],
      ].map(([cx,cy], j) => (
        <motion.rect
          key={`outlet-${j}`}
          x={cx-4} y={cy-5} width="8" height="10" rx="1.5"
          fill="none" stroke="#dc2626" strokeWidth="1.5"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.8 }}
          transition={{ delay: 0.3 + j * 0.08 }}
          style={{ filter: 'drop-shadow(0 0 6px rgba(220,38,38,.5))' }}
        />
      ))}
    </svg>
  );
}

/* ── scroll-driven power plan (desktop) ──────────────────── */
function PowerPlan() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });
  const [active, setActive] = useState(-1);

  useEffect(() => {
    return scrollYProgress.on('change', (v) => {
      const idx = Math.floor(v * zones.length);
      setActive(Math.min(idx, zones.length - 1));
    });
  }, [scrollYProgress]);

  const z = active >= 0 ? zones[active] : null;

  return (
    <div ref={containerRef} style={{ height: `${zones.length * 55 + 100}vh` }}>
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-12 gap-8 items-center">
            {/* Blueprint */}
            <div className="col-span-7 relative">
              <PropertyBlueprint active={active} />
              {/* Floating zone label on diagram */}
              {z && (
                <motion.div
                  key={active}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute px-3 py-1.5 rounded-lg bg-brand-red/90 backdrop-blur-sm text-white text-xs font-bold tracking-wide shadow-lg pointer-events-none"
                  style={{ left: `${zoneGfx[active].lx}%`, top: `${zoneGfx[active].ly}%` }}
                >
                  {z.short}
                </motion.div>
              )}
            </div>

            {/* Info panel */}
            <div className="col-span-5 pl-4">
              <p className="flex items-center gap-3 text-brand-red font-semibold tracking-[.2em] uppercase text-[11px] mb-2">
                <span className="w-6 h-px bg-brand-red" />
                Residential · Zone {active + 1} of {zones.length}
              </p>
              <div className="min-h-[180px]">
                {z ? (
                  <motion.div key={active} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                    <h3 className="font-display text-3xl lg:text-4xl font-extrabold text-white leading-tight mb-4">{z.title}</h3>
                    <p className="text-slate-400 text-lg leading-relaxed font-light">{z.desc}</p>
                  </motion.div>
                ) : (
                  <div>
                    <h3 className="font-display text-3xl lg:text-4xl font-extrabold text-white leading-tight mb-4">The Power Plan</h3>
                    <p className="text-slate-400 text-lg leading-relaxed font-light">Scroll to explore how Gates Electric powers every part of your property.</p>
                  </div>
                )}
              </div>
              {/* Progress dots */}
              <div className="flex gap-2 mt-8">
                {zones.map((_, i) => (
                  <div key={i} className={`h-1 rounded-full transition-all duration-300 ${i === active ? 'w-8 bg-brand-red' : i < active ? 'w-3 bg-brand-red/40' : 'w-3 bg-white/10'}`} />
                ))}
              </div>
            </div>
          </div>
          {/* Scroll hint */}
          {active < 1 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500 text-xs">
              <span className="tracking-widest uppercase">Scroll to explore</span>
              <ChevronDown className="w-5 h-5 animate-bounce" />
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── mobile services (sequential) ────────────────────────── */
function MobileServices() {
  return (
    <div className="space-y-0">
      {zones.map((z, i) => (
        <motion.div
          key={z.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.4 }}
          className="relative border-b border-white/[.06] px-5 py-8"
        >
          <div className="flex items-start gap-4">
            <div className="flex flex-col items-center flex-shrink-0">
              <div className="w-3 h-3 rounded-full bg-brand-red shadow-[0_0_10px_rgba(220,38,38,.5)]" />
              {i < zones.length - 1 && <div className="w-px flex-1 bg-brand-red/20 mt-2" />}
            </div>
            <div>
              <p className="text-brand-red text-[10px] font-semibold tracking-[.2em] uppercase mb-1">{z.short}</p>
              <h3 className="font-display font-bold text-lg text-white mb-2">{z.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{z.desc}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

/* ── commercial editorial panels ─────────────────────────── */
const commercial = [
  { title: 'Commercial Fit-Outs', desc: 'Full electrical builds for offices, shops, and restaurants. Permits, plans, and installation from rough-in to finishing.', img: '/gallery-2.jpg' },
  { title: 'Retail & Storefront', desc: 'Optimized lighting, signage power, and display circuits designed to make your space look its best and run efficiently.', img: '/gallery-1.jpg' },
  { title: 'Maintenance & Service Calls', desc: 'Troubleshooting, repairs, and routine maintenance for commercial buildings. Reliable response when you need it.', img: '/gallery-3.jpg' },
];

/* ── trust data ──────────────────────────────────────────── */
const trustItems = [
  { icon: Shield, label: 'Licensed' },
  { icon: FileCheck, label: 'Insured' },
  { icon: CheckCircle2, label: 'Code Compliant' },
  { icon: Wrench, label: 'Clean Workmanship' },
  { icon: MapPin, label: 'South Shore Service' },
  { icon: MessageCircle, label: 'Clear Communication' },
];

/* ═══ PAGE ════════════════════════════════════════════════ */
export default function ServicesPage() {
  return (
    <>
      {/* ═══ HERO ═══ */}
      <ElectricHero full={false}>
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 pt-28 pb-4 md:pt-28 text-center md:text-left">
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="flex items-center justify-center md:justify-start gap-3 text-brand-red font-semibold tracking-[.24em] uppercase text-[11px] mb-4">
            <span className="w-7 h-px bg-brand-red" />The Power Plan
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.6 }}
            className="font-display text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.02]">
            Every Circuit.<br className="hidden md:block" /> Every Room.<br className="hidden md:block" /> <span className="text-brand-red">Covered.</span>
          </motion.h1>
        </div>
      </ElectricHero>

      {/* ═══ RESIDENTIAL — POWER PLAN ═══ */}
      <section className="relative bg-brand-dark overflow-hidden">
        {/* Section intro */}
        <div className="max-w-5xl mx-auto px-5 sm:px-6 lg:px-8 pt-24 pb-12 md:pb-4 text-center md:text-left">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="text-brand-red font-semibold tracking-[.2em] uppercase text-xs mb-3">Residential Services</p>
            <h2 className="font-display text-3xl md:text-5xl font-extrabold text-white mb-4">Your Home, Fully Powered</h2>
            <p className="text-slate-400 text-lg leading-relaxed max-w-xl font-light">
              Explore how Gates Electric handles every electrical zone of your property — from the service entrance to the last outlet.
            </p>
          </motion.div>
        </div>

        {/* Desktop: scroll-pinned interactive blueprint */}
        <div className="hidden lg:block">
          <PowerPlan />
        </div>

        {/* Mobile/tablet: sequential list */}
        <div className="lg:hidden pb-16">
          <MobileServices />
        </div>
      </section>

      {/* ═══ COMMERCIAL ═══ */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-28">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-20">
            <p className="text-brand-red font-semibold tracking-[.2em] uppercase text-xs mb-3">Commercial Services</p>
            <h2 className="font-display text-3xl md:text-5xl font-extrabold text-slate-900">Built for Business</h2>
          </motion.div>

          <div className="space-y-8">
            {commercial.map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`group relative grid grid-cols-1 md:grid-cols-2 rounded-3xl overflow-hidden min-h-[320px] ${i % 2 === 1 ? 'md:direction-rtl' : ''}`}
              >
                {/* Image side */}
                <div className={`relative overflow-hidden ${i % 2 === 1 ? 'md:order-2' : ''}`}>
                  <img src={c.img} alt={c.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent mix-blend-multiply" />
                  {/* Blueprint overlay pattern */}
                  <svg className="absolute inset-0 w-full h-full opacity-[.08]">
                    <defs><pattern id={`cg-${i}`} width="30" height="30" patternUnits="userSpaceOnUse"><path d="M30 0L0 0 0 30" fill="none" stroke="#dc2626" strokeWidth=".5"/></pattern></defs>
                    <rect width="100%" height="100%" fill={`url(#cg-${i})`}/>
                  </svg>
                </div>
                {/* Content side */}
                <div className={`flex flex-col justify-center p-10 md:p-14 bg-slate-50 ${i % 2 === 1 ? 'md:order-1' : ''}`} style={{ direction: 'ltr' }}>
                  <div className="w-12 h-1 bg-brand-red rounded-full mb-6" />
                  <h3 className="font-display text-2xl md:text-3xl font-extrabold text-slate-900 mb-4">{c.title}</h3>
                  <p className="text-slate-500 text-lg leading-relaxed">{c.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TRUST ═══ */}
      <section className="bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-20">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <p className="text-brand-red font-semibold tracking-[.2em] uppercase text-xs mb-3">Why Gates Electric</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold text-slate-900">The Standard You Can Count On</h2>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-4">
            {trustItems.map((t, i) => {
              const Icon = t.icon;
              return (
                <motion.div
                  key={t.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="w-12 h-12 rounded-xl bg-white border border-slate-100 shadow-sm flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-brand-red" />
                  </div>
                  <p className="font-display font-bold text-sm text-slate-800">{t.label}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ CTA — Circuit Completes ═══ */}
      <section className="relative py-32 bg-brand-dark overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-brand-red/[.05] blur-[160px] pointer-events-none" />

        {/* Circuit trace leading to button */}
        <div className="absolute left-1/2 top-0 -translate-x-1/2 flex flex-col items-center pointer-events-none">
          <motion.div initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true }}
            transition={{ duration: 1.2 }} className="w-px h-24 bg-gradient-to-b from-brand-red/0 via-brand-red/40 to-brand-red origin-top" />
          <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }}
            transition={{ delay: 0.8, type: 'spring' }} className="w-3 h-3 rounded-full bg-brand-red shadow-[0_0_14px_rgba(220,38,38,.6)]" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-5 text-center pt-20">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }}>
            <p className="text-brand-red font-semibold tracking-[.2em] uppercase text-xs mb-4">The Circuit Completes Here</p>
            <h2 className="font-display text-3xl md:text-5xl font-extrabold text-white mb-5 leading-tight">
              Ready to Power Your Next Project?
            </h2>
            <p className="text-lg md:text-xl text-slate-400 mb-12 leading-relaxed font-light max-w-lg mx-auto">
              Every great project starts with a conversation. Get a free, no-obligation quote from Gates Electric.
            </p>
            <Link
              to="/contact"
              className="group relative inline-flex items-center gap-3 bg-brand-red hover:bg-brand-red-hover text-white px-12 py-5 rounded-2xl font-bold text-lg transition-all shadow-[0_10px_50px_-8px_rgba(226,32,32,0.6)] hover:shadow-[0_14px_60px_-6px_rgba(226,32,32,0.75)]"
            >
              Request a Quote
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              {/* Glow ring */}
              <span className="absolute inset-0 rounded-2xl border-2 border-brand-red/50 animate-ping opacity-20 pointer-events-none" />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
