// src/composables/useMaterialStore.ts
import { reactive } from 'vue';

export type MaterialKind = 'sgp' | 'ss400' | 'sus304' | 'sus304L' | 'sus316' | 'sus316L';


export const materialDefaultUnitPrices: Record<MaterialKind, number> = {
  sgp: 1000,
  ss400: 1000,
  sus304: 1500,
  sus304L: 1750,
  sus316: 2000,
  sus316L: 2500,
};

export const useMaterialStore = () => {
  const state = reactive({
    selectedMaterial: 'sgp' as MaterialKind,
    baseUnitPrice: 0, // 現在未使用。別で使うならこちらも連動可能
  });

  return { state, materialDefaultUnitPrices };
};
