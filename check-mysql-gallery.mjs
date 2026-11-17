import mysql from 'mysql2/promise';

async function checkGallery() {
  const conn = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  const [galleryRows] = await conn.query('SELECT id, title, imageUrl, categoryId FROM gallery_items');
  console.log('GALLERY in MySQL:', galleryRows);

  const [catRows] = await conn.query('SELECT id, name, slug FROM gallery_categories');
  console.log('GALLERY CATEGORIES in MySQL:', catRows);

  await conn.end();
}

checkGallery();
