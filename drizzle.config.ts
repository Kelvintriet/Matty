import { loadEnvConfig } from "@next/env";
import { defineConfig } from "drizzle-kit";

loadEnvConfig(process.cwd());

const databaseUrl = new URL(process.env.DATABASE_URL ?? "mysql://localhost/matty");

export default defineConfig({
  dialect: "mysql",
  schema: "./lib/db/schema.ts",
  dbCredentials: {
    host: databaseUrl.hostname,
    port: databaseUrl.port ? Number(databaseUrl.port) : 3306,
    user: decodeURIComponent(databaseUrl.username),
    password: decodeURIComponent(databaseUrl.password),
    database: decodeURIComponent(databaseUrl.pathname.slice(1)),
    ssl: { rejectUnauthorized: true },
  },
  strict: true,
  verbose: true,
});
