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

export const baseServices: ServiceItem[] = [];
