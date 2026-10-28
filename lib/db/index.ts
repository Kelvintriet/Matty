import "server-only";

import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "./schema";

function createDatabase(url: string) {
  const pool = mysql.createPool({
    uri: url,
    ssl: { rejectUnauthorized: true },
    connectionLimit: 5,
  });
  return drizzle({ client: pool, schema, mode: "default" });
}

let database: ReturnType<typeof createDatabase> | undefined;

export function getDatabase() {
  if (database) return database;

  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is not configured.");

  database = createDatabase(url);
  return database;
}
