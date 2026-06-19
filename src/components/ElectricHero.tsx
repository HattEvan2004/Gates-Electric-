import { useRef, useEffect, useCallback } from 'react';

interface Node {
  x: number; y: number;
  vx: number; vy: number;
  brightness: number;
}

interface Props {
  full?: boolean;
  children?: React.ReactNode;
}

export default function ElectricHero({ full = true, children }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const nodesRef = useRef<Node[]>([]);
  const surgeRef = useRef<{ x1:number; y1:number; x2:number; y2:number; life:number; segs:{x:number;y:number}[] }[]>([]);
  const frameRef = useRef(0);

  const onMove = useCallback((e: MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const r = canvas.getBoundingClientRect();
    mouseRef.current = { x: e.clientX - r.left, y: e.clientY - r.top };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = 0, h = 0;
    const dpr = Math.min(window.devicePixelRatio, 2);

    const resize = () => {
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);
    canvas.addEventListener('mousemove', onMove);

    // Init nodes
    const NODE_COUNT = Math.min(80, Math.floor((w * h) / 12000));
    const nodes = nodesRef.current;
    if (nodes.length === 0) {
      for (let i = 0; i < NODE_COUNT; i++) {
        nodes.push({
          x: Math.random() * w, y: Math.random() * h,
          vx: (Math.random() - .5) * .4,
          vy: (Math.random() - .5) * .4,
          brightness: Math.random(),
        });
      }
    }

    // Lightning bolt path generator
    function makeBolt(x1: number, y1: number, x2: number, y2: number) {
      const segs: {x:number;y:number}[] = [{ x: x1, y: y1 }];
      const count = 10 + Math.floor(Math.random() * 6);
      for (let i = 1; i < count; i++) {
        const t = i / count;
        const jitter = 25 + Math.random() * 20;
        segs.push({
          x: x1 + (x2 - x1) * t + (Math.random() - .5) * jitter,
          y: y1 + (y2 - y1) * t + (Math.random() - .5) * jitter,
        });
      }
      segs.push({ x: x2, y: y2 });
      return segs;
    }

    function drawBolt(segs: {x:number;y:number}[], alpha: number) {
      if (!ctx) return;
      // Glow layer
      ctx.save();
      ctx.shadowColor = `rgba(220, 38, 38, ${alpha})`;
      ctx.shadowBlur = 25;
      ctx.beginPath();
      ctx.moveTo(segs[0].x, segs[0].y);
      for (let i = 1; i < segs.length; i++) ctx.lineTo(segs[i].x, segs[i].y);
      ctx.strokeStyle = `rgba(220, 38, 38, ${alpha * .9})`;
      ctx.lineWidth = 2.5;
      ctx.stroke();
      ctx.restore();
      // Core
      ctx.beginPath();
      ctx.moveTo(segs[0].x, segs[0].y);
      for (let i = 1; i < segs.length; i++) ctx.lineTo(segs[i].x, segs[i].y);
      ctx.strokeStyle = `rgba(255, 200, 200, ${alpha * .7})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    let tick = 0;
    let raf: number;

    const loop = () => {
      tick++;
      ctx.clearRect(0, 0, w, h);

      // Subtle grid
      ctx.strokeStyle = 'rgba(220, 38, 38, .025)';
      ctx.lineWidth = .5;
      const gridSize = 60;
      for (let gx = 0; gx < w; gx += gridSize) {
        ctx.beginPath(); ctx.moveTo(gx, 0); ctx.lineTo(gx, h); ctx.stroke();
      }
      for (let gy = 0; gy < h; gy += gridSize) {
        ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(w, gy); ctx.stroke();
      }

      const mouse = mouseRef.current;
      const maxDist = 130;

      // Update nodes
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        n.brightness = .3 + Math.sin(tick * .02 + n.x * .01) * .2;
        if (n.x < -20) n.x = w + 20;
        if (n.x > w + 20) n.x = -20;
        if (n.y < -20) n.y = h + 20;
        if (n.y > h + 20) n.y = -20;
      }

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * .15;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(220, 38, 38, ${alpha})`;
            ctx.lineWidth = .8;
            ctx.stroke();
          }
        }

        // Mouse connections
        const mdx = nodes[i].x - mouse.x;
        const mdy = nodes[i].y - mouse.y;
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mDist < 180) {
          const alpha = (1 - mDist / 180) * .35;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(220, 38, 38, ${alpha})`;
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }
      }

      // Draw nodes
      for (const n of nodes) {
        const r = 1.5 + n.brightness;
        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(220, 38, 38, ${.25 + n.brightness * .3})`;
        ctx.fill();
        // Outer glow
        ctx.beginPath();
        ctx.arc(n.x, n.y, r + 4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(220, 38, 38, ${n.brightness * .06})`;
        ctx.fill();
      }

      // Spawn lightning surges
      if (tick % 120 === 0 || (tick % 70 === 0 && Math.random() > .5)) {
        const a = nodes[Math.floor(Math.random() * nodes.length)];
        const b = nodes[Math.floor(Math.random() * nodes.length)];
        const dx = a.x - b.x, dy = a.y - b.y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist > 100 && dist < 500) {
          surgeRef.current.push({
            x1: a.x, y1: a.y, x2: b.x, y2: b.y,
            life: 1,
            segs: makeBolt(a.x, a.y, b.x, b.y),
          });
        }
      }

      // Draw & decay surges
      const surges = surgeRef.current;
      for (let i = surges.length - 1; i >= 0; i--) {
        const s = surges[i];
        drawBolt(s.segs, s.life);
        s.life -= .025;
        if (s.life <= 0) surges.splice(i, 1);
      }

      // Central radial glow
      const grad = ctx.createRadialGradient(w * .5, h * .5, 0, w * .5, h * .5, w * .5);
      grad.addColorStop(0, 'rgba(220, 38, 38, .03)');
      grad.addColorStop(1, 'rgba(220, 38, 38, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      raf = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', onMove);
    };
  }, [onMove]);

  return (
    <section className={`relative overflow-hidden bg-brand-dark ${full ? 'h-screen min-h-[700px]' : 'h-[45vh] min-h-[340px]'}`}>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      {/* Bottom fade to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-brand-dark to-transparent pointer-events-none" />
      {children && (
        <div className="relative z-10 h-full flex flex-col justify-center">
          {children}
        </div>
      )}
    </section>
  );
}
