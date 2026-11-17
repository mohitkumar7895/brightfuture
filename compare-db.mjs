import fs from 'fs';
import mysql from 'mysql2/promise';

async function compare() {
  const store = JSON.parse(fs.readFileSync('./data/db_store.json', 'utf-8'));
  console.log('STORE courses:', store.courses.map((c) => ({ id: c.id, title: c.title, image: c.image })));
  console.log('STORE faculty:', store.faculty.map((f) => ({ id: f.id, name: f.name, photo: f.photo })));

  const conn = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  const [dbCourses] = await conn.query('SELECT id, title, image FROM courses');
  console.log('MYSQL courses:', dbCourses);

  const [dbFaculty] = await conn.query('SELECT id, name, photo FROM faculty');
  console.log('MYSQL faculty:', dbFaculty);

  await conn.end();
}

compare();
