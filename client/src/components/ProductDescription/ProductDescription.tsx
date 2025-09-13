import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductRequest } from "../../../api/products/products";
import { type Product } from "../../types/products.types";
import { useCart } from "../../hooks/useCart";

const ProductDescription = () => {
  const { product_name } = useParams<{ product_name: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      if (product_name) {
        const productData = await getProductRequest(product_name);
        setProduct(productData);
      }
    };

    fetchProduct();
  }, [product_name]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-auto rounded-lg shadow-md"
          />
        </div>
        <div>
          <h2 className="text-3xl font-bold mb-4">{product.title}</h2>
          <p className="text-gray-700 mb-4">{product.description}</p>
          <p className="text-2xl font-bold text-gray-900 mb-4">
            ${product.price}
          </p>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDescription;
