import AurosHero from "@/components/AurosHero";
import SendMoneyQuote from "@/components/SendMoneyQuote";
import LocationServices from "@/components/LocationServices";
import SiteFooter from "@/components/SiteFooter";
import { getSession } from "@/lib/auth";

export default async function Home() {
  const session = await getSession();

  return (
    <>
      <AurosHero session={session} />
      <SendMoneyQuote />
      <LocationServices />
      <SiteFooter />
    </>
  );
}
