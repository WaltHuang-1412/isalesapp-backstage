import axios from '@/library/axios'
import { IResponse } from '@/types/api/global'
import {
  IPostAccountLoginRequest,
  IPostAccountLoginResponse
} from '@/types/api/account'

export function postAccountLoginApi(
  request: IPostAccountLoginRequest
): Promise<IResponse<IPostAccountLoginResponse>> {
  return axios.post('account/login', request)
}

export function postAccountLogoutApi() {
  return axios.post('account/logout')
}
