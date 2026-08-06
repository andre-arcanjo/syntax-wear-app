import { render, screen } from '@testing-library/react';
import { getOrders } from '../../services/order-service';
import { OrdersPage } from './OrdersPage';

vi.mock('../../services/order-service', () => ({
  getOrders: vi.fn(),
}));

const response = {
  total: 1,
  page: 1,
  limit: 10,
  totalPages: 1,
};

describe('OrdersPage', () => {
  beforeEach(() => vi.clearAllMocks());

  it('mostra o estado vazio quando o usuário ainda não possui pedidos', async () => {
    vi.mocked(getOrders).mockResolvedValue({ ...response, total: 0, data: [] });

    render(<OrdersPage />);

    expect(screen.getByLabelText('Carregando pedidos')).toBeInTheDocument();
    expect(await screen.findByText(/ainda não possui pedidos/i)).toBeInTheDocument();
  });

  it('mostra uma falha da API sem quebrar a página', async () => {
    vi.mocked(getOrders).mockRejectedValue(new Error('Falha ao buscar pedidos'));

    render(<OrdersPage />);

    expect(await screen.findByRole('alert')).toHaveTextContent('Falha ao buscar pedidos');
  });

  it('renderiza status e valores persistidos retornados pela API', async () => {
    vi.mocked(getOrders).mockResolvedValue({
      ...response,
      data: [
        {
          id: 42,
          subtotal: 399.8,
          shippingCost: 14.9,
          total: 414.7,
          status: 'PAID',
          paymentMethod: 'PIX',
          createdAt: '2026-08-06T12:00:00.000Z',
          items: [
            {
              id: 1,
              productId: 1,
              price: 199.9,
              quantity: 2,
              product: {
                id: 1,
                name: 'Tênis Syntax',
                slug: 'tenis-syntax',
                images: ['tenis.jpg'],
              },
            },
          ],
        },
      ],
    });

    render(<OrdersPage />);

    expect(await screen.findByText('Pedido #42')).toBeInTheDocument();
    expect(screen.getByText('Pago')).toBeInTheDocument();
    expect(screen.getByText(/Subtotal: R\$\s?399,80/)).toBeInTheDocument();
    expect(screen.getByText(/Frete: R\$\s?14,90/)).toBeInTheDocument();
    expect(screen.getByText(/Total: R\$\s?414,70/)).toBeInTheDocument();
  });
});
