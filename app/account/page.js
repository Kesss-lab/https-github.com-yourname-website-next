import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import { getSession } from "@/lib/auth";
import { logoutUser } from "@/lib/auth-actions";
import { redirect } from "next/navigation";

export const metadata = {
  title: "My Account",
};

export default async function AccountPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  return (
    <div className="min-h-screen text-white flex flex-col">
      <SiteNav />
      <main className="flex-1 max-w-md mx-auto px-8 py-16 w-full">
        <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-sm shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Welcome, {session.name}</h1>
          <p className="mt-2 text-neutral-400">{session.email}</p>

          <form action={logoutUser} className="mt-8">
            <button
              type="submit"
              className="px-6 py-3 text-sm font-medium rounded-full border border-white/20 text-white hover:border-white/40 transition-all"
            >
              Log Out
            </button>
          </form>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
