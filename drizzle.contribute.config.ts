import { loadEnvConfig } from "@next/env";
import { defineConfig } from "drizzle-kit";

loadEnvConfig(process.cwd());
const url = new URL(process.env.DATABASE_URL ?? "mysql://localhost/matty");

export default defineConfig({
  dialect: "mysql",
  schema: "./lib/db/contributor-schema.ts",
  tablesFilter: ["contributor_attempts", "contributor_images", "problem_images"],
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
