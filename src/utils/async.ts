/* =============================================================================
   ASYNC UTILITIES
   ============================================================================= */

/**
 * หน่วงเวลาตาม milliseconds ที่กำหนด
 *
 * @example
 * await sleep(1000) // รอ 1 วินาที
 *
 * // ใช้กับ loading
 * setLoading(true)
 * await sleep(500)
 * setLoading(false)
 */
export const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * ชะลอการเรียก function จนกว่าจะหยุดเรียกตาม delay ที่กำหนด
 * เหมาะกับ search input, resize event
 *
 * @example
 * const handleSearch = debounce((query: string) => {
 *   console.log('Searching:', query)
 * }, 300)
 *
 * // พิมพ์เร็วๆ จะรอจนหยุดพิมพ์ 300ms แล้วค่อยทำงาน
 * input.addEventListener('input', (e) => handleSearch(e.target.value))
 */
export const debounce = <T extends (...args: Parameters<T>) => void>(
  fn: T,
  delay: number,
): ((...args: Parameters<T>) => void) => {
  let timeoutId: ReturnType<typeof setTimeout>
  return (...args) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn(...args), delay)
  }
}

/**
 * จำกัดการเรียก function ให้ทำงานได้ครั้งเดียวต่อช่วงเวลาที่กำหนด
 * เหมาะกับ scroll event, button click
 *
 * @example
 * const handleScroll = throttle(() => {
 *   console.log('Scrolled!')
 * }, 100)
 *
 * // scroll เร็วแค่ไหนก็ทำงานแค่ทุก 100ms
 * window.addEventListener('scroll', handleScroll)
 */
export const throttle = <T extends (...args: Parameters<T>) => void>(
  fn: T,
  limit: number,
): ((...args: Parameters<T>) => void) => {
  let inThrottle = false
  return (...args) => {
    if (!inThrottle) {
      fn(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}
