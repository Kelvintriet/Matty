import "server-only";

import { betterAuth } from "better-auth";
import { drizzleAdapter } from "@better-auth/drizzle-adapter";
import { getDatabase } from "./db";
import * as schema from "./db/schema";

function createAuth() {
  return betterAuth({
    database: drizzleAdapter(getDatabase(), { provider: "mysql", schema }),
    emailAndPassword: { enabled: true },
  });
}

let instance: ReturnType<typeof createAuth> | undefined;

export function getAuth() {
  if (instance) return instance;
  if (!process.env.BETTER_AUTH_SECRET || !process.env.BETTER_AUTH_URL) {
    throw new Error("Better Auth environment variables are not configured.");
  }

  instance = createAuth();
  return instance;
}
