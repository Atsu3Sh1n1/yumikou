import { fittingWeights } from '@/data/fittings/weights.ts'
import type { EstimateItem } from '@/types/EstimateItem'

const fittingSuffixMap: Record<string, string> = {
  ELB: 'ELB', RELB: 'RELB', TEE: 'TEE', RTEE: 'RTEE',
  CAP: 'CAP', FLG10K: 'FLG10K', FLG20K: 'FLG20K',
}

export function getFittingWeightsSource() {
  return fittingWeights
}

export function getFittingAvailableSizes(material: string, shape: string, weightsSource: Record<string, any>) {
  if (!material || !shape) return []
  return Object.entries(weightsSource)
    .filter(([_, schedules]) =>
      Object.keys(schedules).some(scheduleKey => {
        const shapeSuffix = fittingSuffixMap[shape] || ''
        if (!scheduleKey.endsWith(shapeSuffix)) return false
        const baseSchedule = scheduleKey.replace(shapeSuffix, '')
        return getMaterialFromSchedule(baseSchedule) === material
      })
    )
    .map(([size]) => size)
}

export function getFittingAvailableSchedules(material: string, shape: string, size: string, weightsSource: Record<string, any>) {
  if (!material || !shape || !size) return []
  const sizeData = weightsSource[size]
  if (!sizeData) return []

  return Object.keys(sizeData)
    .filter(scheduleKey => {
      const shapeSuffix = fittingSuffixMap[shape] || ''
      if (!scheduleKey.endsWith(shapeSuffix)) return false
      const baseSchedule = scheduleKey.replace(shapeSuffix, '')
      return getMaterialFromSchedule(baseSchedule) === material
    })
    .map(scheduleKey => scheduleKey.replace(fittingSuffixMap[shape] || '', ''))
}

export function getFittingWeight(item: EstimateItem, weightsSource: Record<string, any>) {
  const { shape, size, schedule, length } = item
  if (!shape || !size || !schedule || !length) return 0

  const sizeData = weightsSource[size]
  if (!sizeData) return 0

  const shapeSuffix = fittingSuffixMap[shape] || ''
  const key = schedule + shapeSuffix
  const weightPerMeter = sizeData[key]
  if (weightPerMeter == null) return 0

  return weightPerMeter * length
}

function getMaterialFromSchedule(schedule: string | undefined): '鉄' | 'ステンレス304' | 'ステンレス316' | undefined {
  if (!schedule) return undefined
  if (schedule.endsWith('s')) return 'ステンレス304'
  if (schedule.endsWith('z')) return 'ステンレス316'
  return '鉄'
}