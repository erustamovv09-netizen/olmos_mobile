import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'products.json');

export async function GET() {
  try {
    const fileContent = await fs.readFile(dataFilePath, 'utf8');
    const products = JSON.parse(fileContent);
    return NextResponse.json(products);
  } catch (error) {
    console.error("Error reading products:", error);
    return NextResponse.json({ error: "Failed to read products" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const newProduct = await request.json();
    const fileContent = await fs.readFile(dataFilePath, 'utf8');
    const products = JSON.parse(fileContent);
    
    // Add new product to the beginning
    products.unshift(newProduct);
    
    await fs.writeFile(dataFilePath, JSON.stringify(products, null, 2), 'utf8');
    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error("Error adding product:", error);
    return NextResponse.json({ error: "Failed to add product" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const updatedProduct = await request.json();
    const fileContent = await fs.readFile(dataFilePath, 'utf8');
    let products = JSON.parse(fileContent);
    
    products = products.map((p: any) => p.id === updatedProduct.id ? updatedProduct : p);
    
    await fs.writeFile(dataFilePath, JSON.stringify(products, null, 2), 'utf8');
    return NextResponse.json(updatedProduct, { status: 200 });
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
}
