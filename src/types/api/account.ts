/* eslint-disable @typescript-eslint/no-explicit-any */

export interface IPostAccountLoginRequest {
  account: string | undefined | null
  pwd: string | undefined | null
}

export interface IPostAccountLoginResponse {
  token: any
}

export interface IPostCustomerListRequest {
  stype: string | null
  savlue: string | null
  page: string | number
}

export interface IPostCustomerListResponse {
  list: ICustomerItem[]
}

export interface ICustomerItem {
  addressArea: string | null
  addressCity: string | null
  addressDetail: string | null
  callName: string | null
  cellphoneNum: string | null
  id?: number | null
  name: string | null
  note: string | null
  telephoneNum: string | null
}

export interface IGetCustomerItemResponse {
  customer: ICustomerItem
}