import { createFileRoute } from '@tanstack/react-router';
import { ProtectedCheckout } from '../../../components/Protected/ProtectedCheckout';

export const Route = createFileRoute('/_app/checkout/')({
  component: ProtectedCheckout,
});
