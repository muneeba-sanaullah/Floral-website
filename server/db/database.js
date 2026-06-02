import sqlite3 from "sqlite3";
import { open } from "sqlite";

const db = await open({
  filename: "./server/orders.db",
  driver: sqlite3.Database,
});

await db.exec(`
  CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    session_id TEXT UNIQUE,
    customer_email TEXT,
    amount_total INTEGER,
    currency TEXT,
    items TEXT,
    valid INTEGER DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

export default db;