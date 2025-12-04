/* =============================================================================
   ARRAY UTILITIES
   ============================================================================= */

/**
 * กรอง array ให้เหลือเฉพาะ item ที่ไม่ซ้ำกัน โดยเทียบจาก key ที่กำหนด
 *
 * @example
 * const users = [
 *   { id: 1, name: 'John' },
 *   { id: 2, name: 'Jane' },
 *   { id: 1, name: 'John Doe' }
 * ]
 * uniqueBy(users, (u) => u.id)
 * // [{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }]
 *
 * uniqueBy([1, 2, 2, 3, 3, 3], (x) => x)
 * // [1, 2, 3]
 */
export const uniqueBy = <T, K>(arr: T[], key: (item: T) => K): T[] => {
  const seen = new Set<K>()
  return arr.filter((item) => {
    const k = key(item)
    if (seen.has(k)) return false
    seen.add(k)
    return true
  })
}

/**
 * จัดกลุ่ม array ตาม key ที่กำหนด
 *
 * @example
 * const products = [
 *   { name: 'Apple', category: 'fruit' },
 *   { name: 'Carrot', category: 'vegetable' },
 *   { name: 'Banana', category: 'fruit' }
 * ]
 * groupBy(products, (p) => p.category)
 * // {
 * //   fruit: [{ name: 'Apple', ... }, { name: 'Banana', ... }],
 * //   vegetable: [{ name: 'Carrot', ... }]
 * // }
 */
export const groupBy = <T, K extends string | number>(
  arr: T[],
  key: (item: T) => K,
): Record<K, T[]> => {
  return arr.reduce(
    (acc, item) => {
      const k = key(item)
      acc[k] = acc[k] || []
      acc[k].push(item)
      return acc
    },
    {} as Record<K, T[]>,
  )
}

/**
 * แบ่ง array ออกเป็น chunk ย่อยๆ ตามขนาดที่กำหนด
 *
 * @example
 * chunk([1, 2, 3, 4, 5], 2)
 * // [[1, 2], [3, 4], [5]]
 *
 * chunk(['a', 'b', 'c', 'd'], 3)
 * // [['a', 'b', 'c'], ['d']]
 */
export const chunk = <T>(arr: T[], size: number): T[][] => {
  return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size),
  )
}
