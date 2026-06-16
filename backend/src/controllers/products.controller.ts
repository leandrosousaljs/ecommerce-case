import { getDBConnection } from '../database/db.js';

import type { Request, Response } from 'express';

export async function getProducts(req: Request, res: Response): Promise<void> {
  const db = await getDBConnection();

  try {
    const products = await db.all('SELECT * FROM products');
    res.json(products);
  } catch (err) {
    console.error(err);
    throw new Error('Falha ao buscar produtos');
  } finally {
    await db.close();
  }
}
