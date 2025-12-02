export interface TerritorialService {
  id: string;
  name: string;
  name_fr: string;
  category: string;       // دائما: خدمات إدارية
  subcategory: string;    // السلطات الترابية
  address: string;
  phone?: string;
}

export const territorialServices: TerritorialService[] = [];
