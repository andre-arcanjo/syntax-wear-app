import Logo from '../../assets/images/icons/logo.svg';
import IconUser from '../../assets/images/icons/minha-conta.svg';
import { Link } from '@tanstack/react-router';
import { MenuMobile } from './MenuMobile';
import { CartButton } from './CartButton';
import { CartDrawer } from './CartDrawer';
import { useEffect, useRef, useState } from 'react';
import { useAuth } from '../../context/AuthContext/AuthContext';
import { PiSignOutLight } from 'react-icons/pi';
import type { NavLink } from '../../types/link';

const navLinks: NavLink[] = [
  { name: 'Masculino', href: '/products/category/masculino' },
  { name: 'Feminino', href: '/products/category/feminino' },
  { name: 'Outlet', href: '/products/category/outlet' },
];

export const Header = () => {
  const [cartIsOpen, setCartIsOpen] = useState<boolean>(false);
  const [accountMenuIsOpen, setAccountMenuIsOpen] = useState(false);
  const accountMenuRef = useRef<HTMLLIElement>(null);

  const { isAuthenticated, signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
      setAccountMenuIsOpen(false);
    } catch (error) {
      console.error('Erro ao fazer sign out:', error);
    }
  };

  useEffect(() => {
    if (!accountMenuIsOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        accountMenuRef.current &&
        !accountMenuRef.current.contains(event.target as Node)
      ) {
        setAccountMenuIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setAccountMenuIsOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [accountMenuIsOpen]);

  return (
    <>
      <div className="relative">
        <header className="fixed top-5 left-0 right-0 z-10 mx-10">
          <div className="bg-white text-black max-w-330 mx-auto flex justify-between items-center py-3 px-7 rounded-2xl mt-5">
            <Link to="/">
              <img src={Logo} alt="Logo SyntaxWear" className="w-32 md:w-36" />
            </Link>

            <nav className="hidden lg:block">
              <ul className="flex gap-4 md:gap-10">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <Link to={link.href} key={link.name}>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav>
              <ul className="flex items-center gap-4 md:gap-10">
                <li className="hidden lg:block">
                  <Link to="/our-stores">Nossas lojas</Link>
                </li>
                <li className="hidden lg:block">
                  <Link to="/about">Sobre</Link>
                </li>
                <li className="lg:hidden">
                  <MenuMobile navLinks={navLinks} />
                </li>
                <li
                  ref={accountMenuRef}
                  className="relative hidden lg:block"
                >
                  {isAuthenticated ? (
                    <>
                      <button
                        type="button"
                        onClick={() =>
                          setAccountMenuIsOpen((isOpen) => !isOpen)
                        }
                        aria-label="Abrir menu da conta"
                        aria-haspopup="menu"
                        aria-expanded={accountMenuIsOpen}
                        className="cursor-pointer transition-opacity hover:opacity-70"
                      >
                        <img src={IconUser} alt="" />
                      </button>

                      {accountMenuIsOpen && (
                        <div
                          role="menu"
                          className="absolute right-0 top-full mt-2 w-44 overflow-hidden rounded-xl border border-gray-200 bg-white py-2 shadow-lg"
                        >
                          <Link
                            to="/orders"
                            role="menuitem"
                            onClick={() => setAccountMenuIsOpen(false)}
                            className="block px-4 py-2 text-sm transition-colors hover:bg-gray-100"
                          >
                            Meus pedidos
                          </Link>
                          <button
                            type="button"
                            role="menuitem"
                            onClick={handleSignOut}
                            className="flex w-full cursor-pointer items-center justify-between px-4 py-2 text-left text-sm transition-colors hover:bg-gray-100"
                          >
                            Sair
                            <PiSignOutLight className="h-6 w-6" />
                          </button>
                        </div>
                      )}
                    </>
                  ) : (
                    <Link to="/sign-up">
                      <img src={IconUser} alt="Icone de login" />
                    </Link>
                  )}
                </li>
                <li>
                  <CartButton onclick={() => setCartIsOpen(true)} />
                </li>
              </ul>
            </nav>
          </div>
        </header>

        <CartDrawer isOpen={cartIsOpen} onClose={() => setCartIsOpen(false)} />
      </div>
    </>
  );
};
