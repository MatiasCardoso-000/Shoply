import ProductCard from "../ProductCard/ProductCard";
import { useProducts } from "../../hooks/useProducts";
import ProductFilters from "../ProductFilters/ProductFilters";
import { useState } from "react";

const ProductsList = () => {
  const [maxPrice, setMaxPrice] = useState(0);
  const { products } = useProducts();

  const onPriceChange = (price: number) => {
    setMaxPrice(price);
  };

  const filteredProducts = products.filter((p) => {
    if (maxPrice === 0) return true; // If maxPrice is 0, show all products
    return p.price <= maxPrice;
  });

  return (
    <div className="container mx-auto px-4 py-8 flex gap-4">
      <ProductFilters onPriceChange={onPriceChange} maxPrice={maxPrice} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
};

export default ProductsList;
