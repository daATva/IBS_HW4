import React, { useState, useEffect } from "react";
import favoriteImage from "../../assets/favorite.svg";
import favoriteBorder from "../../assets/favorite border.svg";
import productImage from "../../assets/prod.png";
import { Product } from "../../pages/Main/Main";

interface ProductCardProps {
  product: Product;
  onSelectProduct: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelectProduct,
}) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(product.like);

  useEffect(() => {
    const savedFavorites: Product[] = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );
    if (isFavorite) {
      if (!savedFavorites.some((fav) => fav.id === product.id)) {
        localStorage.setItem(
          "favorites",
          JSON.stringify([...savedFavorites, product])
        );
      }
    } else {
      const newFavorites = savedFavorites.filter(
        (fav) => fav.id !== product.id
      );
      localStorage.setItem("favorites", JSON.stringify(newFavorites));
    }
  }, [isFavorite, product]);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorite((prev) => !prev);
  };

  return (
    <div className="catalog__item" onClick={() => onSelectProduct(product)}>
      <div className="item__group">
        <div
          className={`item__favorite ${isFavorite ? "favorite-active" : ""}`}
          onClick={toggleFavorite}
        >
          <img
            src={isFavorite ? favoriteBorder : favoriteImage}
            alt="Favorite"
          />
        </div>
        <div className="item__image">
          <img
            src={productImage}
            alt={product.picture?.alt || product.name}
            className="item__min"
          />
        </div>
        <div className="item__title">{product.name}</div>
        <div className="item__price">
          {product.price.value} {product.price.currency}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
