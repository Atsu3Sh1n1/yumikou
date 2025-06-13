// pipe-estimator/src/utils/estimateUtils.ts

/**
 * 材質に応じてスケジュールを変換
 * @param schedule 現在のスケジュール
 * @param material 材質 ('steel' | 'stainless')
 * @returns 切り替え後のスケジュール
 */
export function convertSchedule(schedule: string, material: 'steel' | 'stainless'): string {
  const map: Record<string, string> = {
    sch40: 'sch40s',
    sch80: 'sch80s',
    sch160: 'sch160s',
    sch40s: 'sch40',
    sch80s: 'sch80',
    sch160s: 'sch160'
  }

  const isStainless = material === 'stainless'
  const isSteel = material === 'steel'

  if (isSteel && schedule.endsWith('s') && map[schedule]) {
    return map[schedule] // ステンレス → 鉄
  } else if (isStainless && !schedule.endsWith('s') && map[schedule]) {
    return map[schedule] // 鉄 → ステンレス
  }

  return schedule // 変換対象外はそのまま返す
}
