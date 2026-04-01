<template>
  <div class="subcategories">
    <button
      v-for="sub in subcategories"
      :key="sub"
      :class="{ active: current === sub }"
      @click="$emit('select', sub)"
    >
      {{ sub }}
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{ subcategories: string[]; current: string }>()
</script>
