"use client";

import React, { useState } from "react";
import { ArrowUpRight, Check, Send } from "lucide-react";

export function CtaSection() {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setEmail("");
      }, 4000);
    }
  };

  return (
    <section id="contact" className="relative py-28 px-4 sm:px-8 max-w-5xl mx-auto z-10 text-center">
      <div className="relative p-10 sm:p-16 rounded-3xl border border-white/10 bg-[#040813]/90 backdrop-blur-2xl overflow-hidden shadow-[0_20px_80px_rgba(0,0,0,0.8)]">
        {/* Glow Spheres */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-gradient-to-r from-emerald-500/15 via-violet-500/15 to-teal-500/15 rounded-full blur-[90px] pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto">
          <span className="inline-block text-xs font-mono uppercase tracking-widest text-emerald-400 mb-4">
            [ READY FOR PRODUCTION ]
          </span>

          <h2 className="text-3xl sm:text-5xl font-light text-white tracking-tight leading-tight">
            Bring living motion to your next interface.
          </h2>

          <p className="mt-4 text-sm sm:text-base text-zinc-400 font-light leading-relaxed">
            Get access to the production-ready Vesper WebGL particle template,
            optimized shaders, and Next.js 16 setup.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your work email..."
              className="w-full px-5 py-3 rounded-full border border-white/15 bg-white/[0.04] text-white text-xs sm:text-sm placeholder:text-zinc-500 focus:outline-none focus:border-emerald-400/80 focus:bg-white/[0.07] transition-all"
            />
            <button
              type="submit"
              className="w-full sm:w-auto shrink-0 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white text-zinc-950 font-medium text-xs sm:text-sm hover:bg-zinc-100 transition-all duration-[var(--duration-fast)] shadow-[0_0_24px_rgba(255,255,255,0.2)] active:scale-95"
            >
              {submitted ? (
                <>
                  <span>Request Sent</span>
                  <Check className="w-4 h-4 text-emerald-600" />
                </>
              ) : (
                <>
                  <span>Send Request</span>
                  <span className="text-emerald-600 font-bold">✳</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-6 flex items-center justify-center gap-6 text-[11px] font-mono text-zinc-500">
            <span>Production Tested</span>
            <span>·</span>
            <span>Zero Lock-in</span>
            <span>·</span>
            <span>Instant Dispatch</span>
          </div>
        </div>
      </div>
    </section>
  );
}
