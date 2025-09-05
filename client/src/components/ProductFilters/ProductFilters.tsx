import React from "react";
import Input from "../Input/Input";

interface ProductFiltersProps {
  onPriceChange: (price: number) => void;
  maxPrice: number;
}

const ProductFilters: React.FC<ProductFiltersProps> = ({ onPriceChange,maxPrice }) => {
  return (
    <div className="p-4 border-r border-gray-200">
      <h2 className="text-lg font-semibold mb-4">Filters</h2>
      <div className="w-full  mb-4">
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
      </div>
    </div>
  );
};

export default ProductFilters;
