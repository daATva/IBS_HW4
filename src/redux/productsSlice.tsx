import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAllItems } from "../api/api";

interface Product {
  id: number;
  name: string;
  price: { value: number; currency: string };
  like: boolean;
  description: string;
}

interface ProductsState {
  products: Product[];
  filteredProducts: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  products: [],
  filteredProducts: [],
  loading: false,
  error: null,
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await fetchAllItems();
    return response.content;
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setFilteredProducts: (state, action) => {
      state.filteredProducts = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.filteredProducts = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Ошибка загрузки данных";
      });
  },
});

export const { setFilteredProducts } = productsSlice.actions;

export default productsSlice.reducer;
