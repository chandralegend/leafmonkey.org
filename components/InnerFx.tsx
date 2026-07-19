"use client";

import { useEffect } from "react";

/**
 * Lightweight effects for the inner pages:
 *  - scroll reveal (.reveal -> .visible)
 *  - magnetic / slide hover on .mag elements
 *  - optional top reading-progress bar (#progress)
 */
export default function InnerFx({ progress = false }: { progress?: boolean }) {
  useEffect(() => {
    const $$ = (s: string) => Array.from(document.querySelectorAll(s));

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

    const magHandlers: Array<() => void> = [];
    $$(".mag").forEach((el) => {
      const enter = () => ((el as HTMLElement).style.transform = "translateX(12px)");
      const leave = () => ((el as HTMLElement).style.transform = "translateX(0)");
      el.addEventListener("mouseenter", enter);
      el.addEventListener("mouseleave", leave);
      magHandlers.push(() => {
        el.removeEventListener("mouseenter", enter);
        el.removeEventListener("mouseleave", leave);
      });
    });

    let onScroll: (() => void) | undefined;
    if (progress) {
      const bar = document.getElementById("progress");
      let ticking = false;
      onScroll = () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
          const dh =
            document.documentElement.scrollHeight - window.innerHeight;
          if (bar) bar.style.width = (window.scrollY / dh) * 100 + "%";
          ticking = false;
        });
      };
      window.addEventListener("scroll", onScroll, { passive: true });
    }

    return () => {
      io.disconnect();
      magHandlers.forEach((fn) => fn());
      if (onScroll) window.removeEventListener("scroll", onScroll);
    };
  }, [progress]);

  return null;
}
