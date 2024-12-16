import axios from '@/library/axios'
import { IResponse } from '@/types/api/global'
import { ICreateProductItemRequest } from './type'

export function createProductItemApi(
  request: ICreateProductItemRequest
): Promise<IResponse<{ id: number }>> {
  return axios.post('/product/new', request)
}
