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

// دابا اللائحة فارغة، ما فيها حتى خط
export const busLines: BusLine[] = [];
