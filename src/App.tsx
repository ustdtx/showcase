import { useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { motion } from 'motion/react';
import { products } from './config/products';
import { ProductViewer } from './three/ProductViewer';

gsap.registerPlugin(ScrollTrigger);

const MARQUEE = [
  'REALTIME 3D',
  'SCROLL CHOREOGRAPHY',
  'REUSABLE TEMPLATE',
  'ONE CONFIG PER CLIENT',
  '60FPS EVERYWHERE',
  'DRAG • SPIN • SHOP',
];

function Nav({ onNav }: { onNav: (target: string) => void }) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#08080c]/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
        <button onClick={() => onNav('#top')} className="text-sm font-black tracking-[0.3em]">
          SHOWCASE<span className="text-lime-300">/3D</span>
        </button>
        <nav className="hidden items-center gap-8 text-xs font-semibold tracking-[0.2em] text-white/60 md:flex">
          {[
            ['STAGE', '#stage'],
            ['LINEUP', '#lineup'],
            ['WHY', '#why'],
          ].map(([label, target]) => (
            <button key={target} onClick={() => onNav(target)} className="transition hover:text-white">
              {label}
            </button>
          ))}
        </nav>
        <button
          onClick={() => onNav('#lineup')}
          className="rounded-full bg-lime-300 px-5 py-2 text-xs font-black tracking-widest text-black transition hover:bg-white"
        >
          SHOP DROP
        </button>
      </div>
    </header>
  );
}

export default function App() {
  const [activeId, setActiveId] = useState(products[0].id);
  const [colorIdx, setColorIdx] = useState(0);
  const lenisRef = useRef<Lenis | null>(null);
  const active = useMemo(
    () => products.find((p) => p.id === activeId) ?? products[0],
    [activeId],
  );
  const color = active.colors[colorIdx % active.colors.length];

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.09 });
    lenisRef.current = lenis;
    lenis.on('scroll', ScrollTrigger.update);
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.hero-line > span',
        { yPercent: 115 },
        { yPercent: 0, duration: 1.1, stagger: 0.09, ease: 'power4.out', delay: 0.15 },
      );
      gsap.utils.toArray<HTMLElement>('.reveal').forEach((el) => {
        gsap.fromTo(
          el,
          { y: 48, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 88%' },
          },
        );
      });
    });

    return () => {
      ctx.revert();
      gsap.ticker.remove(raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const scrollTo = (target: string) => lenisRef.current?.scrollTo(target, { offset: -64 });

  const select = (id: string) => {
    setActiveId(id);
    setColorIdx(0);
    scrollTo('#stage');
  };

  return (
    <div id="top" className="min-h-screen bg-[#08080c] text-white antialiased">
      <Nav onNav={scrollTo} />

      {/* ————— HERO ————— */}
      <section className="relative overflow-hidden pt-32 pb-10">
        <div className="stage-glow pointer-events-none absolute inset-0" />
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 lg:grid-cols-[1.05fr_1fr]">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-[11px] font-bold tracking-[0.25em] text-white/70"
            >
              <span className="h-2 w-2 animate-pulse rounded-full bg-lime-300" />
              SEASON DROP — 04 OBJECTS LIVE
            </motion.div>
            <h1 className="hero-title text-5xl font-black leading-[0.95] tracking-tight sm:text-7xl">
              <span className="hero-line block overflow-hidden">
                <span className="block">TOUCH</span>
              </span>
              <span className="hero-line block overflow-hidden">
                <span className="aurora-text block">EVERY</span>
              </span>
              <span className="hero-line block overflow-hidden">
                <span className="block">PIXEL IN 3D.</span>
              </span>
            </h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-white/60">
              One reusable stage for every product you will ever sell. Pick an object,
              spin it, recolor it — then ship the same template to your next ten clients.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <button
                onClick={() => scrollTo('#stage')}
                className="rounded-full bg-lime-300 px-7 py-3 text-sm font-black tracking-widest text-black transition hover:scale-105 hover:bg-white"
              >
                ENTER THE STAGE
              </button>
              <button
                onClick={() => scrollTo('#lineup')}
                className="rounded-full border border-white/20 px-7 py-3 text-sm font-black tracking-widest text-white/80 transition hover:border-white hover:text-white"
              >
                BROWSE LINEUP
              </button>
            </div>
            <div className="mt-10 flex gap-8 text-sm">
              {[
                ['04', 'live objects'],
                ['60', 'fps render'],
                ['01', 'config file'],
              ].map(([v, l]) => (
                <div key={l}>
                  <div className="text-3xl font-black text-lime-300">{v}</div>
                  <div className="mt-1 text-[11px] tracking-[0.2em] text-white/50">{l.toUpperCase()}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ————— 3D STAGE ————— */}
          <div id="stage" className="relative">
            <div className="relative h-[440px] overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-transparent sm:h-[540px]">
              <ProductViewer model={active.model} color={color} />
              <div className="pointer-events-none absolute left-5 top-5 rounded-full border border-white/15 bg-black/50 px-4 py-1.5 text-[11px] font-bold tracking-[0.25em] backdrop-blur">
                {active.name.toUpperCase()} — LIVE
              </div>
              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4">
                <div>
                  <div className="text-[11px] font-bold tracking-[0.25em] text-white/50">
                    {active.tagline.toUpperCase()}
                  </div>
                  <div className="mt-1 text-3xl font-black">
                    {active.name} <span style={{ color: active.accent }}>{active.price}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  {active.colors.map((c, i) => (
                    <button
                      key={c}
                      onClick={() => setColorIdx(i)}
                      aria-label={`color ${i + 1}`}
                      style={{ backgroundColor: c }}
                      className={`h-8 w-8 rounded-full border-2 transition hover:scale-110 ${
                        i === colorIdx % active.colors.length ? 'border-white' : 'border-white/20'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
            {/* product switcher */}
            <div className="mt-4 grid grid-cols-4 gap-2">
              {products.map((p) => (
                <button
                  key={p.id}
                  onClick={() => select(p.id)}
                  className={`rounded-2xl border px-2 py-3 text-center transition ${
                    p.id === activeId
                      ? 'border-transparent bg-white text-black'
                      : 'border-white/10 bg-white/5 text-white/70 hover:border-white/30 hover:text-white'
                  }`}
                >
                  <div className="text-xs font-black tracking-wide">{p.name}</div>
                  <div className="mt-0.5 text-[11px] opacity-60">{p.price}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ————— MARQUEE ————— */}
      <div className="overflow-hidden border-y border-white/10 bg-lime-300 py-3 text-black">
        <div className="marquee-track flex w-max gap-10 whitespace-nowrap text-sm font-black tracking-[0.2em]">
          {[...MARQUEE, ...MARQUEE].map((m, i) => (
            <span key={i}>
              {m} <span className="ml-8">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ————— LINEUP ————— */}
      <section id="lineup" className="mx-auto max-w-7xl px-5 py-24">
        <div className="reveal flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-4xl font-black tracking-tight sm:text-6xl">
            THE <span className="aurora-text">LINEUP</span>
          </h2>
          <p className="max-w-sm text-sm text-white/50">
            Every card below is driven by one config file. Add a product, get a page.
          </p>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((p, i) => (
            <motion.article
              key={p.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, delay: (i % 4) * 0.08 }}
              className="group flex flex-col rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur transition hover:-translate-y-2 hover:border-white/25"
            >
              <div
                className="mb-5 h-1.5 w-12 rounded-full transition group-hover:w-20"
                style={{ backgroundColor: p.accent }}
              />
              <h3 className="text-2xl font-black">{p.name}</h3>
              <div className="mt-1 text-xs font-bold tracking-[0.2em]" style={{ color: p.accent }}>
                {p.tagline.toUpperCase()}
              </div>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-white/55">{p.blurb}</p>
              <div className="mt-5 flex gap-4 border-t border-white/10 pt-4 text-center">
                {p.stats.map((s) => (
                  <div key={s.label} className="flex-1">
                    <div className="text-lg font-black">{s.value}</div>
                    <div className="text-[10px] tracking-[0.18em] text-white/45">{s.label.toUpperCase()}</div>
                  </div>
                ))}
              </div>
              <div className="mt-5 flex items-center justify-between">
                <span className="text-xl font-black">{p.price}</span>
                <button
                  onClick={() => select(p.id)}
                  className="rounded-full bg-white px-5 py-2 text-xs font-black tracking-widest text-black transition group-hover:bg-lime-300"
                >
                  VIEW IN 3D →
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* ————— WHY ————— */}
      <section id="why" className="border-t border-white/10 bg-white/[0.02]">
        <div className="mx-auto max-w-7xl px-5 py-24">
          <h2 className="reveal text-4xl font-black tracking-tight sm:text-6xl">
            BUILT TO <span className="aurora-text">REUSE</span>
          </h2>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[
              {
                t: 'One template, infinite clients',
                d: 'Copy, copy, colors and models live in a single products config. Re-skin the whole drop in an afternoon and bill it as bespoke.',
              },
              {
                t: 'Motion that sells',
                d: 'Lenis smooth scroll fused with GSAP ScrollTrigger, Motion entrances and a live 3D stage. Buttery on mid-range phones, silly on desktop.',
              },
              {
                t: '3D pipeline ready',
                d: 'Today: procedural models with zero assets. Tomorrow: drop AI-generated GLBs from TripoSR or Stable Fast 3D into the same viewer slot.',
              },
            ].map((f) => (
              <div
                key={f.t}
                className="reveal rounded-3xl border border-white/10 bg-black/40 p-8 backdrop-blur"
              >
                <div className="text-4xl font-black text-lime-300">✦</div>
                <h3 className="mt-4 text-xl font-black">{f.t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/55">{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-8 text-xs tracking-[0.2em] text-white/40">
          <span>
            SHOWCASE<span className="text-lime-300">/3D</span> — TEMPLATE V1
          </span>
          <span>DRAG THE MODEL • SCROLL THE STORY • SHIP IT TWICE</span>
        </div>
      </footer>
    </div>
  );
}
