export interface IPagination {
  total: number | null
}

export interface IResponse<T> {
  code: string
  msg: string
  data: T
  dataPage: unknown
  page: number
  size: number
  pages: number
  total: number
}
