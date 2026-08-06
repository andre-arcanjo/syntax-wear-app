interface OrderItem {
  productId: number;
  quantity: number;
  size?: string;
}

interface CreateOrderRequest {
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

interface CreateOrderResponse {
  message: string;
  orderId: number;
  subtotal: number;
  shippingCost: number;
  total: number;
}

export type OrderStatus =
  | 'PENDING'
  | 'PAID'
  | 'SHIPPED'
  | 'DELIVERED'
  | 'CANCELLED';

export interface UserOrder {
  id: number;
  subtotal: number;
  shippingCost: number;
  total: number;
  status: OrderStatus;
  paymentMethod: string;
  createdAt: string;
  items: Array<{
    id: number;
    productId: number;
    price: number;
    quantity: number;
    size?: string | null;
    product: {
      id: number;
      name: string;
      slug: string;
      images: string[];
    };
  }>;
}

export const getShippingCost = async (state: string): Promise<number> => {
  const response = await fetch(
    `http://localhost:3000/shipping/${state}`,
  );

  const responseData = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(
      responseData?.message || `Erro ao calcular frete (${response.status})`,
    );
  }

  return Number(responseData.shippingCost);
};

interface OrdersResponse {
  data: UserOrder[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export const createOrder = async (
  data: CreateOrderRequest,
): Promise<CreateOrderResponse> => {
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

export const getOrders = async (
  page = 1,
  limit = 10,
): Promise<OrdersResponse> => {
  const response = await fetch(
    `http://localhost:3000/orders/me?page=${page}&limit=${limit}`,
    { credentials: 'include' },
  );

  const responseData = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(
      responseData?.message || `Erro ao buscar pedidos (${response.status})`,
    );
  }

  return responseData;
};
