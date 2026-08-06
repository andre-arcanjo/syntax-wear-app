import { render, screen } from '@testing-library/react';
import { AuthContext } from '../../context/AuthContext/AuthContext';
import { ProtectedRoute } from './ProtectedRoute';

const navigateProps = vi.fn();

vi.mock('@tanstack/react-router', () => ({
  Navigate: (props: unknown) => {
    navigateProps(props);
    return <span>redirecionando</span>;
  },
  useLocation: () => '/checkout',
}));

const authValue = (isAuthenticated: boolean, isLoadingAuth: boolean) => ({
  user: null,
  isAuthenticated,
  isLoadingAuth,
  signIn: vi.fn(),
  signUp: vi.fn(),
  signOut: vi.fn(),
  signInWithGoogle: vi.fn(),
});

describe('ProtectedRoute', () => {
  it('não mostra conteúdo privado enquanto restaura a sessão', () => {
    render(
      <AuthContext.Provider value={authValue(false, true)}>
        <ProtectedRoute>conteúdo privado</ProtectedRoute>
      </AuthContext.Provider>,
    );

    expect(screen.getByLabelText(/verificando autenticação/i)).toBeInTheDocument();
    expect(screen.queryByText('conteúdo privado')).not.toBeInTheDocument();
  });

  it('redireciona visitante para o login preservando o destino', () => {
    render(
      <AuthContext.Provider value={authValue(false, false)}>
        <ProtectedRoute>conteúdo privado</ProtectedRoute>
      </AuthContext.Provider>,
    );

    expect(screen.getByText('redirecionando')).toBeInTheDocument();
    expect(navigateProps).toHaveBeenCalledWith(
      expect.objectContaining({
        to: '/sign-in',
        search: { redirect: '/checkout' },
        replace: true,
      }),
    );
  });
});
