import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import productImage from "../../assets/prod.png";
import { Product } from "../../pages/Main/Main";

interface ProductCardProps {
  product: Product;
  onSelectProduct?: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelectProduct,
}) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(product.like);

  const updateFavorites = useCallback(
    (newFavoriteStatus: boolean) => {
      const savedFavorites: Product[] = JSON.parse(
        localStorage.getItem("favorites") || "[]"
      );

      if (newFavoriteStatus) {
        if (!savedFavorites.some((fav) => fav.id === product.id)) {
          localStorage.setItem(
            "favorites",
            JSON.stringify([...savedFavorites, product])
          );
        }
      } else {
        const updatedFavorites = savedFavorites.filter(
          (fav) => fav.id !== product.id
        );
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      }
    },
    [product]
  );

  useEffect(() => {
    updateFavorites(isFavorite);
  }, [isFavorite, updateFavorites]);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setIsFavorite((prev) => !prev);
  };

  const handleClick = (e: React.MouseEvent) => {
    if (
      e.target instanceof HTMLElement &&
      e.target.closest(".favorite-button")
    ) {
      e.preventDefault();
    } else if (onSelectProduct) {
      onSelectProduct(product);
    }
  };

  return (
    <Card
      component={Link}
      to={`/product/${product.id}`}
      onClick={handleClick}
      sx={{
        width: 220,
        transition: "0.2s",
        textDecoration: "none",
        display: "flex",
        flexDirection: "column",
        "&:hover": {
          backgroundColor: "#f2f2f2",
          boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.15)",
          borderRadius: "10px",
        },
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          padding: "1rem",
          gap: "0.5rem",
        }}
      >
        <IconButton
          onClick={toggleFavorite}
          className="favorite-button"
          sx={{
            alignSelf: "flex-end",
            padding: "0.5rem",
            color: isFavorite ? "primary.main" : "sprimary.main",
          }}
        >
          {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>

        <CardMedia
          component="img"
          height="140"
          image={productImage}
          alt={product.picture?.alt || product.name}
          sx={{ objectFit: "contain", padding: "1rem" }}
        />
        <Typography
          variant="h6"
          component="div"
          sx={{
            fontSize: "18px",
            fontWeight: 400,
            textAlign: "center",
          }}
        >
          {product.name}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontSize: "14px",
            color: "#545454",
            textAlign: "center",
          }}
        >
          {product.price.value} {product.price.currency}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
