import { steelWeights } from '@/data/steel/sizes.ts'
import type { EstimateItem } from '@/types/EstimateItem'

export function getSteelWeightsSource() {
  return steelWeights
}

export function getSteelAvailableSizes() {
  return Object.keys(steelWeights)
}

export function getSteelWeight(item: EstimateItem, weightsSource: Record<string, any>) {
  const { size, length } = item
  if (!size || !length) return 0

  const weightPerMeter = weightsSource[size]
  if (weightPerMeter == null) return 0

  return weightPerMeter * length
}