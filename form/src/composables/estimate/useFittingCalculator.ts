import { computed, type Ref } from 'vue';
import type { EstimateItem } from '@/types/EstimateItem';

// 継手ごとの重量係数（仮）
const fittingWeightCoefficients: Record<string, number> = {
  elbow_same: 0.15,
  elbow_diff: 0.16,
  tee_same: 0.225,
  tee_diff: 0.235,
  reducer_concentric: 1.4,
  reducer_eccentric: 1.4,
  flange_lap: 2.0,
  flange_plate: 1.8,
};

/**
 * 継手の重量を計算する
 * @param localItem EstimateItemのRef
 * @param baseWeight パイプの基本重量（Ref<number>）
 * @returns computedWeight 継手を考慮した重量（computed<number>）
 */
export function useFittingCalculator(localItem: Ref<EstimateItem>, baseWeight: Ref<number>) {
  const computedWeight = computed(() => {
    const shape = localItem.value.shape;
    if (!shape || shape === 'pipe') {
      // パイプの場合は基本重量をそのまま返す
      return baseWeight.value;
    }

    // 継手・バルブの係数を取得（無ければ1）
    const factor = fittingWeightCoefficients[shape] ?? 1;

    // サイズ（例：25A）から数値だけ抜き出してサイズ補正係数を作る
    const numericSize = parseInt(localItem.value.size?.replace('A', '') || '0', 10);
    const sizeFactor = numericSize > 0 ? numericSize / 25 : 1;

    // 継手重量 = パイプ基本重量 × 継手係数 × サイズ係数
    return baseWeight.value * factor * sizeFactor;
  });

  return {
    computedWeight,
  };
}
