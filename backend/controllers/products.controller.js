import { getDBConnection } from '../database/db.js';

export async function getProducts(req, res) {
  const db = await getDBConnection();

  try {
    const products = await db.all('SELECT * FROM products');
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Falha ao buscar produtos', details: err.message });
  } finally {
    await db.close();
  }
}
