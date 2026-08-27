import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import OrderForm from "@/components/OrderForm";

export const metadata = {
  title: "Order Services",
};

export default function OrderPage() {
  return (
    <div className="min-h-screen text-white flex flex-col">
      <SiteNav />
      <OrderForm />
      <SiteFooter />
    </div>
  );
}
