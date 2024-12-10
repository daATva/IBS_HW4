import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/productsSlice";
import Header from "../../components/Header/Header";
import Catalog from "../../components/Catalog/Catalog";
import { RootState, AppDispatch } from "../../redux/store";
import useDebounce from "../../hooks/useDebounce";
import { useNavigate } from "react-router-dom";
import "./Main.scss";

export interface Product {
  id: string;
  name: string;
  price: { value: number; currency: string };
  picture?: { alt?: string };
  like: boolean;
  description: string;
}

const Main: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, loading, error } = useSelector(
    (state: RootState) => state.products
  );
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const filteredProducts = useMemo(() => {
    if (!debouncedSearchTerm) {
      return products;
    }
    return products.filter((product) =>
      product.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    );
  }, [debouncedSearchTerm, products]);

  const handleSelectProduct = (product: Product) => {
    navigate(`/product/${product.id}`);
  };

  const handleSearch = (query: string) => {
    setSearchTerm(query);
  };

  if (loading) {
    return <div>Загрузка товаров...</div>;
  }

  if (error) {
    return <div>Ошибка загрузки товаров: {error}</div>;
  }

  if (!products.length) {
    return <div>Товары не найдены.</div>;
  }

  return (
    <div>
      <Header onSearch={handleSearch} />
      <main>
        <Catalog
          onSelectProduct={handleSelectProduct}
          searchTerm={searchTerm}
          products={filteredProducts}
        />
      </main>
    </div>
  );
};

export default Main;
