export interface IPostUserRequest {
  account: string | undefined
  password: string | undefined
  username: string | undefined
  email: string | undefined
  area: string | undefined
  memo: string | undefined
  user_code: string | undefined
  account_type?: string | undefined
}

export interface IGetUserListRequest {
  search: string | null
  is_active: boolean
  is_valid: boolean
  sorting: string | null
  page: number
  size: number
  descending: boolean
}

export interface IGetUserListResponse {
  items: IUser[]
  offset: number
  size: number
  total: number
}
export interface IUser {
  user_id: number
  user_name: string
  email: string
  is_active: boolean
  is_valid: boolean
  user_code: string
  account_type: string
}

export interface IPutUserRequest {
  account: string | undefined
  password: string | undefined
  username: string | undefined
  email: string | undefined
  area: string | undefined
  memo: string | undefined
  user_code: string | undefined
  is_active?: boolean | undefined
  account_type?: string | undefined
}

export interface IGetUserRequest {
  playerId: string
}

export interface IGetUserResponse {
  user_id: number
  account: string
  username: string
  email: string
  area: string
  memo: string
  user_code: string
  account_type: string
  is_active: boolean
  is_valid: boolean
}
