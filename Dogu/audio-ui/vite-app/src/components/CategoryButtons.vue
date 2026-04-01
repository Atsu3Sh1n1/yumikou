<template>
  <div class="categories">
    <button
      v-for="cat in categories"
      :key="cat"
      :class="{ active: current === cat }"
      @click="$emit('select', cat)"
    >
      {{ cat }}
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{ categories: string[]; current: string }>()
</script>
