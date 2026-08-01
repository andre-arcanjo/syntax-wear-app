import { createContext } from 'react';
import type { CartContextType } from '../../interfaces/cart';

export const CartContext = createContext({} as CartContextType);
