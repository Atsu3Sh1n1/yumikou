import { ref, computed, watch } from 'vue'
import type { EstimateItem } from '@/types/EstimateItem'
import { getAvailableSizes, getAvailableSchedules, getWeight } from './materialHandlers'
import { shapeOptions } from '@/data/shapes'
import { getDefaultUnitPrice } from './unitPriceHelper'
import { getQuantityByShape } from './quantityHelper'

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

  const unitPriceManuallyEdited = ref(false)

  // 基本選択肢
  const materialOptions = ['鉄', 'ステンレス304', 'ステンレス316', 'ステンレス316L',]
  const shapeOptionsData = shapeOptions

  // 値変更監視
  watch(() => item.value.unitPrice, () => {
    unitPriceManuallyEdited.value = true
  })

  watch(() => item.value.material, (newMat) => {
    if (!unitPriceManuallyEdited.value) {
      item.value.unitPrice = getDefaultUnitPrice(newMat)
    }
  })

  const availableSizes = computed(() =>
    getAvailableSizes(item.value.shape, item.value.material)
  )

  const availableSchedules = computed(() =>
    getAvailableSchedules(item.value.shape, item.value.material, item.value.size)
  )

  const computedQuantity = computed(() =>
    getQuantityByShape(item.value)
  )

  const computedWeight = computed(() =>
    getWeight(item.value)
  )

  const totalPrice = computed(() =>
    item.value.unitPrice * item.value.length
  )

  // 共通バリデーション（サイズ・スケジュール）
  function validateSizeAndSchedule() {
    const { size, schedule } = item.value
    if (!availableSizes.value.includes(size)) {
      item.value.size = ''
      item.value.schedule = ''
    } else if (!availableSchedules.value.includes(schedule)) {
      item.value.schedule = ''
    }
  }

  // イベントハンドラ
  function onMaterialChange() {
    unitPriceManuallyEdited.value = false
    validateSizeAndSchedule()
  }

  function onShapeChange() {
    validateSizeAndSchedule()
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
