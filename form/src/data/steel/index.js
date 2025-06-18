// src/data/steel/index.ts
export const steelSamples = {
    flatbar: {
        label: 'フラットバー',
        weights: { '10mm': 7.85, '20mm': 15.7 }, // 仮の重量データ(kg/m)
    },
    angle: {
        label: 'アングル',
        weights: { '25x25x3': 4.5, '40x40x4': 8.7 },
    },
    hsteel: {
        label: 'H鋼',
        weights: { '100x100x6': 14.2, '150x150x8': 24.0 },
    },
    csteel: {
        label: 'C型鋼',
        weights: { '75x40x4': 6.3 },
    },
    squarePipe: {
        label: '角パイプ',
        weights: { '20x20x2': 3.2, '40x40x3': 5.8 },
    },
};
