/* =============================================================================
   MISCELLANEOUS UTILITIES
   ============================================================================= */

/**
 * Copy text ไปยัง clipboard
 *
 * @example
 * const success = await copyToClipboard('Hello World')
 * if (success) {
 *   toast.success('Copied!')
 * }
 */
export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    return false
  }
}

/**
 * Download file จาก URL
 *
 * @example
 * downloadFile('/api/report.pdf', 'monthly-report.pdf')
 * downloadFile('https://example.com/image.png', 'photo.png')
 */
export const downloadFile = (url: string, filename: string): void => {
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.click()
}

/**
 * สร้าง unique ID แบบสั้น (ไม่ซ้ำในระดับ app)
 *
 * @example
 * generateId() // 'k5x2m9abc1234'
 * generateId() // 'h7j3n2def5678'
 *
 * // ใช้กับ list items
 * const items = data.map((item) => ({
 *   ...item,
 *   id: generateId()
 * }))
 */
export const generateId = (): string => {
  return Math.random().toString(36).slice(2) + Date.now().toString(36)
}
