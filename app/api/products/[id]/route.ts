import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'products.json');

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    const { id } = resolvedParams;
    const fileContent = await fs.readFile(dataFilePath, 'utf8');
    let products = JSON.parse(fileContent);
    
    products = products.filter((p: any) => p.id !== id);
    
    await fs.writeFile(dataFilePath, JSON.stringify(products, null, 2), 'utf8');
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
}
