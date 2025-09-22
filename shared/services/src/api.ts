import { HttpClient } from './http';
import { API_CONFIG } from './config';
import { Product } from '@shared/types';

const httpClient = new HttpClient(API_CONFIG.baseUrl);

export async function fetchProducts(limit: number = 10): Promise<Product[]> {
  try {
    const products = await httpClient.get<Product[]>(`/products?_limit=${limit}`);
    return products;
  } catch (error) {
    console.error('Failed to fetch products:', error);
    // Return mock data for demo purposes
    return Array.from({ length: limit }, (_, i) => ({
      id: (i + 1).toString(),
      title: `Product ${i + 1}`,
      price: Math.floor(Math.random() * 100) + 10,
      thumbnail: `https://picsum.photos/300/200?random=${i + 1}`,
      description: `This is a description for product ${i + 1}`,
    }));
  }
}

export async function fetchProduct(id: string): Promise<Product | null> {
  try {
    const product = await httpClient.get<Product>(`/products/${id}`);
    return product;
  } catch (error) {
    console.error('Failed to fetch product:', error);
    return null;
  }
}
