import { createFileRoute, Link } from "@tanstack/react-router";
import { products } from "../../../mocks/products";
import { formatCurrency } from "../../../utils/format-currency";
import { useContext } from "react";
import { CartContext } from "../../../context/CartContext";
import { CEPForm } from "../../../components/CEPForm";

export const Route = createFileRoute("/_app/products/$productId")({
  component: RouteComponent,
  head: ({ params }) => {
    const filteredProduct = products.find(
      (product) => product.id === Number(params.productId),
    );

    const title = filteredProduct
      ? `${filteredProduct.name} - Produtos - SyntaxWear`
      : "Produto não encontrado - Produtos - SyntaxWear";

    return { meta: [{ title }] };
  },
});

function RouteComponent() {
  const { add } = useContext(CartContext);
  const { productId } = Route.useParams();

  const filteredProduct = products.find(
    (product) => product.id === Number(productId),
  );

  if (!filteredProduct) {
    return (
      <section className="container px-4 pt-32 pb-10 text-center text-black min-h-[80vh] flex flex-col justify-center items-center">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4">
          Produto não encontrado
        </h1>
        <p className="mb-6 text-sm sm:text-base">
          O produto que você está procurando não existe ou foi removido.
        </p>
        <Link
          to="/products"
          className="text-accent hover:text-accent-hover underline"
        >
          Voltar para produtos
        </Link>
      </section>
    );
  }

  const originalPrice = filteredProduct.price;
  const discountPrice = originalPrice * 0.9;
  const inInstallmentsPrice = originalPrice / 6;

  return (
    <section className="container px-4 md:px-10 pt-32 md:pt-44 pb-10">
      
      {/* Breadcrumb */}
      <nav className="text-black text-xs sm:text-sm mb-8">
        <Link to="/">Home</Link> /{" "}
        <Link to="/products">Produtos</Link> /{" "}
        <span className="font-semibold">
          {filteredProduct.name}
        </span>
      </nav>

      {/* Layout principal */}
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center lg:items-start">
        
        {/* Imagem */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <img
            src={filteredProduct.image}
            alt={filteredProduct.name}
            className="w-full max-w-md sm:max-w-lg lg:max-w-full bg-white rounded-2xl object-cover"
          />
        </div>

        {/* Info */}
        <div className="w-full lg:w-1/2 text-black">
          
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">
            {filteredProduct.name}
          </h1>

          <p className="mb-2 text-sm sm:text-base">
            Cor: {filteredProduct.color}
          </p>

          <p className="line-through text-xs sm:text-sm text-[#878787]">
            {formatCurrency(originalPrice)}
          </p>

          <p className="text-2xl sm:text-3xl font-bold mb-2">
            {formatCurrency(discountPrice)} no PIX
          </p>

          <p className="text-xs sm:text-sm text-[#878787]">
            Você economiza: <span className="font-semibold">10%</span>
          </p>

          <p className="mb-3 text-sm sm:text-base">
            ou <span className="font-semibold">6x</span> de{" "}
            <span className="font-semibold">
              {formatCurrency(inInstallmentsPrice)}
            </span>
          </p>

          <p className="my-5 text-sm sm:text-base leading-relaxed">
            {filteredProduct.description}
          </p>

          <div className="mb-6">
            <p className="text-sm mb-1">
              Calcular o prazo de entrega
            </p>
            <CEPForm />
          </div>

          <button
            onClick={() => add(filteredProduct)}
            className="bg-black text-white rounded-md p-4 sm:p-5 w-full cursor-pointer hover:bg-gray-800 transition"
          >
            Adicionar ao carrinho
          </button>
        </div>
      </div>
    </section>
  );
}