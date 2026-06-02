import { Product } from './../types/product.types';

export const API_URL = 'http://localhost:8000';

export async function getProducts(): Promise<Product[]> {
  const response = await fetch(`${API_URL}/api/produtos`);

  if (!response.ok) {
    throw new Error('Erro ao buscar produtos');
  }

  return response.json();
}

export async function getCart() {
  const response = await fetch(`${API_URL}/api/carrinho`);

  if (!response.ok) {
    throw new Error('Erro ao buscar carrinho');
  }

  return response.json();
}
