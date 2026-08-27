import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import { loginUser } from "@/lib/auth-actions";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Log In",
};

export default async function LoginPage({ searchParams }) {
  const session = await getSession();
  if (session) redirect("/account");

  const params = await searchParams;
  const error = params?.error === "invalid";

  return (
    <div className="min-h-screen text-white flex flex-col">
      <SiteNav />
      <main className="flex-1 max-w-md mx-auto px-8 py-16 w-full">
        <h1 className="text-3xl font-semibold tracking-tight mb-8 text-center">Log in</h1>

        {error && (
          <div className="mb-6 p-4 rounded-lg bg-red-950/40 border border-red-500/30 text-red-300 text-sm">
            Incorrect email or password.
          </div>
        )}

        <form action={loginUser} className="space-y-5">
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
            <label htmlFor="password" className="block text-xs uppercase tracking-widest text-neutral-500 mb-1">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="w-full px-4 py-3 rounded-lg bg-white/[0.03] border border-white/10 text-white focus:outline-none focus:border-cyan-500/50"
            />
          </div>
          <button
            type="submit"
            className="w-full px-6 py-3 text-sm font-medium rounded-full bg-white text-black hover:bg-neutral-200 transition-all"
          >
            Log In
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-neutral-500">
          Don&apos;t have an account?{" "}
          <a href="/register" className="text-white hover:underline">
            Register
          </a>
        </p>
      </main>
      <SiteFooter />
    </div>
  );
}
