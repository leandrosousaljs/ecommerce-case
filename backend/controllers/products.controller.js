import { getDBConnection } from '../database/db.js';

export async function getProducts(req, res) {
  try {
    const db = await getDBConnection();
    const products = await db.all('SELECT * FROM products');
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Falha ao buscar produtos', details: err.message });
  } finally {
    await db.close();
  }
}
