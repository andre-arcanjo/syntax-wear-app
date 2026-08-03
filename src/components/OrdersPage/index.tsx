import { useEffect, useState } from 'react';
import {
  getOrders,
  type OrderStatus,
  type UserOrder,
} from '../../services/orderService';
import { formatCurrency } from '../../utils/format-currency';

const statusLabels: Record<OrderStatus, string> = {
  PENDING: 'Pendente',
  PAID: 'Pago',
  SHIPPED: 'Enviado',
  DELIVERED: 'Entregue',
  CANCELLED: 'Cancelado',
};

const statusStyles: Record<OrderStatus, string> = {
  PENDING: 'bg-amber-100 text-amber-800',
  PAID: 'bg-blue-100 text-blue-800',
  SHIPPED: 'bg-purple-100 text-purple-800',
  DELIVERED: 'bg-green-100 text-green-800',
  CANCELLED: 'bg-red-100 text-red-800',
};

export const OrdersPage = () => {
  const [orders, setOrders] = useState<UserOrder[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isCurrentRequest = true;

    const loadOrders = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await getOrders(page);

        if (!isCurrentRequest) return;

        setOrders((currentOrders) =>
          page === 1
            ? response.data
            : [...currentOrders, ...response.data],
        );
        setTotalPages(response.totalPages);
      } catch (requestError) {
        if (!isCurrentRequest) return;

        setError(
          requestError instanceof Error
            ? requestError.message
            : 'Não foi possível carregar seus pedidos',
        );
      } finally {
        if (isCurrentRequest) setIsLoading(false);
      }
    };

    loadOrders();

    return () => {
      isCurrentRequest = false;
    };
  }, [page]);

  return (
    <main className="min-h-screen bg-[rgb(236,233,226)] px-4 pb-16 pt-40 text-black sm:px-6">
      <section className="mx-auto max-w-5xl rounded-[30px] bg-white p-6 shadow-sm sm:p-8">
        <h1 className="text-3xl font-bold">Meus pedidos</h1>
        <p className="mt-2 text-gray-600">
          Acompanhe os pedidos realizados com sua conta.
        </p>

        {isLoading && orders.length === 0 ? (
          <div className="flex min-h-64 items-center justify-center">
            <div
              className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-b-black"
              aria-label="Carregando pedidos"
            />
          </div>
        ) : error ? (
          <p className="mt-8 rounded-2xl bg-red-50 p-4 text-red-700" role="alert">
            {error}
          </p>
        ) : orders.length === 0 ? (
          <div className="mt-8 rounded-2xl bg-gray-50 p-8 text-center">
            <p className="font-semibold">Você ainda não possui pedidos.</p>
          </div>
        ) : (
          <div className="mt-8 space-y-4">
            {orders.map((order) => {
              const itemCount = order.items.reduce(
                (total, item) => total + item.quantity,
                0,
              );

              return (
                <article
                  key={order.id}
                  className="rounded-2xl border border-border p-5"
                >
                  <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                      <p className="font-bold">Pedido #{order.id}</p>
                      <p className="mt-1 text-sm text-gray-500">
                        {new Intl.DateTimeFormat('pt-BR').format(
                          new Date(order.createdAt),
                        )}
                        {' · '}
                        {itemCount} {itemCount === 1 ? 'item' : 'itens'}
                      </p>
                    </div>
                    <div className="flex items-center justify-between gap-4 sm:justify-end">
                      <span
                        className={`rounded-full px-3 py-1 text-sm font-semibold ${statusStyles[order.status]}`}
                      >
                        {statusLabels[order.status]}
                      </span>
                      <strong>{formatCurrency(Number(order.total))}</strong>
                    </div>
                  </div>
                </article>
              );
            })}

            {page < totalPages && (
              <button
                type="button"
                onClick={() => setPage((currentPage) => currentPage + 1)}
                disabled={isLoading}
                className="mx-auto block rounded-2xl bg-black px-6 py-3 font-semibold text-white transition hover:bg-[#494949] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoading ? 'Carregando...' : 'Carregar mais'}
              </button>
            )}
          </div>
        )}
      </section>
    </main>
  );
};
