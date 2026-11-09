"use client";

import Image from "next/image";
import { useState } from "react";
import type { Photo } from "@/lib/photos";

export default function Gallery({ photos }: { photos: Photo[] }) {
  const [active, setActive] = useState(0);
  const current = photos[active];
  return (
    <div className="gallery">
      <div className="gallery-frame">
        <Image src={current.src} alt={current.alt} fill sizes="(max-width: 880px) 100vw, 580px" quality={85} placeholder="blur" />
      </div>
      <ul className="thumbs" aria-label="Product photos">
        {photos.map((p, i) => (
          <li key={i}>
            <button
              type="button"
              className="thumb"
              aria-pressed={i === active}
              aria-label={`Show photo ${i + 1} of ${photos.length}: ${p.alt}`}
              onClick={() => setActive(i)}
            >
              <Image src={p.src} alt="" fill sizes="96px" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
