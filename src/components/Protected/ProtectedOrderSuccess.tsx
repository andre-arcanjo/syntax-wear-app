import { OrderSuccess } from '../Orders/OrderSuccess';
import { ProtectedRoute } from './ProtectedRoute';

export const ProtectedOrderSuccess = () => (
  <ProtectedRoute>
    <OrderSuccess />
  </ProtectedRoute>
);
