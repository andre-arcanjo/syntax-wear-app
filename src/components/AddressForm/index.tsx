import type {
  FieldErrors,
  UseFormRegister,
} from 'react-hook-form';
import type { ShippingAddress } from '../../schemas/checkout.schema';

interface AddressFormProps {
  errors: FieldErrors<ShippingAddress>;
  isLoadingCep: boolean;
  cepError: string | null;
  register: UseFormRegister<ShippingAddress>;
  onFetchCep: () => Promise<void>;
}

const inputClassName =
  'w-full rounded-2xl border border-border bg-surface px-4 py-3 text-sm text-black outline-none';

export const AddressForm = ({
  errors,
  isLoadingCep,
  cepError,
  register,
  onFetchCep,
}: AddressFormProps) => {
  return (
    <div className="rounded-[30px] border border-border bg-white p-8 shadow-sm space-y-6">
      <h2 className="text-xl font-bold">Informe seu endereço</h2>

      <div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            type="text"
            placeholder="CEP"
            {...register('cep')}
            aria-invalid={Boolean(errors.cep)}
            className={`${inputClassName} sm:w-[45%]`}
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
        {errors.cep && (
          <p className="mt-1 text-sm text-red-500">{errors.cep.message}</p>
        )}
        {cepError && (
          <p className="mt-1 text-sm text-red-500" role="alert">
            {cepError}
          </p>
        )}
      </div>

      <div className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="logradouro"
            {...register('street')}
            aria-invalid={Boolean(errors.street)}
            className={inputClassName}
          />
          {errors.street && (
            <p className="mt-1 text-sm text-red-500">{errors.street.message}</p>
          )}
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <input
              type="text"
              placeholder="número"
              {...register('number')}
              aria-invalid={Boolean(errors.number)}
              className={inputClassName}
            />
            {errors.number && (
              <p className="mt-1 text-sm text-red-500">{errors.number.message}</p>
            )}
          </div>
          <div>
            <input
              type="text"
              placeholder="complemento"
              {...register('complement')}
              className={inputClassName}
            />
          </div>
        </div>

        <div>
          <input
            type="text"
            placeholder="bairro"
            {...register('neighborhood')}
            aria-invalid={Boolean(errors.neighborhood)}
            className={inputClassName}
          />
          {errors.neighborhood && (
            <p className="mt-1 text-sm text-red-500">
              {errors.neighborhood.message}
            </p>
          )}
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <input
              type="text"
              placeholder="cidade"
              {...register('city')}
              aria-invalid={Boolean(errors.city)}
              className={inputClassName}
            />
            {errors.city && (
              <p className="mt-1 text-sm text-red-500">{errors.city.message}</p>
            )}
          </div>
          <div>
            <input
              type="text"
              placeholder="UF"
              maxLength={2}
              {...register('state')}
              aria-invalid={Boolean(errors.state)}
              className={inputClassName}
            />
            {errors.state && (
              <p className="mt-1 text-sm text-red-500">{errors.state.message}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
