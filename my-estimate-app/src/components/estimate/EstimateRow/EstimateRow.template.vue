<template>
  <tr>
    <td>
      <select v-model="item.material" @change="onMaterialChange" class="cell">
        <option disabled value="">選択</option>
        <option v-for="m in materialOptions" :key="m" :value="m">{{ m }}</option>
      </select>
    </td>

    <td>
      <select v-model="item.shape" @change="onShapeChange" class="cell" :disabled="!item.material">
        <option disabled value="">選択</option>

        <optgroup label="パイプ・鋼材">
          <option v-for="s in shapeOptionsData.pipe" :key="s.value" :value="s.value">
            {{ s.label }}
          </option>
        </optgroup>
        <optgroup label="継手">
          <option v-for="s in shapeOptionsData.fittings" :key="s.value" :value="s.value">
            {{ s.label }}
          </option>
        </optgroup>
        <optgroup label="バルブ">
          <option v-for="s in shapeOptionsData.valves" :key="s.value" :value="s.value">
            {{ s.label }}
          </option>
        </optgroup>
      </select>
    </td>

    <td>
      <select v-model="item.size" @change="onSizeChange" class="cell" :disabled="!item.shape">
        <option disabled value="">選択</option>
        <option v-for="sz in availableSizes" :key="sz" :value="sz">{{ sz }}</option>
      </select>
    </td>

    <td>
      <select v-model="item.schedule" class="cell" :disabled="!item.size || item.shape !== 'pipe'">
        <option disabled value="">選択</option>
        <option v-for="sc in availableSchedules" :key="sc" :value="sc">{{ sc }}</option>
      </select>
    </td>

    <td>
      <input v-model.number="item.length" type="number" min="0" class="cell" />
    </td>

    <td>{{ computedQuantity }}</td>
    <td>{{ computedWeight.toFixed(2) }}</td>

    <td>
      <input v-model.number="item.unitPrice" type="number" min="0" class="cell" />
    </td>

    <td>{{ totalPrice.toFixed(0) }}</td>

    <td>
      <button 
        @click="$emit('deleteClick')" 
        :disabled="!canDelete" 
        :title="canDelete ? 'この行を削除' : '3行未満は削除できません'">
        削除
      </button>
    </td>

    <td v-if="noData" colspan="9" style="color: red; text-align: center;">
      データが存在しません
    </td>
  </tr>
</template>

<script lang="ts" setup>
import { useEstimateRowLogic } from './EstimateRow.logic'

const {
  item,
  materialOptions,
  shapeOptionsData, // ← shapeOptionsData を使う
  availableSizes,
  availableSchedules,
  noData,
  computedQuantity,
  computedWeight,
  totalPrice,
  onMaterialChange,
  onShapeChange,
  onSizeChange,
} = useEstimateRowLogic()

defineProps<{
  item: any
  index: number
  canDelete: boolean
}>()

const emit = defineEmits(['deleteClick'])
</script>
