import { useState } from "react";
import type { Product } from "../interfaces/product";
import { CartContext } from "./CartContext";

interface CartProviderProps {
  children: React.ReactNode;
}

interface ProductCart extends Product {
  quantity: number;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cart, setCart] = useState<ProductCart[]>([]);

  function addProductIntoCart(product: Product): void {
    
  }

  return <CartContext.Provider value={{}}>{children}</CartContext.Provider>;
};
