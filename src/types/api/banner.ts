export interface IPostBannerRequest {
  banner_title: string | undefined
  banner_link: string | undefined
  banner: string | undefined
  publish_time?: string | undefined
  publish_time_unix: 0 | undefined
  publish_status: 0 | undefined
}

export interface IGetBannerListRequest {
  banner_title: string | null
  sorting: string | null
  page: number
  size: number
  descending: boolean
}

export interface IGetBannerListResponse {
  items: IBanner[]
  offset: number
  size: number
  total: number
}
export interface IBanner {
  banner_id: number
  banner_title: string | undefined
  banner_link: string | undefined
  banner_url: string | undefined
  banner: string | undefined
  publish_time: string
  publish_time_unix: number
  publish_status: number
}

export interface IPutBannerRequest {
  banner_title: string | undefined
  banner_link: string | undefined
  banner: string | undefined
  publish_time?: string | undefined
  publish_time_unix: 0 | undefined
  publish_status: 0 | undefined
}

export interface IGetBannerRequest {
  bannerId: string
}

export interface IGetBannerResponse {
  banner_id: number
  banner_title: string | undefined
  banner_link: string | undefined
  banner_url: string | undefined
  banner: string | undefined
  publish_time: string
  publish_time_unix: number
  publish_status: number
}

export interface IPatchBannerStatusRequest {
  status: number | undefined
}
