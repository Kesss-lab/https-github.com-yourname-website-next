import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import { submitContact } from "@/lib/actions";

export const metadata = {
  title: "Contact",
};

export default async function ContactPage({ searchParams }) {
  const params = await searchParams;
  const success = params?.success === "1";

  return (
    <div className="min-h-screen text-white flex flex-col">
      <SiteNav />
      <main className="flex-1 max-w-xl mx-auto px-8 py-16 w-full">
        <h1 className="text-3xl font-semibold tracking-tight mb-8 text-center">Contact us</h1>

        {success && (
          <div className="mb-6 p-4 rounded-lg bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 text-sm">
            Thanks — your message has been received.
          </div>
        )}

        <form action={submitContact} className="space-y-5">
          <div>
            <label htmlFor="name" className="block text-xs uppercase tracking-widest text-neutral-500 mb-1">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="w-full px-4 py-3 rounded-lg bg-white/[0.03] border border-white/10 text-white focus:outline-none focus:border-cyan-500/50"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-xs uppercase tracking-widest text-neutral-500 mb-1">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full px-4 py-3 rounded-lg bg-white/[0.03] border border-white/10 text-white focus:outline-none focus:border-cyan-500/50"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-xs uppercase tracking-widest text-neutral-500 mb-1">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              className="w-full px-4 py-3 rounded-lg bg-white/[0.03] border border-white/10 text-white focus:outline-none focus:border-cyan-500/50"
            />
          </div>
          <button
            type="submit"
            className="w-full px-6 py-3 text-sm font-medium rounded-full bg-white text-black hover:bg-neutral-200 transition-all"
          >
            Send Message
          </button>
        </form>
      </main>
      <SiteFooter />
    </div>
  );
}
