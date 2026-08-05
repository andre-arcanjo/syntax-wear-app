import { OrderSuccess } from '../Order/OrderSuccess';
import { ProtectedRoute } from '../ProtectedRoute';

export const ProtectedOrderSuccess = () => (
  <ProtectedRoute>
    <OrderSuccess />
  </ProtectedRoute>
);
