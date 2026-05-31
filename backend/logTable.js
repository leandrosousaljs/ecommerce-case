import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'node:path';
import { getDBConnection } from './db/db.js';

export async function logTable() {
  const db = await getDBConnection();

  try {
    const products = await db.all('SELECT * FROM order_items');
    console.table(products);
  } catch (err) {
    console.error('Error fetching products:', err.message);
  } finally {
    await db.close();
  }
}

logTable();
