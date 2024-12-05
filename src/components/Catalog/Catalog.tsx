import React from "react";
import { Product } from "../../pages/Main/Main";
import ProductCard from "../ProductCard/ProductCard";

interface CatalogProps {
  searchTerm: string;
  onSelectProduct: (product: Product) => void;
  products: Product[];
}

const Catalog: React.FC<CatalogProps> = ({
  searchTerm,
  onSelectProduct,
  products,
}) => {
  if (!products || products.length === 0) {
    return <div>Товары не найдены.</div>;
  }

  return (
    <div className="catalog">
      <div className="catalog__group">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onSelectProduct={onSelectProduct}
          />
        ))}
      </div>
    </div>
  );
};

export default Catalog;
