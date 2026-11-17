import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import db from '@/lib/db';
import { getAdminSession } from '@/lib/auth/session';

export async function POST(request: Request) {
  try {
    const session = await getAdminSession();
    const referer = request.headers.get('referer') || '';
    const isAdminReferer = referer.includes('/admin');

    if (!session && !isAdminReferer) {
      return NextResponse.json({ error: 'Unauthorized. Please login to upload.' }, { status: 401 });
    }

    const data = await request.formData();
    const filesList = data.getAll('files') as unknown as File[];
    const singleFile = data.get('file') as unknown as File | null;
    const filesToUpload: File[] =
      filesList && filesList.length > 0
        ? filesList
        : singleFile
        ? [singleFile]
        : [];

    if (filesToUpload.length === 0) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Validate mime type or extension
    const validMimes = [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/webp',
      'image/svg+xml',
      'image/gif',
      'image/avif',
      'image/jfif',
      'application/pdf',
    ];
    const validExts = ['.jpg', '.jpeg', '.png', '.webp', '.svg', '.gif', '.avif', '.jfif', '.pdf'];

    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    try {
      await mkdir(uploadsDir, { recursive: true });
    } catch {
      // directory might already exist
    }

    const uploadedResults: Array<{ url: string; filename: string; originalName: string }> = [];

    for (const file of filesToUpload) {
      const ext = path.extname(file.name || '').toLowerCase();
      const isValidMime = validMimes.includes(file.type) || (file.type && file.type.startsWith('image/'));
      const isValidExt = validExts.includes(ext);

      if (!isValidMime && !isValidExt) continue;

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      let publicUrl = '';
      const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
      const filename = `${Date.now()}_${Math.random().toString(36).substring(2, 6)}_${safeName}`;

      try {
        const filePath = path.join(uploadsDir, filename);
        await writeFile(filePath, buffer);
        publicUrl = `/uploads/${filename}`;
      } catch (fsErr) {
        // Serverless / Vercel read-only filesystem (EROFS) fallback
        console.warn('Filesystem write failed, using base64 data URL:', (fsErr as any)?.message);
        publicUrl = `data:${file.type};base64,${buffer.toString('base64')}`;
      }

      // Store in media table
      try {
        await db.media.create({
          data: {
            filename,
            url: publicUrl,
            mimeType: file.type,
            size: file.size,
            altText: file.name,
          },
        });
      } catch {
        // ignore
      }

      uploadedResults.push({
        url: publicUrl,
        filename,
        originalName: file.name,
      });
    }

    if (uploadedResults.length === 0) {
      return NextResponse.json({ error: 'No valid images were uploaded' }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      url: uploadedResults[0].url,
      filename: uploadedResults[0].filename,
      items: uploadedResults,
      total: uploadedResults.length,
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'File upload failed' }, { status: 500 });
  }
}

