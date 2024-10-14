import axios from '@/library/axios'
import { IResponse } from '@/types/api/global'
import {
  IPostAccountLoginRequest,
  IPostAccountLoginResponse,
  IPostCustomerListRequest,
  IPostCustomerListResponse,
  IGetCustomerItemResponse,
  ICustomerItem
} from '@/types/api/account'

export function postAccountLoginApi(
  request: IPostAccountLoginRequest
): Promise<IResponse<IPostAccountLoginResponse>> {
  return axios.post('user/login', request)
}

export function postAccountLogoutApi() {
  return axios.post('user/logout')
}

export function getCustomerListApi(
  request: IPostCustomerListRequest
): Promise<IResponse<IPostCustomerListResponse>> {
  return axios.post('customer/search', request)
}

export function getCustomerItemApi(
  customerId: number
): Promise<IResponse<IGetCustomerItemResponse>> {
  return axios.get(`customer/get/${customerId}`)
}

export function postCreateCustomerApi(request: ICustomerItem) {
  return axios.post('customer/new', request)
}

export function postUpdateCustomerApi(request: ICustomerItem) {
  return axios.post('customer/update', request)
}
