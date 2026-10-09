"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";

export function Preloader() {
  const [show, setShow] = useState(true);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) {
      setShow(false);
      return;
    }

    const timer = setTimeout(() => {
      setShow(false);
    }, 1200);

    const handleSkip = () => setShow(false);

    window.addEventListener("click", handleSkip);
    window.addEventListener("keydown", handleSkip);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("click", handleSkip);
      window.removeEventListener("keydown", handleSkip);
    };
  }, [reduced]);

  if (reduced) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          exit={{ y: "-100%" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[var(--bg)]"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-4xl font-bold tracking-widest text-[var(--text)]"
          >
            SH
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
