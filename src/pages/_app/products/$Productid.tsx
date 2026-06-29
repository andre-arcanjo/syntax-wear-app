import { createFileRoute, Link, useLoaderData } from '@tanstack/react-router';
import { formatCurrency } from '../../../utils/format-currency';
import { useContext } from 'react';
import { CartContext } from '../../../context/CartContext';
import { CEPForm } from '../../../components/CEPForm';
import { getProductDetailById } from '../../../services/productService';

export const Route = createFileRoute('/_app/products/$productId')({
  loader: async ({ params }) => {
    const product = await getProductDetailById(params.productId);
    return { product };
  },
  component: RouteComponent,
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: 'Produto não encontrado - Produtos - Syntaxwear' }],
      };
    }

    return {
      meta: [{ title: `${loaderData?.product?.name} - Produtos - SyntaxWear` }],
    };
  },
  notFoundComponent: () => (
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
  ),
});

function RouteComponent() {
  const { add } = useContext(CartContext);
  const { product } = useLoaderData({ from: Route.id });
  const originalPrice = product.price ?? 0;
  const discountPrice = originalPrice * 0.9;
  const inInstallmentsPrice = originalPrice / 6;

  return (
    <section className="container px-4 md:px-10 pt-32 md:pt-44 pb-10">
      {/* Breadcrumb */}
      <nav className="text-black text-xs sm:text-sm mb-8">
        <Link to="/">Home</Link> / <Link to="/products">Produtos</Link> /{' '}
        <span className="font-semibold">{product.name}</span>
      </nav>

      {/* Layout principal */}
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center lg:items-start">
        {/* Imagem */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full max-w-md sm:max-w-lg lg:max-w-full bg-white rounded-2xl object-cover"
          />
        </div>

        {/* Info */}
        <div className="w-full lg:w-1/2 text-black">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">
            {product.name}
          </h1>

          <p className="mb-2 text-sm sm:text-base">Cor: {product.color}</p>

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
            ou <span className="font-semibold">6x</span> de{' '}
            <span className="font-semibold">
              {formatCurrency(inInstallmentsPrice)}
            </span>
          </p>

          <p className="my-5 text-sm sm:text-base leading-relaxed">
            {product.description}
          </p>

          <div className="mb-6">
            <p className="text-sm mb-1">Calcular o prazo de entrega</p>
            <CEPForm />
          </div>

          <button
            onClick={() => add(product)}
            className="bg-black text-white rounded-md p-4 sm:p-5 w-full cursor-pointer hover:bg-gray-800 transition"
          >
            Adicionar ao carrinho
          </button>
        </div>
      </div>
    </section>
  );
}
