// src/data/shapes.ts
export const shapeOptions = {
  pipe: [
    { value: 'pipe', label: 'パイプ' },
    { value: 'lShape', label: 'L形鋼' },
    { value: 'hShape', label: 'H形鋼' },
  ],
  fittings: [
    { value: 'elbow', label: '同径エルボ' },
    { value: 'reducerElbow', label: '異形エルボ' },
    { value: 'tee', label: '同径チーズ' },
    { value: 'reducerTee', label: '異形チーズ' },
    { value: 'lapFlange', label: 'ラップフランジ' },
    { value: 'plateFlange', label: '板フランジ' },
  ],
  valves: [
    { value: 'globeValve', label: 'グローブバルブ' },
    { value: 'ballValve', label: 'ボールバルブ' },
    { value: 'gateValve', label: 'ゲートバルブ' },
    { value: 'butterflyValve', label: 'バタフライバルブ' },
  ]
}
