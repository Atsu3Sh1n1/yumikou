import { computed, type Ref } from 'vue';
import type { EstimateItem } from '@/types/EstimateItem';
import { usePipeCalculator } from '@/composables/estimate/usePipeCalculator';
import { useFittingCalculator } from '@/composables/estimate/useFittingCalculator';

export const shapeOptionsData = {
    pipe: [
        { value: 'pipe', label: 'パイプ' },
        { value: 'flatbar', label: 'フラットバー' },
        { value: 'angle', label: 'アングル' },
        { value: 'hsteel', label: 'H鋼' },
        { value: 'cchannel', label: 'C型鋼' },
        { value: 'squarepipe', label: '角パイプ' },
    ],
    fittings: [
        { value: 'elbow_same', label: '同径エルボ' },
        { value: 'elbow_diff', label: '異径エルボ' },
        { value: 'tee_same', label: '同径ティーズ' },
        { value: 'tee_diff', label: '異径チーズ' },
        { value: 'reducer_concentric', label: '同心レジューサ' },
        { value: 'reducer_eccentric', label: '偏心レジューサ' },
        { value: 'flange_lap', label: 'ラップフランジ' },
        { value: 'flange_plate', label: '板フランジ' },
    ],
    valves: [
        { value: 'valve_globe', label: 'グローブバルブ' },
        { value: 'valve_ball', label: 'ボールバルブ' },
        { value: 'valve_butterfly', label: 'バタフライバルブ' },
        { value: 'valve_gate', label: 'ゲートバルブ' },
    ],
};

// 呼び径 → インチ換算マップ
const inchMap: Record<number, number> = {
    15: 0.5, 20: 0.75, 25: 1, 32: 1.25, 40: 1.5,
    50: 2, 65: 2.5, 80: 3, 90: 3.5, 100: 4,
    125: 5, 150: 6, 200: 8, 250: 10, 300: 12,
    350: 14, 400: 16, 450: 18, 500: 20,
};

export function useEstimateRowLogic(localItem: Ref<EstimateItem>) {
    const materialOptions = [
        'sgp', 'stpg', 'ss400',
        'sus304', 'sus304L', 'sus316', 'sus316L',
    ];

    const allSizes = [
        '15A', '20A', '25A', '32A', '40A', '50A',
        '65A', '80A', '90A', '100A', '125A', '150A',
        '200A', '250A', '300A', '350A', '400A', '500A',
    ];

    const allSchedules = [
        'sch5', 'sch10', 'sch40', 'sch80', 'sch120', 'sch160',
        'sch5s', 'sch10s', 'sch20s', 'sch40s', 'sch80s', 'sch120s', 'sch160s',
    ];

    const availableSizes = computed(() => {
        const shape = localItem.value.shape;
        if (!shape) return [];
        if (shape === 'pipe') return allSizes;
        if (shape.startsWith('valve')) return ['15A', '20A', '25A', '32A'];
        return allSizes;
    });

    function onMaterialChange() {
        // 材質変更時は schedule をリセット
        localItem.value.schedule = '';
    }

    const availableSchedules = computed(() => {
        const material = localItem.value.material;
        const shape = localItem.value.shape;
        if (!localItem.value.size || !shape) return [];

        if (material === 'sgp') return [];

        const isStainless = ['sus304', 'sus304L', 'sus316', 'sus316L'].includes(material);
        const isPipeOrFitting =
            shape === 'pipe' ||
            shapeOptionsData.fittings.some(f => f.value === shape);

        if (isPipeOrFitting) {
            return allSchedules.filter(sch =>
                isStainless ? sch.endsWith('s') : !sch.endsWith('s')
            );
        }

        return allSchedules;
    });

    // パイプ計算
    const {
        computedWeight: pipeWeight,
        computedTotalPrice: pipePrice,
        computedQuantity: pipeQuantity,
    } = usePipeCalculator(localItem);

    // 継手計算
    const {
        computedWeight: fittingWeight,
        pipeSizeInch: fittingPipeSizeInch,
    } = useFittingCalculator(localItem);

    // 長さを考慮したインチメーター表示（呼び径をinchMapで正確変換）
    const pipeSizeInch = computed(() => {
        const shape = localItem.value.shape;
        const length = localItem.value.length ?? 0;
        if (length <= 0) return 0;

        const sizeStr = localItem.value.size ?? '';
        const numericSize = parseInt(sizeStr.replace('A', ''), 10);
        const inch = inchMap[numericSize] ?? 0;

        if (!inch || isNaN(inch)) {
            console.warn(`未対応の呼び径: ${numericSize}A（inchMapに未登録）`);
            return 0;
        }

        if (shape === 'pipe') {
            return inch * length;
        } else if (shapeOptionsData.fittings.some(f => f.value === shape)) {
            // 継手の場合、useFittingCalculatorのpipeSizeInchをそのまま使用
            const fittingInch = fittingPipeSizeInch.value;
            if (!fittingInch || isNaN(fittingInch)) {
                console.warn(`継手の pipeSizeInch が不正です: ${shape}`);
                return 0;
            }
            return fittingInch; // すでにlengthが考慮されている
        } else {
            // バルブなど他の形状の場合
            return 0;
        }
    });

    // 共通の重量（形状によって使い分け）
    const computedWeight = computed(() => {
        return localItem.value.shape === 'pipe' ? pipeWeight.value : fittingWeight.value;
    });

    // 重量に単価をかけた総価格
    const computedTotalPrice = computed(() => {
        const unitPrice = localItem.value.unitPrice ?? 0;
        const weight = computedWeight.value;
        return weight * unitPrice;
    });

    function onShapeChange() {
        // 必要に応じて shape の変更に対応
    }

    function onSizeChange() {
        // 必要に応じて size の変更に対応
    }

    return {
        materialOptions,
        shapeOptionsData,
        availableSizes,
        availableSchedules,
        computedWeight,
        totalPrice: computedTotalPrice,
        computedQuantity: pipeQuantity,
        pipeSizeInch,
        onMaterialChange,
        onShapeChange,
        onSizeChange,
    };
}