import AurosHero from "@/components/AurosHero";
import SendMoneyQuote from "@/components/SendMoneyQuote";
import LocationServices from "@/components/LocationServices";
import SiteFooter from "@/components/SiteFooter";

export default function Home() {
  return (
    <>
      <AurosHero />
      <SendMoneyQuote />
      <LocationServices />
      <SiteFooter />
    </>
  );
}
