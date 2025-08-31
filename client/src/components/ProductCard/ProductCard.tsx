import { useCart } from "../../hooks/useCart";
import type { Product } from "../../types/products.types";
import Button from "../Button/Button";

const ProductCard = (product:Product) => {

  const {addToCart} = useCart()
  // const handlePay = async (product: Product) => {
  //   const res = await fetch("http://localhost:3000/api/checkout", {
  //     method: "POST",
  //     body: JSON.stringify({
  //       id:product.id,
  //       title: product.title,
  //       price: Number(product.price),
  //       imageUrl: product.imageUrl
  //     }),
  //     headers: { "Content-type": "application/json" },
  //   });
  //   const session = await res.json();

  //   window.location = session.url;
  // };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300 flex flex-col justify-between">
      <img
        src={product.imageUrl}
        alt={product.title}
        className="w-full h-64 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          {product.title}
        </h3>
        <p className="text-gray-600 font-bold mb-4">
          ${product.price / 100}
        </p>
        <Button onClick={()=>addToCart(product)}>Add to Cart</Button>
      </div>
    </div>
  );
};

export default ProductCard;
