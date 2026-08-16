import { Checkout } from '../Checkout/Checkout';
import { ProtectedRoute } from './ProtectedRoute';

export const ProtectedCheckout = () => (
  <ProtectedRoute>
    <Checkout />
  </ProtectedRoute>
);
