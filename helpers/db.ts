import { DB } from "https://deno.land/x/sqlite/mod.ts";
const db = new DB("db.sqlite");

db.query(`
  CREATE TABLE IF NOT EXISTS todo (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    item char(100)
  )
`);

export default db;
