import { defineConfig } from "drizzle-kit";
import { env } from "~/env";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/server/db/schema.ts",
  out: "./drizzle",
  dbCredentials: {
    url: env.POSTGRES_URL,
  },
  verbose: true,
  strict: true,
});
