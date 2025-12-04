/* =============================================================================
   NUMBER UTILITIES
   ============================================================================= */

/**
 * จำกัดค่าตัวเลขให้อยู่ในช่วง min-max
 *
 * @example
 * clamp(5, 0, 10)   // 5 (อยู่ในช่วง)
 * clamp(-5, 0, 10)  // 0 (ต่ำกว่า min)
 * clamp(15, 0, 10)  // 10 (สูงกว่า max)
 */
export const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max)
}

/**
 * Format ตัวเลขตาม locale (ใส่ comma คั่นหลัก)
 *
 * @example
 * formatNumber(1000000)           // '1,000,000'
 * formatNumber(1234.56)           // '1,234.56'
 * formatNumber(1000, 'en-US')     // '1,000'
 */
export const formatNumber = (num: number, locale = 'th-TH'): string => {
  return new Intl.NumberFormat(locale).format(num)
}

/**
 * Format ตัวเลขเป็นสกุลเงิน
 *
 * @example
 * formatCurrency(1500)                    // '฿1,500.00'
 * formatCurrency(99.99, 'USD', 'en-US')   // '$99.99'
 * formatCurrency(1000, 'JPY', 'ja-JP')    // '￥1,000'
 */
export const formatCurrency = (
  amount: number,
  currency = 'THB',
  locale = 'th-TH',
): string => {
  return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(
    amount,
  )
}

/**
 * สุ่มตัวเลขจำนวนเต็มในช่วงที่กำหนด (รวม min และ max)
 *
 * @example
 * randomInt(1, 10)   // 7 (สุ่มได้ 1-10)
 * randomInt(0, 100)  // 42
 * randomInt(5, 5)    // 5
 */
export const randomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
