import ProductCard from '../ProductCard/ProductCard';
import { useProducts } from '../../hooks/useProducts';

const ProductsList: React.FC = () => {
  const { products } = useProducts();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} {...product}/>
        ))}
      </div>
    </div>
  );
};

export default ProductsList;
