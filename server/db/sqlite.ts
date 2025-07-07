// server/db/sqlite.ts
import { join } from "path";
import { existsSync, mkdirSync } from "fs";
import Database from "better-sqlite3";

const dataDir = join(process.cwd(), "data");
if (!existsSync(dataDir)) mkdirSync(dataDir);

const db = new Database(join(dataDir, "transactions.db"));

// Initialize DB schema
db.prepare(
  `
  CREATE TABLE IF NOT EXISTS transactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    topic TEXT NOT NULL,
    type TEXT CHECK(type IN ('income', 'expense')) NOT NULL,
    amount REAL NOT NULL,
    date TEXT NOT NULL
  )
`,
).run();

export default db;
