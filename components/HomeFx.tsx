"use client";

import { useEffect } from "react";

/**
 * Full-fidelity interactive layer for the home page. Ports the original design
 * script: hero leaf canvas, per-character hero reveal, scroll reveals, word-fill,
 * depth meter, service-row expand, magnetic buttons, and nav colour shifting.
 * It manipulates the server-rendered DOM by id/class, matching the markup in
 * app/page.tsx.
 */
export default function HomeFx() {
  useEffect(() => {
    const $ = <T extends Element = Element>(s: string, r: ParentNode = document) =>
      r.querySelector<T>(s);
    const $$ = <T extends Element = Element>(s: string, r: ParentNode = document) =>
      Array.from(r.querySelectorAll<T>(s));

    const cleanups: Array<() => void> = [];
    const reduce =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const depthTimer = window.setTimeout(() => {
      const d = document.getElementById("depth");
      if (d) d.style.opacity = "1";
    }, 2600);
    cleanups.push(() => clearTimeout(depthTimer));

    /* ---------- hero leaf canvas ---------- */
    const canvas = $<HTMLCanvasElement>("#heroCanvas");
    if (canvas && !reduce) {
      const ctx = canvas.getContext("2d")!;
      const hero = canvas.parentElement as HTMLElement;
      let W = 0,
        H = 0;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const palette = ["rgba(184,134,59,", "rgba(45,74,52,", "rgba(92,75,60,"];
      type Leaf = {
        x: number; y: number; s: number; vy: number; vx: number;
        rot: number; vr: number; sway: number; sw: number; a: number; c: string;
      };
      let leaves: Leaf[] = [];
      const makeLeaf = (init: boolean): Leaf => ({
        x: Math.random() * W,
        y: init ? Math.random() * H : -20,
        s: 5 + Math.random() * 11,
        vy: 0.15 + Math.random() * 0.4,
        vx: -0.25 - Math.random() * 0.35,
        rot: Math.random() * Math.PI * 2,
        vr: (Math.random() - 0.5) * 0.02,
        sway: Math.random() * Math.PI * 2,
        sw: 0.006 + Math.random() * 0.01,
        a: 0.1 + Math.random() * 0.22,
        c: palette[(Math.random() * palette.length) | 0],
      });
      const resize = () => {
        W = hero.clientWidth;
        H = hero.clientHeight;
        canvas.width = W * dpr;
        canvas.height = H * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        const n = Math.max(14, Math.min(30, Math.round(W / 55)));
        leaves = Array.from({ length: n }, () => makeLeaf(true));
      };
      resize();
      window.addEventListener("resize", resize);
      cleanups.push(() => window.removeEventListener("resize", resize));

      const drawLeaf = (l: Leaf) => {
        const L = l.s,
          Wd = l.s * 0.62;
        ctx.save();
        ctx.translate(l.x, l.y);
        ctx.rotate(l.rot + Math.sin(l.sway) * 0.5);
        ctx.beginPath();
        ctx.moveTo(-L, 0);
        ctx.quadraticCurveTo(-L * 0.15, -Wd, L, 0);
        ctx.quadraticCurveTo(-L * 0.15, Wd, -L, 0);
        ctx.closePath();
        ctx.fillStyle = l.c + l.a + ")";
        ctx.fill();
        ctx.strokeStyle = l.c + l.a * 0.7 + ")";
        ctx.lineWidth = Math.max(0.5, l.s * 0.06);
        ctx.beginPath();
        ctx.moveTo(-L, 0);
        ctx.lineTo(L, 0);
        ctx.stroke();
        ctx.lineWidth = Math.max(0.35, l.s * 0.04);
        ctx.beginPath();
        ctx.moveTo(-L * 0.35, 0);
        ctx.lineTo(-L * 0.05, -Wd * 0.42);
        ctx.moveTo(-L * 0.35, 0);
        ctx.lineTo(-L * 0.05, Wd * 0.42);
        ctx.moveTo(L * 0.1, 0);
        ctx.lineTo(L * 0.4, -Wd * 0.3);
        ctx.moveTo(L * 0.1, 0);
        ctx.lineTo(L * 0.4, Wd * 0.3);
        ctx.stroke();
        ctx.restore();
      };
      let raf = 0;
      const tick = () => {
        ctx.clearRect(0, 0, W, H);
        leaves.forEach((l) => {
          l.sway += l.sw;
          l.y += l.vy;
          l.x += l.vx + Math.sin(l.sway) * 0.5;
          l.rot += l.vr;
          drawLeaf(l);
          if (l.y > H + 30 || l.x < -40)
            Object.assign(l, makeLeaf(false), { x: Math.random() * W + 40 });
        });
        raf = requestAnimationFrame(tick);
      };
      tick();
      cleanups.push(() => cancelAnimationFrame(raf));
    }

    /* ---------- per-character hero reveal ---------- */
    const applyCharMask = (el: Element) => {
      const walk = (node: Node) => {
        Array.from(node.childNodes).forEach((child) => {
          if (child.nodeType === 3) {
            const frag = document.createDocumentFragment();
            (child.textContent ?? "").split("").forEach((ch) => {
              if (ch === " ") {
                frag.appendChild(document.createTextNode(" "));
                return;
              }
              const m = document.createElement("span");
              m.className = "char-mask";
              const inner = document.createElement("span");
              inner.textContent = ch;
              m.appendChild(inner);
              frag.appendChild(m);
            });
            node.replaceChild(frag, child);
          } else if (child.nodeType === 1) {
            walk(child);
          }
        });
      };
      walk(el);
    };
    const heroLines = $$("#heroType .hl");
    heroLines.forEach(applyCharMask);
    const charTimer = window.setTimeout(() => {
      let d = 0;
      heroLines.forEach((line) => {
        $$(".char-mask", line).forEach((m) => {
          m.classList.add("go");
          const span = m.querySelector<HTMLElement>("span");
          if (span) span.style.animationDelay = d + "s";
          d += 0.028;
        });
      });
    }, reduce ? 0 : 1750);
    cleanups.push(() => clearTimeout(charTimer));

    /* ---------- word-fill setup ---------- */
    const fill = $<HTMLElement>("#fillText");
    let fillWords: HTMLElement[] = [];
    if (fill) {
      const words = (fill.textContent ?? "").split(" ");
      fill.innerHTML = words
        .map((w) => `<span style="color:rgba(45,74,52,0.14)">${w}</span>`)
        .join(" ");
      fillWords = $$<HTMLElement>("span", fill);
    }

    /* ---------- reveal observer ---------- */
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    $$(".reveal").forEach((el) => io.observe(el));
    cleanups.push(() => io.disconnect());

    /* ---------- service rows ---------- */
    $$(".svc-row").forEach((row) => {
      const desc = $<HTMLElement>(".svc-desc", row);
      const arrow = $<HTMLElement>(".svc-arrow", row);
      const el = row as HTMLElement;
      const enter = () => {
        el.style.background = "rgba(184,134,59,0.08)";
        el.style.paddingLeft = "24px";
        if (desc) {
          desc.style.maxHeight = "160px";
          desc.style.opacity = "1";
          desc.style.marginTop = "16px";
        }
        if (arrow) {
          arrow.style.transform = "rotate(0) translateX(8px)";
          arrow.textContent = "→";
        }
      };
      const leave = () => {
        el.style.background = "transparent";
        el.style.paddingLeft = "8px";
        if (desc) {
          desc.style.maxHeight = "0";
          desc.style.opacity = "0";
          desc.style.marginTop = "0";
        }
        if (arrow) {
          arrow.style.transform = "none";
          arrow.textContent = "↓";
        }
      };
      row.addEventListener("mouseenter", enter);
      row.addEventListener("mouseleave", leave);
      cleanups.push(() => {
        row.removeEventListener("mouseenter", enter);
        row.removeEventListener("mouseleave", leave);
      });
    });

    /* ---------- cta cards ---------- */
    $$(".ctacard").forEach((c) => {
      const el = c as HTMLElement;
      const enter = () => (el.style.background = "rgba(184,134,59,0.12)");
      const leave = () => (el.style.background = "var(--canopy-deep)");
      c.addEventListener("mouseenter", enter);
      c.addEventListener("mouseleave", leave);
      cleanups.push(() => {
        c.removeEventListener("mouseenter", enter);
        c.removeEventListener("mouseleave", leave);
      });
    });

    /* ---------- magnetic buttons ---------- */
    $$(".mag").forEach((el) => {
      const node = el as HTMLElement;
      if (node.classList.contains("serif")) {
        const enter = () => (node.style.transform = "translateX(12px)");
        const leave = () => (node.style.transform = "translateX(0)");
        node.addEventListener("mouseenter", enter);
        node.addEventListener("mouseleave", leave);
        cleanups.push(() => {
          node.removeEventListener("mouseenter", enter);
          node.removeEventListener("mouseleave", leave);
        });
      } else {
        const move = (ev: MouseEvent) => {
          const r = node.getBoundingClientRect();
          const strength = 0.35;
          node.style.transform = `translate(${(ev.clientX - r.left - r.width / 2) * strength}px, ${
            (ev.clientY - r.top - r.height / 2) * strength
          }px)`;
        };
        const leave = () => (node.style.transform = "translate(0,0)");
        node.addEventListener("mousemove", move);
        node.addEventListener("mouseleave", leave);
        cleanups.push(() => {
          node.removeEventListener("mousemove", move);
          node.removeEventListener("mouseleave", leave);
        });
      }
    });

    /* ---------- scroll controller ---------- */
    const sections = $$<HTMLElement>("[data-stratum]");
    const depthItems = $$<HTMLElement>(".depth-item");
    const nav = $<HTMLElement>("nav");
    const setStratum = (i: number) => {
      depthItems.forEach((d) => {
        const active = Number(d.dataset.i) === i;
        d.style.color = active ? "var(--gold)" : "#888";
        const line = d.querySelector<HTMLElement>("span:nth-child(2)");
        if (line) line.style.width = active ? "48px" : "24px";
      });
    };

    const progress = $<HTMLElement>("#progress");
    const glow = $<HTMLElement>("#sunGlow");
    const p1 = $$<HTMLElement>('#heroType .hl[data-p="1"]');
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const st = window.scrollY;
        const dh = document.documentElement.scrollHeight - window.innerHeight;
        if (progress) progress.style.width = (st / dh) * 100 + "%";
        if (glow) glow.style.transform = `translateY(${st * 0.25}px)`;
        p1.forEach((el) => (el.style.transform = `translateX(${st * 0.05}px)`));

        if (fillWords.length && fill) {
          const r = fill.getBoundingClientRect();
          const vh = window.innerHeight;
          const start = vh * 0.85,
            end = vh * 0.25;
          const prog = Math.min(1, Math.max(0, (start - r.top) / (start - end)));
          const lit = Math.floor(prog * fillWords.length);
          fillWords.forEach((w, i) => {
            w.style.color = i < lit ? "var(--canopy)" : "rgba(45,74,52,0.14)";
          });
        }

        const mid = st + window.innerHeight * 0.35;
        let cur = sections[0];
        sections.forEach((sec) => {
          if (sec.offsetTop <= mid) cur = sec;
        });
        if (cur) {
          setStratum(Number(cur.dataset.stratum));
          const nc = cur.dataset.navcolor;
          if (nav && nav.dataset.c !== nc && nc) {
            nav.dataset.c = nc;
            const wordmark = document.getElementById("wordmark");
            if (wordmark) wordmark.style.color = nc;
            $$<HTMLElement>("#navlinks a").forEach((a) => (a.style.color = nc));
            const wm = $<HTMLElement>("#wordmark .mono");
            if (wm) wm.style.color = nc;
          }
        }
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    cleanups.push(() => window.removeEventListener("scroll", onScroll));
    onScroll();

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return null;
}
