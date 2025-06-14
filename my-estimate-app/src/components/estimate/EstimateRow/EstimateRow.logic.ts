// EstimateRow.logic.ts
import { ref, computed, watch } from 'vue'
import type { EstimateItem } from '@/types/EstimateItem'
import { pipeSizes } from '@/data/pipe/sizes'
import { steelSizes } from '@/data/steel/sizes'
import { shapeOptions } from '@/data/shapes'

// 材質判定
function getMaterialFromSchedule(schedule: string | undefined): '鉄' | 'ステンレス304' | 'ステンレス316' | undefined {
  if (!schedule) return undefined
  if (schedule.endsWith('s')) return 'ステンレス304'
  if (schedule.endsWith('z')) return 'ステンレス316'
  return '鉄'
}

const unitPriceDefaults: Record<string, number> = {
  '鉄': 1000,
  'ステンレス304': 1500,
  'ステンレス316': 2000,
}

export function useEstimateRowLogic() {
  const item = ref<EstimateItem>({
    material: '',
    shape: '',
    size: '',
    schedule: '',
    length: 0,
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

  const availableSizes = computed(() => {
    if (!item.value.material || !item.value.shape) return []

    if (item.value.shape === 'pipe') {
      return Object.entries(pipeSizes)
        .filter(([size, schedules]) =>
          Object.keys(schedules).some(sch => getMaterialFromSchedule(sch) === item.value.material)
        )
        .map(([size]) => size)
    }

    const sizes = steelSizes[item.value.shape]
    return Array.isArray(sizes) ? sizes : []
  })

  const availableSchedules = computed(() => {
    if (item.value.shape !== 'pipe' || !item.value.size) return []

    const schedulesObj = pipeSizes[item.value.size]
    if (!schedulesObj) return []

    return Object.keys(schedulesObj).filter(sch => getMaterialFromSchedule(sch) === item.value.material)
  })

  const noData = computed(() => {
    if (item.value.shape === 'pipe') {
      if (!availableSizes.value.length) return true
      if (item.value.size && !availableSchedules.value.length) return true
    }
    return false
  })

  const computedQuantity = computed(() => {
    const standardLength = 4
    return item.value.length ? Math.ceil(item.value.length / standardLength) : 0
  })

  const computedWeight = computed(() => {
    if (item.value.shape !== 'pipe') return 0
    const schedulesObj = pipeSizes[item.value.size]
    if (!schedulesObj) return 0
    const weightPerMeter = schedulesObj[item.value.schedule]
    return weightPerMeter ? weightPerMeter * item.value.length : 0
  })

  const totalPrice = computed(() => {
    return item.value.length * item.value.unitPrice
  })

  function onMaterialChange() {
    item.value.shape = ''
    item.value.size = ''
    item.value.schedule = ''
    unitPriceManuallyEdited.value = false
  }

  function onShapeChange() {
    item.value.size = ''
    item.value.schedule = ''
  }

  function onSizeChange() {
    item.value.schedule = ''
  }

  return {
    item,
    materialOptions,
    shapeOptionsData,
    availableSizes,
    availableSchedules,
    noData,
    computedQuantity,
    computedWeight,
    totalPrice,
    onMaterialChange,
    onShapeChange,
    onSizeChange,
  }
}
