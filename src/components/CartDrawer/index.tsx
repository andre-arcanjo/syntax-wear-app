import { useContext, useState } from "react";
import { CartContext } from "../../context/CartContext/CartContext";
import { formatCurrency } from "../../utils/format-currency";
import { useRouter } from "@tanstack/react-router";
import type { CartDrawerProps } from "../../types/cart";
import { useAuth } from "../../context/AuthContext/AuthContext";

export const CartDrawer = ({ isOpen, onClose }: CartDrawerProps) => {
  const { cart, remove, increment, decrement } =
    useContext(CartContext);
  const { isAuthenticated } = useAuth();

  const router = useRouter()  
  const [cartError, setCartError] = useState<string | null>(null);

  const handleCheckout = () => {
    if (!isAuthenticated) {
      setCartError('Faça login para continuar');
      return;
    }

    if (cart.length === 0) {
      setCartError('Seu carrinho está vazio');
      return;
    }

    setCartError(null);
    onClose();
    router.navigate({ to: '/checkout' });
  };

  return (
    <>
      <div
        className={`${isOpen ? "bg-black/70 visible" : "bg-transparent invisible"} text-black fixed inset-0 z-50 transition-all duration-600 ease-in-out`}
        onClick={onClose}
      >
        <div
          className={`${isOpen ? "translate-x-0" : "translate-x-full"} absolute top-0 right-0 bottom-0 bg-white pt-6 transition-all duration-500 ease-in-out w-75 md:w-100`}
          onClick={(e) => e.stopPropagation()}
        >
          <header className="flex items-center justify-between px-5">
            <p className="text-2xl font-bold">Carrinho ({cart.length})</p>
            <button className="text-xl cursor-pointer" onClick={onClose}>
              X
            </button>
          </header>

          <ul className="p-4 overflow-y-auto scrollbar-hide h-[calc(100%-140px)] flex flex-col gap-3">
            {cart.map((product) => (
              <li key={product.id} className="flex flex-col gap-1 pr-2">
                <button
                  className="self-end text-xs cursor-pointer"
                  onClick={() => remove(product.id)}
                >
                  X
                </button>

                <div className="flex gap-4">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-24 h-24 md:w-32 md:h-32"
                  />

                  <div className="flex flex-col items-start">
                    <p className="mb-1 text-sm">{product.name}</p>
                    <p className="mb-1 text-sm">
                      Quantidade: {product.quantity}
                    </p>

                    <p className="mb-3.5">
                      <span className="font-bold mr-1.5">
                        {formatCurrency(product.price)}
                      </span>{" "}
                      à vista
                    </p>

                    <div className="border flex gap-6 py-1 px-3">
                      <button
                        className="cursor-pointer"
                        onClick={() => decrement(product)}
                      >
                        -
                      </button>
                      <p>{product.quantity}</p>
                      <button
                        className="cursor-pointer"
                        onClick={() => increment(product)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="absolute bottom-0 w-full p-4">
            {cartError && (
              <p className="mb-2 text-sm text-red-500" role="alert">
                {cartError}
              </p>
            )}
            <button
              className="w-full bg-black py-4 text-white rounded-xs cursor-pointer hover:bg-gray-800"
              onClick={handleCheckout}
            >
              Fechar pedido
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
