// 型インターフェース定義：全ての形状で共通に使う計算ロジック用
import type { EstimateItem } from './EstimateItem';

export interface EstimateStrategy {
  getDiameters(): string[];
  getSchedules(): string[];
  calcWeight(item: EstimateItem): number;
  calcQuantity(item: EstimateItem): number;
}
