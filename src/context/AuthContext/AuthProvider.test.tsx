import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useAuth } from './AuthContext';
import { AuthProvider } from './AuthProvider';
import { API_URL } from '../../config/api';

const user = {
  id: '1',
  email: 'andre@example.com',
  firstName: 'André',
};

const AuthProbe = () => {
  const { user: authenticatedUser, isLoadingAuth, signUp } = useAuth();

  return (
    <div>
      <span>{isLoadingAuth ? 'carregando' : authenticatedUser?.firstName}</span>
      <button
        onClick={() =>
          signUp({
            email: 'novo@example.com',
            password: '123456',
            firstName: 'Novo',
            lastName: 'Usuário',
            phone: '11999999999',
            cpf: '12345678901',
          })
        }
      >
        cadastrar
      </button>
    </div>
  );
};

describe('AuthProvider', () => {
  afterEach(() => vi.unstubAllGlobals());

  it('restaura a sessão pelo cookie ao carregar a aplicação', async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ user }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }),
    );
    vi.stubGlobal('fetch', fetchMock);

    render(
      <AuthProvider>
        <AuthProbe />
      </AuthProvider>,
    );

    expect(screen.getByText('carregando')).toBeInTheDocument();
    expect(await screen.findByText('André')).toBeInTheDocument();
    expect(fetchMock).toHaveBeenCalledWith(
      `${API_URL}/auth/profile`,
      expect.objectContaining({ credentials: 'include' }),
    );
  });

  it('inclui credenciais no cadastro para persistir o cookie', async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(new Response(null, { status: 401 }))
      .mockResolvedValueOnce(
        new Response(JSON.stringify({ user }), {
          status: 201,
          headers: { 'Content-Type': 'application/json' },
        }),
      );
    vi.stubGlobal('fetch', fetchMock);

    render(
      <AuthProvider>
        <AuthProbe />
      </AuthProvider>,
    );

    await waitFor(() => expect(screen.queryByText('carregando')).not.toBeInTheDocument());
    await userEvent.click(screen.getByRole('button', { name: 'cadastrar' }));

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(2));
    expect(fetchMock.mock.calls[1][1]).toEqual(
      expect.objectContaining({ method: 'POST', credentials: 'include' }),
    );
  });
});
