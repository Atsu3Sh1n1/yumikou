<template>
  <div class="app">
    <header class="hero">
      <div>
        <p class="eyebrow">工具学習</p>
        <h1>道具音声教材</h1>
        <p class="hero-copy">画像をクリックして読み上げ音声を再生。カテゴリとサブカテゴリで絞り込めます。</p>
      </div>
      <div class="status">
        <strong>{{ filteredItems.length }}</strong> 件の道具
      </div>
    </header>

    <CategoryButtons :categories="categories" :current="currentCategory" @select="selectCategory" />

    <SubcategoryButtons
      v-if="subcategories.length > 1"
      :subcategories="subcategories"
      :current="currentSubcategory"
      @select="selectSubcategory"
    />

    <ItemGrid :items="filteredItems" :currentItem="currentItem" @play="play" />

    <Overlay
      v-if="showOverlay && currentItem"
      :title="currentItem.name"
      :text="overlayText"
      @close="stop"
    />

    <audio ref="audioRef" @ended="onEnded" preload="none"></audio>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Item } from './types/Item'
import { items } from './data/items'
import CategoryButtons from './components/CategoryButtons.vue'
import SubcategoryButtons from './components/SubcategoryButtons.vue'
import ItemGrid from './components/ItemGrid.vue'
import Overlay from './components/Overlay.vue'

const audioRef = ref<HTMLAudioElement | null>(null)
const currentItem = ref<Item | null>(null)
const currentCategory = ref('すべて')
const currentSubcategory = ref('すべて')
const showOverlay = ref(false)

const categories = computed(() => {
  const unique = [...new Set(items.map(item => item.category))]
  return ['すべて', ...unique]
})

const filteredByCategory = computed(() => {
  if (currentCategory.value === 'すべて') {
    return items
  }
  return items.filter(item => item.category === currentCategory.value)
})

const subcategories = computed(() => {
  const unique = [...new Set(filteredByCategory.value.map(item => item.subcategory))]
  return ['すべて', ...unique]
})

const filteredItems = computed(() => {
  if (currentSubcategory.value === 'すべて') {
    return filteredByCategory.value
  }
  return filteredByCategory.value.filter(item => item.subcategory === currentSubcategory.value)
})

const overlayText = computed(() => currentItem.value?.desc || currentItem.value?.name || '')

function selectCategory(category: string) {
  currentCategory.value = category
  currentSubcategory.value = 'すべて'
}

function selectSubcategory(subcategory: string) {
  currentSubcategory.value = subcategory
}

function play(item: Item) {
  stop()
  if (!audioRef.value) return

  audioRef.value.src = item.sound
  audioRef.value.play().catch(() => {
    console.warn('音声再生に失敗しました。', item.sound)
  })

  currentItem.value = item
  showOverlay.value = true
}

function stop() {
  if (audioRef.value) {
    audioRef.value.pause()
    audioRef.value.currentTime = 0
  }

  currentItem.value = null
  showOverlay.value = false
}

function onEnded() {
  currentItem.value = null
  showOverlay.value = false
}
</script>

<style>
:root {
  color-scheme: dark;
  font-family: 'Noto Sans JP', sans-serif;
}

body {
  margin: 0;
}

.app {
  min-height: 100vh;
  padding: 18px;
  background: radial-gradient(circle at top, rgba(33, 150, 243, 0.16), transparent 24%),
    linear-gradient(180deg, #0d1928 0%, #0f2337 100%);
  color: #f7f7f7;
}

.hero {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
  gap: 18px;
  margin-bottom: 20px;
}

.eyebrow {
  margin: 0 0 6px;
  color: #81d4fa;
  font-size: 0.95rem;
  letter-spacing: 0.1em;
}

h1 {
  margin: 0;
  font-size: clamp(2rem, 3vw, 3rem);
  line-height: 1.05;
}

.hero-copy {
  margin: 12px 0 0;
  max-width: 720px;
  color: #d3dce3;
}

.status {
  align-self: center;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 16px;
  padding: 16px 20px;
  min-width: 150px;
  text-align: center;
}

.status strong {
  display: block;
  font-size: 1.55rem;
  margin-bottom: 4px;
}

.categories,
.subcategories {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 18px;
}

button {
  border: none;
  border-radius: 999px;
  padding: 10px 16px;
  background: rgba(255, 255, 255, 0.08);
  color: #f7f7f7;
  cursor: pointer;
  transition: transform 0.2s ease, background-color 0.2s ease;
}

button:hover {
  transform: translateY(-1px);
}

button.active {
  background: linear-gradient(135deg, #2196f3, #3f51b5);
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 16px;
}

.item {
  position: relative;
  border-radius: 18px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.05);
  box-shadow: 0 18px 46px rgba(0, 0, 0, 0.18);
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.item:hover {
  transform: translateY(-3px);
}

.item img {
  display: block;
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  filter: brightness(0.9);
}

.item.playing img {
  filter: brightness(1);
}

.label {
  padding: 12px;
  font-weight: 700;
  font-size: 0.95rem;
}

.playing-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  background: #4caf50;
  color: #fff;
  border-radius: 999px;
  padding: 4px 10px;
  font-size: 0.78rem;
  display: none;
}

.item.playing .playing-badge {
  display: block;
}

@media (max-width: 640px) {
  .hero {
    flex-direction: column;
  }

  .status {
    width: 100%;
  }
}
</style>
