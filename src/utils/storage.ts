// lib/storage.ts

type StorageType = 'local' | 'session'

class StorageUtil implements Storage {
  private storage: Storage

  constructor(type: StorageType = 'local') {
    this.storage =
      typeof window !== 'undefined'
        ? type === 'local'
          ? window.localStorage
          : window.sessionStorage
        : ({} as Storage) // สำหรับ SSR
  }

  /**
   * เก็บข้อมูลลง storage
   */
  setItem<T>(key: string, value: T): void {
    try {
      const serializedValue = JSON.stringify(value)
      this.storage.setItem(key, serializedValue)
    } catch (error) {
      console.error(`Error setting item ${key}:`, error)
    }
  }

  /**
   * ดึงข้อมูลจาก storage (รองรับ generic type)
   */
  getItem<T>(key: string): T | null
  getItem(key: string): string | null
  getItem<T>(key: string): T | string | null {
    try {
      const item = this.storage.getItem(key)
      if (!item) return null

      try {
        return JSON.parse(item) as T
      } catch {
        return item // ถ้า parse ไม่ได้ ให้คืนค่า string
      }
    } catch (error) {
      console.error(`Error getting item ${key}:`, error)
      return null
    }
  }

  /**
   * ลบข้อมูลออกจาก storage
   */
  removeItem(key: string): void {
    try {
      this.storage.removeItem(key)
    } catch (error) {
      console.error(`Error removing item ${key}:`, error)
    }
  }

  /**
   * ลบข้อมูลทั้งหมดใน storage
   */
  clear(): void {
    try {
      this.storage.clear()
    } catch (error) {
      console.error('Error clearing storage:', error)
    }
  }

  /**
   * เช็คว่ามี key นี้ใน storage หรือไม่
   */
  hasItem(key: string): boolean {
    return this.storage.getItem(key) !== null
  }

  /**
   * ดึง key ตาม index (implement จาก Storage interface)
   */
  key(index: number): string | null {
    return this.storage.key(index)
  }

  /**
   * จำนวน items ใน storage (implement จาก Storage interface)
   */
  get length(): number {
    return this.storage.length
  }
}

// Export instances
export const localStorageUtil = new StorageUtil('local')
export const sessionStorageUtil = new StorageUtil('session')

// Export class
export default new StorageUtil('local')
