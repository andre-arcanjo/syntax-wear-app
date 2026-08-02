import { CustomerInfo } from '../CustomerInfo';
import { AddressForm } from '../AddressForm';
import { Order } from '../Order';
import { useCheckout } from './useCheckout';

export const Checkout = () => {
  const checkout = useCheckout();

  return (
    <div className="min-h-screen lg:flex lg:items-center bg-[rgb(236,233,226)] px-4 py-6 text-black sm:px-6 lg:px-8 lg:py-10">
      <section className="mx-auto my-25 flex w-full max-w-6xl flex-col gap-6 lg:flex-row lg:items-start lg:justify-center lg:gap-20">
        <div className="flex w-full flex-col gap-6 lg:max-w-155 lg:gap-10">
          <CustomerInfo />

          <AddressForm
            cep={checkout.cep}
            address={checkout.address}
            error={checkout.cepError}
            isLoadingCep={checkout.isLoadingCep}
            onCepChange={checkout.handleCepChange}
            onAddressChange={checkout.handleAddressChange}
            onFetchCep={checkout.handleFetchCep}
          />
        </div>

        <Order
          cart={checkout.cart}
          subtotal={checkout.subtotal}
          shippingCost={checkout.shippingCost}
          total={checkout.total}
          error={checkout.orderError}
          isSubmitting={checkout.isSubmitting}
          onSubmit={checkout.handleCreateOrder}
        />
      </section>
    </div>
  );
};
