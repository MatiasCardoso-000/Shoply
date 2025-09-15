import { useState } from "react";
import { useProducts } from "../../hooks/useProducts";
import Input from "../Input/Input";

const ProductFilters = () => {
  const [maxPrice, setMaxPrice] = useState(0);
  const [category, setCategory] = useState("");
  const { getProducts } = useProducts();

  const onPriceChange = async (maxPrice: number) => {
    await getProducts(maxPrice);
    setMaxPrice(maxPrice);
  };

  const onCategoryChange = async (maxPrice?: number, category?: string) => {
    await getProducts(maxPrice, category);
    setCategory(category || "");
  };

  return (
    <div className="p-4 border-r border-gray-200">
      <h2 className="text-lg font-semibold mb-4">Filters</h2>
      <div className="w-full  flex flex-col gap-4">
        <Input
          label="Precio"
          type="range"
          min="0"
          max="10000"
          value={maxPrice}
          onChange={(e) => onPriceChange(Number(e.target.value))}
          className="align-middle"
        />
        <span className="text-lg">${maxPrice}</span>
        <form defaultValue="">
          <div className="flex flex-col">
            <div className="flex items-center w-full justify-between">
              <label htmlFor="Electronica">Electronica</label>
              <input
                type="checkbox"
                value="Electronica"
                onClick={(e) => {
                  onCategoryChange(maxPrice, e.currentTarget.value);
                  setCategory(e.currentTarget.value);
                }}
              />
            </div>
            <div className="flex items-center w-full justify-between">
              <label htmlFor="Ropa">Ropa</label>
              <input
                type="checkbox"
                value="Ropa"
                onClick={(e) => {
                  onCategoryChange(maxPrice, e.currentTarget.value);
                  setCategory(  e.currentTarget.value);
                }}
              />
            </div>
          </div>

          <button onClick={() => onCategoryChange(0, "")}>
            Limpiar filtros
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductFilters;
