import { OrderSuccess } from '../OrderSuccess';
import { ProtectedRoute } from '../ProtectedRoute';

export const ProtectedOrderSuccess = () => (
  <ProtectedRoute>
    <OrderSuccess />
  </ProtectedRoute>
);
