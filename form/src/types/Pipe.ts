export type PipeMaterial = 'sgp' | 'ss400' | 'sus304' | 'sus304L' | 'sus316' | 'sus316L';
export type PipeDiameter = '15A' | '20A';
export type PipeSchedule = 'sch10' | 'sch40';

export interface PipeItem {
  id: string;
  material: PipeMaterial;
  shape: 'pipe'; // 固定値
  size: PipeDiameter;
  schedule: PipeSchedule;
  length: number;
  unitPrice: number;
  quantity: number;
}

export const pipeMaterials: PipeMaterial[] = ['sgp', 'ss400', 'sus304', 'sus304L', 'sus316', 'sus316L'];
export const pipeDiameters: PipeDiameter[] = ['15A', '20A'];
export const pipeSchedules: PipeSchedule[] = ['sch10', 'sch40'];