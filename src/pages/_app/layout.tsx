import { Outlet, createFileRoute, useLocation } from "@tanstack/react-router";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";

export const Route = createFileRoute("/_app")({
  component: AppLayout,
});

function AppLayout() {
  const location = useLocation();
  const isCheckoutRoute = location.pathname.includes("/checkout");

  return (
    <div>
      <Header />
      <Outlet />
      {!isCheckoutRoute && <Footer />}
    </div>
  );
}
