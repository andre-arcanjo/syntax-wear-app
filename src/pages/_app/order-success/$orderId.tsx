import { createFileRoute } from '@tanstack/react-router';
import { OrderSuccess } from '../../../components/OrderSuccess';

export const Route = createFileRoute('/_app/order-success/$orderId')({
  component: OrderSuccess,
  head: () => ({
    meta: [{ title: 'Pedido confirmado - SyntaxWear' }],
  }),
});
