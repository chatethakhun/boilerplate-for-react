export const toFormatDDMMYYYYHHMM = (date: Date) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hours = date.getHours()
  const minutes = date.getMinutes()
  return `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year} ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
}

export const toFormatDDMMYYYY = (date: Date) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`
}

/* =============================================================================
   DATE UTILITIES
   ============================================================================= */

/**
 * Format วันที่ตาม locale
 *
 * @example
 * formatDate(new Date())
 * // '4 ธันวาคม 2567'
 *
 * formatDate('2024-01-15', 'en-US')
 * // 'January 15, 2024'
 *
 * formatDate(Date.now(), 'th-TH', { weekday: 'long' })
 * // 'วันพุธที่ 4 ธันวาคม 2567'
 */
export const formatDate = (
  date: Date | string | number,
  locale = 'th-TH',
  options?: Intl.DateTimeFormatOptions,
): string => {
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options,
  }
  return new Intl.DateTimeFormat(locale, defaultOptions).format(new Date(date))
}

/**
 * แสดงเวลาแบบ relative (เช่น "2 ชั่วโมงที่แล้ว")
 *
 * @example
 * // สมมติเวลาปัจจุบันคือ 14:00
 * formatRelativeTime(new Date('2024-12-04T12:00:00'))
 * // '2 ชั่วโมงที่แล้ว'
 *
 * formatRelativeTime(Date.now() - 60000)
 * // '1 นาทีที่แล้ว'
 *
 * formatRelativeTime(Date.now() - 86400000)
 * // 'เมื่อวาน'
 */
export const formatRelativeTime = (
  date: Date | string | number,
  locale = 'th-TH',
): string => {
  const now = Date.now()
  const timestamp = new Date(date).getTime()
  const diff = now - timestamp
  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' })

  if (days > 0) return rtf.format(-days, 'day')
  if (hours > 0) return rtf.format(-hours, 'hour')
  if (minutes > 0) return rtf.format(-minutes, 'minute')
  return rtf.format(-seconds, 'second')
}
