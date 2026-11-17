import mysql from 'mysql2/promise';

async function checkGallery() {
  const conn = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  const [items] = await conn.query('SELECT id, title, type, url, thumbnailUrl, categoryId FROM gallery_items');
  console.log('GALLERY ITEMS count:', items.length);
  console.log('Sample gallery items:', items.slice(0, 10));

  await conn.end();
}

checkGallery();
