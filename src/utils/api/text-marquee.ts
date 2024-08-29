import axios from '@/library/axios'
import {
  IPostMarqueeRequest,
  IGetMarqueeListRequest,
  IGetMarqueeListResponse,
  IPutMarqueeRequest,
  IGetMarqueeResponse,
  IPatchMarqueeStatusRequest
} from '@/types/api/text-marquee'

export function postMarqueeApi(request: IPostMarqueeRequest) {
  return axios.post('marquee', request)
}

export function getMarqueeListApi(
  payload: IGetMarqueeListRequest
): Promise<IGetMarqueeListResponse> {
  return axios.get('marquee', { params: payload })
}

export function putMarqueeApi(marqueeId: number, request: IPutMarqueeRequest) {
  return axios.put(`/marquee/${marqueeId}`, request)
}

export function getMarqueeApi(marqueeId: number): Promise<IGetMarqueeResponse> {
  return axios.get(`/marquee/${marqueeId}`)
}

export function patchMarqueeStatusApi(
  marqueeId: number,
  request: IPatchMarqueeStatusRequest
) {
  return axios.patch(`/marquee/${marqueeId}/status`, request)
}
