// src/data/busLines.ts

export interface BusLine {
  id: string;
  name: string;
  code: string;
  description: string;
  neighborhoods: string;
  main_stops: string;
  schedule_morning: string;
  schedule_afternoon: string;
  schedule_evening: string;
  notes: string;
}

export const busLines: BusLine[] = [
  {
    id: "l1",
    name: "الخط 1",
    code: "L1",
    description: "خط رئيسي يربط بين مركز المدينة وبعض الأحياء السكنية.",
    neighborhoods: "حي الرحمة – شارع محمد السادس – حي الفتح",
    main_stops: "المستشفى الجهوي – السوق الجديد – المحطة الطرقية",
    schedule_morning: "من 06:00 إلى 12:00",
    schedule_afternoon: "من 12:00 إلى 18:00",
    schedule_evening: "من 18:00 إلى 23:00",
    notes: "مفيد للتنقل اليومي نحو الخدمات الأساسية."
  },
  {
    id: "l2",
    name: "الخط 2",
    code: "L2",
    description: "يربط بين الأحياء السكنية والمنطقة الإدارية.",
    neighborhoods: "حي تيغمرت – شارع الحسن الثاني – مركز المدينة",
    main_stops: "حي تيغمرت – مقر الجماعة – ساحة المدينة",
    schedule_morning: "من 06:30 إلى 12:30",
    schedule_afternoon: "من 12:30 إلى 18:30",
    schedule_evening: "من 18:30 إلى 22:30",
    notes: "مناسب للموظفين والطلبة."
  },
  {
    id: "l3",
    name: "الخط 3",
    code: "L3",
    description: "خط يخدم المنطقة الصناعية وبعض المؤسسات التعليمية.",
    neighborhoods: "حي الأمل – الحي الصناعي – الطريق نحو الوادي",
    main_stops: "حي الأمل – الثانوية التأهيلية – الحي الصناعي",
    schedule_morning: "من 07:00 إلى 12:00",
    schedule_afternoon: "من 13:00 إلى 18:00",
    schedule_evening: "من 19:00 إلى 22:00",
    notes: "مفيد للتلاميذ والعمال."
  }
];
