import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchItemById, Product } from "../../api/api";
import productImage from "../../assets/product.png";
import favoriteImage from "../../assets/favorite.svg";
import favoriteBorder from "../../assets/favorite border.svg";
import Header from "../Header/Header";
import {
  IconButton,
  Button,
  CardContent,
  Typography,
  Tooltip,
  Snackbar,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import "./ProductDetails.scss";

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);

  useEffect(() => {
    if (id) {
      fetchItemById(id)
        .then((data) => setProduct(data))
        .catch((error) => console.error("Ошибка загрузки товара:", error));
    }
  }, [id]);

  const increment = () => setQuantity((prev) => prev + 1);
  const decrement = () => setQuantity((prev) => Math.max(prev - 1, 1));
  const handleAddToCart = () => setOpenSnackbar(true);
  const handleCloseSnackbar = () => setOpenSnackbar(false);

  if (!product) {
    return <div className="product__not-found">Товар не найден</div>;
  }

  return (
    <>
      <Header />
      <div className="product__content">
        <div className="product__card">
          <div className="product__preview">
            <img src={productImage} alt={product.name} />
          </div>

          <CardContent>
            <Typography
              variant="h4"
              color="secondary"
              component="h4"
              gutterBottom
            >
              {product.name}
            </Typography>
            <Typography variant="body1" paragraph>
              {product.description}
            </Typography>

            <Typography variant="h6" color="secondary" gutterBottom>
              Details
            </Typography>
            <Typography variant="body2" paragraph>
              {product.details || "Подробная информация недоступна."}
            </Typography>

            <div className="product__buy">
              <Typography variant="h5" className="product__price">
                {product.price.value} {product.price.currency}
              </Typography>

              <div className="product__btns cart__group">
                <Tooltip title="Decrease quantity" arrow>
                  <IconButton
                    onClick={decrement}
                    color="primary"
                    aria-label="Decrement quantity"
                  >
                    <RemoveIcon />
                  </IconButton>
                </Tooltip>
                <input
                  type="number"
                  value={quantity}
                  min="1"
                  readOnly
                  aria-label="Количество товара"
                  className="quantity-input"
                />
                <Tooltip title="Increase quantity" arrow>
                  <IconButton
                    onClick={increment}
                    color="primary"
                    aria-label="Increment quantity"
                  >
                    <AddIcon />
                  </IconButton>
                </Tooltip>
              </div>

              <Button
                variant="contained"
                color="primary"
                onClick={handleAddToCart}
                sx={{ margin: 2 }}
              >
                Add to cart
              </Button>

              <Tooltip title="Add to favorites" arrow>
                <img
                  className="item__favorite"
                  src={product.like ? favoriteBorder : favoriteImage}
                  alt="Favorite"
                />
              </Tooltip>
            </div>
          </CardContent>
        </div>
      </div>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message="Товар добавлен в корзину"
      />
    </>
  );
};

export default ProductDetails;
