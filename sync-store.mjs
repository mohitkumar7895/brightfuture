import fs from 'fs';
import mysql from 'mysql2/promise';

async function syncJsonFromMysql() {
  const conn = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  const [courses] = await conn.query('SELECT * FROM courses');
  const [faculty] = await conn.query('SELECT * FROM faculty');
  const [categories] = await conn.query('SELECT * FROM course_categories');

  const store = JSON.parse(fs.readFileSync('./data/db_store.json', 'utf-8'));
  store.courses = courses;
  store.faculty = faculty;
  store.categories = categories;

  fs.writeFileSync('./data/db_store.json', JSON.stringify(store, null, 2), 'utf-8');
  console.log('Synchronized data/db_store.json with MySQL!');
  console.log('Courses in store:', store.courses.length);
  console.log('Faculty in store:', store.faculty.length);

  await conn.end();
}

syncJsonFromMysql().catch(console.error);
