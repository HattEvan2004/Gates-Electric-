import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, FileCheck, MapPin, Wrench, MessageCircle, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ElectricHero from '../components/ElectricHero';

/* ═══════════════════════════════════════════════════════════
   THE POWER PLAN — Services Page
   Gates Electric powers the entire property.
   ═══════════════════════════════════════════════════════════ */

interface Zone {
  title: string;
  short: string;
  desc: string;
  includes: string[];
  cta: string;
}

const zones: Zone[] = [
  { title: 'New Home Builds', short: 'Full Structure',
    desc: 'Complete electrical rough-ins and finishing for custom South Shore homes, planned and installed to code.',
    includes: ['Full rough-in wiring', 'Panel & service setup', 'Fixtures & devices', 'Inspection & certification'],
    cta: 'Plan Your Build' },
  { title: 'Renovations', short: 'Interior Spaces',
    desc: 'Clean, on-schedule electrical work for kitchens, baths, basements, and additions.',
    includes: ['Kitchen & bath circuits', 'Added outlets & lighting', 'Panel & circuit updates', 'Code corrections'],
    cta: 'Start Your Reno' },
  { title: 'Panel Upgrades', short: 'Electrical Panel',
    desc: 'Modern panels for safe, expandable capacity that meet current code and power demands.',
    includes: ['Breaker box replacement', 'Capacity & load upgrade', 'Surge protection options', 'Code-compliant install'],
    cta: 'Upgrade Your Panel' },
  { title: 'Service Upgrades', short: 'Service Entrance',
    desc: 'Right-sized service entrances that handle today\u2019s household loads safely.',
    includes: ['100A\u2013200A upgrades', 'New meter base & mast', 'Utility coordination', 'Permits & inspection'],
    cta: 'Upgrade Your Service' },
  { title: 'Generator Systems', short: 'Backup Power',
    desc: 'Backup power solutions for South Shore homes during outages.',
    includes: ['Transfer switch installation', 'Generator panel setup', 'Load planning', 'Code-compliant wiring'],
    cta: 'Plan Backup Power' },
  { title: 'Heat Pump Wiring', short: 'Heat Pump',
    desc: 'Dedicated, correctly-sized circuits for efficient heat pumps and mini-splits.',
    includes: ['Sized dedicated circuit', 'Outdoor disconnect', 'Load calculations', 'Mini-split wiring'],
    cta: 'Wire Your Heat Pump' },
  { title: 'Lighting', short: 'Lighting Zones',
    desc: 'Layered lighting designed for every space, inside and out.',
    includes: ['Recessed & track lighting', 'Landscape & exterior', 'Dimmers & controls', 'Layout design'],
    cta: 'Light Your Space' },
  { title: 'Plugs & Outlets', short: 'Outlets',
    desc: 'Safe, code-current outlets exactly where you need them.',
    includes: ['GFCI & tamper-resistant', 'USB & 240V outlets', 'Added receptacles', 'Code upgrades'],
    cta: 'Add Outlets' },
  { title: 'Underground Service', short: 'Underground',
    desc: 'Reliable buried lines between buildings, garages, and service entrances.',
    includes: ['Trenching & conduit', 'Buried feeders', 'Outbuilding power', 'Repairs & locates'],
    cta: 'Run Underground Power' },
  { title: 'Appliance Circuits', short: 'Appliances',
    desc: 'Dedicated circuits for ranges, dryers, hot tubs, EV chargers, and heavy-draw appliances.',
    includes: ['Range & dryer circuits', 'Hot tub & EV chargers', 'Dedicated 240V', 'Load balancing'],
    cta: 'Power Your Appliances' },
];

/* ── SVG coordinates ─────────────────────────────────────── */
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

const zoneGfx: { area: string; trace: string }[] = [
  { area: `M${H.left},${H.eaveY} L${H.mid},${H.roofPeak} L${H.right},${H.eaveY} L${H.garageR},${H.garageTop} L${H.garageR},${H.ground} L${H.left},${H.ground} Z`,
    trace: `M${H.panelX},${H.panelY} L${H.panelX},${H.floorY} L${H.left+20},${H.floorY} M${H.panelX},${H.panelY} L${H.panelX},${H.ground-20} M${H.panelX},${H.floorY} L${H.panelX},${H.eaveY+10}` },
  { area: `M${H.left},${H.floorY} L430,${H.floorY} L430,${H.ground} L${H.left},${H.ground} Z M420,${H.eaveY} L${H.right},${H.eaveY} L${H.right},${H.floorY} L420,${H.floorY} Z`,
    trace: `M${H.panelX},${H.panelY} L430,${H.panelY} L300,${H.panelY} L300,${H.floorY+10} M${H.panelX},${H.panelY} L${H.panelX},${H.floorY} L560,${H.floorY} L560,${H.eaveY+20}` },
  { area: `M${H.panelX-22},${H.panelY-32} L${H.panelX+32},${H.panelY-32} L${H.panelX+32},${H.panelY+52} L${H.panelX-22},${H.panelY+52} Z`,
    trace: `M${H.panelX},${H.panelY-30} L${H.panelX},${H.eaveY+5} M${H.panelX},${H.panelY+50} L${H.panelX},${H.ground-20}` },
  { area: `M${H.mastX-14},${H.mastTop-5} L${H.mastX+14},${H.mastTop-5} L${H.mastX+14},${H.eaveY+5} L${H.mastX-14},${H.eaveY+5} Z`,
    trace: `M${H.mastX},${H.mastTop} L${H.mastX},${H.eaveY} L${H.panelX},${H.eaveY} L${H.panelX},${H.panelY}` },
  { area: `M${H.genX-18},${H.genY-12} L${H.genX+75},${H.genY-12} L${H.genX+75},${H.ground+5} L${H.genX-18},${H.ground+5} Z`,
    trace: `M${H.panelX},${H.panelY} L${H.left},${H.panelY} L${H.left},${H.ground} L${H.genX+28},${H.ground} L${H.genX+28},${H.genY}` },
  { area: `M${H.hpX-18},${H.hpY-12} L${H.hpX+68},${H.hpY-12} L${H.hpX+68},${H.ground+5} L${H.hpX-18},${H.ground+5} Z`,
    trace: `M${H.panelX},${H.panelY} L${H.hpX+24},${H.panelY} L${H.hpX+24},${H.hpY}` },
  { area: `M${H.left+10},${H.floorY-2} L${H.right-10},${H.floorY-2} L${H.right-10},${H.floorY+14} L${H.left+10},${H.floorY+14} Z M${H.left+10},${H.eaveY-2} L${H.right-10},${H.eaveY-2} L${H.right-10},${H.eaveY+14} L${H.left+10},${H.eaveY+14} Z`,
    trace: `M${H.panelX},${H.panelY} L${H.panelX},${H.floorY+6} L${H.left+60},${H.floorY+6} M${H.panelX},${H.floorY} L${H.panelX},${H.eaveY+6} L${H.left+60},${H.eaveY+6}` },
  { area: `M${H.left},${H.ground-75} L${H.left+18},${H.ground-75} L${H.left+18},${H.ground-38} L${H.left},${H.ground-38} Z M${H.right-18},${H.ground-75} L${H.right},${H.ground-75} L${H.right},${H.ground-38} L${H.right-18},${H.ground-38} Z M428,${H.ground-75} L448,${H.ground-75} L448,${H.ground-38} L428,${H.ground-38} Z`,
    trace: `M${H.panelX},${H.panelY} L${H.panelX},${H.ground-56} L${H.right},${H.ground-56} M${H.panelX},${H.ground-56} L430,${H.ground-56} L${H.left},${H.ground-56}` },
  { area: `M0,${H.ground+2} L${H.left},${H.ground+2} L${H.left},${H.ground+35} L0,${H.ground+35} Z`,
    trace: `M0,${H.ground+18} L${H.left},${H.ground+18} L${H.left},${H.ground} L${H.panelX},${H.ground} L${H.panelX},${H.panelY+50}` },
  { area: `M${H.left},${H.ground-105} L385,${H.ground-105} L385,${H.ground} L${H.left},${H.ground} Z`,
    trace: `M${H.panelX},${H.panelY} L430,${H.panelY} L280,${H.panelY} L280,${H.ground-20} M350,${H.panelY} L350,${H.ground-20}` },
];

/* ── interactive property blueprint ──────────────────────── */
function PropertyBlueprint({ active }: { active: number }) {
  const ln = 'rgba(170,196,222,';
  const trace = zoneGfx[active].trace;
  return (
    <svg viewBox="0 0 1000 560" className="w-full h-auto" preserveAspectRatio="xMidYMid meet">
      <defs>
        <pattern id="bp-fine" width="25" height="25" patternUnits="userSpaceOnUse">
          <path d="M25 0L0 0 0 25" fill="none" stroke="rgba(170,196,222,.05)" strokeWidth=".5" />
        </pattern>
        <pattern id="bp-major" width="100" height="100" patternUnits="userSpaceOnUse">
          <path d="M100 0L0 0 0 100" fill="none" stroke="rgba(170,196,222,.08)" strokeWidth=".7" />
        </pattern>
        <filter id="redGlow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="3.5" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <radialGradient id="ambient" cx="50%" cy="55%" r="55%">
          <stop offset="0%" stopColor="rgba(220,38,38,.16)" />
          <stop offset="100%" stopColor="rgba(220,38,38,0)" />
        </radialGradient>
        <style>{`
          @keyframes bpflow { to { stroke-dashoffset: -240; } }
          .bpflow { stroke-dasharray: 6 18; animation: bpflow 6s linear infinite; }
        `}</style>
      </defs>

      <rect width="1000" height="560" fill="url(#bp-fine)" />
      <rect width="1000" height="560" fill="url(#bp-major)" />
      <ellipse cx="500" cy="320" rx="420" ry="240" fill="url(#ambient)" />

      {/* slow ambient circuit lines in the background */}
      <g stroke="rgba(220,38,38,.18)" strokeWidth="1" fill="none">
        <path className="bpflow" d="M0,90 L250,90 L280,120 L1000,120" style={{ animationDuration: '9s' }} />
        <path className="bpflow" d="M1000,520 L780,520 L750,492 L0,492" style={{ animationDuration: '11s' }} />
      </g>

      {/* zone highlights — active zone softly pulses */}
      {zoneGfx.map((z, i) =>
        i === active ? (
          <motion.path key={`a${i}`} d={z.area} fillRule="nonzero" stroke="rgba(220,38,38,.35)" strokeWidth="1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, fill: ['rgba(220,38,38,.06)', 'rgba(220,38,38,.16)', 'rgba(220,38,38,.06)'] }}
            transition={{ opacity: { duration: 0.4 }, fill: { duration: 2.6, repeat: Infinity, ease: 'easeInOut' } }} />
        ) : (
          <path key={`a${i}`} d={z.area} fill="rgba(220,38,38,0)" />
        )
      )}

      {/* house structure (brighter) */}
      <g stroke={`${ln}0.5)`} strokeWidth="1.6" fill="none" strokeLinejoin="round" strokeLinecap="round">
        <line x1="60" y1={H.ground} x2="960" y2={H.ground} stroke={`${ln}0.6)`} />
        <rect x={H.left} y={H.eaveY} width={H.right - H.left} height={H.ground - H.eaveY} rx="1" />
        <polyline points={`${H.left - 25},${H.eaveY} ${H.mid},${H.roofPeak} ${H.right + 25},${H.eaveY}`} />
        <line x1={H.left} y1={H.floorY} x2={H.right} y2={H.floorY} />
        <line x1="430" y1={H.floorY} x2="430" y2={H.ground} strokeDasharray="4 4" stroke={`${ln}0.25)`} />
        <line x1="470" y1={H.eaveY} x2="470" y2={H.floorY} strokeDasharray="4 4" stroke={`${ln}0.25)`} />
        <rect x={H.right} y={H.garageTop} width={H.garageR - H.right} height={H.ground - H.garageTop} rx="1" />
        <rect x="745" y="330" width="140" height="170" rx="2" stroke={`${ln}0.3)`} />
        <line x1="745" y1="390" x2="885" y2="390" stroke={`${ln}0.16)`} />
        <line x1="745" y1="445" x2="885" y2="445" stroke={`${ln}0.16)`} />
        <rect x="410" y="400" width="50" height="100" rx="1" />
        <rect x="260" y="370" width="65" height="55" rx="2" stroke={`${ln}0.38)`} />
        <rect x="540" y="370" width="65" height="55" rx="2" stroke={`${ln}0.38)`} />
        <rect x="270" y="210" width="55" height="48" rx="2" stroke={`${ln}0.38)`} />
        <rect x="545" y="215" width="50" height="40" rx="2" stroke={`${ln}0.38)`} />
        <rect x="340" y={H.roofPeak + 20} width="28" height={H.eaveY - H.roofPeak - 45} stroke={`${ln}0.3)`} />
      </g>

      {/* external equipment */}
      <g stroke={`${ln}0.4)`} strokeWidth="1.3" fill="none">
        <line x1={H.mastX} y1={H.eaveY} x2={H.mastX} y2={H.mastTop} />
        <line x1={H.mastX - 8} y1={H.mastTop} x2={H.mastX + 8} y2={H.mastTop} />
        <rect x={H.panelX - 12} y={H.panelY - 20} width="24" height="42" rx="2" />
        <line x1="0" y1={H.ground + 18} x2={H.left} y2={H.ground + 18} strokeDasharray="6 4" stroke={`${ln}0.18)`} />
        <rect x={H.hpX} y={H.hpY} width="48" height="46" rx="3" />
        <circle cx={H.hpX + 24} cy={H.hpY + 23} r="12" stroke={`${ln}0.24)`} />
      </g>

      {/* generator / backup-power zone — always legible, emphasized when active */}
      <g>
        <motion.rect x={H.genX - 4} y={H.genY - 16} width="63" height="72" rx="5" fill="rgba(220,38,38,.05)"
          stroke="#dc2626"
          animate={{ strokeOpacity: active === 4 ? 0.9 : 0.32, filter: active === 4 ? 'drop-shadow(0 0 10px rgba(220,38,38,.6))' : 'none' }}
          transition={{ duration: 0.4 }} strokeWidth="1.4" />
        <rect x={H.genX} y={H.genY} width="55" height="40" rx="3" fill="none" stroke={`${ln}0.45)`} strokeWidth="1.2" />
        <path d={`M${H.genX + 30},${H.genY + 8} l-9,13 h7 l-4,11 12,-15 h-7 z`} fill="#dc2626"
          opacity={active === 4 ? 1 : 0.55} style={{ filter: active === 4 ? 'drop-shadow(0 0 6px rgba(220,38,38,.8))' : 'none' }} />
        <text x={H.genX + 27} y={H.genY + 50} textAnchor="middle" fill={active === 4 ? '#fca5a5' : `${ln}0.4)`} fontSize="8.5" fontFamily="Inter" fontWeight="700" letterSpacing="1">BACKUP</text>
      </g>

      {/* room labels */}
      <g fill="rgba(170,196,222,.22)" fontSize="10" fontFamily="Inter" fontWeight="500">
        <text x="300" y="445">Kitchen</text>
        <text x="535" y="445">Living</text>
        <text x="290" y="268">Bedroom</text>
        <text x="535" y="262">Bath</text>
        <text x="800" y="400">Garage</text>
      </g>

      {/* active circuit — soft glow underlay + energized bright line */}
      <motion.path key={`glow${active}`} d={trace} fill="none" stroke="rgba(220,38,38,.5)" strokeWidth="7"
        strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'url(#redGlow)' }}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: [0.35, 0.7, 0.35] }}
        transition={{ pathLength: { duration: 0.9, ease: 'easeInOut' }, opacity: { duration: 2.4, repeat: Infinity, ease: 'easeInOut' } }} />
      <motion.path key={`line${active}`} d={trace} fill="none" stroke="#ff4d4d" strokeWidth="2.2"
        strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'drop-shadow(0 0 4px rgba(255,80,80,.8))' }}
        initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }}
        transition={{ pathLength: { duration: 0.9, ease: 'easeInOut' }, opacity: { duration: 0.25 } }} />

      {/* animated current dots travelling along the active circuit */}
      {[0, 1, 2].map((k) => (
        <circle key={`dot${active}-${k}`} r="3.1" fill="#fff" style={{ filter: 'drop-shadow(0 0 5px rgba(255,90,90,1))' }}>
          <animateMotion dur="2.1s" repeatCount="indefinite" begin={`-${k * 0.7}s`} path={trace} />
        </circle>
      ))}

      {/* panel node — energized core */}
      <circle cx={H.panelX} cy={H.panelY} r="11" fill="rgba(220,38,38,.18)">
        <animate attributeName="r" values="9;13;9" dur="2.4s" repeatCount="indefinite" />
        <animate attributeName="opacity" values=".5;.15;.5" dur="2.4s" repeatCount="indefinite" />
      </circle>
      <circle cx={H.panelX} cy={H.panelY} r="5" fill="#ff4d4d" style={{ filter: 'drop-shadow(0 0 8px rgba(255,80,80,.9))' }} />

      {/* light fixtures (Lighting zone) */}
      {active === 6 && [[250, H.floorY + 6], [350, H.floorY + 6], [500, H.floorY + 6], [620, H.floorY + 6], [280, H.eaveY + 6], [400, H.eaveY + 6], [550, H.eaveY + 6]].map(([cx, cy], j) => (
        <motion.circle key={`lf${j}`} cx={cx} cy={cy} r="4" fill="#ffd27a"
          initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 0.9 }}
          transition={{ delay: 0.2 + j * 0.06 }}
          style={{ filter: 'drop-shadow(0 0 10px rgba(255,200,120,.7))' }} />
      ))}

      {/* outlets (Plugs & Outlets zone) */}
      {active === 7 && [[H.left + 5, H.ground - 56], [435, H.ground - 56], [H.right - 12, H.ground - 56]].map(([cx, cy], j) => (
        <motion.rect key={`ol${j}`} x={cx - 4} y={cy - 5} width="8" height="10" rx="1.5"
          fill="none" stroke="#ff4d4d" strokeWidth="1.5"
          initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 0.9 }}
          transition={{ delay: 0.2 + j * 0.08 }}
          style={{ filter: 'drop-shadow(0 0 6px rgba(220,38,38,.6))' }} />
      ))}
    </svg>
  );
}

/* ── commercial ──────────────────────────────────────────── */
const commercial = [
  { title: 'Commercial Fit-Outs', desc: 'Full electrical builds for offices, shops, and restaurants. Permits, plans, and installation from rough-in to finishing.', img: '/gallery-2.jpg' },
  { title: 'Retail & Storefront', desc: 'Optimized lighting, signage power, and display circuits designed to make your space look its best.', img: '/gallery-1.jpg' },
  { title: 'Maintenance & Service Calls', desc: 'Troubleshooting, repairs, and routine maintenance for commercial buildings. Reliable response when you need it.', img: '/gallery-3.jpg' },
];

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
  const [active, setActive] = useState(0);

  return (
    <>
      {/* ═══ HERO (shared internal-page system) ═══ */}
      <ElectricHero full={false}>
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 pt-28 text-center">
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-brand-red font-semibold tracking-[.15em] uppercase text-xs mb-3">
            Our Services
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.6 }}
            className="font-display text-4xl md:text-6xl font-extrabold text-white">
            Services
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
            className="mt-5 text-lg text-slate-400 font-light max-w-xl mx-auto leading-relaxed">
            Every circuit, every room — residential and commercial work, fully covered.
          </motion.p>
        </div>
      </ElectricHero>

      {/* ═══ RESIDENTIAL — INTERACTIVE BLUEPRINT ═══ */}
      <section className="relative bg-brand-dark py-20 md:py-28 overflow-hidden">
        {/* smoother transition from navbar/hero into the dark section */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-red/40 to-transparent" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-32 bg-brand-red/[.07] blur-[80px] pointer-events-none" />
        {/* soft red ambient glow behind the diagram */}
        <div className="absolute top-1/2 left-[28%] -translate-x-1/2 -translate-y-1/2 w-[680px] h-[680px] rounded-full bg-brand-red/[.06] blur-[150px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          {/* Section header */}
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8 text-center md:text-left">
            <p className="text-brand-red font-semibold tracking-[.2em] uppercase text-xs mb-3">Residential Services</p>
            <h2 className="font-display text-3xl md:text-5xl font-extrabold text-white mb-3">Your Home, Fully Powered</h2>
            <p className="text-slate-400 text-lg font-light max-w-lg mx-auto md:mx-0">Select a powered zone to see how Gates Electric energizes that part of your property.</p>
          </motion.div>

          {/* trust / value strip */}
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
            className="flex flex-wrap items-center justify-center md:justify-start gap-x-3 gap-y-2 mb-14 text-[13px] font-medium text-slate-300">
            {['Residential', 'Commercial', 'South Shore Nova Scotia', 'Licensed Electrical Work'].map((t, i) => (
              <span key={t} className="flex items-center gap-3">
                {i > 0 && <span className="w-1 h-1 rounded-full bg-brand-red/70" />}
                <span className={i === 3 ? 'text-white' : ''}>{t}</span>
              </span>
            ))}
          </motion.div>

          {/* Blueprint + service selector */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Blueprint diagram */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-7 relative rounded-2xl border border-white/[.08] bg-gradient-to-b from-[#0e0f15] to-[#0a0a0e] p-4 md:p-6 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)]"
            >
              {/* inner top sheen */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              <PropertyBlueprint active={active} />
              {/* Active zone label overlay */}
              <div className="absolute top-4 right-4 md:top-6 md:right-6">
                <AnimatePresence mode="wait">
                  <motion.div key={active} initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-brand-red text-white text-sm font-bold tracking-wide shadow-[0_8px_24px_-6px_rgba(220,38,38,.6)]">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                    {zones[active].short}
                  </motion.div>
                </AnimatePresence>
              </div>
              {/* live status footer */}
              <div className="flex items-center justify-between px-1 pt-3 text-[11px] tracking-wide text-slate-500">
                <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,.8)]" />System Energized</span>
                <span>Gates Electric · Service Panel</span>
              </div>
            </motion.div>

            {/* Service selector + detail */}
            <div className="lg:col-span-5">
              {/* Service tabs — premium, powered when active */}
              <div className="grid grid-cols-2 gap-2.5 mb-8">
                {zones.map((z, i) => (
                  <button
                    key={z.title}
                    onClick={() => setActive(i)}
                    className={`group relative text-left px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 overflow-hidden ${
                      i === active
                        ? 'bg-gradient-to-br from-brand-red to-[#b91c1c] text-white shadow-[0_10px_30px_-8px_rgba(220,38,38,.7)] ring-1 ring-red-400/40 -translate-y-0.5'
                        : 'bg-white/[.04] text-slate-300 hover:bg-white/[.08] hover:text-white hover:-translate-y-0.5 border border-white/[.07] hover:border-white/[.14] hover:shadow-lg'
                    }`}
                  >
                    {i === active && (
                      <motion.span layoutId="powerDot" className="absolute left-2 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,.9)]" />
                    )}
                    <span className={i === active ? 'pl-3.5 block transition-all' : 'block'}>{z.title}</span>
                  </button>
                ))}
              </div>

              {/* Active service detail — premium card */}
              <AnimatePresence mode="wait">
                <motion.div key={active} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3 }}
                  className="relative bg-gradient-to-b from-white/[.06] to-white/[.02] border border-white/[.1] rounded-2xl p-6 md:p-8 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.9)] overflow-hidden"
                >
                  <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-brand-red/15 blur-3xl pointer-events-none" />
                  <div className="relative">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-2.5 h-2.5 rounded-full bg-brand-red shadow-[0_0_12px_rgba(220,38,38,.7)] animate-pulse" />
                      <p className="text-brand-red text-xs font-semibold tracking-[.15em] uppercase">Powered Zone {active + 1} of {zones.length}</p>
                    </div>
                    <h3 className="font-display text-2xl md:text-3xl font-extrabold text-white mb-3">{zones[active].title}</h3>
                    <p className="text-slate-400 text-base leading-relaxed mb-6">{zones[active].desc}</p>

                    <p className="text-[11px] font-semibold tracking-[.18em] uppercase text-slate-500 mb-3">What&rsquo;s Included</p>
                    <ul className="space-y-2.5 mb-7">
                      {zones[active].includes.map((item, j) => (
                        <motion.li key={item} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.12 + j * 0.06 }}
                          className="flex items-center gap-3 text-slate-200 text-[15px]">
                          <CheckCircle2 className="w-[18px] h-[18px] text-brand-red flex-none" />
                          {item}
                        </motion.li>
                      ))}
                    </ul>

                    <Link to="/contact"
                      className="group inline-flex items-center gap-2.5 bg-brand-red hover:bg-brand-red-hover text-white px-6 py-3.5 rounded-xl font-bold text-[15px] transition-all shadow-[0_10px_36px_-10px_rgba(226,32,32,.7)] hover:shadow-[0_14px_44px_-8px_rgba(226,32,38,.85)]">
                      {zones[active].cta}
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ COMMERCIAL ═══ */}
      <section className="bg-white py-28">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-20">
            <p className="text-brand-red font-semibold tracking-[.2em] uppercase text-xs mb-3">Commercial Services</p>
            <h2 className="font-display text-3xl md:text-5xl font-extrabold text-slate-900">Built for Business</h2>
          </motion.div>

          <div className="space-y-8">
            {commercial.map((c, i) => (
              <motion.div key={c.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`group relative grid grid-cols-1 md:grid-cols-2 rounded-3xl overflow-hidden min-h-[300px]`}>
                <div className={`relative overflow-hidden ${i % 2 === 1 ? 'md:order-2' : ''}`}>
                  <img src={c.img} alt={c.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"/>
                  <div className="absolute inset-0 bg-black/30 mix-blend-multiply"/>
                  <svg className="absolute inset-0 w-full h-full opacity-[.06]"><defs><pattern id={`cg${i}`} width="30" height="30" patternUnits="userSpaceOnUse"><path d="M30 0L0 0 0 30" fill="none" stroke="#dc2626" strokeWidth=".5"/></pattern></defs><rect width="100%" height="100%" fill={`url(#cg${i})`}/></svg>
                </div>
                <div className={`flex flex-col justify-center p-10 md:p-14 bg-slate-50 ${i % 2 === 1 ? 'md:order-1' : ''}`}>
                  <div className="w-12 h-1 bg-brand-red rounded-full mb-6"/>
                  <h3 className="font-display text-2xl md:text-3xl font-extrabold text-slate-900 mb-4">{c.title}</h3>
                  <p className="text-slate-500 text-lg leading-relaxed">{c.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TRUST ═══ */}
      <section className="bg-slate-50 border-y border-slate-100 py-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <p className="text-brand-red font-semibold tracking-[.2em] uppercase text-xs mb-3">Why Gates Electric</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold text-slate-900">The Standard You Can Count On</h2>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-4">
            {trustItems.map((t, i) => {
              const Icon = t.icon;
              return (
                <motion.div key={t.label} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }} className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-xl bg-white border border-slate-100 shadow-sm flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-brand-red"/>
                  </div>
                  <p className="font-display font-bold text-sm text-slate-800">{t.label}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="relative py-32 bg-brand-dark overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-brand-red/[.05] blur-[160px] pointer-events-none"/>
        <div className="absolute left-1/2 top-0 -translate-x-1/2 flex flex-col items-center pointer-events-none">
          <motion.div initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true }}
            transition={{ duration: 1 }} className="w-px h-24 bg-gradient-to-b from-brand-red/0 via-brand-red/40 to-brand-red origin-top"/>
          <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }}
            transition={{ delay: 0.7, type: 'spring' }} className="w-3 h-3 rounded-full bg-brand-red shadow-[0_0_14px_rgba(220,38,38,.6)]"/>
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-5 text-center pt-20">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
            <p className="text-brand-red font-semibold tracking-[.2em] uppercase text-xs mb-4">The Circuit Completes Here</p>
            <h2 className="font-display text-3xl md:text-5xl font-extrabold text-white mb-5 leading-tight">Ready to Power Your Next Project?</h2>
            <p className="text-lg md:text-xl text-slate-400 mb-12 leading-relaxed font-light max-w-lg mx-auto">
              Every great project starts with a conversation. Get a free, no-obligation quote from Gates Electric.
            </p>
            <Link to="/contact"
              className="group relative inline-flex items-center gap-3 bg-brand-red hover:bg-brand-red-hover text-white px-12 py-5 rounded-2xl font-bold text-lg transition-all shadow-[0_10px_50px_-8px_rgba(226,32,32,0.6)] hover:shadow-[0_14px_60px_-6px_rgba(226,32,38,0.75)]">
              Request a Quote
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1"/>
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
