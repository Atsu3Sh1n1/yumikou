import { computed, type Ref } from 'vue';
import { useEstimator } from '@/composables/useEstimator';
import type { EstimateItem } from '@/types/EstimateItem';
import type { MaterialKind } from '@/types/MaterialKind';

export function usePipeCalculator(localItem: Ref<EstimateItem>) {
  // materialをMaterialKindとして型アサーション
  const material = computed(() => localItem.value.material as MaterialKind);
  
  const unitPrice = computed(() => localItem.value.unitPrice);
  const size = computed(() => localItem.value.size);
  const schedule = computed(() => localItem.value.schedule ?? '');
  const length = computed(() => localItem.value.length ?? 0);

  const { weight: baseWeight, totalPrice: basePrice } = useEstimator(
    material,
    unitPrice,
    size,
    schedule,
    length
  );

  const computedWeight = computed(() => baseWeight.value);

  const computedTotalPrice = computed(() => computedWeight.value * unitPrice.value);

  const computedQuantity = computed(() => {
    const shape = localItem.value.shape;
    const mat = material.value;
    const len = length.value;

    if (shape !== 'pipe') return 0;

    if (['sus304', 'sus304L', 'sus316', 'sus316L'].includes(mat)) {
      return Math.ceil(len / 4);
    } else if (['sgp', 'stpg', 'ss400'].includes(mat)) {
      return Math.ceil(len / 5.5);
    } else {
      return Math.ceil(len / 6);
    }
  });

  return {
    computedWeight,
    computedTotalPrice,
    computedQuantity,
  };
}
