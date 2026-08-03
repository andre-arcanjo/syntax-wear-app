import { createFileRoute } from '@tanstack/react-router';
import { OrdersPage } from '../../../components/OrdersPage';

export const Route = createFileRoute('/_app/orders/')({
  component: OrdersPage,
  head: () => ({
    meta: [{ title: 'Meus pedidos - SyntaxWear' }],
  }),
});
