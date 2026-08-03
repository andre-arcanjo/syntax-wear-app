import { createFileRoute } from '@tanstack/react-router';
import { ProtectedOrderSuccess } from '../../../components/ProtectedOrderSuccess';

export const Route = createFileRoute('/_app/order-success/$orderId')({
  component: ProtectedOrderSuccess,
  head: () => ({
    meta: [{ title: 'Pedido confirmado - SyntaxWear' }],
  }),
});
