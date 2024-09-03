export interface IPagination {
  total: number | null
}

export interface IResponse<T> {
  code: string
  msg: string
  data: T
}
