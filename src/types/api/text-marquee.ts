export interface IPostMarqueeRequest {
  content: string | undefined
  publish_time?: string | undefined
  publish_time_unix: 0 | undefined
  publish_status: 0 | undefined
}

export interface IGetMarqueeListRequest {
  content: string | null
  sorting: string | null
  page: number
  size: number
  descending: boolean
}

export interface IGetMarqueeListResponse {
  items: IMarquee[]
  offset: number
  size: number
  total: number
}
export interface IMarquee {
  marquee_id: number
  content: string
  publish_time: string
  publish_time_unix: number
  publish_status: number
}

export interface IPutMarqueeRequest {
  content: string | undefined
  publish_time?: string | undefined
  publish_time_unix: 0 | undefined
  publish_status: 0 | undefined
}

export interface IGetMarqueeRequest {
  marqueeId: string
}

export interface IGetMarqueeResponse {
  marquee_id: number
  content: string
  publish_time: string
  publish_time_unix: number
  publish_status: number
}

export interface IPatchMarqueeStatusRequest {
  status: number | undefined
}
