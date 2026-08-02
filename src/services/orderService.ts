interface OrderItem {
  productId: number;
  quantity: number;
  size?: string;
}

interface CreateOrderRequest {
  userId?: number;
  items: OrderItem[];
  shippingAddress: {
    cep: string;
    street: string;
    number: string;
    complement: string;
    neighborhood: string;
    city: string;
    state: string;
  };
  paymentMethod: string;
}

export const createOrder = async (data: CreateOrderRequest) => {
  const response = await fetch("http://localhost:3000/orders", {
    method: "POST",
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    const message = errorData?.message || `Erro ao fechar pedido (${response.status})`;
    const details = errorData?.errors
      ? `: ${JSON.stringify(errorData.errors)}`
      : '';

    throw new Error(`${message}${details}`);
  }

  return response.json();
};
