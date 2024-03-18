export enum COL_DATA_TYPE {
  TEXT,
  NUMBER,
  CURRENCY,
  DATE,
  INDEX,
  SELECTION
}

export type FIX_COLUMN = 'left' | 'right' | 'none'

export type filterItem = {
  title : string
  name: string
  type?: 'number' | 'date' | 'date-range' | 'text' | 'phone-number' | 'select'
  data?: any
  value?: any
}
