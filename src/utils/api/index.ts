import axios from '@/library/axios'
import {
  IUserProfileResponse,
  IUsersRequest,
  IUserDetailItem,
  IUsersResponse,
  ISharedImagesRequest,
  ISharedImagesResponse,
  IUploadSharedImageResponse,
  IDeleteSharedImagesRequest,
  IPersonalImageRequest,
  IPersonalImageResponse,
  IUploadPersonalImageResponse,
  IDeletePersonalImagesRequest,
  IPutAuthTokenRequest,
  IPutAuthTokenResponse,
  IMyDesignsRequest,
  IMyDesignsResponse,
  IDeleteMyDesignRequest,
  IUserDesignListRequest,
  IUserDesignListResponse,
  IUploadDesignImagesResponse,
  ICreateMyDesignRequest,
  ICreateMyDesignResponse
} from '@/types'

import { ITokenResponse } from '@/types/api'

export function postLoginApi(data: {
  username: string
  password: string
}): Promise<ITokenResponse> {
  return axios.post('auth/token', data)
}

export function getUserProfileApi(): Promise<IUserProfileResponse> {
  return axios.get('user-profile')
}

export function getRefreshToken(
  request: IPutAuthTokenRequest
): Promise<IPutAuthTokenResponse> {
  return axios.put('auth/token', request)
}

export function getUserListApi(
  payload: IUsersRequest
): Promise<IUsersResponse> {
  return axios.get('admin/users', { params: payload })
}

export function getUserItemApi(uuid: string): Promise<IUserDetailItem> {
  return axios.get(`admin/users/${uuid}`)
}

export function patchUpdateUserNickName({
  uuid,
  nickname
}: {
  uuid: string
  nickname: string
}) {
  return axios.patch(`admin/users/${uuid}`, { nickname })
}

export function putUpdateUserPassword({
  uuid,
  password
}: {
  uuid: string
  password: string
}) {
  return axios.put(`admin/users/${uuid}/password`, { password })
}

export function getSharedImageList(
  payload: ISharedImagesRequest
): Promise<ISharedImagesResponse> {
  return axios.get('shared-images', { params: payload })
}

export function postCreateSharedImage(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formData: any
): Promise<IUploadSharedImageResponse> {
  return axios.post('admin/shared-images', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export function putDeleteSharedImage({ uuids }: IDeleteSharedImagesRequest) {
  return axios.put('admin/shared-images/delete', { uuids })
}

export function getPersonalImageList(
  payload: IPersonalImageRequest
): Promise<IPersonalImageResponse> {
  return axios.get('personal-images', { params: payload })
}

export function postCreatePersonalImage(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formData: any
): Promise<IUploadPersonalImageResponse> {
  return axios.post('personal-images', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export function putDeletePersonalImage({
  uuids
}: IDeletePersonalImagesRequest) {
  return axios.put('personal-images/delete', { uuids })
}

export function getMyDesignList(
  payload: IMyDesignsRequest
): Promise<IMyDesignsResponse> {
  return axios.get('designs', { params: payload })
}

export function patchMyDesignName(
  uuid: string,
  name: string
): Promise<IMyDesignsResponse> {
  return axios.patch(`designs/${uuid}`, { name })
}

export function putDeleteMyDesign({ uuids }: IDeleteMyDesignRequest) {
  return axios.put('designs/delete', { uuids })
}

export function postCreateUmbrellaDesign(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formData: any
): Promise<IUploadPersonalImageResponse> {
  return axios.post('design-images', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export function getUserDesignList(
  payload: IUserDesignListRequest,
  uuid: string
): Promise<IUserDesignListResponse> {
  return axios.get(`admin/users/${uuid}/designs`, { params: payload })
}

export function postDesignImage(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formData: any
): Promise<IUploadDesignImagesResponse> {
  return axios.post('design-images', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export function postMyDesign(
  payload: ICreateMyDesignRequest
): Promise<ICreateMyDesignResponse> {
  return axios.post('designs', payload)
}

export function postUmbrellaDesignSharing(
  uuid: string
): Promise<{ expiredTime: number; token: string }> {
  return axios.post('design-sharing', { uuid })
}

export function postUmbrellaDesignSharingByAdmin(
  uuid: string
): Promise<{ expiredTime: number; token: string }> {
  return axios.post('admin/design-sharing', { uuid })
}

export function getUmbrellaDesignSharing(
  token: string
): Promise<ICreateMyDesignResponse> {
  return axios.get(`design-sharing/${token}`)
}

export default axios
