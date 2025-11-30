// src/data/education.ts

export interface EducationPlace {
  id: string;
  name: string;
  category: string;       // Lycée, Collège, École primaire, Formation...
  address: string;
  levels?: string;        // مثال: Tronc commun, 1ère Bac...
  opening_hours?: string;
  phone?: string;
  near_bus_lines?: string;
  google_maps_url?: string;
  notes?: string;
}

export const baseEducation: EducationPlace[] = [
  {
    id: "e1",
    name: "الثانوية التأهيلية باب الصحراء",
    category: "Lycée",
    address: "حي القدس، كلميم",
    levels: "الجذع المشترك، الأولى باك، الثانية باك",
    notes: "ثانوية تأهيلية عمومية."
  },
  {
    id: "e2",
    name: "الثانوية الإعدادية يوسف بن تاشفين",
    category: "Collège",
    address: "قرب حي تيرت، كلميم",
    levels: "السلك الإعدادي",
    notes: "مؤسسة عمومية."
  },
  {
    id: "e3",
    name: "مدرسة الحسن الثاني الابتدائية",
    category: "École primaire",
    address: "قرب شارع محمد السادس، كلميم",
    levels: "التعليم الابتدائي",
    notes: "مدرسة ابتدائية عمومية."
  },
  {
    id: "e4",
    name: "المعهد المتخصص للتكنولوجيا التطبيقية الفندقة والسياحة كلميم",
    category: "Centre de formation",
    address: "طريق الشاطئ الأبيض، كلميم",
    levels: "تكوين مهني في الفندقة والسياحة",
    notes: "مركز تابع لـ OFPPT."
  }
];
