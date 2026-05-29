import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'node:path';
import { productsData } from './productsData.js';
import { getDBConnection } from './db/db.js';

async function seedTable() {
  const db = await getDBConnection();

  try {
    await db.exec('BEGIN TRANSACTION');

    for (const { name, description, price, image_url } of productsData) {
      await db.run(
        `INSERT INTO products (name, description, price, image_url)
        VALUES (?, ?, ?, ?)`,
        [name, description, price, image_url],
      );
    }

    await db.exec('COMMIT');
    console.log('All records inserted');
  } catch (err) {
    await db.exec('ROLLBACK');
    console.log('Error inserting data', err.message);
  } finally {
    await db.close();
    console.log('connection closed');
  }
}

seedTable();
