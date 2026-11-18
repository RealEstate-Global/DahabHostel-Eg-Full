"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { images } from "@/app/_data";

export default function Loading() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-background px-6">
      <div className="text-center">
        <motion.div animate={{ y: [0, -12, 0] }} transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }} className="mx-auto mb-8 w-28">
          <div className="relative mx-auto grid h-24 w-24 place-items-center rounded-3xl bg-brand-soft shadow-card">
            <Image src={images.logo} alt="Dahab Hostel" width={80} height={50} className="h-auto w-16" />
          </div>
        </motion.div>
        <p className="font-display text-lg font-semibold text-ink-heading">Getting your stay ready</p>
        <p className="mt-1 text-sm text-ink-muted">A little oasis is just a moment away...</p>
        <div className="mx-auto mt-7 h-1.5 w-56 overflow-hidden rounded-full bg-surface-soft">
          <motion.div className="h-full w-1/3 rounded-full bg-brand-gradient" animate={{ x: ["-100%", "300%"] }} transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }} />
        </div>
      </div>
    </div>
  );
}
