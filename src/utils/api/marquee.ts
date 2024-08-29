import axios from '@/library/axios'
import {
  IPostMarqueeRequest,
  IGetMarqueeListRequest,
  IGetMarqueeListResponse,
  IPutMarqueeRequest
} from '@/types/api/marquee'

export function postMarqueeApi(request: IPostMarqueeRequest) {
  return axios.post('users', request)
}

export function getMarqueeListApi(
  payload: IGetMarqueeListRequest
): Promise<IGetMarqueeListResponse> {
  return axios.get('users', { params: payload })
}

export function putMarqueeApi(marqueeId: number, request: IPutMarqueeRequest) {
  return axios.put(`/users/${marqueeId}`, request)
}
