import { OrdersPage } from '../Orders/OrdersPage';
import { ProtectedRoute } from './ProtectedRoute';

export const ProtectedOrdersPage = () => (
  <ProtectedRoute>
    <OrdersPage />
  </ProtectedRoute>
);
