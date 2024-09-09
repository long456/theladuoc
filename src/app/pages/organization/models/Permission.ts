export interface Permission {
  id: number,
  name: string,
  checked?: boolean,
  data?: number[],
  children?: Permission[]
}
