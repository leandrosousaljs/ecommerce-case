import { Product } from '../types/types';

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

export async function addToCart(productId: string) {
  await fetch(`${API_URL}/api/carrinho`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      productId,
    }),
  });
}

export async function updateCart(productId: string, quantity: number) {
  const res = await fetch(`${API_URL}/api/carrinho`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      productId,
      quantity,
    }),
  });

  if (!res.ok) {
    throw new Error('Erro ao atualizar carrinho');
  }

  return res.json();
}

export async function checkout(email: string) {
  const res = await fetch(`${API_URL}/api/finalizar-compra`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || 'Erro ao finalizar compra');
  }

  return data;
}
