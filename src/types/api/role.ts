export interface IGetRoleListRequest {
  search: string
  status: boolean
  page: number
  size: number
}

export interface IGetRoleListResponse {
  items: IRole[]
  offset: number
  size: number
  total: number
}
export interface IRole {
  id: number
  name: string
  user_amount: number
  status: boolean
  org_group_id: number
}
