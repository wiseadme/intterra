export interface Filter {
  title: string
  checked: boolean
  col: string
  value: any
}

export interface Column {
  title: string
  key: string
  width: number
  dictionary?: boolean
  indicator?: boolean
  accent?: boolean
  icon?: boolean
  sortable: boolean
  sorted?: boolean
}
