// src/data/commerce.ts

export interface CommerceItem {
  id: string;
  name: string;
  category: string;
  address: string;
  phone?: string;
  schedule?: string;
  description?: string;
  google_maps_url?: string;
}

export const commerces: CommerceItem[] = [
  {
    id: "c1",
    name: "سوق أمحيريش",
    category: "سوق",
    address: "حي أمحيريش، كلميم",
    phone: "0528776000",
    schedule: "08:00 - 19:00",
    description: "سوق شعبي يوفر الخضر، الفواكه، الملابس والمنتجات المحلية."
  },
  {
    id: "c2",
    name: "محل السلام للمواد الغذائية",
    category: "مواد غذائية",
    address: "شارع الواد، كلميم",
    phone: "0528776100",
    schedule: "08:00 - 22:00",
    description: "منتجات غذائية، مواد تنظيف، وحاجيات يومية."
  },
  {
    id: "c3",
    name: "مخبزة الرحمة",
    category: "مخبزة",
    address: "حي القدس، كلميم",
    phone: "0528776200",
    schedule: "07:00 - 21:00",
    description: "خبز، حلويات، معجنات بجودة عالية."
  }
];
