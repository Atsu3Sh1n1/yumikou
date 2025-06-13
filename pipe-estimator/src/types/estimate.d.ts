import fittingWeights from './fittingWeights.json'

const scheduleKey = computed(() => {
  // ステンレスなら末尾に "s" をつける（既についている場合はそのまま）
  const raw = selectedSchedule.value
  if (selectedMaterial.value === 'stainless') {
    return raw.endsWith('s') ? raw : raw + 's'
  } else {
    return raw.replace(/s$/, '') // 鉄の場合は末尾の "s" を外す
  }
})

const fittingWeight = computed(() => {
  const sizeKey = selectedSize.value + 'A'
  const schedule = scheduleKey.value

  const data = fittingWeights[sizeKey]
  if (!data) return 0

  return (
    (elbowCount.value * (data.elbow?.[schedule] || 0)) +
    (teeCount.value * (data.tee?.[schedule] || 0)) +
    (flangeCount.value * (data.flange?.[schedule] || 0)) +
    (valveCount.value * (data.valve?.[schedule] || 0))
  )
})
