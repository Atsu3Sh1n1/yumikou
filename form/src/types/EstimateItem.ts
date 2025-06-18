export interface EstimateItem {
  id: string;
  material: string;
  shape: string;
  shapeType: string;
  size: string;
  schedule?: string;
  length?: number;
  unitPrice: number;
  quantity: number;
}
