import { Product } from '../types';

export const API_URL = 'http://localhost:8000';

export async function getProducts(): Promise<Product[]> {
  const res = await fetch(`${API_URL}/api/produtos`);

  if (!res.ok) {
    throw new Error('Erro ao buscar produtos');
  }

  return res.json();
}

export async function getCart() {
  const res = await fetch(`${API_URL}/api/carrinho`);

  if (!res.ok) {
    throw new Error('Erro ao buscar carrinho');
  }

  return res.json();
}

export async function addToCart(productId: string) {
  const res = await fetch(`${API_URL}/api/carrinho`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      productId,
    }),
  });

  if (!res.ok) {
    throw new Error('Erro ao adicionar produto ao carrinho');
  }
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
