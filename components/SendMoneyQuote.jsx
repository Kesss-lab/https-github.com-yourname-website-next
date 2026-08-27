"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";

const DEMO_RATES = {
  EUR: { label: "Euro", rate: 0.92 },
  PHP: { label: "Philippine Peso", rate: 56.3 },
  MXN: { label: "Mexican Peso", rate: 18.7 },
  INR: { label: "Indian Rupee", rate: 83.1 },
  NGN: { label: "Nigerian Naira", rate: 1450.0 },
};
const FEE = 3.99;

export default function SendMoneyQuote() {
  const [amount, setAmount] = useState(100);
  const [currency, setCurrency] = useState("EUR");

  const result = useMemo(() => {
    const parsed = parseFloat(amount) || 0;
    const rate = DEMO_RATES[currency]?.rate ?? 1;
    const net = Math.max(parsed - FEE, 0);
    return (net * rate).toFixed(2);
  }, [amount, currency]);

  return (
    <section id="send-money" className="py-24 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-xl mx-auto p-8 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-sm shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]"
        >
          <h2 className="text-2xl font-semibold tracking-tight text-center mb-6">
            Get an instant quote
          </h2>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-1">
                You send
              </label>
              <input
                type="number"
                min="1"
                step="1"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/[0.03] border border-white/10 text-white focus:outline-none focus:border-cyan-500/50"
              />
            </div>
            <div className="flex-1">
              <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-1">
                Destination
              </label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/[0.03] border border-white/10 text-white focus:outline-none focus:border-cyan-500/50"
              >
                {Object.entries(DEMO_RATES).map(([code, { label }]) => (
                  <option key={code} value={code} className="bg-[#0D0D0D]">
                    {code} — {label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-6 p-4 rounded-lg bg-white/[0.03] font-mono text-cyan-400 font-semibold">
            Recipient gets approximately {result} {currency} (fee: ${FEE.toFixed(2)})
          </div>
          <p className="mt-3 text-xs text-neutral-500">
            Demo estimate only, based on illustrative rates. No real transfer is initiated by this form.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
