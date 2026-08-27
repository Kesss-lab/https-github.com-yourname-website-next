"use client";

import { motion } from "framer-motion";
import { SITE, NAV_LINKS, SERVICES } from "@/lib/content";

export default function AurosHero() {
  return (
    <div className="min-h-screen text-white selection:bg-cyan-500 selection:text-black font-sans relative overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-cyan-500/20 to-blue-600/10 blur-[140px] rounded-full pointer-events-none" />

      {/* Grid Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: `radial-gradient(#fff 1px, transparent 1px)`, backgroundSize: "24px 24px" }}
      />

      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto border-b border-white/10 relative z-10">
        <div className="text-xl font-bold tracking-wider">{SITE.brand.toUpperCase()}</div>
        <div className="hidden md:flex space-x-8 text-sm text-neutral-400">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="hover:text-white transition-colors">
              {link.label}
            </a>
          ))}
        </div>
        <a
          href="#send-money"
          className="px-5 py-2 text-sm font-medium rounded-full bg-white text-black hover:bg-neutral-200 transition-all"
        >
          Get a Quote
        </a>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-8 pt-24 pb-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl space-y-6"
        >
          <span className="text-xs uppercase tracking-widest text-cyan-400 font-semibold px-3 py-1 bg-cyan-950/40 border border-cyan-500/30 rounded-full">
            International Money Transfers
          </span>
          <h1
            className="font-semibold tracking-tight leading-[1.1]"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
          >
            {SITE.tagline}
          </h1>
          <p className="text-lg text-neutral-400 max-w-xl">
            Send money to friends and family in minutes, backed by transparent rates and no hidden fees.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <a
              href="#send-money"
              className="px-6 py-3 text-sm font-medium rounded-full bg-white text-black hover:bg-neutral-200 transition-all"
            >
              Get a Quote
            </a>
            <a
              href="/gallery"
              className="px-6 py-3 text-sm font-medium rounded-full border border-white/20 text-white hover:border-white/40 transition-all"
            >
              See Our Locations
            </a>
          </div>
        </motion.div>

        {/* Services Grid */}
        <div id="services" className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-20 scroll-mt-24">
          {SERVICES.map((service, idx) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 + idx * 0.1 }}
              className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all group backdrop-blur-sm shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]"
            >
              <div className="text-2xl mb-3">{service.icon}</div>
              <div className="text-base font-semibold tracking-tight text-white group-hover:text-cyan-400 transition-colors">
                {service.title}
              </div>
              <div className="text-xs text-neutral-400 mt-2 leading-relaxed">
                {service.description}
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
