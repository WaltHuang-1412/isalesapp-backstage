/* eslint-disable @typescript-eslint/no-explicit-any */

export interface IPostOrderListRequest {
  stype: string | null
  savlue: string | null
  page: string | number
}

export interface IPostOrderListResponse {
  list: IOrderItem[]
}

export interface IOrderItem {
  id?: number | null
  custOrderNo: string | null
  customerId: number | null
  customerName: string | null
  orderStatus: number | string | null
  note: string | null
  totalPrice: number | null
  updateTime: string | null
  createTime: string | null
}

export interface IGetOrderItemResponse {
  order: IOrderItem
}

export enum OrderStatus {
  Unestablished = 0,
  EstablishedUnpaid = 1,
  EstablishedPaid = 2,
  ReturnedUnrefunded = 3,
  ReturnedRefunded = 4,
  Discarded = 5
}
export const orderStatusOptions = [
  { value: OrderStatus.Unestablished, label: '未成立' },
  { value: OrderStatus.EstablishedUnpaid, label: '已成立，未付款' },
  { value: OrderStatus.EstablishedPaid, label: '已成立，已付款' },
  { value: OrderStatus.ReturnedUnrefunded, label: '退貨，未退款' },
  { value: OrderStatus.ReturnedRefunded, label: '退貨，已退款' },
  { value: OrderStatus.Discarded, label: '廢棄' }
]
