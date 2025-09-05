import { useCart } from "../../hooks/useCart";
import type { Product } from "../../types/products.types";
import Button from "../Button/Button";

const ProductCard = (product: Product) => {
  const { addToCart } = useCart();

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300 flex flex-col items-center py-2">
      <div className="flex-grow flex flex-col justify-center">
        <img src={product.image} alt={product.title} className="w-full h-1/2 object-contain" />
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            {product.title}
          </h3>
          <p className="text-gray-600 font-bold mb-4">${product.price}</p>
        </div>
      </div>
      <Button className="bg-yellow-400 text-zinc-900 py-2 px-6 rounded-lg cursor-pointer hover:bg-yellow-300 transition-colors" onClick={() => addToCart(product)}>Add to Cart</Button>
    </div>
  );
};

export default ProductCard;
