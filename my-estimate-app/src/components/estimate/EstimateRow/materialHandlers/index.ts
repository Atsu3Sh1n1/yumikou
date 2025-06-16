import { getPipeWeightsSource, getPipeAvailableSizes, getPipeAvailableSchedules, getPipeWeight } from './pipe'
import { getFittingWeightsSource, getFittingAvailableSizes, getFittingAvailableSchedules, getFittingWeight } from './fitting'
import { getSteelWeightsSource, getSteelAvailableSizes, getSteelWeight } from './steel'
import type { EstimateItem } from '@/types/EstimateItem'

const weightsMap: Record<string, Record<string, Record<string, number>>> = {
  pipe: getPipeWeightsSource(),
  ELB: getFittingWeightsSource(),
  RELB: getFittingWeightsSource(),
  TEE: getFittingWeightsSource(),
  RTEE: getFittingWeightsSource(),
  CAP: getFittingWeightsSource(),
  FLG10K: getFittingWeightsSource(),
  FLG20K: getFittingWeightsSource(),
  angle: getSteelWeightsSource(),
  hbeam: getSteelWeightsSource(),
}

export function getAvailableSizes(shape: string, material: string) {
  const weightsSource = weightsMap[shape] || {}
  
  if (shape === 'pipe') {
    return getPipeAvailableSizes(material, weightsSource)
  } else if (['ELB', 'RELB', 'TEE', 'RTEE', 'CAP', 'FLG10K', 'FLG20K'].includes(shape)) {
    return getFittingAvailableSizes(material, shape, weightsSource)
  } else if (['angle', 'hbeam'].includes(shape)) {
    return getSteelAvailableSizes()
  }
  return []
}

export function getAvailableSchedules(shape: string, material: string, size: string) {
  const weightsSource = weightsMap[shape] || {}
  
  if (shape === 'pipe') {
    return getPipeAvailableSchedules(material, size, weightsSource)
  } else if (['ELB', 'RELB', 'TEE', 'RTEE', 'CAP', 'FLG10K', 'FLG20K'].includes(shape)) {
    return getFittingAvailableSchedules(material, shape, size, weightsSource)
  }
  return []
}

export function getWeight(item: EstimateItem) {
  const { shape, size, schedule, length } = item
  if (!shape || !size || !length) return 0

  const weightsSource = weightsMap[shape] || {}
  
  if (shape === 'pipe') {
    return getPipeWeight(item, weightsSource)
  } else if (['ELB', 'RELB', 'TEE', 'RTEE', 'CAP', 'FLG10K', 'FLG20K'].includes(shape)) {
    return getFittingWeight(item, weightsSource)
  } else if (['angle', 'hbeam'].includes(shape)) {
    return getSteelWeight(item, weightsSource)
  }
  return 0
}