export interface EstimateItem {
    material: string
    shape: string
    size: string
    schedule: string
    length: number
    unitPrice: number
    quantity: number
    sizeTo?: string // ← 異径用
}
