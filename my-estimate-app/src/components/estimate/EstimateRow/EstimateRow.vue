<script lang="ts" setup>
import EstimateRowTemplate from './EstimateRow.template.vue'
import { defineProps, defineEmits } from 'vue'

const props = defineProps<{
  item: any
  index: number
  canDelete: boolean
}>()

const emit = defineEmits<{
  (e: 'deleteRow', index: number): void
}>()

function onDeleteClick() {
  if (props.canDelete) {
    emit('deleteRow', props.index)
  }
}
</script>

<template>
  <EstimateRowTemplate 
    :item="props.item" 
    :index="props.index" 
    :canDelete="props.canDelete"
    @deleteClick="onDeleteClick"
  />
</template>
