/* =============================================================================
   OBJECT UTILITIES
   ============================================================================= */

/**
 * เลือกเฉพาะ property ที่ต้องการจาก object
 *
 * @example
 * const user = { id: 1, name: 'John', email: 'john@example.com', password: '123' }
 *
 * pick(user, ['id', 'name'])
 * // { id: 1, name: 'John' }
 *
 * pick(user, ['email'])
 * // { email: 'john@example.com' }
 */
export const pick = <T extends object, K extends keyof T>(
  obj: T,
  keys: K[],
): Pick<T, K> => {
  return keys.reduce(
    (acc, key) => {
      if (key in obj) acc[key] = obj[key]
      return acc
    },
    {} as Pick<T, K>,
  )
}

/**
 * ลบ property ที่ไม่ต้องการออกจาก object
 *
 * @example
 * const user = { id: 1, name: 'John', password: '123' }
 *
 * omit(user, ['password'])
 * // { id: 1, name: 'John' }
 *
 * omit(user, ['id', 'password'])
 * // { name: 'John' }
 */
export const omit = <T extends object, K extends keyof T>(
  obj: T,
  keys: K[],
): Omit<T, K> => {
  const result = { ...obj }
  for (const key of keys) {
    delete result[key]
  }
  return result
}

/**
 * เช็คว่าค่าเป็น empty หรือไม่ (null, undefined, '', [], {})
 *
 * @example
 * isEmpty(null)       // true
 * isEmpty(undefined)  // true
 * isEmpty('')         // true
 * isEmpty([])         // true
 * isEmpty({})         // true
 * isEmpty('hello')    // false
 * isEmpty([1, 2])     // false
 * isEmpty({ a: 1 })   // false
 */
export const isEmpty = (value: unknown): boolean => {
  if (value == null) return true
  if (Array.isArray(value) || typeof value === 'string')
    return value.length === 0
  if (typeof value === 'object') return Object.keys(value).length === 0
  return false
}
