import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/products/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="container">
      <h1 className="text-black">OLÁ</h1>

      <p>Ola</p>
    </div>
  );
}
