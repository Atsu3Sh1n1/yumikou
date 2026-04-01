<template>
  <div class="grid">
    <div
      v-for="item in items"
      :key="item.name"
      class="item"
      :class="{ playing: currentItem?.name === item.name }"
      @click="$emit('play', item)"
    >
      <img :src="item.img" :alt="item.name" />
      <div class="label">{{ item.name }}</div>
      <div class="playing-badge">再生中</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Item } from '../types/Item'

defineProps<{ items: Item[]; currentItem: Item | null }>()
</script>
