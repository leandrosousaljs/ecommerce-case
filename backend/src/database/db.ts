import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import type { Database } from 'sqlite';
import path from 'node:path';

export async function getDBConnection(): Promise<Database> {
  const dbPath = path.join('database.db');

  return open({
    filename: dbPath,
    driver: sqlite3.Database,
  });
}
