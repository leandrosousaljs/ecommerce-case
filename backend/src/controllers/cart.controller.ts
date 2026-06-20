import { getDBConnection } from '../database/db.js';
import { cart } from '../store/cart.store.js';

import type { Request, Response } from 'express';

export async function addToCart(req: Request, res: Response) {
  const db = await getDBConnection();

  try {
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({ message: 'ID do produto é obrigatório' });
    }

    const product = await db.get('SELECT * FROM products WHERE id = ?', [productId]);

    if (!product) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }

    const existing = cart.find((item) => item.id === product.id);

    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({
        ...product,
        quantity: 1,
      });
    }

    res.json({ message: 'Produto adicionado ao carrinho', cart });
  } catch (err) {
    console.error(err);
    throw new Error('Falha ao adicionar produto ao carrinho');
  } finally {
    await db.close();
  }
}

export async function updateCart(req: Request, res: Response) {
  try {
    const { productId } = req.body;
    const { quantity } = req.body;

    if (!productId || quantity === undefined) {
      return res.status(400).json({ message: 'Dados inválidos' });
    }

    const product = cart.find((item) => item.id === productId);

    if (!product) {
      return res.status(404).json({ message: 'Produto não encontrado no carrinho' });
    }

    if (quantity < 0) {
      return res.status(400).json({
        message: 'Quantidade inválida',
      });
    }

    if (quantity === 0) {
      const filtered = cart.filter((item) => item.id !== productId);

      cart.length = 0;
      cart.push(...filtered);

      return res.json({ message: 'Produto removido do carrinho', cart });
    }

    product.quantity = quantity;

    res.json({ message: 'Carrinho atualizado', cart });
  } catch (err) {
    console.error(err);
    throw new Error('Falha ao atualizar carrinho');
  }
}

export async function getCart(req: Request, res: Response) {
  try {
    res.json(cart);
  } catch (err) {
    console.error(err);
    throw new Error('Falha ao buscar carrinho');
  }
}
