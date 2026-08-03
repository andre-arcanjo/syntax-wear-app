import { OrdersPage } from '../OrdersPage';
import { ProtectedRoute } from '../ProtectedRoute';

export const ProtectedOrdersPage = () => (
  <ProtectedRoute>
    <OrdersPage />
  </ProtectedRoute>
);
