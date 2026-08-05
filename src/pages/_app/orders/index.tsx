import { createFileRoute } from '@tanstack/react-router';
import { ProtectedOrdersPage } from '../../../components/Protected/ProtectedOrdersPage';

export const Route = createFileRoute('/_app/orders/')({
  component: ProtectedOrdersPage,
  head: () => ({
    meta: [{ title: 'Meus pedidos - SyntaxWear' }],
  }),
});
