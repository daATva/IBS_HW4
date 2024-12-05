import React from "react";
import { Box, TextField, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useTheme } from "@mui/material/styles";

export interface HeaderProps {
  onSearch?: (searchQuery: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  const theme = useTheme(); // Получаем доступ к теме

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onSearch) {
      onSearch(event.target.value);
    }
  };

  return (
    <header>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        padding="16px"
        boxShadow={3}
        bgcolor={theme.palette.background.paper}
      >
        <Box display="flex" alignItems="center">
          <TextField
            id="headerInput"
            variant="outlined"
            placeholder="Search products"
            onChange={handleInput}
            size="small"
            sx={{
              "& .MuiOutlinedInput-root": {
                backgroundColor: theme.palette.background.default,
                borderRadius: 4,
              },
            }}
            InputProps={{
              startAdornment: (
                <IconButton aria-label="search" disabled>
                  <SearchIcon color="primary" />
                </IconButton>
              ),
            }}
          />
        </Box>

        <Box display="flex" gap="16px">
          <IconButton aria-label="cart">
            <ShoppingCartIcon color="primary" />
          </IconButton>
          <IconButton aria-label="user">
            <AccountCircleIcon color="secondary" />
          </IconButton>
        </Box>
      </Box>
    </header>
  );
};

export default Header;
