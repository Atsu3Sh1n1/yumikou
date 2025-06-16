export interface EstimateItem {
  id: string;
  material: string;
  shape: string;       // パイプ／継手／バルブ／鋼材
  shapeType: string;   // 同径エルボ／グローブバルブなど
  size: string;
  schedule?: string;
  length?: number;
  unitPrice: number;
  quantity: number;
}
