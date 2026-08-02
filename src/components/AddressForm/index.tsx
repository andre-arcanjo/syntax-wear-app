import type { ShippingAddress } from '../Checkout/types';

interface AddressFormProps {
  cep: string;
  address: ShippingAddress;
  error: string | null;
  isLoadingCep: boolean;
  onCepChange: (cep: string) => void;
  onAddressChange: (field: keyof ShippingAddress, value: string) => void;
  onFetchCep: () => Promise<void>;
}

export const AddressForm = ({
  cep,
  address,
  error,
  isLoadingCep,
  onCepChange,
  onAddressChange,
  onFetchCep,
}: AddressFormProps) => {
  return (
    <div className="rounded-[30px] border border-border bg-white p-8 shadow-sm space-y-6">
      <h2 className="text-xl font-bold">Informe seu endereço</h2>

      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          type="text"
          placeholder="CEP"
          value={cep}
          onChange={(event) => onCepChange(event.target.value)}
          className="w-full rounded-2xl border border-border bg-surface px-4 py-3 text-sm outline-none sm:w-[45%]"
        />

        <button
          type="button"
          onClick={onFetchCep}
          disabled={isLoadingCep}
          className="rounded-2xl bg-black px-5 py-3 text-sm font-semibold text-white transition duration-200 ease-in-out hover:bg-[#494949] disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer sm:w-auto"
        >
          {isLoadingCep ? 'Buscando...' : 'Buscar'}
        </button>
      </div>

      {error && (
        <p className="text-red-500 text-sm mt-2" role="alert">
          {error}
        </p>
      )}

      <div className="space-y-4">
        <input
          type="text"
          placeholder="logradouro"
          value={address.street}
          onChange={(event) => onAddressChange('street', event.target.value)}
          className="w-full rounded-2xl border border-border bg-surface px-4 py-3 text-sm text-black outline-none"
        />

        <div className="grid gap-3 sm:grid-cols-2">
          <input
            type="text"
            placeholder="número"
            value={address.number}
            onChange={(event) => onAddressChange('number', event.target.value)}
            className="w-full rounded-2xl border border-border bg-surface px-4 py-3 text-sm text-black outline-none"
          />
          <input
            type="text"
            placeholder="complemento"
            value={address.complement}
            onChange={(event) =>
              onAddressChange('complement', event.target.value)
            }
            className="w-full rounded-2xl border border-border bg-surface px-4 py-3 text-sm text-black outline-none"
          />
        </div>

        <input
          type="text"
          placeholder="bairro"
          value={address.neighborhood}
          onChange={(event) =>
            onAddressChange('neighborhood', event.target.value)
          }
          className="w-full rounded-2xl border border-border bg-surface px-4 py-3 text-sm text-black outline-none"
        />

        <div className="grid gap-3 sm:grid-cols-2">
          <input
            type="text"
            placeholder="cidade"
            value={address.city}
            onChange={(event) => onAddressChange('city', event.target.value)}
            className="w-full rounded-2xl border border-border bg-surface px-4 py-3 text-sm text-black outline-none"
          />
          <input
            type="text"
            placeholder="UF"
            value={address.uf}
            onChange={(event) => onAddressChange('uf', event.target.value)}
            className="w-full rounded-2xl border border-border bg-surface px-4 py-3 text-sm text-black outline-none"
          />
        </div>
      </div>
    </div>
  );
};
