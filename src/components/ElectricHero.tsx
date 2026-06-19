import { useRef, useEffect } from 'react';

/* ────────────────────────────────────────────────────────────
   Gates Electric — Blueprint Hero
   A dark architectural elevation of three modest Nova Scotia
   buildings (a coastal gable cottage, a small-town storefront,
   and a garage / workshop). The structures draw themselves in,
   then power traces through the wiring in red and white, and
   warm window lights switch on in sequence.
   Pure canvas — no video, no stock footage.
   ──────────────────────────────────────────────────────────── */

type Pt = { x: number; y: number };

interface Wire {
  pts: Pt[];
  len: number;
  color: 'red' | 'white';
  /* reveal window (seconds) */
  drawFrom: number;
  drawTo: number;
  /* current pulses */
  speed: number;
  phases: number[];
}

interface Lamp {
  x: number;
  y: number;
  kind: 'window' | 'fixture';
  w: number; // half-width for window glow
  h: number; // half-height
  on: number; // seconds the light turns on
}

interface Scene {
  lines: { pts: Pt[]; len: number; from: number; to: number }[];
  wires: Wire[];
  lamps: Lamp[];
  dims: { pts: Pt[] }[]; // faint blueprint dimension marks
  scale: number;
}

interface Props {
  full?: boolean;
  children?: React.ReactNode;
}

/* ── palette (canvas can't read CSS vars) ───────────────────── */
const C = {
  blueprint: '160, 192, 220',  // cool draughting line
  red: '226, 32, 32',          // vivid Gates red
  white: '226, 238, 255',      // cool electric white
  warm: '255, 224, 170',       // window light
};

/* design space — buildings are authored in this box, then fit */
const DBW = 1620;
const DBH = 540;
const GROUND = 500;

export default function ElectricHero({ full = true, children }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLElement>(null);
  const sceneRef = useRef<Scene | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = 0, h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ── geometry helpers ─────────────────────────────────── */
    const len = (pts: Pt[]) => {
      let L = 0;
      for (let i = 1; i < pts.length; i++) {
        L += Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y);
      }
      return L;
    };

    /* author the three buildings + service feed in design coords */
    const buildDesign = () => {
      const lines: Pt[][] = [];
      const wires: { pts: Pt[]; color: 'red' | 'white'; from: number; to: number; speed: number; phases: number[] }[] = [];
      const lamps: Omit<Lamp, never>[] = [];
      const dims: Pt[][] = [];

      const rect = (x: number, y: number, rw: number, rh: number) =>
        [{ x, y }, { x: x + rw, y }, { x: x + rw, y: y + rh }, { x, y: y + rh }, { x, y }];

      /* ---- 1. Coastal gable cottage (residential) ---- */
      // body
      lines.push(rect(70, GROUND - 200, 330, 200));
      // gable roof w/ eave overhang
      lines.push([{ x: 45, y: GROUND - 200 }, { x: 235, y: GROUND - 320 }, { x: 425, y: GROUND - 200 }]);
      // chimney
      lines.push([{ x: 330, y: GROUND - 261 }, { x: 330, y: GROUND - 360 }, { x: 362, y: GROUND - 360 }, { x: 362, y: GROUND - 245 }]);
      // door
      lines.push(rect(205, GROUND - 115, 60, 115));
      // ground windows
      lines.push(rect(105, GROUND - 150, 60, 65));
      lines.push(rect(295, GROUND - 150, 60, 65));
      // gable window
      lines.push(rect(205, GROUND - 235, 60, 45));
      // service mast
      lines.push([{ x: 405, y: GROUND - 205 }, { x: 405, y: GROUND - 340 }]);
      // house wiring — red bus under eaves, white drops to lamps
      wires.push({ pts: [{ x: 405, y: GROUND - 340 }, { x: 405, y: GROUND - 200 }, { x: 95, y: GROUND - 200 }], color: 'red', from: 1.7, to: 3.0, speed: 0.18, phases: [0, 0.55] });
      wires.push({ pts: [{ x: 135, y: GROUND - 200 }, { x: 135, y: GROUND - 128 }], color: 'white', from: 2.8, to: 3.3, speed: 0.5, phases: [0] });
      wires.push({ pts: [{ x: 325, y: GROUND - 200 }, { x: 325, y: GROUND - 128 }], color: 'white', from: 2.8, to: 3.3, speed: 0.5, phases: [0.3] });
      wires.push({ pts: [{ x: 235, y: GROUND - 200 }, { x: 235, y: GROUND - 213 }], color: 'white', from: 2.9, to: 3.3, speed: 0.5, phases: [0.6] });
      lamps.push({ x: 135, y: GROUND - 117, kind: 'window', w: 26, h: 28, on: 3.3 });
      lamps.push({ x: 325, y: GROUND - 117, kind: 'window', w: 26, h: 28, on: 3.55 });
      lamps.push({ x: 235, y: GROUND - 212, kind: 'window', w: 26, h: 20, on: 3.75 });
      dims.push([{ x: 70, y: GROUND + 24 }, { x: 400, y: GROUND + 24 }]);
      dims.push([{ x: 70, y: GROUND + 18 }, { x: 70, y: GROUND + 30 }]);
      dims.push([{ x: 400, y: GROUND + 18 }, { x: 400, y: GROUND + 30 }]);

      /* ---- 2. Small-town storefront (commercial) ---- */
      // body
      lines.push(rect(620, GROUND - 260, 400, 260));
      // parapet / sign band
      lines.push(rect(608, GROUND - 300, 424, 42));
      // cornice
      lines.push([{ x: 608, y: GROUND - 305 }, { x: 1032, y: GROUND - 305 }]);
      // awning over the display window
      lines.push([{ x: 632, y: GROUND - 200 }, { x: 880, y: GROUND - 200 }, { x: 862, y: GROUND - 162 }, { x: 650, y: GROUND - 162 }, { x: 632, y: GROUND - 200 }]);
      // display window + mullions + transom
      lines.push(rect(645, GROUND - 158, 225, 138));
      lines.push([{ x: 720, y: GROUND - 158 }, { x: 720, y: GROUND - 20 }]);
      lines.push([{ x: 795, y: GROUND - 158 }, { x: 795, y: GROUND - 20 }]);
      lines.push([{ x: 645, y: GROUND - 118 }, { x: 870, y: GROUND - 118 }]);
      // glass door
      lines.push(rect(890, GROUND - 158, 95, 158));
      lines.push([{ x: 890, y: GROUND - 52 }, { x: 985, y: GROUND - 52 }]);
      // service mast
      lines.push([{ x: 1015, y: GROUND - 305 }, { x: 1015, y: GROUND - 395 }]);
      // storefront wiring
      wires.push({ pts: [{ x: 1015, y: GROUND - 395 }, { x: 1015, y: GROUND - 270 }, { x: 635, y: GROUND - 270 }], color: 'red', from: 1.9, to: 3.2, speed: 0.16, phases: [0, 0.5] });
      wires.push({ pts: [{ x: 700, y: GROUND - 270 }, { x: 700, y: GROUND - 286 }], color: 'white', from: 3.0, to: 3.4, speed: 0.5, phases: [0] });
      wires.push({ pts: [{ x: 820, y: GROUND - 270 }, { x: 820, y: GROUND - 286 }], color: 'white', from: 3.0, to: 3.4, speed: 0.5, phases: [0.2] });
      wires.push({ pts: [{ x: 940, y: GROUND - 270 }, { x: 940, y: GROUND - 286 }], color: 'white', from: 3.0, to: 3.4, speed: 0.5, phases: [0.4] });
      wires.push({ pts: [{ x: 757, y: GROUND - 270 }, { x: 757, y: GROUND - 92 }], color: 'white', from: 3.2, to: 3.7, speed: 0.45, phases: [0] });
      wires.push({ pts: [{ x: 937, y: GROUND - 270 }, { x: 937, y: GROUND - 92 }], color: 'white', from: 3.2, to: 3.7, speed: 0.45, phases: [0.3] });
      lamps.push({ x: 700, y: GROUND - 280, kind: 'fixture', w: 0, h: 0, on: 3.95 });
      lamps.push({ x: 820, y: GROUND - 280, kind: 'fixture', w: 0, h: 0, on: 4.05 });
      lamps.push({ x: 940, y: GROUND - 280, kind: 'fixture', w: 0, h: 0, on: 4.15 });
      lamps.push({ x: 757, y: GROUND - 90, kind: 'window', w: 105, h: 60, on: 4.0 });
      lamps.push({ x: 937, y: GROUND - 80, kind: 'window', w: 38, h: 70, on: 4.25 });
      dims.push([{ x: 620, y: GROUND + 24 }, { x: 1020, y: GROUND + 24 }]);
      dims.push([{ x: 620, y: GROUND + 18 }, { x: 620, y: GROUND + 30 }]);
      dims.push([{ x: 1020, y: GROUND + 18 }, { x: 1020, y: GROUND + 30 }]);

      /* ---- 3. Garage / workshop (light commercial) ---- */
      // body
      lines.push(rect(1180, GROUND - 200, 340, 200));
      // low gable roof
      lines.push([{ x: 1165, y: GROUND - 200 }, { x: 1330, y: GROUND - 268 }, { x: 1535, y: GROUND - 200 }]);
      // garage door + panel lines
      lines.push(rect(1205, GROUND - 158, 195, 158));
      lines.push([{ x: 1205, y: GROUND - 118 }, { x: 1400, y: GROUND - 118 }]);
      lines.push([{ x: 1205, y: GROUND - 78 }, { x: 1400, y: GROUND - 78 }]);
      lines.push([{ x: 1205, y: GROUND - 38 }, { x: 1400, y: GROUND - 38 }]);
      // service door + small window
      lines.push(rect(1428, GROUND - 140, 62, 140));
      lines.push(rect(1428, GROUND - 178, 62, 30));
      // service mast
      lines.push([{ x: 1525, y: GROUND - 205 }, { x: 1525, y: GROUND - 330 }]);
      // workshop wiring
      wires.push({ pts: [{ x: 1525, y: GROUND - 330 }, { x: 1525, y: GROUND - 178 }, { x: 1190, y: GROUND - 178 }], color: 'red', from: 2.0, to: 3.3, speed: 0.17, phases: [0, 0.5] });
      wires.push({ pts: [{ x: 1250, y: GROUND - 178 }, { x: 1250, y: GROUND - 196 }], color: 'white', from: 3.3, to: 3.7, speed: 0.5, phases: [0] });
      wires.push({ pts: [{ x: 1459, y: GROUND - 178 }, { x: 1459, y: GROUND - 165 }], color: 'white', from: 3.3, to: 3.7, speed: 0.5, phases: [0.3] });
      lamps.push({ x: 1250, y: GROUND - 198, kind: 'fixture', w: 0, h: 0, on: 4.35 });   // exterior wall pack
      lamps.push({ x: 1459, y: GROUND - 163, kind: 'window', w: 27, h: 13, on: 4.5 });    // shop window
      lamps.push({ x: 1302, y: GROUND - 78, kind: 'window', w: 92, h: 70, on: 4.6 });     // glow behind garage door
      dims.push([{ x: 1180, y: GROUND + 24 }, { x: 1520, y: GROUND + 24 }]);
      dims.push([{ x: 1180, y: GROUND + 18 }, { x: 1180, y: GROUND + 30 }]);
      dims.push([{ x: 1520, y: GROUND + 18 }, { x: 1520, y: GROUND + 30 }]);

      /* ---- overhead service feed (power coming in) ---- */
      wires.push({
        pts: [{ x: 10, y: GROUND - 392 }, { x: 405, y: GROUND - 340 }, { x: 1015, y: GROUND - 395 }, { x: 1525, y: GROUND - 330 }],
        color: 'red', from: 1.4, to: 2.8, speed: 0.13, phases: [0, 0.33, 0.66],
      });

      return { lines, wires, lamps, dims };
    };

    const resize = () => {
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // fit design box into the lower portion of the hero
      const isPhone = w < 768;
      const isTablet = w >= 768 && w < 1024;
      const margin = isPhone ? 1.0 : 0.94;
      let scale = (w * margin) / DBW;
      const maxH = h * (full ? (isPhone ? 1 : isTablet ? 0.5 : 0.62) : 0.92);
      if (DBH * scale > maxH) scale = maxH / DBH;
      const drawW = DBW * scale;
      const originX = (w - drawW) / 2;
      const groundY = full ? (isPhone ? h - 104 : h * 0.9) : h * 0.96;
      const originY = groundY - GROUND * scale;

      const tx = (p: Pt): Pt => ({ x: originX + p.x * scale, y: originY + p.y * scale });
      const d = buildDesign();

      const scene: Scene = {
        scale,
        lines: d.lines.map((pts) => {
          const m = pts.map(tx);
          return { pts: m, len: len(m), from: 0.3, to: 1.9 };
        }),
        wires: d.wires.map((wr) => {
          const m = wr.pts.map(tx);
          return { pts: m, len: len(m), color: wr.color, drawFrom: wr.from, drawTo: wr.to, speed: wr.speed, phases: wr.phases };
        }),
        lamps: d.lamps.map((l) => ({ ...tx({ x: l.x, y: l.y }), kind: l.kind, w: l.w * scale, h: l.h * scale, on: l.on })),
        dims: d.dims.map((pts) => ({ pts: pts.map(tx) })),
      };
      sceneRef.current = scene;
    };

    resize();
    window.addEventListener('resize', resize);

    /* ── drawing primitives ───────────────────────────────── */
    const pointAt = (pts: Pt[], total: number, dist: number): Pt => {
      let acc = 0;
      for (let i = 1; i < pts.length; i++) {
        const seg = Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y);
        if (acc + seg >= dist) {
          const t = (dist - acc) / seg;
          return { x: pts[i - 1].x + (pts[i].x - pts[i - 1].x) * t, y: pts[i - 1].y + (pts[i].y - pts[i - 1].y) * t };
        }
        acc += seg;
      }
      return pts[pts.length - 1];
    };

    const strokePartial = (pts: Pt[], total: number, frac: number) => {
      if (frac <= 0) return;
      const budget = total * Math.min(frac, 1);
      let acc = 0;
      ctx.beginPath();
      ctx.moveTo(pts[0].x, pts[0].y);
      for (let i = 1; i < pts.length; i++) {
        const seg = Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y);
        if (acc + seg <= budget) {
          ctx.lineTo(pts[i].x, pts[i].y);
        } else {
          const t = (budget - acc) / seg;
          ctx.lineTo(pts[i - 1].x + (pts[i].x - pts[i - 1].x) * t, pts[i - 1].y + (pts[i].y - pts[i - 1].y) * t);
          break;
        }
        acc += seg;
      }
      ctx.stroke();
    };

    const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
    const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

    const start = performance.now();
    let raf = 0;

    const frame = (now: number) => {
      const scene = sceneRef.current;
      if (!scene) { raf = requestAnimationFrame(frame); return; }
      const time = reduce ? 99 : (now - start) / 1000;

      ctx.clearRect(0, 0, w, h);

      /* blueprint grid */
      const grid = scene.scale * 56;
      ctx.lineWidth = 1;
      ctx.strokeStyle = `rgba(${C.blueprint}, 0.04)`;
      for (let x = (w % grid); x < w; x += grid) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke(); }
      for (let y = (h % grid); y < h; y += grid) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke(); }

      /* faint dimension marks */
      ctx.strokeStyle = `rgba(${C.blueprint}, 0.10)`;
      ctx.lineWidth = 1;
      for (const dm of scene.dims) {
        const r = clamp01((time - 1.0) / 0.8);
        if (r <= 0) continue;
        ctx.globalAlpha = r;
        ctx.beginPath();
        ctx.moveTo(dm.pts[0].x, dm.pts[0].y);
        for (let i = 1; i < dm.pts.length; i++) ctx.lineTo(dm.pts[i].x, dm.pts[i].y);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;

      /* building elevations draw themselves in */
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';
      for (const ln of scene.lines) {
        const frac = easeInOut(clamp01((time - ln.from) / (ln.to - ln.from)));
        if (frac <= 0) continue;
        // soft underlay for depth
        ctx.strokeStyle = `rgba(${C.blueprint}, 0.06)`;
        ctx.lineWidth = 4;
        strokePartial(ln.pts, ln.len, frac);
        // crisp line
        ctx.strokeStyle = `rgba(${C.blueprint}, 0.42)`;
        ctx.lineWidth = 1.4;
        strokePartial(ln.pts, ln.len, frac);
      }

      /* lamps — warm light switching on */
      for (const lp of scene.lamps) {
        const b = easeInOut(clamp01((time - lp.on) / 0.9));
        if (b <= 0) continue;
        const breathe = 0.9 + Math.sin(time * 1.4 + lp.x) * 0.08;
        const a = b * breathe;
        ctx.save();
        if (lp.kind === 'window') {
          // soft ambient halo
          const halo = ctx.createRadialGradient(lp.x, lp.y, 0, lp.x, lp.y, Math.max(lp.w, lp.h) * 2.4);
          halo.addColorStop(0, `rgba(${C.warm}, ${0.28 * a})`);
          halo.addColorStop(1, `rgba(${C.warm}, 0)`);
          ctx.fillStyle = halo;
          ctx.fillRect(lp.x - lp.w * 3, lp.y - lp.h * 3, lp.w * 6, lp.h * 6);
          // glowing pane
          ctx.shadowColor = `rgba(${C.warm}, ${0.5 * a})`;
          ctx.shadowBlur = 18;
          ctx.fillStyle = `rgba(${C.warm}, ${0.5 * a})`;
          ctx.fillRect(lp.x - lp.w, lp.y - lp.h, lp.w * 2, lp.h * 2);
        } else {
          // exterior fixture — downward pool of light
          const cone = ctx.createRadialGradient(lp.x, lp.y, 0, lp.x, lp.y, 60 * scene.scale + 26);
          cone.addColorStop(0, `rgba(${C.warm}, ${0.45 * a})`);
          cone.addColorStop(0.4, `rgba(${C.warm}, ${0.16 * a})`);
          cone.addColorStop(1, `rgba(${C.warm}, 0)`);
          ctx.fillStyle = cone;
          ctx.beginPath();
          ctx.arc(lp.x, lp.y, 60 * scene.scale + 26, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowColor = `rgba(${C.warm}, ${0.7 * a})`;
          ctx.shadowBlur = 12;
          ctx.fillStyle = `rgba(${C.warm}, ${0.85 * a})`;
          ctx.beginPath();
          ctx.arc(lp.x, lp.y, 2.4, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }

      /* wiring — dim base, then travelling current */
      for (const wr of scene.wires) {
        const frac = easeInOut(clamp01((time - wr.drawFrom) / (wr.drawTo - wr.drawFrom)));
        if (frac <= 0) continue;
        const rgb = wr.color === 'red' ? C.red : C.white;
        // base conductor
        ctx.strokeStyle = `rgba(${rgb}, ${wr.color === 'red' ? 0.3 : 0.18})`;
        ctx.lineWidth = 1.6;
        strokePartial(wr.pts, wr.len, frac);

        if (frac < 1 || reduce) continue;
        // travelling pulses (comet of current)
        ctx.save();
        for (const ph of wr.phases) {
          const head = ((time * wr.speed + ph) % 1 + 1) % 1;
          for (let s = 0; s < 7; s++) {
            const d = (head - s * 0.012) * wr.len;
            if (d < 0 || d > wr.len) continue;
            const p = pointAt(wr.pts, wr.len, d);
            const fade = (1 - s / 7);
            ctx.shadowColor = `rgba(${rgb}, ${0.9 * fade})`;
            ctx.shadowBlur = 14 * fade;
            ctx.fillStyle = `rgba(${s === 0 ? '255, 255, 255' : rgb}, ${(s === 0 ? 1 : 0.8) * fade})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, (s === 0 ? 2.4 : 1.8) * fade + 0.4, 0, Math.PI * 2);
            ctx.fill();
          }
        }
        ctx.restore();
      }

      if (!reduce) raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    /* ── scroll: blueprint dissolves into the page ─────────── */
    const onScroll = () => {
      const el = wrapRef.current;
      const cv = canvasRef.current;
      if (!el || !cv) return;
      const rect = el.getBoundingClientRect();
      const progress = clamp01(-rect.top / (rect.height * 0.75));
      cv.style.opacity = String(1 - progress);
      cv.style.transform = `translateY(${progress * -28}px)`;
    };
    if (full) window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      if (full) window.removeEventListener('scroll', onScroll);
    };
  }, [full]);

  return (
    <section
      ref={wrapRef}
      className={`relative overflow-hidden bg-[#0a0a0d] ${full ? 'h-auto md:h-[100svh] md:min-h-[640px]' : 'h-[46vh] min-h-[340px]'}`}
    >
      {/* charcoal base + subtle red ambience */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0c0d12] via-[#0a0a0d] to-[#070708]" />
      <div className="absolute inset-0 opacity-[0.5] pointer-events-none"
        style={{ background: 'radial-gradient(120% 80% at 50% 18%, rgba(226,32,32,0.10), transparent 60%)' }} />

      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full transition-none" />

      {/* left scrim keeps the headline crisp over the streetscape (desktop) */}
      <div
        className="absolute inset-0 pointer-events-none hidden md:block"
        style={{ background: 'linear-gradient(90deg, rgba(7,7,8,0.94) 0%, rgba(7,7,8,0.62) 30%, rgba(7,7,8,0.12) 54%, transparent 70%)' }}
      />

      {/* vignette + bottom fade into the next section */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(140% 120% at 50% 40%, transparent 55%, rgba(0,0,0,0.55) 100%)' }} />
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#070708] to-transparent pointer-events-none hidden md:block" />
      <div
        className="absolute inset-0 pointer-events-none md:hidden"
        style={{ background: 'linear-gradient(to bottom, transparent 0%, transparent 86%, rgba(7,7,8,0.6) 93%, #070708 100%)' }}
      />

      {children && (
        <div className="relative z-10 flex flex-col md:h-full justify-start md:justify-center">
          {children}
        </div>
      )}
    </section>
  );
}
