import { NextRequest, NextResponse } from 'next/server';
import { readFile, stat } from 'fs/promises';
import path from 'path';

const MIME_MAP: Record<string, string> = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.avif': 'image/avif',
  '.jfif': 'image/jpeg',
  '.pdf': 'application/pdf',
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    const { path: subPath } = await params;
    if (!subPath || subPath.length === 0) {
      return new NextResponse('File not found', { status: 404 });
    }

    const safePath = path.join(process.cwd(), 'public', 'uploads', ...subPath);
    // Security check: ensure path stays inside public/uploads
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    if (!safePath.startsWith(uploadsDir)) {
      return new NextResponse('Forbidden', { status: 403 });
    }

    const fileStat = await stat(safePath);
    if (!fileStat.isFile()) {
      return new NextResponse('Not a file', { status: 404 });
    }

    const ext = path.extname(safePath).toLowerCase();
    const contentType = MIME_MAP[ext] || 'application/octet-stream';
    const buffer = await readFile(safePath);

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Content-Length': fileStat.size.toString(),
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch {
    return new NextResponse('File not found', { status: 404 });
  }
}
