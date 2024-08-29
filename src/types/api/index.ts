/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ITokenResponse {
  accessToken: string
  accessTokenExp: number
  refreshToken: string
  refreshTokenExp: number
}

export interface IPutAuthTokenRequest {
  refreshToken: string
}

export interface IPutAuthTokenResponse {
  accessToken: string
  accessTokenExp: number
}

export interface IUserProfileResponse {
  uuid: string
  username: string
  nickname: string
  groups: number[]
}

export interface IUsersRequest {
  ordering: string
  search: string
  page: number
  pageSize: number
}

export interface IUsersResponse {
  total: number
  page: number
  pageSize: number
  items: IUserItem[]
}

export interface IUserItem {
  uuid: string
  username: string
  nickname: string
  groups: number[]
}

export interface IUserDetailItem {
  uuid: string
  username: string
  nickname: string
  groups: number[]
  designCount: number
}

export interface ISharedImagesRequest {
  ordering: string
  search: string
  page: number
  pageSize: number
}

export interface ISharedImagesResponse {
  total: number
  page: number
  pageSize: number
  items: ISharedImageItem[]
}

export interface ISharedImageItem {
  uuid: string
  fileName: string
  fileSize: number
  url: string
  createdTime: number
  updatedTime: number
}

export interface IUploadSharedImageResponse {
  uuid: string
  fileName: string
  fileSize: number
  url: string
  createdTime: number
  updatedTime: number
}

export interface IUploadPersonalImageResponse {
  uuid: string
  fileName: string
  fileSize: number
  url: string
  createdTime: number
  updatedTime: number
}

export interface IUploadDesignImagesResponse {
  url: string
}

export interface IDeleteSharedImagesRequest {
  uuids: string[]
}

export interface IPersonalImageRequest {
  ordering: string
  search: string
  page: number
  pageSize: number
}

export interface IPersonalImageResponse {
  total: number
  page: number
  pageSize: number
  items: ISPersonalImageItem[]
}

export interface IDeletePersonalImagesRequest {
  uuids: string[]
}

export interface ISPersonalImageItem {
  uuid: string
  fileName: string
  fileSize: number
  url: string
  createdTime: number
  updatedTime: number
}

export interface IMyDesignsRequest {
  ordering: string
  search: string
  page: number
  pageSize: number
}

export interface IMyDesignsResponse {
  total: number
  page: number
  pageSize: number
  items: IMyDesignItem[]
}

export interface IMyDesignItem {
  uuid: string
  name: string
  inch: number
  polygon: number
  isAutomatic: boolean
  isFoldable: boolean
  designData: ILayoutDataModel
  createdTime: number
  updatedTime: number
}

export interface IDeleteMyDesignRequest {
  uuids: string[]
}

export interface IUserDesignListRequest {
  ordering: string
  search: string
  page: number
  pageSize: number
}

export interface IUserDesignListResponse {
  total: number
  page: number
  pageSize: number
  items: IUserDesignItem[]
}

export interface IUserDesignItem {
  uuid: string
  name: string
  inch: number
  polygon: number
  isAutomatic: boolean
  isFoldable: boolean
  designData: {
    canopy: any
    cover: any
    panels: any
    rubberHandle: any
  }
  createdTime: number
  updatedTime: number
}

export interface ILayoutDataModel<> {
  canopy: {
    imageURL: string
    layout: {
      numberOfSidedPolygon: number
      noPolygon: boolean
      sides: ILayoutSide[]
    }
    modelID: string
    meshName: string
  }
  innerCanopy: {
    imageURL: null
    designs: any[]
    modelID: string
    meshName: string
  }
  belt: {
    imageURL: null
    designs: any[]
    modelID: string
    meshName: string
  }
  cover: {
    imageURL: null
    designs: any[]
    modelID: string
    meshName: string
  }
}

export interface IPixiSpiritImage {
  fileName: string
  url: string
}

interface ILayoutSide {
  id: string | null
  positions: number[]
  image: Blob | null
  hitColor: string
}

export interface ICreateMyDesignRequest {
  name: string
  inch: number
  polygon: number
  isAutomatic: boolean
  isFoldable: boolean
  designData: {
    additionalProp1: string
    additionalProp2: string
    additionalProp3: string
  }
  twoDImgUrls: string[]
}

export interface ICreateMyDesignResponse {
  createdTime: number
  designData: any
  inch: number
  isAutomatic: boolean
  isFoldable: boolean
  name: string
  polygon: number
  twoDImgZipUrl: string[]
  updatedTime: number
  uuid: string
}
