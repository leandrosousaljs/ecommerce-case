import { getDBConnection } from '../database/db.js';
import { sendConfirmationEmail } from '../services/nodemailer.service.js';
import { cart } from '../store/cart.store.js';

import type { Request, Response } from 'express';

export async function postCheckout(req: Request, res: Response): Promise<Response | void> {
  const db = await getDBConnection();

  try {
    const email = req.body.email?.trim();

    if (!email) {
      return res.status(400).json({
        message: 'Email é obrigatório',
      });
    }

    if (cart.length === 0) {
      return res.status(400).json({ message: 'Carrinho vazio' });
    }

    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    await db.run('BEGIN TRANSACTION');

    const result = await db.run('INSERT INTO orders (total, created_at) VALUES (?, ?)', [
      total,
      new Date().toISOString(),
    ]);

    const orderId = result.lastID as number;

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

    await db.run('COMMIT');

    const previewUrl = await sendConfirmationEmail(email, orderId, total.toFixed(2), cart);

    cart.length = 0;

    res.json({ message: 'Compra finalizada com sucesso', total: total.toFixed(2), orderId, emailPreview: previewUrl });
  } catch (err) {
    await db.exec('ROLLBACK');
    console.error(err);
    throw new Error('Falha ao finalizar compra');
  } finally {
    await db.close();
  }
}
