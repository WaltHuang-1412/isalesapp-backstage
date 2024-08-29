import axios from '@/library/axios'
import {
  IPostAuthLoginRequest,
  IPostAuthLoginResponse,
  IPutAuthTokenRefreshRequest,
  IPutAuthTokenRefreshResponse,
  IGetAuthProfileResponse
} from '@/types/api/auth'

export function postAuthLoginApi(
  request: IPostAuthLoginRequest
): Promise<IPostAuthLoginResponse> {
  return axios.post('auth/login', request)
}

export function putAuthTokenRefreshApi(
  request: IPutAuthTokenRefreshRequest
): Promise<IPutAuthTokenRefreshResponse> {
  return axios.put('auth/token/refresh', request)
}

export function getAuthProfileApi(): Promise<IGetAuthProfileResponse> {
  return axios.get('auth/profile')
}
