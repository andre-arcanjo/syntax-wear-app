import { OrdersPage } from '../Order/OrdersPage';
import { ProtectedRoute } from '../ProtectedRoute';

export const ProtectedOrdersPage = () => (
  <ProtectedRoute>
    <OrdersPage />
  </ProtectedRoute>
);
