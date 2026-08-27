"use client";

import { motion } from "framer-motion";
import { LOCATION, PARTNERS } from "@/lib/content";

export default function LocationServices() {
  return (
    <section className="bg-black/30 backdrop-blur-sm border-t border-white/10 py-24">
      <div className="max-w-7xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs uppercase tracking-widest text-cyan-400 font-semibold">
            Our Location
          </span>
          <h2 className="mt-3 text-2xl md:text-3xl font-semibold tracking-tight">
            {LOCATION.address}
          </h2>
          <p className="mt-3 text-neutral-400 max-w-2xl">{LOCATION.intro}</p>
        </motion.div>

        <div className="flex flex-wrap gap-3 mt-10">
          {PARTNERS.map((partner, idx) => (
            <motion.span
              key={partner}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="px-4 py-2 text-xs uppercase tracking-wider rounded-full bg-white/[0.03] border border-white/10 text-neutral-300"
            >
              {partner}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}
