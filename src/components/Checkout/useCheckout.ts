import { useContext, useState, type FormEvent } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CartContext } from '../../context/CartContext/CartContext';
import { useAuth } from '../../context/AuthContext/AuthContext';
import { fetchCEP } from '../../services/cep-service';
import { createOrder } from '../../services/order-service';
import { checkoutSchema, type ShippingAddress } from '../../schemas/checkout.schema';

const initialAddress: ShippingAddress = {
  cep: '',
  street: '',
  number: '',
  complement: '',
  neighborhood: '',
  city: '',
  state: '',
};

export const useCheckout = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { cart, clearCart } = useContext(CartContext);
  const [shippingCost, setShippingCost] = useState<number | null>(null);
  const [cepError, setCepError] = useState<string | null>(null);
  const [orderError, setOrderError] = useState<string | null>(null);
  const [isLoadingCep, setIsLoadingCep] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    getValues,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<ShippingAddress>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: initialAddress,
    shouldFocusError: true,
  });

  const subtotal = cart.reduce(
    (total, product) => total + product.price * product.quantity,
    0,
  );
  const total = subtotal + (shippingCost ?? 0);

  const handleFetchCep = async () => {
    setCepError(null);

    const cepIsValid = await trigger('cep', { shouldFocus: true });
    if (!cepIsValid) return;

    const cep = getValues('cep').replace(/\D/g, '');
    setIsLoadingCep(true);

    try {
      const data = await fetchCEP(cep);

      setValue('cep', cep, { shouldValidate: true });
      setValue('street', data.street || '', { shouldValidate: true });
      setValue('neighborhood', data.neighborhood || '', {
        shouldValidate: true,
      });
      setValue('complement', data.complement || '');
      setValue('city', data.city || '', { shouldValidate: true });
      setValue('state', data.state || '', { shouldValidate: true });
      setShippingCost(data.shippingCost);
    } catch (error) {
      setShippingCost(null);
      setCepError(
        error instanceof Error ? error.message : 'Erro ao buscar CEP',
      );
    } finally {
      setIsLoadingCep(false);
    }
  };

  const submitOrder: SubmitHandler<ShippingAddress> = async (address) => {
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      const createdOrder = await createOrder({
        items: cart.map((product) => ({
          productId: product.id,
          quantity: product.quantity,
        })),
        shippingAddress: {
          ...address,
          cep: address.cep.replace(/\D/g, ''),
          state: address.state.toUpperCase(),
        },
        paymentMethod: 'PIX',
      });

      clearCart();
      await navigate({
        to: '/order-success/$orderId',
        params: { orderId: String(createdOrder.orderId) },
      });
    } catch (error) {
      console.error(error);
      setOrderError(
        error instanceof Error
          ? error.message
          : 'Não foi possível fechar o pedido',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCreateOrder = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting) return;

    setOrderError(null);

    if (!isAuthenticated) {
      setOrderError('Faça login para continuar');
      return;
    }

    if (cart.length === 0) {
      setOrderError('Seu carrinho está vazio');
      return;
    }

    void handleSubmit(submitOrder)(event);
  };

  return {
    cart,
    cepError,
    errors,
    handleCreateOrder,
    handleFetchCep,
    isLoadingCep,
    isSubmitting,
    orderError,
    register,
    shippingCost,
    subtotal,
    total,
  };
};
