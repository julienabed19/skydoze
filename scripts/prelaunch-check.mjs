// Fails if launch blockers remain: unfilled business facts or missing Stripe env vars.
import { readFileSync } from "node:fs";

const problems = [];
const biz = readFileSync(new URL("../src/lib/business.ts", import.meta.url), "utf8");
for (const m of biz.matchAll(/(\w+):\s*"(TODO_[A-Z_]+)"/g)) problems.push(`src/lib/business.ts: ${m[1]} is still ${m[2]}`);
for (const m of biz.matchAll(/label: "([^"]+)", value: ""/g)) console.warn(`note: product spec "${m[1]}" is empty and hidden (fine, but add it if you know it)`);
if (process.env.CHECK_ENV === "1") {
  for (const k of ["STRIPE_SECRET_KEY", "STRIPE_WEBHOOK_SECRET", "NEXT_PUBLIC_SITE_URL"]) if (!process.env[k]) problems.push(`env ${k} is not set`);
}
if (problems.length) {
  console.error("\nPRELAUNCH CHECK FAILED:\n- " + problems.join("\n- "));
  process.exit(1);
}
console.log("Prelaunch check passed.");
