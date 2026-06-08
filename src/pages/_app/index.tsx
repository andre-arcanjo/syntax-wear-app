import { Categories } from "../../components/Categories";
import { Gallery } from "../../components/Gallery";
import { Hero } from "../../components/Hero";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main className="py-6">
      <Hero />
      <Categories />
      <Gallery />
    </main>
  );
}
