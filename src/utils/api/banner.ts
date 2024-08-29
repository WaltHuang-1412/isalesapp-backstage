import axios from '@/library/axios'
import {
  IPostBannerRequest,
  IGetBannerListRequest,
  IGetBannerListResponse,
  IPutBannerRequest,
  IGetBannerResponse,
  IPatchBannerStatusRequest
} from '@/types/api/banner'

export function postBannerApi(request: IPostBannerRequest) {
  return axios.post('banner', request)
}

export function getBannerListApi(
  payload: IGetBannerListRequest
): Promise<IGetBannerListResponse> {
  return axios.get('banner', { params: payload })
}

export function putBannerApi(bannerId: number, request: IPutBannerRequest) {
  return axios.put(`/banner/${bannerId}`, request)
}

export function getBannerApi(bannerId: number): Promise<IGetBannerResponse> {
  return axios.get(`/banner/${bannerId}`)
}

export function patchBannerStatusApi(
  bannerId: number,
  request: IPatchBannerStatusRequest
) {
  return axios.patch(`/banner/${bannerId}/status`, request)
}
