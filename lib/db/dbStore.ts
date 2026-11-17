import fs from 'fs';
import path from 'path';
import { initialFallbackData } from './fallbackData';

const STORE_PATH = path.join(process.cwd(), 'data', 'db_store.json');

function ensureDataDir() {
  const dir = path.dirname(STORE_PATH);
  if (!fs.existsSync(dir)) {
    try {
      fs.mkdirSync(dir, { recursive: true });
    } catch {
      // ignore
    }
  }
}

let memoryStore: any = null;
let lastMtime: number = 0;

export function getPersistentStore(): typeof initialFallbackData & { galleryCategories: any[] } {
  ensureDataDir();
  try {
    if (fs.existsSync(STORE_PATH)) {
      const stat = fs.statSync(STORE_PATH);
      if (!memoryStore || stat.mtimeMs > lastMtime) {
        const raw = fs.readFileSync(STORE_PATH, 'utf-8');
        memoryStore = JSON.parse(raw);
        lastMtime = stat.mtimeMs;
      }
      return memoryStore;
    }
  } catch (err) {
    console.warn('Failed to read db_store.json, using fallbackData:', err);
  }

  // Initialize from initialFallbackData
  memoryStore = JSON.parse(JSON.stringify(initialFallbackData));
  try {
    fs.writeFileSync(STORE_PATH, JSON.stringify(memoryStore, null, 2), 'utf-8');
    lastMtime = fs.statSync(STORE_PATH).mtimeMs;
  } catch (err) {
    console.warn('Failed to initialize db_store.json:', err);
  }
  return memoryStore;
}

export function savePersistentStore(data: any) {
  ensureDataDir();
  memoryStore = data;
  try {
    fs.writeFileSync(STORE_PATH, JSON.stringify(data, null, 2), 'utf-8');
    lastMtime = Date.now();
  } catch (err) {
    console.warn('Failed to write db_store.json:', err);
  }
}
