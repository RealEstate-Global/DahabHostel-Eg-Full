"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cookies } from "@/app/_lib/storage";
import { Cookie, X } from "lucide-react";

export function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!cookies.get("cookie-consent")) setShow(true);
  }, []);

  const choose = (value: "accepted" | "declined") => {
    cookies.set("cookie-consent", value, { expires: 365, path: "/", secure: true, sameSite: "lax" });
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 40, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-3xl sm:bottom-6"
        >
          <div className="relative rounded-3xl border border-line bg-surface/95 p-5 shadow-lift backdrop-blur-xl sm:p-6">
            <button onClick={() => choose("declined")} aria-label="Close" className="absolute right-4 top-4 text-ink-subtle transition-colors hover:text-ink">
              <X size={18} />
            </button>
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-brand-soft text-brand"><Cookie size={22} /></div>
              <div className="flex-1">
                <h3 className="font-display font-semibold text-ink-heading">We value your privacy</h3>
                <p className="mt-1 text-sm leading-relaxed text-ink-muted">We use cookies to make your stay smoother and to understand how visitors use our site. You can accept or decline — it&apos;s your call.</p>
              </div>
              <div className="flex shrink-0 gap-2">
                <button onClick={() => choose("declined")} className="btn-outline !px-5 !py-2.5 text-xs">Decline</button>
                <button onClick={() => choose("accepted")} className="btn-primary !px-5 !py-2.5 text-xs">Accept all</button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
