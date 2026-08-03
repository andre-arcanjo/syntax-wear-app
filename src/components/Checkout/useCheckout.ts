import { useContext, useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { CartContext } from '../../context/CartContext/CartContext';
import { fetchCEP } from '../../services/CEPService';
import { createOrder } from '../../services/orderService';
import type { ShippingAddress } from './types';

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
  const { cart, clearCart } = useContext(CartContext);
  const [cep, setCep] = useState('');
  const [address, setAddress] = useState<ShippingAddress>(initialAddress);
  const [shippingCost, setShippingCost] = useState<number | null>(null);
  const [cepError, setCepError] = useState<string | null>(null);
  const [orderError, setOrderError] = useState<string | null>(null);
  const [isLoadingCep, setIsLoadingCep] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const subtotal = cart.reduce(
    (total, product) => total + product.price * product.quantity,
    0,
  );
  const total = subtotal + (shippingCost ?? 0);

  const handleCepChange = (value: string) => {
    setCep(value);
    setAddress((currentAddress) => ({
      ...currentAddress,
      cep: value.replace(/\D/g, ''),
    }));
  };

  const handleAddressChange = (
    field: keyof ShippingAddress,
    value: string,
  ) => {
    setAddress((currentAddress) => ({ ...currentAddress, [field]: value }));
  };

  const handleFetchCep = async () => {
    setCepError(null);
    setIsLoadingCep(true);

    try {
      const data = await fetchCEP(cep);

      setAddress((currentAddress) => ({
        ...currentAddress,
        cep: cep.replace(/\D/g, ''),
        street: data.street || '',
        neighborhood: data.neighborhood || '',
        complement: data.complement || '',
        city: data.city || '',
        state: data.state || '',
      }));
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

  const handleCreateOrder = async () => {
    if (isSubmitting) return;

    setOrderError(null);

    if (cart.length === 0) {
      setOrderError('Seu carrinho está vazio');
      return;
    }

    setIsSubmitting(true);

    try {
      const createdOrder = await createOrder({
        items: cart.map((product) => ({
          productId: product.id,
          quantity: product.quantity,
        })),
        shippingAddress: address,
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

  return {
    address,
    cart,
    cep,
    cepError,
    handleAddressChange,
    handleCepChange,
    handleCreateOrder,
    handleFetchCep,
    isLoadingCep,
    isSubmitting,
    orderError,
    shippingCost,
    subtotal,
    total,
  };
};
