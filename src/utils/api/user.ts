import axios from '@/library/axios'
import {
  IPostUserRequest,
  IGetUserListRequest,
  IGetUserListResponse,
  IPutUserRequest,
  IGetUserResponse
} from '@/types/api/user'

export function postUserApi(request: IPostUserRequest) {
  return axios.post('users', request)
}

export function getUsersApi(
  payload: IGetUserListRequest
): Promise<IGetUserListResponse> {
  return axios.get('users', { params: payload })
}

export function putUserApi(userId: number, request: IPutUserRequest) {
  return axios.put(`/users/${userId}`, request)
}

export function getUserApi(userId: number): Promise<IGetUserResponse> {
  return axios.get(`/users/${userId}`)
}
