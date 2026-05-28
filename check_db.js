const { Pool } = require("pg");
const pool = new Pool({
  connectionString: "postgresql://neondb_owner:npg_TMH3sdK0CFbR@ep-bold-flower-aoe5pbg5.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require",
  ssl: { rejectUnauthorized: false }
});

async function main() {
  const res = await pool.query("SELECT id, name, email, dialogue, qr_token FROM credentials WHERE name ILIKE '%Chaitra%'");
  console.log("DB Matches for 'Chaitra':", JSON.stringify(res.rows, null, 2));
  await pool.end();
}

main().catch(console.error);
