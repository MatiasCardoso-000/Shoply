import ProductCard from "../ProductCard/ProductCard";
import { useProducts } from "../../hooks/useProducts";
import ProductFilters from "../ProductFilters/ProductFilters";

const ProductsList = () => {
  const { products } = useProducts();
  return (
    <div className="container mx-auto px-4 py-8 flex gap-4">
      <ProductFilters
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
        {products &&
          products.map((product) => (
            <ProductCard key={product.product_id} {...product} />
          ))}
      </div>
    </div>
  );
};

export default ProductsList;
