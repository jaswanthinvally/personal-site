function parseDate(value) {
  if (!value) {
    return null
  }
  const date = value.includes('T') ? new Date(value) : new Date(`${value}T00:00:00`)
  if (Number.isNaN(date.getTime())) {
    return null
  }
  return date
}

export function formatLogDate(value) {
  const date = parseDate(value)
  if (!date) {
    return value || ''
  }
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}.${month}.${day}`
}

export function formatLongDate(value) {
  const date = parseDate(value)
  if (!date) {
    return ''
  }
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}
