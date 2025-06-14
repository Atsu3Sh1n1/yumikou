<template>
  <div class="estimate-sheet">
    <table>
      <thead>
        <tr>
          <th>材質</th>
          <th>形状</th>
          <th>サイズ</th>
          <th>スケジュール</th>
          <th>長さ(m)</th>
          <th>定尺本数</th>
          <th>重量(kg)</th>
          <th>単価</th>
          <th>金額</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <EstimateRow
          v-for="(item, index) in estimateItems"
          :key="index"
          :item="item"
          :index="index"
          :canDelete="estimateItems.length > 3"
          @deleteRow="deleteRow"
        />
      </tbody>
    </table>

    <button @click="addRow">＋ 行を追加</button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import EstimateRow from './EstimateRow/EstimateRow.vue'
import type { EstimateItem } from '@/types/EstimateItem'

const estimateItems = ref<EstimateItem[]>([
  { material: '', shape: '', size: '', schedule: '', length: 0, unitPrice: 0 },
  { material: '', shape: '', size: '', schedule: '', length: 0, unitPrice: 0 },
  { material: '', shape: '', size: '', schedule: '', length: 0, unitPrice: 0 },
])

function addRow() {
  estimateItems.value.push({ material: '', shape: '', size: '', schedule: '', length: 0, unitPrice: 0 })
}

function deleteRow(index: number) {
  if (estimateItems.value.length > 3) {
    estimateItems.value.splice(index, 1)
  }
}
</script>

<style scoped>
.estimate-sheet {
  padding: 16px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid #aaa;
  padding: 4px;
  text-align: center;
}

button {
  margin-top: 12px;
  padding: 6px 12px;
  cursor: pointer;
}
</style>
