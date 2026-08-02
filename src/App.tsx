import { RouterProvider, createRouter } from '@tanstack/react-router';
import { routeTree } from './router-tree-gen';
import { CartProvider } from './context/CartContext/CartProvider';
import { AuthProvider } from './context/AuthContext/AuthProvider';
import { GoogleOAuthProvider } from '@react-oauth/google';

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

function App() {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <AuthProvider>
        <CartProvider>
          <RouterProvider router={router} />
        </CartProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
