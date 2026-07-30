import { createFileRoute } from '@tanstack/react-router';
import { Checkout } from '../../../components/Checkout';

export const Route = createFileRoute('/_app/checkout/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <Checkout />;
}
