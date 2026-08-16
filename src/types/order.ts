export interface OrderItem {
  productId: number;
  quantity: number;
  size?: string;
}

export interface CreateOrderRequest {
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

export interface CreateOrderResponse {
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