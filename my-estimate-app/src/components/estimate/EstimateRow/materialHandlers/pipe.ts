import { pipeWeights } from '@/data/pipe/weights.ts'
import type { EstimateItem } from '@/types/EstimateItem'

export function getPipeWeightsSource() {
  return pipeWeights
}

export function getPipeAvailableSizes(material: string, weightsSource: Record<string, any>) {
  if (!material) return []
  return Object.entries(weightsSource)
    .filter(([_, schedules]) =>
      Object.keys(schedules).some(scheduleKey => 
        getMaterialFromSchedule(scheduleKey) === material
      )
    )
    .map(([size]) => size)
}

export function getPipeAvailableSchedules(material: string, size: string, weightsSource: Record<string, any>) {
  if (!material || !size) return []
  const sizeData = weightsSource[size]
  if (!sizeData) return []

  return Object.keys(sizeData)
    .filter(scheduleKey => getMaterialFromSchedule(scheduleKey) === material)
    .map(scheduleKey => scheduleKey)
}

export function getPipeWeight(item: EstimateItem, weightsSource: Record<string, any>) {
  const { size, schedule, length } = item
  if (!size || !schedule || !length) return 0

  const sizeData = weightsSource[size]
  if (!sizeData) return 0

  const weightPerMeter = sizeData[schedule]
  if (weightPerMeter == null) return 0

  return weightPerMeter * length
}

function getMaterialFromSchedule(schedule: string | undefined): '鉄' | 'ステンレス304' | 'ステンレス316' | undefined {
  if (!schedule) return undefined
  if (schedule.endsWith('s')) return 'ステンレス304'
  if (schedule.endsWith('z')) return 'ステンレス316'
  return '鉄'
}