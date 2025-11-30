// src/data/numbers.ts

export interface ImportantNumber {
  id: string;
  title: string;
  category: string;
  phone: string;
  description?: string;
}

export const importantNumbers: ImportantNumber[] = [
  {
    id: "n1",
    title: "الوقاية المدنية",
    category: "الإسعاف",
    phone: "150",
    description: "للمساعدة في حالات الحوادث والحرائق."
  },
  {
    id: "n2",
    title: "الشرطة ( النجدة )",
    category: "الأمن",
    phone: "19",
    description: "للتبليغ عن الجرائم أو أي حالة طارئة."
  },
  {
    id: "n3",
    title: "مستشفى كلميم الجهوي",
    category: "الصحة",
    phone: "0528771111",
    description: "للمواعيد والاستفسارات الطبية."
  },
  {
    id: "n4",
    title: "عمالة إقليم كلميم",
    category: "إدارات",
    phone: "0528772000"
  }
];
