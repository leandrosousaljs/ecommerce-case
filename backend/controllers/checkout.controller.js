import { getDBConnection } from '../database/db.js';
import { cart } from '../store/cart.store.js';

export async function postCheckout(req, res) {
  const db = await getDBConnection();

  try {
    if (cart.length === 0) {
      return res.status(400).json({ message: 'Carrinho vazio' });
    }

    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    await db.run('BEGIN TRANSACTION');

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
        [orderId, item.id, item.quantity, item.price * item.quantity],
      );
    }

    cart.length = 0;

    await db.run('COMMIT');

    res.json({ message: 'Compra finalizada com sucesso', total: total.toFixed(2), orderId });
  } catch (err) {
    await db.exec('ROLLBACK');
    res.status(500).json({ error: 'Falha ao finalizar compra', details: err.message });
  } finally {
    await db.close();
  }
}
