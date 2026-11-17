import mysql from 'mysql2/promise';

console.log('Testing MySQL with config:', {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
});

async function testConn() {
  try {
    const conn = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      connectTimeout: 5000,
    });
    console.log('SUCCESSFULLY CONNECTED TO MYSQL!');
    const [tables] = await conn.query('SHOW TABLES');
    console.log('Tables:', tables);
    await conn.end();
  } catch (err) {
    console.error('FAILED TO CONNECT TO MYSQL:', err.message, err.code);
  }
}

testConn();
