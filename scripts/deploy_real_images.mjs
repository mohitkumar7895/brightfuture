import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const uploadsDir = 'C:/Users/Mohit Kumar/.gemini/antigravity/brain/4243cb90-be63-440c-8f81-2dd8ea6c9bb1/.user_uploaded';

const IMAGES = {
  img1_omr_test: path.join(uploadsDir, 'media_1794896757850_27d0d92c.jpg'),
  img2_police_award: path.join(uploadsDir, 'media_1794896757856_86591884.jpg'),
  img3_girls_exam: path.join(uploadsDir, 'media_1794896757857_bfed5caf.jpg'),
  img4_police_stage: path.join(uploadsDir, 'media_1794896757881_1035838d.jpg'),
  img5_classroom_packed: path.join(uploadsDir, 'media_1794896757890_f338be07.jpg'),
  img6_classroom_high: path.join(uploadsDir, 'media_1794896757903_4f2f95da.jpg'),
  img7_headoffice: path.join(uploadsDir, 'media_1794896757919_f4d124dd.jpg'),
  img8_classroom_front: path.join(uploadsDir, 'media_1794896757924_84319481.jpg'),
  img9_digitallibrary: path.join(uploadsDir, 'media_1794896757926_5949a25b.jpg'),
  img10_toppers_trophies: path.join(uploadsDir, 'media_1794896757928_24aae7fd.jpg'),
  img11_toppers_celebrate: path.join(uploadsDir, 'media_1794896757937_4b98dffd.jpg'),
  img12_champion_batch: path.join(uploadsDir, 'media_1794896757953_7cea84ee.jpg'),
  img13_faculty_team: path.join(uploadsDir, 'media_1794896757958_70311422.jpg'),
  img14_female_toppers: path.join(uploadsDir, 'media_1794896757960_cab94557.jpg'),
  img15_female_toppers_office: path.join(uploadsDir, 'media_1794896757967_4b1075c0.jpg'),
};

async function main() {
  const publicImages = path.join(process.cwd(), 'public', 'images');
  const publicGallery = path.join(publicImages, 'gallery');
  const publicFaculty = path.join(publicImages, 'faculty');

  fs.mkdirSync(publicImages, { recursive: true });
  fs.mkdirSync(publicGallery, { recursive: true });
  fs.mkdirSync(publicFaculty, { recursive: true });

  console.log('1. Deploying full HD images to public/images and public/images/gallery...');

  // General & Course Images in public/images
  fs.copyFileSync(IMAGES.img2_police_award, path.join(publicImages, 'police-exam-prep.jpg'));
  fs.copyFileSync(IMAGES.img1_omr_test, path.join(publicImages, 'omr-mock-test.jpg'));
  fs.copyFileSync(IMAGES.img5_classroom_packed, path.join(publicImages, 'ssc-railway-prep.jpg'));
  fs.copyFileSync(IMAGES.img6_classroom_high, path.join(publicImages, 'institute-study.jpg'));
  fs.copyFileSync(IMAGES.img10_toppers_trophies, path.join(publicImages, 'student-toppers.jpg'));
  fs.copyFileSync(IMAGES.img12_champion_batch, path.join(publicImages, 'hero-classroom.jpg'));
  fs.copyFileSync(IMAGES.img13_faculty_team, path.join(publicImages, 'faculty-teaching.jpg'));
  fs.copyFileSync(IMAGES.img4_police_stage, path.join(publicImages, 'motivational-seminar.jpg'));

  // Gallery Directory
  fs.copyFileSync(IMAGES.img1_omr_test, path.join(publicGallery, 'classroom-mock-test-1.jpg'));
  fs.copyFileSync(IMAGES.img3_girls_exam, path.join(publicGallery, 'classroom-mock-test-2.jpg'));
  fs.copyFileSync(IMAGES.img5_classroom_packed, path.join(publicGallery, 'classroom-batch-session.jpg'));
  fs.copyFileSync(IMAGES.img6_classroom_high, path.join(publicGallery, 'classroom-students-batch.jpg'));
  fs.copyFileSync(IMAGES.img8_classroom_front, path.join(publicGallery, 'classroom-lecture-hall.jpg'));
  fs.copyFileSync(IMAGES.img12_champion_batch, path.join(publicGallery, 'classroom-champions.jpg'));

  fs.copyFileSync(IMAGES.img7_headoffice, path.join(publicGallery, 'bfci-head-office-station-road.jpg'));
  fs.copyFileSync(IMAGES.img9_digitallibrary, path.join(publicGallery, 'bfci-digital-library-chandmari.jpg'));

  fs.copyFileSync(IMAGES.img2_police_award, path.join(publicGallery, 'felicitation-police-award.jpg'));
  fs.copyFileSync(IMAGES.img4_police_stage, path.join(publicGallery, 'toppers-police-felicitation.jpg'));
  fs.copyFileSync(IMAGES.img10_toppers_trophies, path.join(publicGallery, 'toppers-trophy-celebration-1.jpg'));
  fs.copyFileSync(IMAGES.img11_toppers_celebrate, path.join(publicGallery, 'toppers-trophy-celebration-2.jpg'));
  fs.copyFileSync(IMAGES.img13_faculty_team, path.join(publicGallery, 'mock-test-topper-trophy.jpg'));
  fs.copyFileSync(IMAGES.img14_female_toppers, path.join(publicGallery, 'female-toppers-felicitation.jpg'));
  fs.copyFileSync(IMAGES.img15_female_toppers_office, path.join(publicGallery, 'female-toppers-awards.jpg'));

  console.log('2. Extracting real faculty portrait photos with sharp...');
  // Person 1: Er. A.K. Sharma (left, peach pullover, confident educator pose)
  await sharp(IMAGES.img13_faculty_team)
    .extract({ left: 35, top: 130, width: 230, height: 290 })
    .resize(500, 600, { fit: 'cover' })
    .jpeg({ quality: 95 })
    .toFile(path.join(publicFaculty, 'er-ak-sharma.jpg'));

  // Person 2: Dr. R.P. Singh (second from left, light blue formal shirt with pens)
  await sharp(IMAGES.img13_faculty_team)
    .extract({ left: 265, top: 195, width: 175, height: 240 })
    .resize(500, 600, { fit: 'cover' })
    .jpeg({ quality: 95 })
    .toFile(path.join(publicFaculty, 'dr-rp-singh.jpg'));

  // Person 3: Prof. Neeraj Tiwari (olive puffer vest over check shirt)
  await sharp(IMAGES.img13_faculty_team)
    .extract({ left: 535, top: 235, width: 175, height: 240 })
    .resize(500, 600, { fit: 'cover' })
    .jpeg({ quality: 95 })
    .toFile(path.join(publicFaculty, 'prof-neeraj-tiwari.jpg'));

  // Person 4: Vivek Richariya (purple shirt, glasses, friendly smile)
  await sharp(IMAGES.img13_faculty_team)
    .extract({ left: 665, top: 260, width: 175, height: 240 })
    .resize(500, 600, { fit: 'cover' })
    .jpeg({ quality: 95 })
    .toFile(path.join(publicFaculty, 'vivek-richariya.jpg'));

  // Person 5: Ms. Priya Sahu (from Image 14: educator in center with smile & medal)
  await sharp(IMAGES.img14_female_toppers)
    .extract({ left: 300, top: 410, width: 250, height: 320 })
    .resize(500, 600, { fit: 'cover' })
    .jpeg({ quality: 95 })
    .toFile(path.join(publicFaculty, 'ms-priya-sahu.jpg'));

  // Save the full faculty team photo in public/images/faculty/faculty-team-mentors.jpg
  fs.copyFileSync(IMAGES.img13_faculty_team, path.join(publicFaculty, 'faculty-team-mentors.jpg'));

  console.log('3. Updating data/db_store.json with real images for courses, faculty, and gallery...');
  const storePath = path.join(process.cwd(), 'data', 'db_store.json');
  const store = JSON.parse(fs.readFileSync(storePath, 'utf-8'));

  // Update Courses
  store.courses[0].image = '/images/gallery/felicitation-police-award.jpg'; // UP Police - Real Police award
  store.courses[1].image = '/images/gallery/classroom-mock-test-1.jpg'; // SSC - Real AC hall mock test
  store.courses[2].image = '/images/gallery/classroom-batch-session.jpg'; // Railway - Real lecture session
  store.courses[3].image = '/images/gallery/classroom-mock-test-2.jpg'; // UPSSSC PET - Real OMR exam
  store.courses[4].image = '/images/gallery/classroom-champions.jpg'; // Banking - Real Champion batch
  store.courses[5].image = '/images/gallery/classroom-students-batch.jpg'; // Master Foundation - Real classroom

  // Update Faculty
  store.faculty[0].photo = '/images/faculty/er-ak-sharma.jpg';
  store.faculty[1].photo = '/images/faculty/dr-rp-singh.jpg';
  store.faculty[2].photo = '/images/faculty/prof-neeraj-tiwari.jpg';
  store.faculty[3].photo = '/images/faculty/ms-priya-sahu.jpg';
  store.faculty[4].photo = '/images/faculty/vivek-richariya.jpg';

  // Update Results
  if (store.results && store.results.length >= 6) {
    store.results[0].photo = '/images/gallery/felicitation-police-award.jpg';
    store.results[1].photo = '/images/gallery/female-toppers-felicitation.jpg';
    store.results[2].photo = '/images/gallery/toppers-trophy-celebration-1.jpg';
    store.results[3].photo = '/images/gallery/mock-test-topper-trophy.jpg';
    store.results[4].photo = '/images/gallery/female-toppers-awards.jpg';
    store.results[5].photo = '/images/gallery/toppers-police-felicitation.jpg';
  }

  // Save persistent store
  fs.writeFileSync(storePath, JSON.stringify(store, null, 2), 'utf-8');
  console.log('✓ Successfully deployed all real images and updated db_store.json!');
}

main().catch(err => {
  console.error('Error deploying real images:', err);
  process.exit(1);
});
