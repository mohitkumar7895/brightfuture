import mysql from 'mysql2/promise';

async function testUpdate() {
  const conn = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  console.log('Testing UPDATE on faculty...');
  try {
    const [res] = await conn.execute(
      'UPDATE faculty SET photo = ? WHERE id = ?',
      ['/images/faculty/er-ak-sharma.jpg', 1]
    );
    console.log('Update result:', res);
  } catch (e) {
    console.error('Update failed:', e.message);
  }

  const [rows] = await conn.query('SELECT id, name, photo FROM faculty WHERE id = 1');
  console.log('Updated row in MySQL:', rows);

  await conn.end();
}

testUpdate();
