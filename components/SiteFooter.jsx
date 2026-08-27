import { SITE, FOOTER_LINKS } from "@/lib/content";

export default function SiteFooter() {
  return (
    <footer className="bg-black/40 backdrop-blur-sm border-t border-white/10 py-16">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <span className="text-lg font-bold tracking-wider">{SITE.brand.toUpperCase()}</span>
            <p className="mt-2 text-sm text-neutral-400">Sending value across borders, simply.</p>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-widest text-neutral-500 mb-3">Company</h4>
            <ul className="space-y-2">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-neutral-400 hover:text-white transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-widest text-neutral-500 mb-3">Support</h4>
            <ul className="space-y-2">
              {FOOTER_LINKS.support.map((link, idx) => (
                <li key={`${link.label}-${idx}`}>
                  <a href={link.href} className="text-sm text-neutral-400 hover:text-white transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-widest text-neutral-500 mb-3">Legal</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-neutral-400 hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-sm text-neutral-400 hover:text-white transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-white/10 text-xs text-neutral-500">
          &copy; {new Date().getFullYear()} {SITE.brand}. Demo site — the &quot;Send Money&quot; quote tool is illustrative only and does not process real transactions.
        </div>
      </div>
    </footer>
  );
}
