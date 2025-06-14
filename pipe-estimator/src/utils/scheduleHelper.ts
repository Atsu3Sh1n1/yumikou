export function getMaterialFromSchedule(schedule: string): '鉄' | 'ステンレス304' | 'ステンレス316' | undefined {
  if (schedule.endsWith('s')) return 'ステンレス304'
  if (schedule.endsWith('z')) return 'ステンレス316'
  return '鉄'
}
