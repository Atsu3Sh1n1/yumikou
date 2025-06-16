import type { EstimateItem } from '@/types/EstimateItem'

export function getQuantityByShape(item: EstimateItem): number {
  const { shape, length, material } = item
  if (!length) return 0

  const unitLengthMap: Record<string, number> = {
    pipe: material === '鉄' ? 5.5 : 4,
    ELB: 1, RELB: 1, TEE: 1, RTEE: 1,
    CAP: 1, FLG10K: 1, FLG20K: 1,
    angle: 1, hbeam: 1,
  }

  const unitLength = unitLengthMap[shape] ?? 1
  return Math.ceil(length / unitLength)
}
