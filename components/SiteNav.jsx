import Link from "next/link";
import { SITE, NAV_LINKS } from "@/lib/content";
import { getSession } from "@/lib/auth";

export default async function SiteNav() {
  const session = await getSession();

  return (
    <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto border-b border-white/10 relative z-10">
      <Link href="/" className="text-xl font-bold tracking-wider text-white">
        {SITE.brand.toUpperCase()}
      </Link>
      <div className="hidden md:flex flex-1 justify-evenly gap-x-12 px-12 text-sm text-neutral-400">
        {NAV_LINKS.map((link) => (
          <Link key={link.href} href={link.href} className="hover:text-white transition-colors">
            {link.label}
          </Link>
        ))}
      </div>
      {session ? (
        <Link
          href="/account"
          className="px-5 py-2 text-sm font-medium rounded-full bg-white text-black hover:bg-neutral-200 transition-all"
        >
          Hi, {session.name}
        </Link>
      ) : (
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="text-sm text-neutral-400 hover:text-white transition-colors"
          >
            Log In
          </Link>
          <Link
            href="/register"
            className="px-5 py-2 text-sm font-medium rounded-full bg-white text-black hover:bg-neutral-200 transition-all"
          >
            Register
          </Link>
        </div>
      )}
    </nav>
  );
}
