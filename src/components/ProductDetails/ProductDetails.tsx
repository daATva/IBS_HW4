import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import productImage from "../../assets/product.png";
import favoriteImage from "../../assets/favorite.svg";
import favoriteBorder from "../../assets/favorite border.svg";
import "./ProductDetails.scss";
import { Product } from "../../api/api";
import Header from "../Header/Header";
import { IconButton, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { products } = useSelector((state: RootState) => state.products);

  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    if (id) {
      console.log("ID из URL:", id);
      console.log("Список продуктов:", products);

      const selectedProduct = products.find((p) => p.id.toString() === id);

      console.log("Найденный продукт:", selectedProduct);

      setProduct(selectedProduct || null);
    }
  }, [id, products]);

  const increment = () => setQuantity((prev) => prev + 1);
  const decrement = () => setQuantity((prev) => Math.max(prev - 1, 1));

  if (!product) {
    return <div className="product__not-found">Товар не найден</div>;
  }

  return (
    <>
      <Header />
      <div className="product__content">
        <div className="product__preview">
          <img src={productImage} alt={product.name} />
        </div>

        <div className="product__description">
          <div className="product__title">{product.name}</div>
          <div className="product__title_descr">{product.description}</div>
          <div className="product__details">Details</div>
          <div className="product__details_descr">
            Detailed information about the product goes here.
          </div>
          <div className="product__buy">
            <div className="product__price">
              {product?.price.value} {product?.price.currency}
            </div>

            <div className="product__btns cart__group">
              <IconButton
                onClick={decrement}
                color="primary"
                aria-label="Decrement quantity"
              >
                <RemoveIcon />
              </IconButton>
              <input
                type="number"
                value={quantity}
                min="1"
                readOnly
                aria-label="Количество товара"
                className="quantity-input"
              />

              <IconButton
                onClick={increment}
                color="primary"
                aria-label="Increment quantity"
              >
                <AddIcon />
              </IconButton>
            </div>

            <Button variant="contained">Add to cart</Button>

            <img
              className="item__favorite"
              src={product?.like ? favoriteBorder : favoriteImage}
              alt="Favorite"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
