// src/data/valves/valvesData.ts

export type ValveType =
  | 'グローブバルブ'
  | 'ボールバルブ'
  | 'ゲートバルブ'
  | 'バタフライバルブ'

export interface ValveData {
  type: ValveType
  size: string
  weight: number // 単位: kg/個
}

export const valves: ValveData[] = [
  { type: 'グローブバルブ', size: '25A', weight: 3.0 },
  { type: 'ボールバルブ', size: '25A', weight: 2.5 },
  { type: 'ゲートバルブ', size: '25A', weight: 3.2 },
  { type: 'バタフライバルブ', size: '25A', weight: 4.0 },
  // 他サイズ追加可能
]
