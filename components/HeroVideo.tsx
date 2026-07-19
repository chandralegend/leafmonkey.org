"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

/**
 * Hero background: a self-hosted forest drone clip (public/hero.mp4) with an
 * Unsplash canopy poster underneath for instant paint. The video only loads
 * when it's worthwhile — skipped for reduced-motion, data-saver, and small
 * screens, which keep the poster instead. Video: Pexels (free license).
 */
export default function HeroVideo({ poster }: { poster: string }) {
  const [playVideo, setPlayVideo] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const conn = (navigator as { connection?: { saveData?: boolean } }).connection;
    const saveData = conn?.saveData === true;
    const smallScreen = window.innerWidth < 768;
    if (!reduce && !saveData && !smallScreen) setPlayVideo(true);
  }, []);

  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <Image
        src={poster}
        alt="Rainforest canopy"
        fill
        priority
        sizes="100vw"
        style={{ objectFit: "cover" }}
      />
      {playVideo && (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={poster}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>
      )}
    </div>
  );
}
