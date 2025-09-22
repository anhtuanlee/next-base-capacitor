import { HttpClient } from './http';
import { API_CONFIG } from './config';

const httpClient = new HttpClient(API_CONFIG.baseUrl);

export async function fetchProducts(limit: number = 10): Promise<Product[]> {
  try {
    const params = new URLSearchParams();
    params.set("limit", String(limit));
    // Expect your backend to proxy/serve products at /api/products
    const products = await httpClient.get<Product[]>(`/api/products?${params.toString()}`);
    return products;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    // Safe fallback mock for UI
    return Array.from({ length: limit }, (_, i) => ({
      id: String(i + 1),
      title: `Product ${i + 1}`,
      price: Math.floor(Math.random() * 100) + 10,
      thumbnail: `https://picsum.photos/300/200?random=${i + 1}`,
      description: `This is a description for product ${i + 1}`,
    }));
  }
}

export async function fetchProduct(id: string): Promise<Product | null> {
  try {
    const product = await httpClient.get<Product>(`/api/products/${encodeURIComponent(id)}`);
    return product;
  } catch (error) {
    console.error("Failed to fetch product:", error);
    return null;
  }
}
