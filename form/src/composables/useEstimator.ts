// src/composables/useEstimator.ts
import { computed, Ref } from 'vue';
import { MaterialKind } from './useMaterialStore';
import { sgpWeights } from '../data/pipe/sgp';
import { ss400Weights } from '../data/pipe/ss400';
import { sus304Weights } from '../data/pipe/sus304';
import { sus304LWeights } from '../data/pipe/sus304L';
import { sus316Weights } from '../data/pipe/sus316';
import { sus316LWeights } from '../data/pipe/sus316L';
import stpgWeights from '../data/pipe/stpg'; // ← default importに修正

const weightsMap: Record<MaterialKind, any> = {
  sgp: sgpWeights,
  stpg: stpgWeights,
  ss400: ss400Weights,
  sus304: sus304Weights,
  sus304L: sus304LWeights,
  sus316: sus316Weights,
  sus316L: sus316LWeights,
};

export function useEstimator(
  material: Ref<MaterialKind>,
  basePrice: Ref<number>,
  diameter: Ref<string>,
  schedule: Ref<string>,
  length: Ref<number>
) {
  const unitWeight = computed(() => {
    const mat = material.value;
    const dia = diameter.value ?? ''; 
    const sch = schedule.value;
    const weights = weightsMap[mat];

    if (!weights || !dia) return 0;

    if (mat === 'sgp') {
      return weights[dia]?.sgp ?? 0;
    }

    return weights[dia]?.[sch] ?? 0;
  });

  const weight = computed(() => unitWeight.value * length.value);

  const totalPrice = computed(() => basePrice.value * weight.value);

  return {
    unitWeight,
    weight,
    totalPrice,
  };
}
