import { computed, type Ref } from 'vue';
import { MaterialKind } from '@/types/MaterialKind';
import { sgpWeights } from '../data/pipe/sgp';
import { ss400Weights } from '../data/pipe/ss400';
import { sus304Weights } from '../data/pipe/sus304';
import { sus304LWeights } from '../data/pipe/sus304L';
import { sus316Weights } from '../data/pipe/sus316';
import { sus316LWeights } from '../data/pipe/sus316L';
import { stpgWeights } from '../data/pipe/stpg';

const weightsMap: Record<MaterialKind, any> = {
  sgp: sgpWeights,
  ss400: ss400Weights,
  stpg: stpgWeights,
  sus304: sus304Weights,
  sus304L: sus304LWeights,
  sus316: sus316Weights,
  sus316L: sus316LWeights,
};

interface EstimatorOptions {
  defaultWeight?: number;
}

export function useEstimator(
  material: Ref<MaterialKind | string>,
  diameter: Ref<string>,
  schedule: Ref<string>,
  options: EstimatorOptions = {}
) {
  const defaultWeight = options.defaultWeight ?? 0;

  const unitWeight = computed(() => {
    try {
      const mat = material.value as MaterialKind;
      const dia = diameter.value?.replace('A', '') ?? '';
      const sch = schedule.value ?? '';

      if (!mat || !dia || !weightsMap[mat]) return defaultWeight;

      const weights = weightsMap[mat];
      
      // SGPはスケジュール不要
      if (mat === 'sgp') {
        return weights[dia]?.sgp ?? defaultWeight;
      }

      // その他の材質はスケジュールが必要
      if (!sch) return defaultWeight;
      return weights[dia]?.[sch] ?? defaultWeight;
    } catch (e) {
      console.error('重量計算エラー:', e);
      return defaultWeight;
    }
  });

  return {
    weight: unitWeight, // kg/m
  };
}