/* =============================================================================
   STRING UTILITIES
   ============================================================================= */

/**
 * แปลงตัวอักษรตัวแรกเป็นตัวพิมพ์ใหญ่ ที่เหลือเป็นตัวพิมพ์เล็ก
 *
 * @example
 * capitalize('hello') // 'Hello'
 * capitalize('WORLD') // 'World'
 * capitalize('jOHN')  // 'John'
 */
export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

/**
 * แปลง string เป็น URL-friendly slug
 * ลบอักขระพิเศษ, แทนที่ช่องว่างด้วย dash, แปลงเป็นตัวพิมพ์เล็ก
 *
 * @example
 * slugify('Hello World!')     // 'hello-world'
 * slugify('สวัสดี Test')       // 'test'
 * slugify('  Multiple   Spaces  ') // 'multiple-spaces'
 */
export const slugify = (str: string): string => {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/**
 * ตัด string ให้สั้นลงตามความยาวที่กำหนด พร้อมเติม suffix
 *
 * @example
 * truncate('Hello World', 8)        // 'Hello...'
 * truncate('Hello World', 8, '…')   // 'Hello W…'
 * truncate('Hi', 10)                // 'Hi' (ไม่ตัดเพราะสั้นกว่า)
 */
export const truncate = (
  str: string,
  length: number,
  suffix = '...',
): string => {
  if (str.length <= length) return str
  return str.slice(0, length - suffix.length) + suffix
}
