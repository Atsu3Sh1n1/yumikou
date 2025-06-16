import { computed, type Ref } from 'vue';
import type { EstimateItem } from '@/types/EstimateItem';
import { materialDefaultUnitPrices } from '@/composables/useMaterialStore';
import { useEstimator } from '@/composables/useEstimator';
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

export function useEstimateRowLogic(localItem: Ref<EstimateItem>) {
    const materialOptions = ['sgp','stpg', 'ss400', 'sus304', 'sus304L', 'sus316', 'sus316L', ];

    

    const allSizes = ['15A', '20A', '25A', '32A', '40A', '50A', '65A', '80A', '100A', '125A', '150A', '200A', '250A'];
    const allSchedules = ['sch5', 'sch10', 'sch40', 'sch80', 'sch5s', 'sch10s', 'sch20s', 'sch40s', 'sch80s'];

    const availableSizes = computed(() => {
        if (!localItem.value.shape) return [];
        if (localItem.value.shape === 'pipe') return allSizes;
        if (localItem.value.shape.startsWith('valve')) return ['15A', '20A', '25A', '32A'];
        return allSizes;
    });

    const availableSchedules = computed(() => {
        const material = localItem.value.material;
        const shape = localItem.value.shape;

        if (!localItem.value.size || !shape) return [];

        if (material === 'sgp') return [];

        if (material === 'stpg') {
            // STPGはスケジュールを選択可能にする
            return allSchedules;
        }

        const isStainless = ['sus304', 'sus304L', 'sus316', 'sus316L'].includes(material);
        const isPipeOrFitting =
            shape === 'pipe' ||
            shapeOptionsData.fittings.some(f => f.value === shape);

        if (isStainless && isPipeOrFitting) {
            return allSchedules.filter(sch => sch.endsWith('s'));
        }

        return allSchedules;
    });

    const material = computed(() => localItem.value.material);
    const unitPrice = computed(() => localItem.value.unitPrice);
    const size = computed(() => localItem.value.size);
    const schedule = computed(() => localItem.value.schedule);
    const length = computed(() => localItem.value.length ?? 0);

    // パイプの基本重量と基本価格を計算
    const { weight: baseWeight, totalPrice: basePrice } = useEstimator(material, unitPrice, size, schedule, length);

    // 継手計算用ロジックを呼び出し、継手込みの重量を算出
    const { computedWeight } = useFittingCalculator(localItem, baseWeight);

    const computedTotalPrice = computed(() => {
        return computedWeight.value * localItem.value.unitPrice;
    });

    function onMaterialChange() {
        const newMaterial = localItem.value.material;
        localItem.value.unitPrice = materialDefaultUnitPrices[newMaterial] ?? 1000;
    }

    function onShapeChange() {
        // no reset
    }

    function onSizeChange() {
        // no reset
    }

    const computedQuantity = computed(() => {
        const shape = localItem.value.shape;
        const material = localItem.value.material;
        if (!shape) return 0;

        const fittingsAndValves = [
            ...shapeOptionsData.fittings.map(f => f.value),
            ...shapeOptionsData.valves.map(v => v.value),
        ];

        const lengthValue = localItem.value.length ?? 0;

        if (shape === 'pipe') {
            if (['sus304', 'sus304L', 'sus316', 'sus316L'].includes(material)) {
                return Math.ceil(lengthValue / 4);
            } else if (['sgp', 'ss400'].includes(material)) {
                return Math.ceil(lengthValue / 5.5);
            } else {
                return Math.ceil(lengthValue / 6);
            }
        } else if (fittingsAndValves.includes(shape)) {
            return 1;
        }

        return 0;
    });

    return {
        materialOptions,
        shapeOptionsData,
        availableSizes,
        availableSchedules,
        computedWeight,
        totalPrice: computedTotalPrice,
        computedQuantity,
        onMaterialChange,
        onShapeChange,
        onSizeChange,
    };
}
