import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'node:path';
import { getDBConnection } from './db/db.js';

async function createTable() {
  const db = await getDBConnection();

  await db.exec(`
    CREATE TABLE IF NOT EXISTS order_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      order_id INTEGER NOT NULL,
      product_id INTEGER NOT NULL,
      quantity INTEGER NOT NULL,
      subtotal REAL NOT NULL,
      FOREIGN KEY(order_id) REFERENCES orders(id),
      FOREIGN KEY(product_id) REFERENCES products(id)
    )
  `);

  await db.close();
  console.log('Table created');
}

createTable();
