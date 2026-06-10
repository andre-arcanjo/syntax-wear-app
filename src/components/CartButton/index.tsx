import { useContext } from "react";
import IconCart from "../../assets/images/icons/carrinho.svg";
import { CartContext } from "../../context/CartContext";

interface CardButtonProps {
  onclick?: () => void;
}

export const CartButton = ({ onclick }: CardButtonProps) => {
  const { cart } = useContext(CartContext);

  return (
    <button className="relative cursor-pointer flex items-center" onClick={onclick}>
      <img src={IconCart} alt="Ícone carrinho de compras" />
      {cart.length > 0 && (
        <span className="absolute -top-2 -right-3 bg-error text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
          {cart.length}
        </span>
      )}
    </button>
  );
};
