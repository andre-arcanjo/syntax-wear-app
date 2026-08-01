import { Link } from '@tanstack/react-router';
import type { ProductCardProps } from '../../interfaces/product';
import { MdAddShoppingCart } from 'react-icons/md';
import { useContext } from 'react';
import { CartContext } from '../../context/CartContext/CartContext';
import { formatCurrency } from '../../utils/format-currency';

export const ProductCard = ({ product }: ProductCardProps) => {
  const { add } = useContext(CartContext);

  return (
    <>
      <div className="rounded-2xl shadow-md bg-white">
        <Link
          to="/products/$productId"
          params={{ productId: String(product.id) }}
        >
          <img
            className="w-full max-h-100 object-cover rounded-md mb-2"
            src={product.images[0]}
            alt={product.name}
          />
        </Link>

        <div className="text-black rounded-2xl p-4">
          <h3 className="text-lg font-semibold">{product.name}</h3>

          <p>{product.colors[0]}</p>

          <div className="flex justify-between mt-2.5">
            <p className="font-bold">{formatCurrency(product.price)}</p>

            <button className="cursor-pointer" onClick={() => add(product)}>
              <MdAddShoppingCart className="h-7 w-7" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
