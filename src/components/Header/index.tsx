import Logo from "../../assets/images/icons/logo.svg";
import IconUser from "../../assets/images/icons/minha-conta.svg";
import IconAbout from "../../assets/images/icons/ajuda.svg";
import { Link } from "@tanstack/react-router";
import { ShoppingCart } from "../ShoppingCart";

export const Header = () => {
  return (
    <>
      <div className="relative">
        <header className="fixed top-5 left-0 right-0 z-10 mx-10">
          <div className="bg-white text-black max-w-330 mx-auto flex justify-between items-center py-3 px-7 rounded-2xl mt-5">
            <Link to="/">
              <img src={Logo} alt="Logo SyntaxWear" className="w-32 md:w-36" />
            </Link>

            <nav>
              <ul className="flex gap-4 md:gap-10">
                <li className="hidden md:block">
                  <a href="#">Masculino</a>
                </li>
                <li className="hidden md:block">
                  <a href="#">Feminino</a>
                </li>
                <li className="hidden md:block">
                  <a href="#">Outlet</a>
                </li>
              </ul>
            </nav>

            <nav>
              <ul className="flex items-center gap-4 md:gap-10">
                <li className="hidden md:block">
                  <Link to="/our-stores">Nossas lojas</Link>
                </li>
                <li className="hidden md:block">
                  <Link to="/about">Sobre</Link>
                </li>
                <li>
                  <Link to="/sign-in">
                    <img src={IconUser} alt="Icone de login" />
                  </Link>
                </li>
                <li>
                  <a href="#">
                    <img src={IconAbout} alt="Ícone de Sobre" />
                  </a>
                </li>
                <li>
                  <ShoppingCart />
                </li>
              </ul>
            </nav>
          </div>
        </header>
      </div>
    </>
  );
};
