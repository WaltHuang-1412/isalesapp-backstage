import axios from '@/library/axios'
import { IResponse } from '@/types/api/global'
// import {

// } from '@/types/api/customer'

export function getCustomerList(request: unknown): Promise<IResponse<unknown>> {
  return axios.post('customer/search', request)
}

export function getCustomerItem(id: number) {
  return axios.get('customer/get', { params: { id } })
}

export function createCustomer(request: any) {
  return axios.post('customer/new', request)
}

export function updateCustomer(request: any) {
  return axios.post('customer/update', request)
}

export function deleteCustomer(id: number) {
  return axios.post('customer/delete', { id })
}
