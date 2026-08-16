import type { ProductCart } from '../../types/product';
import { formatCurrency } from '../../utils/format-currency';

interface OrderSummaryProps {
  cart: ProductCart[];
  subtotal: number;
  shippingCost: number | null;
  total: number;
  error: string | null;
  isSubmitting: boolean;
}

export const OrderSummary = ({
  cart,
  subtotal,
  shippingCost,
  total,
  error,
  isSubmitting,
}: OrderSummaryProps) => {
  return (
    <aside className="w-full space-y-6 lg:max-w-105">
      <div className="rounded-[30px] border border-border bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold mb-6">Resumo do pedido</h2>

        <div className="space-y-4">
          {cart.map((product) => (
            <div
              key={product.id}
              className="flex items-center gap-4 rounded-3xl border border-border bg-surface-alt p-4"
            >
              <img
                src={product.images[0]}
                alt={product.name}
                className="h-16 w-16 rounded-3xl"
              />
              <div className="flex-1">
                <p className="font-semibold">{product.name}</p>
                <p className="text-sm text-gray-text">{product.quantity}</p>
              </div>
              <span className="font-semibold">
                {formatCurrency(product.price * product.quantity)}
              </span>
            </div>
          ))}

          <div className="mt-6 space-y-3 border-t border-border pt-5">
            <div className="flex items-center justify-between text-sm text-gray-text">
              <span>Subtotal</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex items-center justify-between text-sm text-gray-text">
              <span>Frete</span>
              <span>
                {shippingCost === null
                  ? 'A calcular'
                  : formatCurrency(shippingCost)}
              </span>
            </div>
            <div className="flex items-center justify-between text-base font-semibold">
              <span>Total</span>
              <span>{formatCurrency(total)}</span>
            </div>
          </div>

          <button
            type="submit"
            className="mt-6 w-full rounded-3xl bg-black py-4 text-sm font-semibold text-white transition duration-200 ease-in-out hover:bg-[#494949] disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Fechando pedido...' : 'Fechar pedido'}
          </button>
          {error && (
            <p className="text-sm text-red-500" role="alert">
              {error}
            </p>
          )}
        </div>
      </div>
    </aside>
  );
};
