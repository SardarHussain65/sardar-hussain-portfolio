"use client";

import React, { useState } from "react";
import { site } from "@/data/site";
import {
  Mail,
  Phone,
  MessageCircle,
  FileDown,
  ArrowUpRight,
  Check,
  Send,
} from "lucide-react";

export function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.email.trim()) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: "", email: "", message: "" });
      }, 4000);
    }
  };

  return (
    <section id="contact" className="relative py-28 px-4 sm:px-8 max-w-6xl mx-auto z-10">
      <div className="night-panel relative p-8 sm:p-14 rounded-3xl border border-white/10 bg-[#040813]/90 backdrop-blur-2xl overflow-hidden shadow-[0_20px_80px_rgba(0,0,0,0.8)]">
        {/* Glow Spheres */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-gradient-to-r from-emerald-500/15 via-violet-500/15 to-teal-500/15 rounded-full blur-[90px] pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Contact Info */}
          <div className="lg:col-span-5">
            <span className="inline-block text-xs font-mono uppercase tracking-widest text-emerald-400 mb-3">
              [ DIRECT CONTACT ]
            </span>

            <h2 className="text-3xl sm:text-4xl font-light text-white tracking-tight leading-tight">
              Let&apos;s build high-impact mobile experiences together.
            </h2>

            <p className="mt-4 text-sm text-zinc-400 font-light leading-relaxed">
              Available for full-time senior mobile roles, contract engagements, and
              consulting on React Native, Smart TV, or full-stack platforms.
            </p>

            <div className="mt-8 space-y-3">
              <a
                href={`mailto:${site.email}`}
                className="flex items-center gap-3 p-3.5 rounded-xl border border-white/8 bg-white/[0.02] text-zinc-300 hover:text-white hover:border-emerald-400/40 hover:bg-emerald-500/5 transition-all group"
              >
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase">Email</span>
                  <span className="text-xs sm:text-sm font-mono text-zinc-200">{site.email}</span>
                </div>
              </a>

              <a
                href={site.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3.5 rounded-xl border border-white/8 bg-white/[0.02] text-zinc-300 hover:text-white hover:border-emerald-400/40 hover:bg-emerald-500/5 transition-all group"
              >
                <div className="w-8 h-8 rounded-lg bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase">WhatsApp</span>
                  <span className="text-xs sm:text-sm font-mono text-zinc-200">{site.phoneDisplay}</span>
                </div>
              </a>

              <div className="flex items-center gap-3 pt-2">
                <a
                  href={site.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border border-white/10 bg-white/[0.03] text-zinc-300 hover:text-white hover:bg-white/[0.08] transition-all text-xs font-mono"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  <span>GitHub</span>
                </a>

                <a
                  href={site.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border border-white/10 bg-white/[0.03] text-zinc-300 hover:text-white hover:bg-white/[0.08] transition-all text-xs font-mono"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Inquiry Form */}
          <div className="night-panel lg:col-span-7 p-6 sm:p-8 rounded-2xl border border-white/10 bg-[#02050c]/80 backdrop-blur-md">
            <h3 className="text-lg font-light text-white mb-2">Send a Message</h3>
            <p className="text-xs text-zinc-400 mb-6 font-light">
              Drop a note regarding your project scope, platform needs, or timeline.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1.5">Your Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Alex Henderson"
                  className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-white/[0.03] text-white text-xs sm:text-sm placeholder:text-zinc-600 focus:outline-none focus:border-emerald-400 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1.5">Your Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="alex@company.com"
                  className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-white/[0.03] text-white text-xs sm:text-sm placeholder:text-zinc-600 focus:outline-none focus:border-emerald-400 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1.5">Project Details</label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell me about your mobile app, roadmap, or engineering needs..."
                  className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-white/[0.03] text-white text-xs sm:text-sm placeholder:text-zinc-600 focus:outline-none focus:border-emerald-400 transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white text-zinc-950 font-medium text-xs sm:text-sm hover:bg-zinc-100 transition-all duration-[var(--duration-fast)] shadow-[0_0_24px_rgba(255,255,255,0.2)] active:scale-95"
              >
                {submitted ? (
                  <>
                    <span>Message Sent!</span>
                    <Check className="w-4 h-4 text-emerald-600" />
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <ArrowUpRight className="w-4 h-4 text-zinc-950" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
