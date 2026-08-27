"use client";

import { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";

const CURRENCIES = ["EUR", "USD", "GBP", "PLN", "RON", "MAD", "COP"];

const inputClass =
  "w-full px-3 py-2 rounded-lg bg-white/[0.03] border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-500/50";
const labelClass = "block text-[11px] uppercase tracking-widest text-neutral-500 mb-1";
const groupClass =
  "rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-sm shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] p-5";

export default function OrderPage() {
  const [checked, setChecked] = useState({
    pickup: false,
    send: false,
    parcel: false,
    print: false,
    scan: false,
  });

  const [fields, setFields] = useState({
    send_name: "",
    send_country: "",
    send_amount: "",
    send_currency: "EUR",
    parcel_carrier: "InPost / Punto Pack",
    parcel_action: "Pickup Package",
    parcel_code: "",
    print_copies: "1",
    print_color: "Black & White",
    print_sides: "Single Sided",
    print_size: "A4",
    scan_email: "",
    scan_pages: "1",
  });

  const [qrValue, setQrValue] = useState(null);

  const toggle = (id) => setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  const setField = (name, value) => setFields((prev) => ({ ...prev, [name]: value }));

  function generateOrder() {
    const selected = Object.entries(checked).filter(([, v]) => v);
    if (selected.length === 0) {
      alert("Please select at least one service.");
      return;
    }

    let summary = "BADAL 37 ORDER:\n";

    if (checked.pickup) {
      summary += "\n[Western Union / Ria - Cash Pickup]\n";
    }
    if (checked.send) {
      summary += "\n[Western Union / Ria - Send Money]";
      if (fields.send_name) summary += `\n - Receiver Full Name: ${fields.send_name}`;
      if (fields.send_country) summary += `\n - Destination Country: ${fields.send_country}`;
      if (fields.send_amount) summary += `\n - Amount to Send: ${fields.send_amount}`;
      summary += `\n - Currency: ${fields.send_currency}\n`;
    }
    if (checked.parcel) {
      summary += "\n[Parcel Service]";
      summary += `\n - Carrier: ${fields.parcel_carrier}`;
      summary += `\n - Action: ${fields.parcel_action}`;
      if (fields.parcel_code) summary += `\n - Tracking / Return Code: ${fields.parcel_code}`;
      summary += "\n";
    }
    if (checked.print) {
      summary += "\n[Printing / Photocopying]";
      summary += `\n - Copies: ${fields.print_copies}`;
      summary += `\n - Color Mode: ${fields.print_color}`;
      summary += `\n - Sides: ${fields.print_sides}`;
      summary += `\n - Paper Size: ${fields.print_size}\n`;
    }
    if (checked.scan) {
      summary += "\n[Document Scanning]";
      if (fields.scan_email) summary += `\n - Target Email: ${fields.scan_email}`;
      summary += `\n - Pages: ${fields.scan_pages}\n`;
    }

    setQrValue(summary);
  }

  return (
    <div className="min-h-screen text-white flex flex-col">
      <SiteNav />
      <main className="flex-1 max-w-2xl mx-auto px-8 py-16 w-full">
        <h1 className="text-3xl font-semibold tracking-tight mb-8 text-center">
          Select Services &amp; Details
        </h1>

        <div className="space-y-4">
          {/* Cash Pickup */}
          <div className={groupClass}>
            <label className="flex items-center gap-3 font-medium cursor-pointer">
              <input
                type="checkbox"
                checked={checked.pickup}
                onChange={() => toggle("pickup")}
                className="w-4 h-4 accent-cyan-500"
              />
              Western Union / Ria - Cash Pickup
            </label>
            {checked.pickup && (
              <p className="mt-4 pt-4 border-t border-dashed border-white/10 text-xs text-neutral-400 leading-relaxed">
                For your security, MTCN and PIN codes aren&apos;t collected online. Please bring your
                MTCN and a valid photo ID to the counter to complete your pickup in person.
              </p>
            )}
          </div>

          {/* Send Money */}
          <div className={groupClass}>
            <label className="flex items-center gap-3 font-medium cursor-pointer">
              <input
                type="checkbox"
                checked={checked.send}
                onChange={() => toggle("send")}
                className="w-4 h-4 accent-cyan-500"
              />
              Western Union / Ria - Send Money
            </label>
            {checked.send && (
              <div className="mt-4 pt-4 border-t border-dashed border-white/10 grid grid-cols-2 gap-3">
                <div>
                  <label className={labelClass}>Receiver Full Name</label>
                  <input
                    type="text"
                    className={inputClass}
                    value={fields.send_name}
                    onChange={(e) => setField("send_name", e.target.value)}
                    placeholder="Recipient name"
                  />
                </div>
                <div>
                  <label className={labelClass}>Destination Country</label>
                  <input
                    type="text"
                    className={inputClass}
                    value={fields.send_country}
                    onChange={(e) => setField("send_country", e.target.value)}
                    placeholder="e.g. Colombia"
                  />
                </div>
                <div>
                  <label className={labelClass}>Amount to Send</label>
                  <input
                    type="number"
                    className={inputClass}
                    value={fields.send_amount}
                    onChange={(e) => setField("send_amount", e.target.value)}
                    placeholder="e.g. 100"
                  />
                </div>
                <div>
                  <label className={labelClass}>Currency</label>
                  <select
                    className={inputClass}
                    value={fields.send_currency}
                    onChange={(e) => setField("send_currency", e.target.value)}
                  >
                    {CURRENCIES.map((c) => (
                      <option key={c} value={c} className="bg-[#0D0D0D]">
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}
          </div>

          {/* Parcel Service */}
          <div className={groupClass}>
            <label className="flex items-center gap-3 font-medium cursor-pointer">
              <input
                type="checkbox"
                checked={checked.parcel}
                onChange={() => toggle("parcel")}
                className="w-4 h-4 accent-cyan-500"
              />
              Parcel Service (InPost / DHL / UPS / GLS / Amazon / Celeritas)
            </label>
            {checked.parcel && (
              <div className="mt-4 pt-4 border-t border-dashed border-white/10 grid grid-cols-2 gap-3">
                <div>
                  <label className={labelClass}>Carrier</label>
                  <select
                    className={inputClass}
                    value={fields.parcel_carrier}
                    onChange={(e) => setField("parcel_carrier", e.target.value)}
                  >
                    {["InPost / Punto Pack", "DHL", "UPS", "GLS", "Amazon Hub", "Celeritas"].map((c) => (
                      <option key={c} value={c} className="bg-[#0D0D0D]">
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Action</label>
                  <select
                    className={inputClass}
                    value={fields.parcel_action}
                    onChange={(e) => setField("parcel_action", e.target.value)}
                  >
                    {["Pickup Package", "Drop-off / Return"].map((a) => (
                      <option key={a} value={a} className="bg-[#0D0D0D]">
                        {a}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-span-2">
                  <label className={labelClass}>Tracking / Return Code</label>
                  <input
                    type="text"
                    className={inputClass}
                    value={fields.parcel_code}
                    onChange={(e) => setField("parcel_code", e.target.value)}
                    placeholder="Enter barcode / tracking number"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Printing */}
          <div className={groupClass}>
            <label className="flex items-center gap-3 font-medium cursor-pointer">
              <input
                type="checkbox"
                checked={checked.print}
                onChange={() => toggle("print")}
                className="w-4 h-4 accent-cyan-500"
              />
              Printing / Photocopying (Copia / Imprimir)
            </label>
            {checked.print && (
              <div className="mt-4 pt-4 border-t border-dashed border-white/10 grid grid-cols-2 gap-3">
                <div>
                  <label className={labelClass}>Number of Copies</label>
                  <input
                    type="number"
                    min="1"
                    className={inputClass}
                    value={fields.print_copies}
                    onChange={(e) => setField("print_copies", e.target.value)}
                  />
                </div>
                <div>
                  <label className={labelClass}>Color Mode</label>
                  <select
                    className={inputClass}
                    value={fields.print_color}
                    onChange={(e) => setField("print_color", e.target.value)}
                  >
                    {["Black & White", "Full Color"].map((c) => (
                      <option key={c} value={c} className="bg-[#0D0D0D]">
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Sides</label>
                  <select
                    className={inputClass}
                    value={fields.print_sides}
                    onChange={(e) => setField("print_sides", e.target.value)}
                  >
                    {["Single Sided", "Double Sided"].map((s) => (
                      <option key={s} value={s} className="bg-[#0D0D0D]">
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Paper Size</label>
                  <select
                    className={inputClass}
                    value={fields.print_size}
                    onChange={(e) => setField("print_size", e.target.value)}
                  >
                    {["A4", "A3"].map((s) => (
                      <option key={s} value={s} className="bg-[#0D0D0D]">
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}
          </div>

          {/* Document Scanning */}
          <div className={groupClass}>
            <label className="flex items-center gap-3 font-medium cursor-pointer">
              <input
                type="checkbox"
                checked={checked.scan}
                onChange={() => toggle("scan")}
                className="w-4 h-4 accent-cyan-500"
              />
              Document Scanning (ESCAN @)
            </label>
            {checked.scan && (
              <div className="mt-4 pt-4 border-t border-dashed border-white/10 grid grid-cols-2 gap-3">
                <div className="col-span-2">
                  <label className={labelClass}>Target Email Address</label>
                  <input
                    type="text"
                    className={inputClass}
                    value={fields.scan_email}
                    onChange={(e) => setField("scan_email", e.target.value)}
                    placeholder="your-email@example.com"
                  />
                </div>
                <div>
                  <label className={labelClass}>Number of Pages</label>
                  <input
                    type="number"
                    min="1"
                    className={inputClass}
                    value={fields.scan_pages}
                    onChange={(e) => setField("scan_pages", e.target.value)}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        <button
          onClick={generateOrder}
          className="w-full mt-8 px-6 py-3 text-sm font-medium rounded-full bg-white text-black hover:bg-neutral-200 transition-all"
        >
          Generate Order QR Code
        </button>
      </main>
      <SiteFooter />

      {qrValue && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setQrValue(null)}
        >
          <div
            className="bg-white text-black rounded-2xl p-8 text-center max-w-sm w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-semibold">Scan at Counter</h3>
            <p className="text-xs text-neutral-500 mt-1">Show this QR code to the shopkeeper</p>
            <div className="flex justify-center my-6">
              <QRCodeCanvas value={qrValue} size={220} />
            </div>
            <button
              onClick={() => setQrValue(null)}
              className="px-5 py-2 text-sm font-medium rounded-full bg-black text-white"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
