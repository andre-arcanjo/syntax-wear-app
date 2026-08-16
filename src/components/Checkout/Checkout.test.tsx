import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AuthContext } from '../../context/AuthContext/AuthContext';
import { CartContext } from '../../context/CartContext/CartContext';
import type { ProductCart } from '../../types/product';
import { createOrder } from '../../services/order-service';
import { Checkout } from './Checkout';

const navigate = vi.fn();

vi.mock('@tanstack/react-router', () => ({
  useNavigate: () => navigate,
}));

vi.mock('../../services/order-service', () => ({
  createOrder: vi.fn(),
  getShippingCost: vi.fn(),
}));

vi.mock('../../services/cep-service', () => ({
  fetchCEP: vi.fn(),
}));

const product: ProductCart = {
  id: 1,
  name: 'Tênis Syntax',
  price: 199.9,
  images: ['tenis.jpg'],
  colors: ['preto'],
  categoryId: 1,
  slug: 'tenis-syntax',
  stock: 10,
  active: true,
  color: 'preto',
  description: 'Tênis para testes',
  quantity: 2,
};

const authValue = {
  user: { id: '1', email: 'andre@example.com', firstName: 'André' },
  isAuthenticated: true,
  isLoadingAuth: false,
  signIn: vi.fn(),
  signUp: vi.fn(),
  signOut: vi.fn(),
  signInWithGoogle: vi.fn(),
};

const renderCheckout = (cart: ProductCart[], clearCart = vi.fn()) => {
  render(
    <AuthContext.Provider value={authValue}>
      <CartContext.Provider
        value={{
          cart,
          add: vi.fn(),
          remove: vi.fn(),
          increment: vi.fn(),
          decrement: vi.fn(),
          clearCart,
        }}
      >
        <Checkout />
      </CartContext.Provider>
    </AuthContext.Provider>,
  );

  return clearCart;
};

describe('Checkout', () => {
  beforeEach(() => vi.clearAllMocks());

  it('impede a criação quando o carrinho está vazio', async () => {
    renderCheckout([]);

    await userEvent.click(screen.getByRole('button', { name: 'Fechar pedido' }));

    expect(screen.getByRole('alert')).toHaveTextContent('Seu carrinho está vazio');
    expect(createOrder).not.toHaveBeenCalled();
  });

  it('envia o endereço sem preços do navegador, limpa o carrinho e navega', async () => {
    vi.mocked(createOrder).mockResolvedValue({
      message: 'Pedido criado',
      orderId: 42,
      subtotal: 399.8,
      shippingCost: 14.9,
      total: 414.7,
    });
    const clearCart = renderCheckout([product]);
    const user = userEvent.setup();

    await user.type(screen.getByPlaceholderText('CEP'), '01310100');
    await user.type(screen.getByPlaceholderText('logradouro'), 'Avenida Paulista');
    await user.type(screen.getByPlaceholderText('número'), '1000');
    await user.type(screen.getByPlaceholderText('bairro'), 'Bela Vista');
    await user.type(screen.getByPlaceholderText('cidade'), 'São Paulo');
    await user.type(screen.getByPlaceholderText('UF'), 'sp');
    await user.click(screen.getByRole('button', { name: 'Fechar pedido' }));

    await waitFor(() => expect(createOrder).toHaveBeenCalledTimes(1));
    expect(createOrder).toHaveBeenCalledWith({
      items: [{ productId: 1, quantity: 2 }],
      shippingAddress: {
        cep: '01310100',
        street: 'Avenida Paulista',
        number: '1000',
        complement: '',
        neighborhood: 'Bela Vista',
        city: 'São Paulo',
        state: 'SP',
      },
      paymentMethod: 'PIX',
    });
    expect(clearCart).toHaveBeenCalledOnce();
    expect(navigate).toHaveBeenCalledWith({
      to: '/order-success/$orderId',
      params: { orderId: '42' },
    });
  });
});
