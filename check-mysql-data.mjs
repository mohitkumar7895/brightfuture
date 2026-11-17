import mysql from 'mysql2/promise';

async function checkData() {
  const conn = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  const [facultyRows] = await conn.query('SELECT id, name, photo, isPublished FROM faculty');
  console.log('FACULTY in MySQL:', facultyRows);

  const [courseRows] = await conn.query('SELECT id, title, image, isPublished FROM courses');
  console.log('COURSES in MySQL:', courseRows);

  await conn.end();
}

checkData();
