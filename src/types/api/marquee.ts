export interface IPostMarqueeRequest {
  content: string
  publishTime: string
}

export interface IGetMarqueeListRequest {
  content: string
  sorting: string
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
  publish_status: number
}

export interface IPutMarqueeRequest {
  content: string
  publish_time: string
  publish_status: number
}
// export interface IGetPlayerRequest {
//   playerId: string
// }

// export interface IGetPlayerResponse {
//   player_id: number
//   name: string
//   country: string
//   identity_id: string
//   sex: string
//   birthday: Date
//   age: number
//   weight: string
//   endurance: string
//   explosive_force: string
//   flying_power: string
//   reaction_force: string
//   adaptability: string
//   image: string | undefined
//   image_url: string | undefined
// }
