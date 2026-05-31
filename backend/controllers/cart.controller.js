import { getDBConnection } from '../database/db.js';
import { cart } from '../store/cart.store.js';

export async function addToCart(req, res) {
  try {
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({ message: 'ID do produto é obrigatório' });
    }

    const db = await getDBConnection();

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
    res.status(500).json({ error: 'Falha ao adicionar produto ao carrinho', details: err.message });
  } finally {
    await db.close();
  }
}

export async function updateCart(req, res) {
  try {
    const productId = parseInt(req.body.productId, 10);
    const quantity = parseInt(req.body.quantity, 10);

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
    res.status(500).json({ error: 'Falha ao atualizar carrinho', details: err.message });
  }
}
