<template>
  <tr>
    <td>
      <select v-model="localItem.material" @change="onMaterialChange" class="cell">
        <option disabled value="">選択</option>
        <option v-for="m in materialOptions" :key="m" :value="m">{{ m }}</option>
      </select>
    </td>

    <td>
      <select v-model="localItem.shape" @change="onShapeChange" class="cell" :disabled="!localItem.material">
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
      <select v-model="localItem.size" @change="onSizeChange" class="cell" :disabled="!localItem.shape">
        <option disabled value="">選択</option>
        <option v-for="sz in availableSizes" :key="sz" :value="sz">{{ sz }}</option>
      </select>
    </td>

    <td>
      <select v-model="localItem.schedule" class="cell" :disabled="!localItem.size || !availableSchedules.length">
        <option disabled value="">選択</option>
        <option v-for="sc in availableSchedules" :key="sc" :value="sc">{{ sc }}</option>
      </select>
    </td>

    <td class="right-align-cell">
  <input v-model.number="localItem.length" type="number" min="0" step="0.1" class="cell" placeholder="m" />
</td>


    <td>{{ computedWeight.toFixed(2) }}</td>

    <td>{{ computedManHours.toFixed(2) }}</td>

    <td>{{ pipeSizeInch.toFixed(2) }}</td>



    <td>
      <button
        @click="$emit('deleteClick')"
        :disabled="!canDelete"
        :title="canDelete ? 'この行を削除' : '3行未満は削除できません'"
      >
        削除
      </button>
    </td>

      <td
      v-if="localItem.shape === 'pipe'"
      style="border: none; font-size: 0.75em; padding: 2px 4px;"
>
      定尺本数: {{ computedQuantity }}
      </td>
      
  </tr>
</template>

<script lang="ts" setup>
import { ref, watch, computed, toRefs } from 'vue';
import type { EstimateItem } from '@/types/EstimateItem';
import { useEstimateRowLogic } from './EstimateRow.logic';

const props = defineProps<{
  item: EstimateItem;
  canDelete: boolean;
}>();

const emit = defineEmits<{
  (e: 'deleteClick'): void;
  (e: 'update:item', value: EstimateItem): void;
}>();

const localItem = ref({ ...props.item });

const {
  materialOptions,
  shapeOptionsData,
  availableSizes,
  availableSchedules,
  computedWeight,
  computedQuantity,
  pipeSizeInch,  
  onMaterialChange,
  onShapeChange,
  onSizeChange,
} = useEstimateRowLogic(localItem);

// 工数計算（4kgで0.1人工）
const computedManHours = computed(() => {
  return (computedWeight.value / 4) * 0.1;
});

watch(localItem, (newVal) => {
  emit('update:item', { ...newVal });
}, { deep: true });
</script>

<style src="./EstimateRow.css"></style>