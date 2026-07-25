import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'Fayl topilmadi' }, { status: 400 });
    }

    // Faqat rasm turlarini qabul qilamiz
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: 'Faqat rasm fayllari qabul qilinadi (JPG, PNG, WEBP, GIF)' }, { status: 400 });
    }

    // Max 10MB
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: 'Fayl hajmi 10MB dan oshmasligi kerak' }, { status: 400 });
    }

    // uploads papkasini yaratamiz (agar yo\'q bo\'lsa)
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    await fs.mkdir(uploadsDir, { recursive: true });

    // Noyob nom yaratamiz
    const ext = file.name.split('.').pop() || 'jpg';
    const fileName = `img-${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
    const filePath = path.join(uploadsDir, fileName);

    // Faylni saqlaymiz
    const arrayBuffer = await file.arrayBuffer();
    await fs.writeFile(filePath, Buffer.from(arrayBuffer));

    const url = `/uploads/${fileName}`;
    return NextResponse.json({ url }, { status: 200 });
  } catch (error) {
    console.error('Upload xatosi:', error);
    return NextResponse.json({ error: 'Faylni yuklashda xato yuz berdi' }, { status: 500 });
  }
}
