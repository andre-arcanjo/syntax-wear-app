import { Link, useParams } from '@tanstack/react-router';

export const OrderSuccess = () => {
  const { orderId } = useParams({ from: '/_app/order-success/$orderId' });

  return (
    <main className="min-h-screen bg-[rgb(236,233,226)] px-4 py-36 text-black sm:px-6">
      <section className="mx-auto flex max-w-2xl flex-col items-center rounded-[30px] bg-white px-6 py-12 text-center shadow-sm sm:px-12">
        <span
          className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-black text-3xl text-white"
          aria-hidden="true"
        >
          ✓
        </span>
        <h1 className="text-3xl font-bold">Agradecemos pela sua compra!</h1>
        <p className="mt-4 text-gray-600">
          Seu pedido #{orderId} foi criado com sucesso.
        </p>
        <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            to="/products"
            className="rounded-2xl bg-black px-6 py-3 font-semibold text-white transition hover:bg-[#494949]"
          >
            Continue comprando
          </Link>
          <Link
            to="/orders"
            className="rounded-2xl border border-black px-6 py-3 font-semibold transition hover:bg-black hover:text-white"
          >
            Ir para meus pedidos
          </Link>
        </div>
      </section>
    </main>
  );
};
