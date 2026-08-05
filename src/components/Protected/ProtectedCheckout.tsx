import { Checkout } from '../Checkout';
import { ProtectedRoute } from './ProtectedRoute';

export const ProtectedCheckout = () => (
  <ProtectedRoute>
    <Checkout />
  </ProtectedRoute>
);
