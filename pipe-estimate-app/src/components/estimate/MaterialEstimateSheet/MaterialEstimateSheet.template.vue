<template>
  <div id="estimate-sheet" class="sheet">
    <h1>{{ diagramName }} 材料見積</h1>
    <table>
      <thead>
        <tr>
          <th>材質</th>
          <th>形状</th>
          <th>サイズ</th>
          <th>スケジュール</th>
          <th>長さ</th>
          <th>本数</th>
          <th>単価</th>
          <th>金額</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in items" :key="index">
          <td>{{ item.material }}</td>
          <td>{{ item.shape }}</td>
          <td>
            <select v-model="item.size">
              <option v-for="s in sizes" :key="s" :value="s">{{ s }}</option>
            </select>
          </td>
          <td>
            <select v-model="item.schedule">
              <option v-for="s in schedules" :key="s" :value="s">
                {{ s }}
              </option>
            </select>
          </td>
          <td>
            <input
              type="number"
              v-model.number="item.length"
              @input="update(index)"
            />
          </td>
          <td>{{ item.quantity }}</td>
          <td>¥{{ item.unitPrice.toLocaleString() }}/m</td>
          <td>¥{{ item.totalPrice.toLocaleString() }}</td>
        </tr>
      </tbody>
    </table>
    <button @click="addItem">行を追加</button>
    <div class="total">小計：{{ totalAmount.toLocaleString() }}</div>
  </div>
</template>

<script setup lang="ts">
import { useMaterialEstimateSheet } from "./MaterialEstimateSheet.logic";
const { items, sizes, schedules, diagramName, addItem, update, totalAmount } =
  useMaterialEstimateSheet();
</script>

<style src="./MaterialEstimateSheet.style.css" scoped></style>
