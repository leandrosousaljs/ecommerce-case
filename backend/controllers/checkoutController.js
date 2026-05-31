import { getDBConnection } from '../db/db.js';
import { cart } from '../store/cartStore.js';

export async function postCheckout(req, res) {
  const db = await getDBConnection();

  if (cart.length === 0) {
    return res.status(400).json({ message: 'Carrinho vazio' });
  }

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const result = await db.run('INSERT INTO orders (total, created_at) VALUES (?, ?)', [
    total,
    new Date().toISOString(),
  ]);

  const orderId = result.lastID;

  for (const item of cart) {
    await db.run(
      `
      INSERT INTO order_items (
        order_id,
        product_id,
        quantity,
        subtotal
        ) VALUES (?, ?, ?, ?)`,
      [orderId, item.id, item.quantity, (item.price * item.quantity).toFixed(2)],
    );
  }

  cart.length = 0;

  res.json({ message: 'Compra finalizada com sucesso', total: total.toFixed(2), orderId });
}
