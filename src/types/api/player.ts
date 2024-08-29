export interface IPostPlayerRequest {
  name: string | null
  area: string | null
  country: string | null
  identity_id: string | null
  ankle_bracelet_id: string | null
  sex: string | null
  birthdayUnix: number | null
  weight: string | null
  endurance: string | null
  explosive_force: string | null
  flying_power: string | null
  reaction_force: string | null
  adaptability: string | null
  image: string | undefined
  image_url: string | undefined
}

export interface IGetPlayerListRequest {
  name: string | null
  area: string | null
  country: string | null
  identity_id: string | null
  sex: string | null
  page: number
  size: number
  sorting: string | null
  descending: boolean
  ankle_bracelet_id: string | null
}

export interface IGetPlayerListResponse {
  items: IPlayer[]
  offset: number
  size: number
  total: number
}
export interface IPlayer {
  player_id: number
  name: string
  area: string
  country: string
  identity_id: string
  ankle_bracelet_id: string
  sex: string
  weight: string
  endurance: string
  explosive_force: string
  flying_power: string
  reaction_force: string
  adaptability: string
}

export interface IPutPlayerRequest {
  name: string | null
  area: string | null
  country: string | null
  identity_id: string | null
  ankle_bracelet_id: string | null
  sex: string | null
  birthdayUnix: number | null
  weight: string | null
  endurance: string | null
  explosive_force: string | null
  flying_power: string | null
  reaction_force: string | null
  adaptability: string | null
  image: string | undefined
  image_url: string | undefined
}

export interface IGetPlayerRequest {
  playerId: string
}

export interface IGetPlayerResponse {
  player_id: number
  name: string
  country: string
  identity_id: string
  sex: string
  birthday: Date
  age: number
  weight: string
  endurance: string
  explosive_force: string
  flying_power: string
  reaction_force: string
  adaptability: string
  image: string | undefined
  image_url: string | undefined
}
