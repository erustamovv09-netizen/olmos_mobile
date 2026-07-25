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

export const products: Product[] = [
  {
    id: "iphone-15-pro-max",
    name: "iPhone 15 Pro Max",
    price: 1199,
    formattedPrice: "$ 1,199",
    category: "Apple",
    condition: "yangi",
    description: "Titanium korpus, A17 Pro chip va mukammal kamera tizimi bilan jihozlangan eng so'nggi va kuchli iPhone.",
    image: "https://images.unsplash.com/photo-1696446701796-da61225697cc?w=500&q=80",
    specs: {
      storage: "256 GB",
      ram: "8 GB",
      color: "Natural Titanium",
      screen: "6.7\" Super Retina XDR OLED",
    }
  },
  {
    id: "samsung-s24-ultra",
    name: "Samsung Galaxy S24 Ultra",
    price: 1299,
    formattedPrice: "$ 1,299",
    category: "Samsung",
    condition: "yangi",
    description: "Galaxy AI yordamida yangi darajaga ko'tarilgan, kuchli Snapdragon 8 Gen 3 va ajoyib S-Pen bilan.",
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500&q=80",
    specs: {
      storage: "256 GB",
      ram: "12 GB",
      color: "Titanium Black",
      screen: "6.8\" Dynamic AMOLED 2X",
    }
  },
  {
    id: "iphone-14-pro",
    name: "iPhone 14 Pro",
    price: 899,
    formattedPrice: "$ 899",
    category: "Apple",
    condition: "yangi",
    description: "Dynamic Island va 48MP asosiy kamera bilan professional darajadagi suratlar yaratuvchi ishonchli iPhone.",
    image: "https://images.unsplash.com/photo-1678652197831-2d180705cd2c?w=500&q=80",
    specs: {
      storage: "128 GB",
      ram: "6 GB",
      color: "Deep Purple",
      screen: "6.1\" Super Retina XDR OLED",
    }
  },
  {
    id: "xiaomi-14-pro",
    name: "Xiaomi 14 Pro",
    price: 750,
    formattedPrice: "$ 750",
    category: "Xiaomi",
    condition: "yangi",
    description: "Leica kameralari, Snapdragon 8 Gen 3 va juda tez zaryadlanish xususiyatiga ega hamyonbop flagman.",
    image: "https://images.unsplash.com/photo-1598327105666-5b89351cb31b?w=500&q=80",
    specs: {
      storage: "256 GB",
      ram: "12 GB",
      color: "Black",
      screen: "6.73\" LTPO AMOLED",
    }
  },
  {
    id: "samsung-a55",
    name: "Samsung Galaxy A55",
    price: 350,
    formattedPrice: "$ 350",
    category: "Samsung",
    condition: "yangi",
    description: "Hamyonbop narxda premium dizayn, IP67 suvga chidamlilik va uzoq vaqt xizmat qiladigan batareya.",
    image: "https://images.unsplash.com/photo-1600087626014-e652e18bbff2?w=500&q=80",
    specs: {
      storage: "128 GB",
      ram: "8 GB",
      color: "Awesome Lilac",
      screen: "6.6\" Super AMOLED",
    }
  },
  {
    id: "redmi-note-13-pro-plus",
    name: "Redmi Note 13 Pro+",
    price: 320,
    formattedPrice: "$ 320",
    category: "Xiaomi",
    condition: "yangi",
    description: "200MP aql bovar qilmas kamera va 120W gacha tez zaryadlanishni taklif qiluvchi ideal o'rta toifa smartfon.",
    image: "https://images.unsplash.com/photo-1601784551446-20c9e07cd5d9?w=500&q=80",
    specs: {
      storage: "256 GB",
      ram: "8 GB",
      color: "Midnight Black",
      screen: "6.67\" AMOLED",
    }
  },

  // ===== ISHLATILGAN TELEFONLAR =====
  {
    id: "used-iphone-13-pro",
    name: "iPhone 13 Pro",
    price: 520,
    formattedPrice: "$ 520",
    category: "Ishlatilgan",
    condition: "ishlatilgan",
    description: "Rabochiy holat. Sinovdan o'tgan, batareya salomatligi 87%. Ekrani va korpusi yaxshi holatda, to'liq funktsional.",
    image: "https://images.unsplash.com/photo-1632661674596-df8be070a5c5?w=500&q=80",
    specs: {
      storage: "256 GB",
      ram: "6 GB",
      color: "Sierra Blue",
      screen: "6.1\" Super Retina XDR OLED",
    }
  },
  {
    id: "used-samsung-s23",
    name: "Samsung Galaxy S23",
    price: 420,
    formattedPrice: "$ 420",
    category: "Ishlatilgan",
    condition: "ishlatilgan",
    description: "Rabochiy holat. Snapdragon 8 Gen 2, ajoyib kamera. Minimal izlar bor, to'liq ishlaydigan holat.",
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500&q=80",
    specs: {
      storage: "128 GB",
      ram: "8 GB",
      color: "Phantom Black",
      screen: "6.1\" Dynamic AMOLED 2X",
    }
  },
  {
    id: "used-iphone-12",
    name: "iPhone 12",
    price: 320,
    formattedPrice: "$ 320",
    category: "Ishlatilgan",
    condition: "ishlatilgan",
    description: "Rabochiy holat. 5G qo'llab-quvvatlaydi, batareya salomatligi 85%. Ekrani toza, korpusda kichik iz bor.",
    image: "https://images.unsplash.com/photo-1603921326210-6edd2d60ca68?w=500&q=80",
    specs: {
      storage: "128 GB",
      ram: "4 GB",
      color: "Blue",
      screen: "6.1\" Super Retina XDR OLED",
    }
  },
  {
    id: "used-xiaomi-12-pro",
    name: "Xiaomi 12 Pro",
    price: 280,
    formattedPrice: "$ 280",
    category: "Ishlatilgan",
    condition: "ishlatilgan",
    description: "Rabochiy holat. 50MP Leica kamera, 120W tez zaryadlash. Yaxshi holat, ekranda hech qanday chiziq yo'q.",
    image: "https://images.unsplash.com/photo-1598327105666-5b89351cb31b?w=500&q=80",
    specs: {
      storage: "256 GB",
      ram: "12 GB",
      color: "Blue",
      screen: "6.73\" LTPO AMOLED",
    }
  },
  {
    id: "used-samsung-a52",
    name: "Samsung Galaxy A52",
    price: 160,
    formattedPrice: "$ 160",
    category: "Ishlatilgan",
    condition: "ishlatilgan",
    description: "Rabochiy holat. IP67 suvga chidamli, 64MP kamera. Batareya salomatligi 90%, ekrani va korpusi yaxshi.",
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500&q=80",
    specs: {
      storage: "128 GB",
      ram: "6 GB",
      color: "Awesome Blue",
      screen: "6.5\" Super AMOLED",
    }
  },
  {
    id: "used-iphone-11",
    name: "iPhone 11",
    price: 220,
    formattedPrice: "$ 220",
    category: "Ishlatilgan",
    condition: "ishlatilgan",
    description: "Rabochiy holat. Kamera tizimi yaxshi ishlaydi, batareya salomatligi 82%. Hamyonbop narxda ishonchli iPhone.",
    image: "https://images.unsplash.com/photo-1574755393849-623942496936?w=500&q=80",
    specs: {
      storage: "64 GB",
      ram: "4 GB",
      color: "Purple",
      screen: "6.1\" Liquid Retina IPS",
    }
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find(p => p.id === id);
}
