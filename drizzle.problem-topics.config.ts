import { loadEnvConfig } from "@next/env";
import { defineConfig } from "drizzle-kit";

loadEnvConfig(process.cwd());
const url = new URL(process.env.DATABASE_URL ?? "mysql://localhost/matty");

export default defineConfig({
  dialect: "mysql",
  schema: "./lib/db/problem-topics-schema.ts",
  tablesFilter: ["problem_topics"],
  dbCredentials: {
    host: url.hostname,
    port: url.port ? Number(url.port) : 3306,
    user: decodeURIComponent(url.username),
    password: decodeURIComponent(url.password),
    database: decodeURIComponent(url.pathname.slice(1)),
    ssl: { rejectUnauthorized: true },
  },
  strict: true,
  verbose: true,
});
