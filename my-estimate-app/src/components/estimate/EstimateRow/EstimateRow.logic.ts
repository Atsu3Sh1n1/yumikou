import { ref, computed, watch } from 'vue'
import type { EstimateItem } from '@/types/EstimateItem'
import { pipeWeights } from '@/data/pipe/weights.ts'
import { fittingWeights } from '@/data/fittings/weights.ts'
import { steelWeights } from '@/data/steel/sizes.ts'
import { shapeOptions } from '@/data/shapes'

// スケジュールの末尾で材質判定
function getMaterialFromSchedule(schedule: string | undefined): '鉄' | 'ステンレス304' | 'ステンレス316' | undefined {
  if (!schedule) return undefined
  if (schedule.endsWith('s')) return 'ステンレス304'
  if (schedule.endsWith('z')) return 'ステンレス316'
  return '鉄'
}

// 材質ごとの単価デフォルト
const unitPriceDefaults: Record<string, number> = {
  '鉄': 1000,
  'ステンレス304': 1500,
  'ステンレス316': 2000,
}

// shape ごとの重量データマップ
const weightsMap: Record<string, Record<string, Record<string, number>>> = {
  pipe: pipeWeights,
  ELB: fittingWeights,
  RELB: fittingWeights,
  TEE: fittingWeights,
  RTEE: fittingWeights,
  CAP: fittingWeights,
  FLG10K: fittingWeights,
  FLG20K: fittingWeights,
  angle: steelWeights, // L形鋼
  hbeam: steelWeights, // H型鋼
}

export function useEstimateRowLogic() {
  const item = ref<EstimateItem>({
    material: '',
    shape: '',
    size: '',
    schedule: '',
    length: 0,
    quantity: 0,
    unitPrice: 0,
  })

  const materialOptions = ['鉄', 'ステンレス304', 'ステンレス316']
  const shapeOptionsData = shapeOptions
  const unitPriceManuallyEdited = ref(false)

  watch(() => item.value.unitPrice, () => {
    unitPriceManuallyEdited.value = true
  })

  watch(() => item.value.material, (newMat) => {
    if (!unitPriceManuallyEdited.value && newMat in unitPriceDefaults) {
      item.value.unitPrice = unitPriceDefaults[newMat]
    }
  })

  const weightsSource = computed(() => {
    return weightsMap[item.value.shape] || {}
  })

  const isPipe = computed(() => item.value.shape === 'pipe')

  const availableSizes = computed(() => {
    const { material } = item.value
    if (!material) return []
    return Object.entries(weightsSource.value)
      .filter(([sizeKey, schedules]) =>
        Object.keys(schedules).some(scheduleKey => {
          let baseSchedule = scheduleKey
          if (!isPipe.value) {
            baseSchedule = scheduleKey.replace(/(ELB|RELB|TEE|RTEE|CAP|FLG10K|FLG20K)$/, '')
          }
          return getMaterialFromSchedule(baseSchedule) === material
        })
      )
      .map(([size]) => size)
  })

  const availableSchedules = computed(() => {
    const { shape, size, material } = item.value
    if (!shape || !size || !material) return []

    const sizeData = weightsSource.value[size]
    if (!sizeData) return []

    return Object.keys(sizeData)
      .filter(scheduleKey => {
        if (!isPipe.value) {
          const suffixMap: Record<string, string> = {
            ELB: 'ELB', RELB: 'RELB', TEE: 'TEE', RTEE: 'RTEE',
            CAP: 'CAP', FLG10K: 'FLG10K', FLG20K: 'FLG20K',
          }
          const shapeSuffix = suffixMap[shape] || ''
          if (!scheduleKey.endsWith(shapeSuffix)) return false
          const baseSchedule = scheduleKey.replace(shapeSuffix, '')
          return getMaterialFromSchedule(baseSchedule) === material
        } else {
          return getMaterialFromSchedule(scheduleKey) === material
        }
      })
      .map(scheduleKey => {
        if (!isPipe.value) {
          const suffixMap: Record<string, string> = {
            ELB: 'ELB', RELB: 'RELB', TEE: 'TEE', RTEE: 'RTEE',
            CAP: 'CAP', FLG10K: 'FLG10K', FLG20K: 'FLG20K',
          }
          const shapeSuffix = suffixMap[shape] || ''
          return scheduleKey.replace(shapeSuffix, '')
        }
        return scheduleKey
      })
  })

  // すべての shape を長さベースの quantity に変換
  const computedQuantity = computed(() => {
    const { shape, length, material } = item.value
    if (!length) return 0

    const unitLengthMap: Record<string, number> = {
      pipe: material === '鉄' ? 5.5 : 4,
      ELB: 1,
      RELB: 1,
      TEE: 1,
      RTEE: 1,
      CAP: 1,
      FLG10K: 1,
      FLG20K: 1,
      angle: 1,
      hbeam: 1,
    }

    const unitLength = unitLengthMap[shape] ?? 1
    return Math.ceil(length / unitLength)
  })

  const computedWeight = computed(() => {
    const { shape, size, schedule, length } = item.value
    if (!shape || !size || !schedule || !length) return 0

    const sizeData = weightsSource.value[size]
    if (!sizeData) return 0

    const suffixMap: Record<string, string> = {
      ELB: 'ELB', RELB: 'RELB', TEE: 'TEE', RTEE: 'RTEE',
      CAP: 'CAP', FLG10K: 'FLG10K', FLG20K: 'FLG20K',
    }

    const key = isPipe.value ? schedule : schedule + (suffixMap[shape] || '')
    const weightPerMeter = sizeData[key]
    if (weightPerMeter == null) return 0

    return weightPerMeter * length
  })

  const totalPrice = computed(() => {
    const { unitPrice, length } = item.value
    if (!unitPrice || !length) return 0
    return length * unitPrice
  })

  function onMaterialChange() {
    unitPriceManuallyEdited.value = false
    const { size, schedule } = item.value
    if (!availableSizes.value.includes(size)) {
      item.value.size = ''
      item.value.schedule = ''
      return
    }
    if (!availableSchedules.value.includes(schedule)) {
      item.value.schedule = ''
    }
  }

  function onShapeChange() {
    const { size, schedule } = item.value
    if (!availableSizes.value.includes(size)) {
      item.value.size = ''
      item.value.schedule = ''
      return
    }
    if (!availableSchedules.value.includes(schedule)) {
      item.value.schedule = ''
    }
  }

  function onSizeChange() {
    if (!availableSchedules.value.includes(item.value.schedule)) {
      item.value.schedule = ''
    }
  }

  return {
    item,
    materialOptions,
    shapeOptionsData,
    availableSizes,
    availableSchedules,
    computedQuantity,
    computedWeight,
    totalPrice,
    onMaterialChange,
    onShapeChange,
    onSizeChange,
      }
}