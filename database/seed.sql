-- Seed Data for Bright Future Competition Institute

-- 1. Admin User (Password: admin123)
INSERT INTO `admin_users` (`name`, `email`, `password`, `role`, `phone`, `isActive`, `createdAt`, `updatedAt`)
VALUES 
('Institute Director', 'admin@brightfuture.com', '$2b$10$qbXRSHYTx00nSwJ64fu8U.GlmgsUVn4oBce2Y5z3MMNBz5kH3Mqai', 'SUPER_ADMIN', '9450067223', 1, NOW(), NOW())
ON DUPLICATE KEY UPDATE `name`=VALUES(`name`);

-- 2. Website Settings
INSERT INTO `website_settings` (
  `id`, `instituteName`, `tagline`, `headOfficeAddress`, `marketBranchAddress`, 
  `pinCode`, `primaryPhone`, `alternatePhones`, `email`, `whatsappNumber`, 
  `openingHours`, `mapEmbedUrl`, `facebookUrl`, `youtubeUrl`, `telegramUrl`, 
  `instagramUrl`, `footerText`, `announcementBarText`, `isAnnouncementBarActive`, `updatedAt`
) VALUES (
  1,
  'Bright Future Competition Institute',
  'Empowering Minds, Shaping Futures – Lalitpur\'s Premier Coaching',
  'Behind Krishna Cinema, Station Road, Lalitpur, Uttar Pradesh, India.',
  'Richariya Market, Mahaveerpura, Near Ghantaghar, Lalitpur.',
  '284403',
  '9450067223',
  '9451935450, 8726343417',
  'aj2819147@gmail.com',
  '9450067223',
  'Monday - Saturday: 7:00 AM - 7:30 PM | Sunday: Special Test Series & Doubt Sessions',
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14549.467891234!2d78.406981!3d24.688172!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3979ea375d000001%3A0x6b8f1b6238b725b8!2sLalitpur%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000',
  'https://facebook.com/brightfuturelalitpur',
  'https://youtube.com/@brightfuturecompetition',
  'https://t.me/brightfuturelalitpur',
  'https://instagram.com/brightfuturelalitpur',
  'Bright Future Competition Institute is Lalitpur’s most trusted coaching center for one-day competitive exams including UP Police, SSC, Railways, UPSSSC, and Banking. Empowering aspirants with proven techniques, expert faculty, and structured test series.',
  '🎯 Admissions Open for New Batches: UP Police Constable / SI, SSC CGL/CHSL & Railway NTPC! Visit Head Office or Call 9450067223.',
  1,
  NOW()
)
ON DUPLICATE KEY UPDATE `instituteName`=VALUES(`instituteName`), `updatedAt`=NOW();

-- 3. Course Categories
INSERT INTO `course_categories` (`id`, `name`, `slug`, `description`, `icon`, `createdAt`, `updatedAt`) VALUES
(1, 'State Police & SI', 'state-police-si', 'Comprehensive preparation for UP Police Constable, Sub-Inspector (SI), Jail Warder, and Fireman examinations.', 'ShieldAlert', NOW(), NOW()),
(2, 'SSC Examinations', 'ssc-exams', 'Target batches for SSC CGL, CHSL, MTS, CPO, and GD Constable with conceptual clarity and speed tests.', 'GraduationCap', NOW(), NOW()),
(3, 'Railway (RRB) Exams', 'railway-exams', 'Focused training for RRB NTPC, Group D, ALP (Assistant Loco Pilot), and Technician exams.', 'Train', NOW(), NOW()),
(4, 'UPSSSC & State PSC', 'upsssc-state-exams', 'Specialized syllabus coverage for UPSSSC PET, VDO, Lekhpal, Junior Assistant, and RO/ARO.', 'Building', NOW(), NOW()),
(5, 'Banking & Insurance', 'banking-insurance', 'Speed math, reasoning puzzles, English grammar, and banking awareness for IBPS, SBI PO & Clerk.', 'Landmark', NOW(), NOW()),
(6, 'Foundation Batches', 'foundation-batches', 'Concept-building general competition foundation course covering Complete Maths, Reasoning, and GS.', 'BookOpen', NOW(), NOW())
ON DUPLICATE KEY UPDATE `name`=VALUES(`name`);

-- 4. Courses
INSERT INTO `courses` (
  `id`, `title`, `slug`, `categoryId`, `shortDescription`, `description`, 
  `eligibility`, `duration`, `subjects`, `fee`, `discountFee`, `batchInfo`, 
  `image`, `isFeatured`, `isPublished`, `metaTitle`, `metaDescription`, `keywords`, `createdAt`, `updatedAt`
) VALUES
(
  1,
  'UP Police Constable & SI Special Target Batch',
  'up-police-constable-si-batch',
  1,
  'Dedicated exam-oriented batch for UP Police Constable and Sub-Inspector with daily speed tests and Hindi grammar mastery.',
  '<h3>Master the UP Police Constable & Sub-Inspector Examination</h3><p>Bright Future Competition Institute in Lalitpur has trained thousands of aspirants who are now proudly serving in the Uttar Pradesh Police Force. This course offers end-to-end preparation for written tests, physical examination guidance, and previous years\' paper breakdown.</p><h4>Course Highlights:</h4><ul><li>Special focus on UP Special GK, General Hindi, and Mental Ability.</li><li>Weekly OMR sheet-based full-length mock examinations with district rank analysis.</li><li>Short-trick methods for numerical reasoning and fast calculations.</li><li>Complete study booklet printed with previous 10 years\' solved question bank.</li><li>Doubt clearing sessions after regular classes every Saturday.</li></ul>',
  '12th Pass (Constable) / Graduate in any discipline (Sub-Inspector)',
  '6 Months (Intensive)',
  'General Knowledge (including UP Special), General Hindi, Numerical & Mental Ability, Mental Aptitude / IQ / Reasoning',
  7500,
  5999,
  'Morning Batch: 7:30 AM – 10:30 AM | Evening Batch: 3:30 PM – 6:30 PM',
  '/images/police-exam-prep.jpg',
  1,
  1,
  'UP Police Constable & SI Coaching in Lalitpur - Bright Future',
  'Join the best UP Police Constable and Sub-Inspector coaching in Lalitpur at Bright Future Competition Institute. Daily tests, expert faculty, and proven results.',
  'UP Police coaching Lalitpur, UP SI coaching, Police Constable exam preparation Lalitpur, Bright Future Institute',
  NOW(),
  NOW()
),
(
  2,
  'SSC CGL & CHSL (Tier 1 + Tier 2) Comprehensive Course',
  'ssc-cgl-chsl-comprehensive-course',
  2,
  'Rigorous preparation for SSC Combined Graduate Level & Combined Higher Secondary Level with advanced math and reasoning shortcuts.',
  '<h3>Crack Staff Selection Commission Exams with Top Ranks</h3><p>Designed for serious aspirants targeting Central Government Group B and C posts. Our curriculum matches the latest TCS exam pattern, emphasizing speed, accuracy, and conceptual clarity across Tier 1 and Tier 2.</p><h4>Course Highlights:</h4><ul><li>Advanced Mathematics: Algebra, Trigonometry, Geometry, Mensuration & Arithmetic shortcuts.</li><li>Comprehensive English: Grammar rules, Vocabulary building, Comprehension & Cloze test mastery.</li><li>Reasoning: Verbal, Non-verbal, Critical reasoning and logical puzzles.</li><li>General Awareness: Current affairs modules updated monthly, NCERT based Science & Polity notes.</li><li>Computer Proficiency & Typist guidance for Tier 2 qualification.</li></ul>',
  '12th Pass for CHSL | Graduation for CGL',
  '10 Months (Foundation + Target)',
  'Quantitative Aptitude, General Intelligence & Reasoning, English Language, General Awareness, Computer Basics',
  11000,
  8999,
  'Morning Batch: 8:00 AM – 11:30 AM | Afternoon Batch: 12:00 PM – 3:30 PM',
  '/images/ssc-railway-prep.jpg',
  1,
  1,
  'Best SSC CGL & CHSL Coaching in Lalitpur | Bright Future Competition',
  'Target SSC CGL & CHSL with expert faculty at Bright Future Competition Institute, Lalitpur. Concept clarity, test series, and high success track record.',
  'SSC CGL coaching Lalitpur, SSC CHSL classes, Staff Selection Commission Lalitpur, SSC batch Station Road',
  NOW(),
  NOW()
),
(
  3,
  'Railway RRB NTPC & Group D Success Batch',
  'railway-rrb-ntpc-group-d-batch',
  3,
  'Complete syllabus coverage for Non-Technical Popular Categories (NTPC) and Group D with science and mathematics focus.',
  '<h3>Secure Your Career in Indian Railways</h3><p>Railway examinations test your speed in Mathematics, General Science, and General Intelligence. Our specialized teachers break down the entire RRB syllabus into daily actionable targets.</p><h4>Course Highlights:</h4><ul><li>Special emphasis on Physics, Chemistry, and Biology fundamentals with real exam examples.</li><li>Over 5,000 practice questions covering previous RRB NTPC CBT-1 & CBT-2 stages.</li><li>Time-management workshops to attempt 100 questions within 90 minutes.</li><li>Separate batch timings for college students and working candidates.</li></ul>',
  '10th / 12th / ITI / Graduation depending on specific post',
  '5 Months (Target)',
  'General Science, Mathematics, General Intelligence & Reasoning, Current Events',
  6500,
  4999,
  'Morning Batch: 7:00 AM – 9:30 AM | Evening Batch: 4:00 PM – 6:30 PM',
  '/images/ssc-railway-prep.jpg',
  1,
  1,
  'Railway RRB NTPC & Group D Coaching in Lalitpur - Bright Future',
  'Prepare for Railway RRB NTPC, ALP, and Group D in Lalitpur. Get high-yield study material and mock tests at Bright Future Competition Institute.',
  'Railway coaching Lalitpur, RRB NTPC coaching, Group D classes Lalitpur',
  NOW(),
  NOW()
),
(
  4,
  'UPSSSC PET, VDO & Lekhpal Dedicated Course',
  'upsssc-pet-vdo-lekhpal-course',
  4,
  'Score 99+ percentile in UPSSSC Preliminary Eligibility Test (PET) and qualify for VDO, Junior Assistant, and Lekhpal vacancies.',
  '<h3>Target 99+ Percentile in UPSSSC PET</h3><p>In Uttar Pradesh, scoring high in the PET examination is mandatory to apply for all Subordinate Services posts. Our faculty ensures you master the exact 15-section PET syllabus.</p><h4>Course Highlights:</h4><ul><li>Deep coverage of Indian History, National Movement, Geography, Economy & Indian Constitution.</li><li>Graph and Table Interpretation (20 marks assured target).</li><li>Hindi comprehension and grammar with previous years\' repeat questions.</li><li>Special study material for Rural Development (Gramya Vikas) for Lekhpal and VDO main exams.</li></ul>',
  'High School (10th) or Intermediate (12th)',
  '4 Months (Target & Revision)',
  'Indian History, National Movement, Geography, Economy, Constitution, General Science, Arithmetic, General Hindi, General English, Logic & Reasoning, Current Affairs, Graph & Table Interpretation',
  5500,
  4200,
  'Daily 2-Hour Intensive Session: 9:30 AM – 11:30 AM or 4:30 PM – 6:30 PM',
  '/images/hero-classroom.jpg',
  1,
  1,
  'UPSSSC PET Coaching in Lalitpur | Lekhpal & VDO Classes',
  'Score 99 percentile in UPSSSC PET with expert guidance at Bright Future Competition Institute, Station Road, Lalitpur.',
  'UPSSSC PET coaching Lalitpur, Lekhpal coaching Lalitpur, VDO batch Lalitpur',
  NOW(),
  NOW()
),
(
  5,
  'Banking Foundation & Speed Math Batch (IBPS / SBI)',
  'banking-foundation-speed-math-batch',
  5,
  'Master calculation speed, data interpretation, high-level reasoning puzzles, and financial awareness for Bank PO and Clerk.',
  '<h3>Your Gateway to Public Sector & Private Banks</h3><p>Banking exams demand precision and extreme speed. Our Speed Math techniques allow students to solve simplification, approximation, quadratic equations, and series in under 20 seconds.</p><h4>Course Highlights:</h4><ul><li>Vedic Math & Mental Calculation hacks for instantaneous arithmetic operations.</li><li>Floor, box, circular, linear, and parallel seating arrangement puzzles.</li><li>Editorial reading sessions and vocabulary flashcards for the English section.</li><li>Weekly online computer lab practice tests simulating the actual IBPS/SBI interface.</li></ul>',
  'Graduation in any stream',
  '6 Months',
  'Quantitative Aptitude, Reasoning Ability, English Language, Banking & Financial Awareness',
  8500,
  6999,
  'Morning Batch: 8:30 AM – 11:00 AM',
  '/images/institute-study.jpg',
  0,
  1,
  'Banking Exam Coaching in Lalitpur - IBPS / SBI PO & Clerk',
  'Learn Vedic speed math and advanced reasoning for banking exams at Bright Future Competition Institute, Lalitpur.',
  'Bank PO coaching Lalitpur, IBPS Clerk coaching, Banking classes Lalitpur',
  NOW(),
  NOW()
),
(
  6,
  'General Competition 1-Year Master Foundation Course',
  'general-competition-1-year-foundation',
  6,
  'Zero-level to advanced master course for beginners preparing for all one-day central and state competitive examinations.',
  '<h3>Build an Unshakable Foundation for All One-Day Exams</h3><p>If you are just starting your competitive exam preparation after 12th or graduation, this course will build your conceptual foundation from scratch. Cover Maths, Reasoning, GS, Hindi, and English so you are ready for any government exam notification.</p><h4>Course Highlights:</h4><ul><li>Zero-level concept clarification for non-math background students.</li><li>Printed topic-wise concept sheets and home assignment booklets.</li><li>Personal mentoring and progress tracking by institute directors.</li><li>Lifetime free access to the institute library and reading room.</li></ul>',
  '10th / 12th / Undergraduates',
  '12 Months (Comprehensive)',
  'Basic to Advanced Maths, Verbal & Non-Verbal Reasoning, Complete General Studies (History, Polity, Geography, Economy, Science), General Hindi & English',
  14000,
  11500,
  'Morning: 7:00 AM – 10:30 AM | Evening: 3:00 PM – 6:30 PM',
  '/images/faculty-teaching.jpg',
  1,
  1,
  '1-Year General Competition Foundation Coaching in Lalitpur',
  'Complete 1-year foundation course for all one-day competitive exams in Lalitpur. Join Bright Future Competition Institute.',
  'Competitive exam foundation batch Lalitpur, One day exam coaching Lalitpur, Bright Future Lalitpur',
  NOW(),
  NOW()
)
ON DUPLICATE KEY UPDATE `title`=VALUES(`title`);

-- 5. Faculty
INSERT INTO `faculty` (`name`, `designation`, `qualification`, `experience`, `subjects`, `bio`, `photo`, `order`, `isPublished`, `createdAt`, `updatedAt`) VALUES
('Er. A. K. Sharma', 'Founder & Senior Faculty (Mathematics & Reasoning)', 'B.Tech, M.Sc. Mathematics', '12+ Years Teaching Experience', 'Quantitative Aptitude, Advanced Maths & Mental Ability', 'Known as the "Maths Guru of Lalitpur", Er. Sharma has mentored over 8,000 competitive exam aspirants. His signature short-trick formulas and conceptual clarity have helped hundreds of students secure government posts.', '/images/faculty-teaching.jpg', 1, 1, NOW(), NOW()),
('Dr. R. P. Singh', 'Senior Faculty (General Studies & History/Polity)', 'Ph.D. in History, M.A. Political Science', '14+ Years in Civil & Competitive Coaching', 'Indian Polity, Constitution, Indian History & National Movement', 'Dr. Singh brings academic rigor and storytelling ease to the classroom. His analytical breakdown of the Indian Constitution and historical events makes General Studies engaging and memorable.', '/images/faculty-teaching.jpg', 2, 1, NOW(), NOW()),
('Prof. Neeraj Tiwari', 'Faculty (General Hindi & Literature)', 'M.A. Hindi, B.Ed, NET Qualified', '9+ Years Experience in UP State Exams', 'General Hindi, Grammar, Vocabulary, UP Special Literature', 'Specialist in scoring full marks in the Hindi section of UP Police, RO/ARO, and UPSSSC examinations. Author of multiple classroom notes widely circulated among competitive exam aspirants.', '/images/faculty-teaching.jpg', 3, 1, NOW(), NOW()),
('Ms. Priya Sahu', 'Faculty (English Language & Comprehension)', 'M.A. English, CELTA Certified', '7+ Years Teaching for SSC & Banking', 'English Grammar, Vocab Root Words, Cloze Test & Reading Comprehension', 'Priya ma\'am empowers students from Hindi medium backgrounds to conquer fear of English in SSC and Banking exams with systematic root-word vocabulary methods and intuitive grammar rules.', '/images/faculty-teaching.jpg', 4, 1, NOW(), NOW()),
('Vivek Richariya', 'Faculty (General Science & Current Affairs)', 'M.Sc. Physics, State Rank Holder', '6+ Years Experience', 'Physics, Chemistry, Biology & Monthly Current Affairs Analysis', 'Deeply connected with the Lalitpur youth, Vivek sir curates monthly high-probability current affairs booklets and clarifies fundamental science concepts with practical everyday examples.', '/images/faculty-teaching.jpg', 5, 1, NOW(), NOW());

-- 6. Results
INSERT INTO `results` (`studentName`, `examName`, `rank`, `year`, `photo`, `description`, `isFeatured`, `createdAt`, `updatedAt`) VALUES
('Amit Yadav', 'UP Police Constable Examination', 'Selected - High Merit Rank', 2024, '/images/student-toppers.jpg', 'Scored top marks in General Hindi and Mental Ability. Dedicated student of the 6-month intensive police batch at Head Office.', 1, NOW(), NOW()),
('Sangeeta Kushwaha', 'Uttar Pradesh Police Sub-Inspector (SI)', 'Rank 84 (State Level)', 2023, '/images/student-toppers.jpg', 'Qualified UP SI in her first attempt with dedicated mentorship in IPC/CrPC basic provisions and advanced reasoning from Bright Future.', 1, NOW(), NOW()),
('Deepak Sen', 'Staff Selection Commission - SSC CGL', 'Inspector of Central Excise', 2023, '/images/student-toppers.jpg', 'Credited daily test series and speed mathematics shortcuts taught by Er. A. K. Sharma for his success in SSC CGL Tier 1 and Tier 2.', 1, NOW(), NOW()),
('Rahul Bundela', 'Railway RRB NTPC Examination', 'Station Master (Selected)', 2024, '/images/student-toppers.jpg', 'Regular student of our Market Branch, Rahul cleared both CBT-1, CBT-2, and the computer-based aptitude test with flying colors.', 1, NOW(), NOW()),
('Pooja Jain', 'UPSSSC Revenue Lekhpal', 'Selected - Lalitpur District Merit', 2024, '/images/student-toppers.jpg', 'Scored 99.2 percentile in UPSSSC PET and went on to clear the Lekhpal Mains exam with guidance in Rural Development from our institute.', 1, NOW(), NOW()),
('Manish Ahirwar', 'SSC Combined Higher Secondary Level (CHSL)', 'Postal Assistant (Selected)', 2024, '/images/student-toppers.jpg', 'Achieved high marks in English and Mathematics after 8 months of rigorous practice at Bright Future Competition Institute.', 1, NOW(), NOW());

-- 7. Gallery Categories & Items
INSERT INTO `gallery_categories` (`id`, `name`, `slug`, `createdAt`, `updatedAt`) VALUES
(1, 'Classroom & Study Sessions', 'classroom-study', NOW(), NOW()),
(2, 'Institute Infrastructure', 'infrastructure', NOW(), NOW()),
(3, 'Felicitations & Toppers', 'toppers-felicitation', NOW(), NOW()),
(4, 'Seminars & Guidance Workshops', 'seminars-workshops', NOW(), NOW())
ON DUPLICATE KEY UPDATE `name`=VALUES(`name`);

INSERT INTO `gallery_items` (`title`, `type`, `url`, `caption`, `categoryId`, `isPublished`, `createdAt`, `updatedAt`) VALUES
('Interactive Smart Classroom Session', 'IMAGE', '/images/hero-classroom.jpg', 'Students engaged in high-yield shortcut techniques for competitive exams.', 1, 1, NOW(), NOW()),
('Self-Study & Reading Hall', 'IMAGE', '/images/institute-study.jpg', 'Quiet, disciplined library space equipped with reference books and exam material.', 2, 1, NOW(), NOW()),
('Toppers Felicitation Ceremony', 'IMAGE', '/images/student-toppers.jpg', 'Proud moments celebrating our students who cleared UP Police & SSC exams.', 3, 1, NOW(), NOW()),
('Doubt Clearing & Mentoring Session', 'IMAGE', '/images/faculty-teaching.jpg', 'Faculty explaining challenging concepts in one-on-one doubt clearing sessions.', 1, 1, NOW(), NOW()),
('Special Target Batch for Defense & Police', 'IMAGE', '/images/police-exam-prep.jpg', 'Dedicated batch focusing on syllabus mastery and time-bound test drills.', 1, 1, NOW(), NOW()),
('SSC & Railway Speed Practice Hall', 'IMAGE', '/images/ssc-railway-prep.jpg', 'Students solving timed test papers under simulated exam conditions.', 1, 1, NOW(), NOW());

-- 8. Notices
INSERT INTO `notices` (`title`, `content`, `category`, `isPinned`, `isPublished`, `publishDate`, `createdAt`, `updatedAt`) VALUES
('🔥 New Target Batches Starting Next Monday for UP Police & SSC CGL', '<p>Fresh batches for UP Police Constable & Sub-Inspector and SSC CGL/CHSL are commencing from coming Monday. Morning Batch starts at 7:30 AM and Evening Batch at 3:30 PM. Limited seats available per batch to maintain student-teacher interaction. Register at the reception or online today.</p>', 'ADMISSION', 1, 1, NOW(), NOW(), NOW()),
('📝 Free All-Lalitpur Open Mock Test & Scholarship Assessment this Sunday', '<p>Bright Future Competition Institute invites all competitive exam aspirants across Lalitpur district to participate in the Mega Open Mock Test this Sunday at our Head Office (Behind Krishna Cinema, Station Road). Top 10 rankers will be awarded up to 100% tuition fee scholarships.</p>', 'EXAM', 1, 1, NOW(), NOW(), NOW()),
('📢 UPSSSC PET 2026 Special Revision & Daily Graph Practice Schedule', '<p>Special daily 2-hour revision sessions dedicated to Graph & Table Interpretation and General Hindi have been scheduled for all enrolled UPSSSC candidates. Check notice board for room assignments.</p>', 'GENERAL', 0, 1, NOW(), NOW(), NOW()),
('🎯 Free Document Verification & Counseling Assistance for Qualified Candidates', '<p>All candidates from Lalitpur who have qualified in recent competitive exams are welcomed at our office for free document verification counseling, medical preparation guidelines, and interview tips from our expert panel.</p>', 'EVENT', 0, 1, NOW(), NOW(), NOW());

-- 9. Testimonials
INSERT INTO `testimonials` (`studentName`, `examOrCourse`, `review`, `rating`, `photo`, `isFeatured`, `createdAt`, `updatedAt`) VALUES
('Amit Yadav (Selected in UP Police)', 'UP Police Constable Target Batch', 'Bright Future Competition Institute changed my life. I was struggling with Hindi grammar and speed maths. Er. Sharma sir and Tiwari sir gave individual attention and regular mock tests that mirrored the exact exam pattern. Proud to be an alumnus!', 5, '/images/student-toppers.jpg', 1, NOW(), NOW()),
('Sangeeta Kushwaha (Selected UP SI)', 'UP Sub-Inspector Dedicated Batch', 'The quality of education and disciplined environment at Bright Future is unmatched in Bundelkhand. The faculty does not just teach chapters; they teach how to tackle the negative marking and maintain mental composure in competitive exams.', 5, '/images/student-toppers.jpg', 1, NOW(), NOW()),
('Deepak Sen (Selected SSC CGL)', 'SSC CGL Comprehensive Course', 'I used to think that one needs to go to Delhi or Allahabad for SSC CGL preparation. Bright Future proved that with dedication and right faculty in Lalitpur itself, you can clear national level exams with high ranks!', 5, '/images/student-toppers.jpg', 1, NOW(), NOW()),
('Rahul Bundela (Railway Station Master)', 'Railway RRB NTPC Batch', 'The library facility, speed test series, and constant encouragement from the teachers made all the difference. Thank you Bright Future Institute for turning my dream into reality.', 5, '/images/student-toppers.jpg', 1, NOW(), NOW());

-- 10. FAQs
INSERT INTO `faqs` (`question`, `answer`, `category`, `order`, `isPublished`, `createdAt`, `updatedAt`) VALUES
('Which competitive exams do you offer coaching for at Bright Future?', 'We offer specialized target batches and foundation courses for UP Police Constable & Sub-Inspector (SI), SSC examinations (CGL, CHSL, MTS, GD), Railway RRB (NTPC, Group D, ALP), UPSSSC (PET, Lekhpal, VDO, Junior Assistant), Banking (IBPS, SBI PO & Clerk), and comprehensive 1-year General Competition Foundation.', 'COURSES', 1, 1, NOW(), NOW()),
('Where are your institute branches located in Lalitpur?', 'We have two centrally located branches in Lalitpur: 1) Head Office: Behind Krishna Cinema, Station Road, Lalitpur, Uttar Pradesh; 2) Market Branch: Richariya Market, Mahaveerpura, Near Ghantaghar, Lalitpur (PIN: 284403). Both branches are easily accessible by public transport.', 'GENERAL', 2, 1, NOW(), NOW()),
('What are the batch timings available?', 'We operate flexible batches to suit college students and working candidates. Morning batches run from 7:00 AM to 12:00 PM, and Evening batches run from 3:00 PM to 7:30 PM. Each batch is 2.5 to 3.5 hours long, followed by doubt-clearing sessions.', 'ADMISSION', 3, 1, NOW(), NOW()),
('Do you provide study material and regular test series?', 'Yes! Every enrolled student receives comprehensive printed study booklets, chapter-wise practice sheets, and previous 10 years\' solved question banks. We conduct weekly OMR-based mock tests on Sundays with instant evaluation and detailed rank analysis.', 'COURSES', 4, 1, NOW(), NOW()),
('Can I take a demo class before paying the fee?', 'Absolutely! We offer up to 2 days of free demo classes for all courses so you can experience our teaching methodology, interaction with faculty, and classroom environment before finalizing your admission.', 'ADMISSION', 5, 1, NOW(), NOW()),
('Are there scholarship or fee discount opportunities for meritorious students?', 'Yes, Bright Future offers scholarships up to 100% off tuition fees through our monthly Open Assessment Tests for top-performing students and meritorious candidates from economically weaker backgrounds.', 'FEES', 6, 1, NOW(), NOW());

-- 11. Page Contents
INSERT INTO `page_contents` (`pageKey`, `heroBadge`, `heroTitle`, `heroSubtitle`, `aboutTitle`, `aboutContent`, `mission`, `vision`, `history`, `methodology`, `whyChooseUs`, `infrastructure`, `updatedAt`) VALUES
(
  'home',
  '✨ Lalitpur\'s No.1 Competitive Coaching Institute',
  'Shape Your Destiny in Government Service with Lalitpur’s Top Mentors',
  'Comprehensive target batches, speed test series, and personalized mentoring for UP Police, SSC, Railways, UPSSSC & Banking exams. Join hundreds of successful government officers.',
  'Empowering Lalitpur’s Youth Since Over a Decade',
  'Bright Future Competition Institute was founded with a singular mission: to provide the highest standard of competitive examination coaching right here in Lalitpur, so students do not need to migrate to distant metro cities. With an unbeatable record of selections in UP Police, SSC, and Railways, our experienced educators combine concept mastery, speed hacks, and disciplined mock test series.',
  'To democratize competitive exam education in Bundelkhand by providing metro-quality mentorship, cutting-edge study resources, and ethical values at an accessible fee structure.',
  'To be recognized as Uttar Pradesh\'s premier coaching institution that transforms rural and semi-urban talent into competent government civil servants, police officers, and railway personnel.',
  'Founded in 2012 in Lalitpur by visionary educators, Bright Future Competition Institute started with just 25 ambitious students. Through unwavering focus on conceptual clarity and rigorous practice, the institute grew to become Lalitpur\'s most reputable coaching organization, producing hundreds of selections year after year across state and central examinations.',
  'Our 4-Pillar Pedagogical System consists of: 1) Foundation Concept Teaching with visual diagrams; 2) Speed & Shortcut Calculation Drills; 3) Daily Practice Sheets (DPS) and Sunday OMR Mock Tests; 4) Individual Weak-Area Diagnosis and Mentoring.',
  '[{"title":"Expert Faculty Panel","description":"Experienced subject specialists with 10+ years track record in UP Police, SSC, and Civil preparation."},{"title":"Weekly OMR Mock Tests","description":"Real-time simulated examinations with negative marking analysis and district rank benchmarking."},{"title":"Comprehensive Study Material","description":"Curated printed notes, formula cheat-sheets, and 10-year question banks updated to latest exam patterns."},{"title":"Disciplined Self-Study Hall","description":"Peaceful reading room and library facility with thousands of competition reference titles."},{"title":"Dual Convenient Branches","description":"Classes available at both Station Road Head Office and Ghantaghar Market Branch in Lalitpur."},{"title":"Personalized Doubt Sessions","description":"Daily 1-on-1 doubt clearing after classes to ensure no student is left behind in any subject."}]',
  'Modern classrooms equipped with high-resolution projection screens, ergonomic seating, fully air-cooled study halls, backup power generators, high-speed fiber internet for computer tests, and a peaceful reference library.',
  NOW()
),
(
  'about',
  'About Our Institution',
  'A Decade of Excellence, Dedication, and Unmatched Selections in Lalitpur',
  'Bright Future Competition Institute is committed to building a brighter India by empowering students with knowledge, confidence, and exam mastery.',
  'Empowering Lalitpur’s Youth Since Over a Decade',
  'Bright Future Competition Institute was founded with a singular mission: to provide the highest standard of competitive examination coaching right here in Lalitpur, so students do not need to migrate to distant metro cities. With an unbeatable record of selections in UP Police, SSC, and Railways, our experienced educators combine concept mastery, speed hacks, and disciplined mock test series.',
  'To democratize competitive exam education in Bundelkhand by providing metro-quality mentorship, cutting-edge study resources, and ethical values at an accessible fee structure.',
  'To be recognized as Uttar Pradesh\'s premier coaching institution that transforms rural and semi-urban talent into competent government civil servants, police officers, and railway personnel.',
  'Founded in 2012 in Lalitpur by visionary educators, Bright Future Competition Institute started with just 25 ambitious students. Through unwavering focus on conceptual clarity and rigorous practice, the institute grew to become Lalitpur\'s most reputable coaching organization, producing hundreds of selections year after year across state and central examinations.',
  'Our 4-Pillar Pedagogical System consists of: 1) Foundation Concept Teaching with visual diagrams; 2) Speed & Shortcut Calculation Drills; 3) Daily Practice Sheets (DPS) and Sunday OMR Mock Tests; 4) Individual Weak-Area Diagnosis and Mentoring.',
  '[{"title":"Expert Faculty Panel","description":"Experienced subject specialists with 10+ years track record in UP Police, SSC, and Civil preparation."},{"title":"Weekly OMR Mock Tests","description":"Real-time simulated examinations with negative marking analysis and district rank benchmarking."},{"title":"Comprehensive Study Material","description":"Curated printed notes, formula cheat-sheets, and 10-year question banks updated to latest exam patterns."},{"title":"Disciplined Self-Study Hall","description":"Peaceful reading room and library facility with thousands of competition reference titles."},{"title":"Dual Convenient Branches","description":"Classes available at both Station Road Head Office and Ghantaghar Market Branch in Lalitpur."},{"title":"Personalized Doubt Sessions","description":"Daily 1-on-1 doubt clearing after classes to ensure no student is left behind in any subject."}]',
  'Spacious ventilated classrooms, comprehensive digital reference material, biometric attendance, separate common rooms for female aspirants, and round-the-clock power and water facilities.',
  NOW()
)
ON DUPLICATE KEY UPDATE `heroTitle`=VALUES(`heroTitle`), `updatedAt`=NOW();

-- 12. SEO Metadata
INSERT INTO `seo_metadata` (`pageSlug`, `metaTitle`, `metaDescription`, `keywords`, `canonicalUrl`, `robots`, `updatedAt`) VALUES
('/', 'Bright Future Competition Institute | Lalitpur’s Best Coaching', 'Bright Future Competition Institute, Lalitpur, UP. Premier coaching for UP Police Constable & SI, SSC CGL/CHSL, Railway NTPC, UPSSSC PET & Banking. Call 9450067223.', 'Bright Future Competition Institute, coaching in Lalitpur, UP Police coaching Lalitpur, SSC coaching Lalitpur, best coaching institute Lalitpur UP, Station Road Lalitpur', 'https://brightfutureinstitute.com/', 'index, follow', NOW()),
('/about', 'About Us | Bright Future Competition Institute Lalitpur', 'Learn about Bright Future Competition Institute, our mission, expert faculty, modern infrastructure, and history of top selections in competitive exams in Lalitpur, UP.', 'about Bright Future Competition Institute, Lalitpur coaching history, top faculty Lalitpur, coaching infrastructure', 'https://brightfutureinstitute.com/about', 'index, follow', NOW()),
('/courses', 'All Competitive Exam Courses | Bright Future Institute Lalitpur', 'Explore target and foundation courses for UP Police, SSC CGL/CHSL, Railways RRB NTPC, UPSSSC PET, and Banking at Bright Future Competition Institute Lalitpur.', 'competitive exam courses Lalitpur, UP Police course fee, SSC CGL batch Lalitpur, Railway exam classes', 'https://brightfutureinstitute.com/courses', 'index, follow', NOW()),
('/faculty', 'Expert Faculty Members | Bright Future Competition Institute', 'Meet the experienced mentors and educators behind our top selections in competitive examinations at Bright Future Competition Institute Lalitpur.', 'faculty Bright Future Lalitpur, Maths teacher Lalitpur, GS teacher UP Police, best teachers Lalitpur', 'https://brightfutureinstitute.com/faculty', 'index, follow', NOW()),
('/results', 'Student Results & Achievements | Bright Future Institute Lalitpur', 'View the proud achievements, merit ranks, and selections of Bright Future Competition Institute students in UP Police, SSC, Railways, and UPSSSC.', 'Bright Future Lalitpur selections, student results, UP Police selected candidates Lalitpur, toppers list', 'https://brightfutureinstitute.com/results', 'index, follow', NOW()),
('/gallery', 'Photo & Video Gallery | Bright Future Institute Lalitpur', 'Take a virtual tour of our classrooms, library, toppers celebrations, and student events at Bright Future Competition Institute Lalitpur.', 'Bright Future gallery, classroom photos, coaching institute Lalitpur images, toppers celebration photos', 'https://brightfutureinstitute.com/gallery', 'index, follow', NOW()),
('/notices', 'Latest Notices & Exam Updates | Bright Future Lalitpur', 'Stay updated with new batch announcements, test series schedules, admit card updates, and notifications from Bright Future Competition Institute.', 'Bright Future notices, exam updates Lalitpur, new batch dates, scholarship test Lalitpur', 'https://brightfutureinstitute.com/notices', 'index, follow', NOW()),
('/contact', 'Contact Us | Bright Future Competition Institute Lalitpur', 'Visit our Head Office Behind Krishna Cinema Station Road or Market Branch Near Ghantaghar Lalitpur. Call 9450067223 or 9451935450.', 'contact Bright Future Lalitpur, coaching address Station Road, phone number 9450067223, Ghantaghar branch', 'https://brightfutureinstitute.com/contact', 'index, follow', NOW()),
('/admission', 'Online Admission Enquiry | Bright Future Competition Institute', 'Submit your admission enquiry for upcoming batches at Bright Future Competition Institute Lalitpur. Book a free 2-day demo class today.', 'admission enquiry Bright Future, online registration Lalitpur coaching, demo class booking', 'https://brightfutureinstitute.com/admission', 'index, follow', NOW())
ON DUPLICATE KEY UPDATE `metaTitle`=VALUES(`metaTitle`), `updatedAt`=NOW();

-- 13. Sample Enquiries & Students
INSERT INTO `enquiries` (`studentName`, `fatherName`, `mobile`, `email`, `courseId`, `courseName`, `address`, `qualification`, `message`, `status`, `adminNotes`, `createdAt`, `updatedAt`) VALUES
('Rohan Sharma', 'Rajesh Sharma', '9876543210', 'rohan.sharma@example.com', 1, 'UP Police Constable & SI Special Target Batch', 'Civil Lines, Lalitpur', '12th Pass (Science)', 'Interested in joining the morning batch. When can I come for a demo class?', 'PENDING', 'Called on phone, invited for demo on Monday.', NOW(), NOW()),
('Priyanka Patel', 'Mahesh Patel', '9123456789', 'priyanka.patel@example.com', 2, 'SSC CGL & CHSL Comprehensive Course', 'Talbehat, Lalitpur', 'B.Sc. Completed', 'Please send fee details and syllabus for SSC CGL Tier 1 and Tier 2.', 'CONTACTED', 'Fee structure shared on WhatsApp.', NOW(), NOW());

INSERT INTO `students` (`id`, `rollNumber`, `name`, `fatherName`, `email`, `phone`, `address`, `qualification`, `status`, `createdAt`, `updatedAt`) VALUES
(1, 'BFCI-2026-001', 'Vikas Kushwaha', 'Ramdas Kushwaha', 'vikas.k@example.com', '9838000000', 'Mahaveerpura, Lalitpur', '12th (Arts)', 'ACTIVE', NOW(), NOW())
ON DUPLICATE KEY UPDATE `name`=VALUES(`name`);

INSERT INTO `admissions` (`studentId`, `courseId`, `batchTime`, `feePaid`, `totalFee`, `status`, `notes`, `createdAt`, `updatedAt`) VALUES
(1, 1, 'Morning 7:30 AM - 10:30 AM', 5000, 5999, 'ENROLLED', 'Balance fee due next month.', NOW(), NOW());

