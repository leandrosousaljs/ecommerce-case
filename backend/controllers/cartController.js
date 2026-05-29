import { getDBConnection } from '../db/db.js';

let cart = [];

export async function addToCart(req, res) {
  const { productId } = req.body;

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
}
