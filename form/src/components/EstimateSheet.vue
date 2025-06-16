<template>
  <div class="estimate-sheet">

     <div class="footer">
      <a href="https://atsu3sh1n1.github.io/yumikou/" target="_blank">Created by YUMIKOU Inc.</a>
    </div>

    <table>
      <thead>
        <tr>
          <th>材質</th>
          <th>形状</th>
          <th>サイズ</th>
          <th>スケジュール</th>
          <th>長さ・個数・枚数</th>
          <th>見積重量(kg)</th>
          <th>工数(人工)</th>
          
        </tr>
      </thead>
      <tbody>
        <EstimateRow
          v-for="(item, index) in estimateItems"
          :key="item.id"  
          :item="item"
          :canDelete="estimateItems.length > 3"
          @deleteClick="deleteRow(index)"  
        />
      </tbody>
    </table>

   <div class="button-wrapper">
  <button @click="addRow">＋ 行を追加</button>
</div>

  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import EstimateRow from "@/components/EstimateRow.vue";
import type { EstimateItem } from '@/types/EstimateItem'

// 初期データ生成関数
const createEmptyItem = (): EstimateItem => ({
  id: crypto.randomUUID(),  // ユニークIDを生成
  material: '',
  shape: '',
  size: '',
  schedule: '',
  length: 0,
  unitPrice: 0,
  quantity: 0
})

const estimateItems = ref<EstimateItem[]>([
  createEmptyItem(),
  createEmptyItem(),
  createEmptyItem(),
  createEmptyItem(),
  createEmptyItem(),
  createEmptyItem(),
  createEmptyItem()
])

function addRow() {
  estimateItems.value.push(createEmptyItem())
}

function deleteRow(index: number) {
  if (estimateItems.value.length > 3) {
    estimateItems.value.splice(index, 1)
  }
}
</script>

