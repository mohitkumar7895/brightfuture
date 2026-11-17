import mysql from 'mysql2/promise';

async function testLiveDb() {
  const conn = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  const [courses] = await conn.query('SELECT id, title, image, isPublished FROM courses WHERE isPublished = 1');
  console.log('\n--- LIVE COURSES (isPublished=1) ---');
  for (const c of courses) {
    console.log(`Course [${c.id}]: ${c.title.slice(0, 35)}... -> image: ${c.image}`);
  }

  const [faculty] = await conn.query('SELECT id, name, designation, photo, isPublished FROM faculty WHERE isPublished = 1');
  console.log('\n--- LIVE FACULTY (isPublished=1) ---');
  for (const f of faculty) {
    console.log(`Faculty [${f.id}]: ${f.name} (${f.designation}) -> photo: ${f.photo}`);
  }

  await conn.end();
}

testLiveDb().catch(console.error);
