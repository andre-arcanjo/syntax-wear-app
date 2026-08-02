import { useContext, useState } from 'react';
import { CartContext } from '../../context/CartContext/CartContext';
import { formatCurrency } from '../../utils/format-currency';
import { useAuth } from '../../context/AuthContext/AuthContext';
import type { CEPResponse } from '../../interfaces/CEP';
import { fetchCEP } from '../../services/CEPService';

export const Checkout = () => {
  const { user } = useAuth();
  const { cart } = useContext(CartContext);
  const [cep, setCep] = useState('');
  const [address, setAddress] = useState<CEPResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoadingCep, setIsLoadingCep] = useState(false);
  const [formAddress, setFormAddress] = useState({
    cep: '',
    street: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: '',
  });

  //função pra calcular total dos produtos no carrinho
  const totalProducts = cart.reduce((acc, product) => {
    return acc + product.price * product.quantity;
  }, 0);

  // função pra buscar o cep e resetar informações de endereço
  const handleFetchCEP = async () => {
    setError(null);
    setIsLoadingCep(true);

    setFormAddress((prev) => ({
      ...prev,
      street: '',
      neighborhood: '',
      city: '',
      state: '',
    }));

    try {
      const data = await fetchCEP(cep);
      setAddress(data);

      // se tem data.street, preencher conforme a API, se não, input vazio
      setFormAddress((prev) => ({
        ...prev,
        street: data.street || '',
        neighborhood: data.neighborhood || '',
        complement: data.complement || '',
        city: data.city || '',
        state: data.state || '',
      }));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao buscar CEP');
    } finally {
      setIsLoadingCep(false);
    }
  };

  // funcão pra calcular total geral
  const total = totalProducts + (address?.shippingCost || 0);

  return (
    <div className="min-h-screen lg:flex lg:items-center bg-[rgb(236,233,226)] px-4 py-6 text-black sm:px-6 lg:px-8 lg:py-10">
      <section className="mx-auto my-25 flex w-full max-w-6xl flex-col gap-6 lg:flex-row lg:items-start lg:justify-center lg:gap-20">
        {/* div identificação */}
        <div className="flex w-full flex-col gap-6 lg:max-w-155 lg:gap-10">
          <div className="rounded-2xl bg-white flex flex-col  gap-3 py-4 px-3">
            <h2 className="text-xl font-bold">Identificação</h2>

            <div className="rounded-[28px]">
              <p className="text-sm text-[#C5C5C5]">{user?.email}</p>
              <p className="text-sm text-[#C5C5C5]">{user?.firstName}</p>

              <div className="flex gap-4 rounded-2xl bg-[#F5F5F7] p-4">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-white text-sm">
                  !
                </span>
                <div className="space-y-1">
                  <p className="text-sm text-black">
                    Antes de continuar, verifique se o telefone para contato
                    está correto.
                  </p>
                  <p className="text-sm font-semibold">{user?.phone}</p>
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

          {/* formulario de endereço */}
          <div className="rounded-[30px] border border-border bg-white p-8 shadow-sm space-y-6">
            <h2 className="text-xl font-bold">Informe seu endereço</h2>

            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                type="text"
                placeholder="CEP"
                value={cep}
                onChange={(e) => setCep(e.target.value)}
                className="w-full rounded-2xl border border-border bg-surface px-4 py-3 text-sm outline-none sm:w-[45%]"
              />

              <button
                type="button"
                onClick={handleFetchCEP}
                disabled={isLoadingCep}
                className="rounded-2xl bg-black px-5 py-3 text-sm font-semibold text-white transition duration-200 ease-in-out hover:bg-[#494949] cursor-pointer sm:w-auto"
              >
                {isLoadingCep ? 'Buscando...' : 'Buscar'}
              </button>
            </div>

            {error && (
              <p className="text-red-500 text-sm mt-2">
                Não foi possível buscar o CEP, tente novamente.
              </p>
            )}

            <div className="space-y-4">
              <input
                type="text"
                placeholder="logradouro"
                value={formAddress.street}
                onChange={(e) =>
                  setFormAddress((prev) => ({
                    ...prev,
                    street: e.target.value,
                  }))
                }
                className="w-full rounded-2xl border border-border bg-surface px-4 py-3 text-sm text-black outline-none"
              />

              <div className="grid gap-3 sm:grid-cols-2">
                <input
                  type="text"
                  placeholder="número"
                  value={formAddress.number}
                  onChange={(e) =>
                    setFormAddress((prev) => ({
                      ...prev,
                      number: e.target.value,
                    }))
                  }
                  className="w-full rounded-2xl border border-border bg-surface px-4 py-3 text-sm text-black outline-none"
                />
                <input
                  type="text"
                  placeholder="complemento"
                  value={formAddress.complement}
                  onChange={(e) =>
                    setFormAddress((prev) => ({
                      ...prev,
                      complement: e.target.value,
                    }))
                  }
                  className="w-full rounded-2xl border border-border bg-surface px-4 py-3 text-sm text-black outline-none"
                />
              </div>

              <input
                type="text"
                placeholder="bairro"
                value={formAddress.neighborhood}
                onChange={(e) =>
                  setFormAddress((prev) => ({
                    ...prev,
                    neighborhood: e.target.value,
                  }))
                }
                className="w-full rounded-2xl border border-border bg-surface px-4 py-3 text-sm text-black outline-none"
              />

              <div className="grid gap-3 sm:grid-cols-2">
                <input
                  type="text"
                  placeholder="cidade"
                  value={formAddress.city}
                  onChange={(e) =>
                    setFormAddress((prev) => ({
                      ...prev,
                      city: e.target.value,
                    }))
                  }
                  className="w-full rounded-2xl border border-border bg-surface px-4 py-3 text-sm text-black outline-none"
                />
                <input
                  type="text"
                  placeholder="estado"
                  value={formAddress.state}
                  onChange={(e) =>
                    setFormAddress((prev) => ({
                      ...prev,
                      state: e.target.value,
                    }))
                  }
                  className="w-full rounded-2xl border border-border bg-surface px-4 py-3 text-sm text-black outline-none"
                />
              </div>
            </div>
          </div>
        </div>

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
                  <span>{formatCurrency(totalProducts)}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-text">
                  <span>Frete</span>
                  <span>
                    <span>
                      {address
                        ? formatCurrency(address.shippingCost)
                        : 'A calcular'}
                    </span>
                  </span>
                </div>
                <div className="flex items-center justify-between text-base font-semibold">
                  <span>Total</span>
                  <span>{formatCurrency(total)}</span>
                </div>
              </div>

              <button
                type="button"
                className="mt-6 w-full rounded-3xl bg-black py-4 text-sm font-semibold text-white transition duration-200 ease-in-out hover:bg-[#494949] cursor-pointer"
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
