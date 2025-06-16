const unitPriceDefaults: Record<string, number> = {
  '鉄': 1000,
  'ステンレス304': 1500,
  'ステンレス316': 2000,
}

export function getDefaultUnitPrice(material: string): number {
  return unitPriceDefaults[material] ?? 0
}
