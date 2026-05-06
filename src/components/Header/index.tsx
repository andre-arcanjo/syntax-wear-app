import Logo from "../../assets/images/icons/logo.svg";
import IconUser from "../../assets/images/icons/minha-conta.svg";
import IconAbout from "../../assets/images/icons/ajuda.svg";
import IconCart from "../../assets/images/icons/carrinho.svg";

export const Header = () => {
  return (
    <>
      <div className="relative">
        <header className="fixed bg-amber-700 top-0 left-0 right-0 z-10 mx-10">
          <div className="bg-white max-w-330 mx-auto flex justify-between items-center py-5 px-7 rounded-2xl mt-5">
            <img src={Logo} alt="Logo SyntaxWear" className="w-32 md:w-36" />

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
                  <a href="#">Nossas Lojas</a>
                </li>
                <li className="hidden md:block">
                  <a href="#">Sobre</a>
                </li>
                <li>
                  <a href="#">
                    <img src={IconUser} alt="Ícone de Login" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <img src={IconAbout} alt="Ícone de Sobre" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <img src={IconCart} alt="Ícone de carrinho" />
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </header>
      </div>
    </>
  );
};
