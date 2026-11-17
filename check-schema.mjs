import mysql from 'mysql2/promise';

async function checkSchema() {
  const conn = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  for (const table of ['courses', 'faculty', 'gallery_items', 'results']) {
    console.log(`\n=== Table: ${table} ===`);
    const [cols] = await conn.query(`DESCRIBE ${table}`);
    console.log(cols.map((c) => `${c.Field} (${c.Type})`).join(', '));
  }

  await conn.end();
}

checkSchema();
