// src/data/services.ts

export interface ServiceItem {
  id: string;
  name: string;
  category: string;
  address: string;
  opening_hours?: string;
  google_maps_url?: string;
  near_bus_lines?: string;
  notes?: string;
}

export const baseServices: ServiceItem[] = [
  {
    id: "s1",
    name: "جماعة كلميم",
    category: "إدارة جماعية",
    address: "شارع محمد السادس، قرب ساحة بئر أنزران، كلميم",
    opening_hours: "08:30 - 16:30 (الإثنين - الجمعة)",
    notes: "خدمات الحالة المدنية، الرخص، الشواهد..."
  },
  {
    id: "s2",
    name: "الولاية — ولاية جهة كلميم واد نون",
    category: "سلطة محلية",
    address: "شارع الحسن الثاني، كلميم",
    opening_hours: "08:30 - 16:30",
    notes: "الإدارة الترابية، الشكايات، مكاتب الاستقبال."
  },
  {
    id: "s3",
    name: "المستشفى الجهوي بكلميم",
    category: "صحة",
    address: "طريق طانطان، كلميم",
    opening_hours: "24/24",
    notes: "الاستقبال، المستعجلات، مواعيد طبية."
  }
];
