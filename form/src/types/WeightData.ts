// src/types/WeightData.ts
export type PipeWeightData = Record<
  string, // サイズ ('15A' など)
  Record<string, number> // スケジュール ('sch40' など) → 重量
>;
