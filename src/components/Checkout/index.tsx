import { useContext } from "react";
import { CartContext } from "../../context/CartContext/CartContext";
import { formatCurrency } from "../../utils/format-currency";

export const Checkout = () => {

  const { cart } = useContext(CartContext)

  const totalProducts = cart.reduce((acc, price) => {
    return acc + price.price
  }, 0)

    return (
    <div className="min-h-screen flex justify-center bg-[rgb(236,233,226)] text-black py-10">
      <section className="flex justify-center items-center gap-20">
        <div className="identificacao flex flex-col gap-10">
          <div className="rounded-2xl bg-white flex flex-col  gap-3 py-4 px-3">
            <h2 className="text-xl font-bold">Identificação</h2>

            <div className="rounded-[28px]">
              <p className="text-sm text-[#C5C5C5]">Email</p>
              <p className="text-sm text-[#C5C5C5]">Sobrenome</p>

              <div className="flex gap-4 rounded-2xl bg-[#F5F5F7] p-4">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-white text-sm">
                  !
                </span>
                <div className="space-y-1">
                  <p className="text-sm text-black">
                    Antes de continuar, verifique se o telefone para contato
                    está correto.
                  </p>
                  <p className="text-sm font-semibold">00 000000000</p>
                </div>
              </div>

              <button
                type="button"
                className="text-sm font-semibold text-[#339CF1] hover:underline"
              >
                editar telefone
              </button>
            </div>
          </div>

          <div className="rounded-[30px] border border-border bg-white p-8 shadow-sm space-y-6">
            <h2 className="text-xl font-bold">Informe seu endereço</h2>

            <input
              type="text"
              placeholder="CEP"
              value='cep'
              className="..."
            />

            <button>
              Buscar
            </button>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="logradouro"
                className="w-full rounded-2xl border border-border bg-surface px-4 py-3 text-sm text-black outline-none"
              />

              <div className="grid gap-3 sm:grid-cols-2">
                <input
                  type="text"
                  placeholder="número"
                  className="w-full rounded-2xl border border-border bg-surface px-4 py-3 text-sm text-black outline-none"
                />
                <input
                  type="text"
                  placeholder="complemento"
                  className="w-full rounded-2xl border border-border bg-surface px-4 py-3 text-sm text-black outline-none"
                />
              </div>

              <input
                type="text"
                placeholder="bairro"
                className="w-full rounded-2xl border border-border bg-surface px-4 py-3 text-sm text-black outline-none"
              />

              <div className="grid gap-3 sm:grid-cols-2">
                <input
                  type="text"
                  placeholder="cidade"
                  className="w-full rounded-2xl border border-border bg-surface px-4 py-3 text-sm text-black outline-none"
                />
                <input
                  type="text"
                  placeholder="estado"
                  className="w-full rounded-2xl border border-border bg-surface px-4 py-3 text-sm text-black outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="rounded-[30px] border border-border bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-6">Resumo do pedido</h2>

            <div className="space-y-4">
              {cart.map((product) => (
                <>
                  <div className="flex items-center gap-4 rounded-3xl border border-border bg-surface-alt p-4">
                    <img
                      src={product.images[0]}
                      className="h-16 w-16 rounded-3xl"
                    />
                    <div className="flex-1">
                      <p className="font-semibold">{product.name}</p>
                      <p className="text-sm text-gray-text">
                        {product.quantity}
                      </p>
                    </div>
                    <span className="font-semibold">
                      {formatCurrency(product.price)}
                    </span>
                  </div>
                </>
              ))}

              <div className="mt-6 space-y-3 border-t border-border pt-5">
                <div className="flex items-center justify-between text-sm text-gray-text">
                  <span>Subtotal</span>
                  <span>{formatCurrency(totalProducts)}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-text">
                  <span>Frete</span>
                  <span>A calcular</span>
                </div>
                <div className="flex items-center justify-between text-base font-semibold">
                  <span>Total</span>
                  <span>{formatCurrency(totalProducts)}</span>
                </div>
              </div>

              <button
                type="button"
                className="mt-6 w-full rounded-3xl bg-black py-4 text-sm font-semibold text-white transition hover:bg-[#111]"
              >
                Fechar pedido
              </button>
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
};
