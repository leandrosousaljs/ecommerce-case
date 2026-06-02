import { Product } from './../types/product.types';

const API_URL = 'http://localhost:8000';

export async function getProducts(): Promise<Product[]> {
  const response = await fetch(`${API_URL}/api/produtos`);

  if (!response.ok) {
    throw new Error('Erro ao buscar produtos');
  }

  return response.json();
}
