export interface IPagination {
  total: number | null
}

export interface IResponse<T> {
  code: string
  msg: string
  data: T
  dataPage: IDataPage
  page: number
  size: number
  pages: number
  total: number
}

export interface IDataPage {
  total: number
  list: any[]
  pageNum: number
  pageSize: number
  size: number
  startRow: number
  endRow: number
  pages: number
  prePage: number
  nextPage: number
  isFirstPage: boolean
  isLastPage: boolean
  hasPreviousPage: boolean
  hasNextPage: boolean
  navigatePages: number
  navigatepageNums: number[]
  navigateFirstPage: number
  navigateLastPage: number
}
