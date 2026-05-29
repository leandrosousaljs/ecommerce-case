import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'node:path';
import { getDBConnection } from './db/db.js';

async function createTable() {
  const db = await getDBConnection();

  await db.exec(`
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    price REAL NOT NULL,
    image_url TEXT
  )
  `);

  await db.close();
  console.log('Table created');
}

createTable();
