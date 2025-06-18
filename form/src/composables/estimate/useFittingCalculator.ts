import { computed, type Ref } from 'vue';
import type { EstimateItem } from '@/types/EstimateItem';
import { useEstimator } from '@/composables/useEstimator';

// 継手ごとの係数（重さおよび長さ計算用）
const fittingCoefficients: Record<string, number> = {
  elbow_same: 0.15,
  elbow_diff: 0.16,
  tee_same: 0.225,
  tee_diff: 0.235,
  reducer_concentric: 1.4,
  reducer_eccentric: 1.4,
  flange_lap: 2.0,
  flange_plate: 1.8,
};

// 呼び径（mm）→インチ換算
const inchMap: Record<number, number> = {
  15: 0.5, 20: 0.75, 25: 1, 32: 1.25, 40: 1.5,
  50: 2, 65: 2.5, 80: 3, 90: 3.5, 100: 4,
  125: 5, 150: 6, 200: 8, 250: 10, 300: 12,
  350: 14, 400: 16, 450: 18, 500: 20,
};

export function useFittingCalculator(localItem: Ref<EstimateItem>) {
  // リアクティブなプロパティ
  const size = computed(() => localItem.value.size);
  const length = computed(() => localItem.value.length ?? 0);
  const shape = computed(() => localItem.value.shape ?? '');
  const material = computed(() => localItem.value.material);
  const schedule = computed(() => localItem.value.schedule);

  // 継手係数（継手でない場合は1）
  const coefficient = computed(() => fittingCoefficients[shape.value] ?? 1);

  // 継手として認識される形状
  const fittingShapes = new Set(Object.keys(fittingCoefficients));

  // 呼び径（例: '25A'）→ 数値 → インチ換算（例: 1.0）
  const pipeInch = computed(() => {
    const sizeStr = size.value?.replace('A', '') ?? '';
    const numericSize = parseInt(sizeStr, 10);
    return inchMap[numericSize] ?? 0;
  });

  // 材質 + サイズ + スケジュールに基づく1mあたりの重量（kg/m）
  const { weight: perMeterWeight } = useEstimator(material, size, schedule);

  // 総合的な配管長さ（インチ・m）計算
  // 継手: サイズ÷インチ×継手係数×入力長さ
  // パイプ: サイズ÷インチ×入力長さ
  const pipeSizeInch = computed(() => {
    if (!length.value || !size.value) return 0;

    // 継手の場合
    if (fittingShapes.has(shape.value)) {
      return (pipeInch.value * coefficient.value * length.value);
    }
    // パイプの場合
    else if (shape.value === 'pipe') {
      return pipeInch.value * length.value;
    }
    return 0;
  });

  // 重さ（kg）計算
  // 継手: サイズ÷インチ×継手係数×入力長さ×1mあたりの重量
  // パイプ: サイズ÷インチ×入力長さ×1mあたりの重量
  const computedWeight = computed(() => {
    if (!length.value || !size.value) return 0;

    const unitWeight = perMeterWeight.value ?? 0;
    // 継手の場合
    if (fittingShapes.has(shape.value)) {
      return (pipeInch.value * coefficient.value * length.value * unitWeight);
    }
    // パイプの場合
    else if (shape.value === 'pipe') {
      return pipeInch.value * length.value * unitWeight;
    }
    return 0;
  });

  return {
    computedWeight,   // 継手・パイプの換算重量（kg）
    pipeSizeInch,     // 総合的な配管長さ（インチ・m相当）
  };
}