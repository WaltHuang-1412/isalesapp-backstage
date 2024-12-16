import axios from '@/library/axios'
import { IResponse } from '@/types/api/global'
import {
  IPostOrderListRequest,
  IPostOrderListResponse,
  IGetOrderItemResponse,
  IOrderItem,
  IPostOrderDetailResponse,
  IOrderDetail
} from '@/types/api/order'

export function getOrderListApi(
  request: IPostOrderListRequest
): Promise<IResponse<IPostOrderListResponse>> {
  return axios.post('order/search', request)
}

export function getOrderItemApi(
  orderId: number
): Promise<IResponse<IGetOrderItemResponse>> {
  return axios.get(`order/get/${orderId}`)
}

export function postCreateOrderApi(request: IOrderItem) {
  return axios.post('order/new', request)
}

export function postUpdateOrderApi(request: IOrderItem) {
  return axios.post('order/update', request)
}

export function getProductListByOrderIdApi(
  id: number
): Promise<IResponse<IPostOrderDetailResponse>> {
  return axios.get(`orderItem/list/${id}`)
}

export function postCreateOrderDetailApi(request: IOrderDetail) {
  return axios.post('orderItem/new', request)
}

export function updateCreateOrderDetailApi(request: IOrderDetail) {
  return axios.post('orderItem/update', request)
}
