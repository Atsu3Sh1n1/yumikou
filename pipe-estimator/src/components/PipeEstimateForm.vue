<template>
  <div class="container">
    <h1 style="margin-top: 0px;">
      施工費概算算出機<br />
      <span style="font-size: 0.6em;">(フジタくん2号)*調整中</span>
    </h1>

    <div class="footer">
      <a href="https://atsu3sh1n1.github.io/yumikou/" target="_blank">Created by YUMIKOU Inc.</a>
    </div>

    <div class="form-section">
      <div class="size-length-inputs">
        <div class="form-group">
          <label for="size">サイズ(A)</label>
          <select v-model="selectedSize" id="size">
            <option v-for="size in sizeList" :key="size" :value="size">{{ size }}</option>
          </select>
        </div>
        <div class="form-group">
          <label for="pipeLength">メーター数</label>
          <input type="number" v-model.number="length" min="0" step="0.01" />
        </div>
      </div>
    </div>

    <div class="form-section">
      <div class="price-inputs">
        <div class="form-group">
          <label for="steelPrice">鉄単価:</label>
          <input type="number" v-model.number="steelUnitPrice" min="0" /> (円/kg)
        </div>

        <div class="form-group">
          <label for="stainlessPrice">ステンレス単価:</label>
          <input type="number" v-model.number="stainlessUnitPrice" min="0" /> (円/kg)
        </div>
      </div>
    </div>

    <div class="button-groups">

      <div class="material-toggle">
        <button :class="{ active: selectedMaterial === 'steel' }" @click="selectedMaterial = 'steel'">
          鉄
        </button>
        <button :class="{ active: selectedMaterial === 'stainless' }" @click="selectedMaterial = 'stainless'">
          ステンレス
        </button>
      </div>

      <div class="schedule-buttons">
        <button v-for="schedule in schedules" :key="schedule" :class="{ active: selectedSchedule === schedule }"
          @click="selectedSchedule = schedule">
          {{ schedule }}
        </button>
      </div>


    </div>

    <div class="results">
      <div v-if="dataExists">
        <div>配管重量: {{ pipeWeight.toFixed(2) }} kg</div>
        <div>参考価格帯: {{ pipeCost.toLocaleString() }} 円</div>
        <div>単価/m: {{ perMeterUnitPrice.toLocaleString() }} 円/m</div>
      </div>
      <div v-else>
        <strong style="color: red;">該当するデータがありません</strong>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import weightTable from '../data/pipes/pipeData.json'
import { convertSchedule } from '../utils/button.ts'

// データが存在するか判定
const dataExists = computed(() => {
  const scheduleKey = selectedSchedule.value
  const sizeKey = selectedSize.value
  return !!weightTable[sizeKey]?.[scheduleKey]
})


// 初期データ
const sizeList = [
  '15A', '20A', '25A', '32A', '40A', '50A', '65A', '80A', '90A', '100A',
  '125A', '150A', '175A', '200A', '250A', '300A', '350A', '400A', '450A', '500A'
]

// 鉄・ステンレスごとのスケジュール
const steelSchedules = ['sgp', 'sch20', 'sch40', 'sch80', 'sch160']
const stainlessSchedules = ['sch5s', 'sch10s', 'sch20s', 'sch40s', 'sch80s', 'sch160s']

// 選択状態
const selectedSize = ref('100A')
const selectedSchedule = ref('sch40')
const selectedMaterial = ref<'steel' | 'stainless'>('steel')
const length = ref(0)

const steelUnitPrice = ref(1000)
const stainlessUnitPrice = ref(1500)

// 材質に応じた単価
const unitPricePerKg = computed(() =>
  selectedMaterial.value === 'steel' ? steelUnitPrice.value : stainlessUnitPrice.value
)

// 材質に応じたスケジュール一覧
const schedules = computed(() =>
  selectedMaterial.value === 'steel' ? steelSchedules : stainlessSchedules
)

// 重量計算
const pipeWeight = computed(() => {
  const scheduleKey = selectedSchedule.value
  const sizeKey = selectedSize.value
  const weightPerMeter = weightTable[sizeKey]?.[scheduleKey] || 0
  return weightPerMeter * length.value
})

// 総額計算
const pipeCost = computed(() => pipeWeight.value * unitPricePerKg.value)

// m単価計算
const perMeterUnitPrice = computed(() =>
  length.value > 0 ? pipeCost.value / length.value : 0
)

watch(selectedMaterial, (newMaterial) => {
  selectedSchedule.value = convertSchedule(selectedSchedule.value, newMaterial)
})
</script>

<style scoped>
@import './PipeEstimateFormStyle.css';
</style>
