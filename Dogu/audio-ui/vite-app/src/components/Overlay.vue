<template>
  <div class="overlay" @click.self="$emit('close')">
    <div class="panel">
      <h2>{{ title }}</h2>
      <p>{{ text }}</p>
      <button class="close-button" @click="$emit('close')">閉じる</button>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ title: string; text: string }>()
</script>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.72);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  z-index: 100;
}

.panel {
  width: min(640px, 100%);
  background: rgba(28, 28, 28, 0.95);
  border-radius: 18px;
  padding: 24px;
  color: #f1f1f1;
  box-shadow: 0 20px 55px rgba(0, 0, 0, 0.35);
}

h2 {
  margin: 0 0 12px;
  font-size: 1.4rem;
}

p {
  margin: 0 0 18px;
  white-space: pre-line;
  line-height: 1.75;
}

.close-button {
  border: none;
  border-radius: 999px;
  padding: 10px 18px;
  background: #4caf50;
  color: #fff;
  cursor: pointer;
  font-weight: 600;
}
</style>
