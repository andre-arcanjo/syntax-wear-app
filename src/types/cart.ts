import type { Product, ProductCart } from "./product";

export interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface CartProviderProps {
  children: React.ReactNode;
}

export interface CartContextType {
  cart: ProductCart[];
  add: (product: Product) => void;
  remove: (productId: number) => void;
  increment: (product: ProductCart) => void;
  decrement: (product: ProductCart) => void;
  clearCart: () => void;
}
