import axios from "axios";

export const BASE_URL = "http://localhost:3000";

export interface Product {
  id: string;
  name: string;
  description: string;
  like: boolean;
  picture: {
    path: string;
    alt: string;
  };
  price: {
    value: number;
    currency: string;
  };
  details?: string;
}

interface ApiResponse {
  content: Product[];
}

export async function fetchAllItems(): Promise<ApiResponse> {
  const apiUrl = `${BASE_URL}/item`;

  try {
    const response = await axios.get<ApiResponse>(apiUrl);

    if (response.status !== 200) {
      throw new Error("Ошибка загрузки списка товаров");
    }

    return response.data;
  } catch (error) {
    console.error("Ошибка:", error);
    throw error;
  }
}

export async function fetchItemById(itemid: string): Promise<Product> {
  const apiUrl = `${BASE_URL}/item/${itemid}`;

  try {
    const response = await axios.get<{ content: Product }>(apiUrl);

    if (response.status !== 200) {
      throw new Error("Ошибка загрузки товара");
    }

    return response.data.content;
  } catch (error) {
    console.error("Ошибка:", error);
    throw error;
  }
}
