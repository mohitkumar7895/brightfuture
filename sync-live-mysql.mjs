import mysql from 'mysql2/promise';

async function updateDb() {
  const conn = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  console.log('Connected to MySQL successfully.');

  // 1. Expand image / photo columns to TEXT so long paths or URLs never get truncated
  console.log('Modifying columns to TEXT...');
  try {
    await conn.query('ALTER TABLE courses MODIFY image TEXT');
    await conn.query('ALTER TABLE faculty MODIFY photo TEXT');
    await conn.query('ALTER TABLE results MODIFY photo TEXT');
    console.log('Columns modified successfully.');
  } catch (e) {
    console.warn('Column modify warning:', e.message);
  }

  // 2. Update Faculty Photos in MySQL
  console.log('Updating faculty photos in MySQL...');
  const facultyUpdates = [
    { id: 1, photo: '/images/faculty/er-ak-sharma.jpg' },
    { id: 2, photo: '/images/faculty/dr-rp-singh.jpg' },
    { id: 3, photo: '/images/faculty/prof-neeraj-tiwari.jpg' },
    { id: 4, photo: '/images/faculty/ms-priya-sahu.jpg' },
    { id: 5, photo: '/images/faculty/vivek-richariya.jpg' },
    { id: 6, photo: '/images/faculty/faculty-team-mentors.jpg', isPublished: 0 },
  ];

  for (const f of facultyUpdates) {
    if (f.isPublished !== undefined) {
      await conn.query('UPDATE faculty SET photo = ?, isPublished = ? WHERE id = ?', [f.photo, f.isPublished, f.id]);
    } else {
      await conn.query('UPDATE faculty SET photo = ? WHERE id = ?', [f.photo, f.id]);
    }
  }
  console.log('Faculty updated!');

  // 3. Update Courses in MySQL
  console.log('Updating course images in MySQL...');
  const courseUpdates = [
    { id: 1, image: '/images/gallery/felicitation-police-award.jpg' },
    { id: 2, image: '/images/gallery/classroom-mock-test-1.jpg' },
    { id: 3, image: '/images/gallery/classroom-batch-session.jpg' },
    { id: 4, image: '/images/gallery/classroom-mock-test-2.jpg' },
    { id: 5, image: '/images/gallery/classroom-champions.jpg' },
    { id: 6, image: '/images/gallery/classroom-students-batch.jpg' },
    { id: 10, image: '/images/gallery/classroom-lecture-hall.jpg' },
  ];

  for (const c of courseUpdates) {
    await conn.query('UPDATE courses SET image = ? WHERE id = ?', [c.image, c.id]);
  }
  console.log('Courses updated!');

  // 4. Verify
  const [facultyRows] = await conn.query('SELECT id, name, photo, isPublished FROM faculty');
  console.log('\nVERIFIED FACULTY IN MYSQL:');
  console.log(facultyRows);

  const [courseRows] = await conn.query('SELECT id, title, image FROM courses');
  console.log('\nVERIFIED COURSES IN MYSQL:');
  console.log(courseRows);

  await conn.end();
}

updateDb().catch(console.error);
