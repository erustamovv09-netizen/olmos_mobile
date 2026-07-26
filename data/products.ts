import productsJson from './products.json';

export type Product = {
  id: string;
  name: string;
  price: number;
  formattedPrice: string;
  category: string;
  condition?: "yangi" | "ishlatilgan";
  description: string;
  image: string;
  specs: {
    storage: string;
    ram: string;
    color: string;
    screen: string;
  };
};

export const products: Product[] = productsJson as Product[];

export function getProductById(id: string): Product | undefined {
  return products.find(p => p.id === id);
}
