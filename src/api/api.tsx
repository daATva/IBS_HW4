export const BASE_URL = "http://localhost:3000";

export interface Product {
  id: number;
  name: string;
  description: string;
  like: boolean;
  price: {
    value: number;
    currency: string;
  };
}

interface ApiResponse {
  content: Product[];
}

export async function fetchAllItems(): Promise<ApiResponse> {
  const apiUrl = `${BASE_URL}/item/:itemid`;

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error("Ошибка загрузки списка товаров");
    }

    const data: ApiResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Ошибка:", error);
    throw error;
  }
}
