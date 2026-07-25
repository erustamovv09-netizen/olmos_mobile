import fs from 'fs/promises';
import path from 'path';
import { Product } from './products';

export async function getProducts(): Promise<Product[]> {
  const dataFilePath = path.join(process.cwd(), 'data', 'products.json');
  try {
    const fileContent = await fs.readFile(dataFilePath, 'utf8');
    return JSON.parse(fileContent);
  } catch (e) {
    console.error("Failed to read products.json", e);
    return [];
  }
}

export async function getProductById(id: string): Promise<Product | undefined> {
  const products = await getProducts();
  return products.find(p => p.id === id);
}
