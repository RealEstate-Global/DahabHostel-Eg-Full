"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { Photo } from "@/app/_data";
import { useTranslations } from "next-intl";

export function GalleryGrid({ photos }: { photos: Photo[] }) {
  const [active, setActive] = useState<number | null>(null);
  const t = useTranslations("common.accessibility");

  function move(dir: number) {
    if (active === null) return;
    setActive((active + dir + photos.length) % photos.length);
  }

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {photos.map((p, i) => (
          <button key={i} onClick={() => setActive(i)} className="group relative block aspect-[4/3] w-full overflow-hidden rounded-2xl bg-surface shadow-soft ring-subtle transition-all duration-300 hover:-translate-y-1 hover:shadow-card">
            <Image src={p.src} alt={p.caption} fill sizes="(max-width:768px) 50vw, 25vw" className="object-cover transition-transform duration-700 group-hover:scale-110" />
            <span className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/75 via-black/10 to-transparent p-3 text-center text-xs font-medium text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">{p.caption}</span>
          </button>
        ))}
      </div>
      {active !== null && (
        <div className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4" onClick={() => setActive(null)}>
          <button className="absolute top-4 right-4 text-white" aria-label={t("close")} onClick={() => setActive(null)}><X size={32} /></button>
          <button className="absolute left-4 text-white" aria-label={t("previousPhoto")} onClick={(e) => { e.stopPropagation(); move(-1); }}><ChevronLeft size={40} /></button>
          <figure className="max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <img src={photos[active].src} alt={photos[active].caption} className="w-full max-h-[80vh] object-contain" />
            <figcaption className="text-white text-center mt-3">{photos[active].caption}</figcaption>
          </figure>
          <button className="absolute right-4 text-white" aria-label={t("nextPhoto")} onClick={(e) => { e.stopPropagation(); move(1); }}><ChevronRight size={40} /></button>
        </div>
      )}
    </>
  );
}
