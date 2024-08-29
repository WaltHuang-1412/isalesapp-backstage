export interface IGetMembersRequest {
  search: string | null
  dealer_code: string | null
  account_status: boolean
  sorting: string | null
  descending: boolean
  page: number
  size: number
}
export interface IGetMembersResponse {
  items: IMember[]
  offset: number
  size: number
  total: number
}

export interface IMember {
  account: string
  name: string
  password_update_date: string
  dealer_code: string
  point: number
  reward: number
  activityReward: number
}

export interface IGetMemberResponse {
  account: string | null
  name: string | null
  password_update_date: string | null
  dealer_code: string | null
  point: number | null
  reward: number | null
  activity_reward: number | null
  account_status: boolean
  memo: string | null
}

export interface IPutMemberRequest {
  account?: string | null
  name?: string | null
  password?: string | null
  password_confirm?: string | null
  dealer_code?: string | null
  account_status?: boolean
  memo?: string | null
}

export interface IGetMemberPointRequest {
  member_id: string | number | null
  create_at_start_time: string | null
  create_at_end_time: string | null
  sorting: string | null
  descending: boolean
  page: number
  size: number
}

export interface IGetMemberPointResponse {
  items: IMemberPoint[]
  offset: number
  size: number
  total: number
}

export interface IMemberPoint {
  member_id: number
  serial: string
  point: number
  reward: number
  activity_reward: number
  expired_at: string
  memo: string
  created_at: string
  created_by: number
}

export interface IPostMemberPointRequest {
  member_id: number | null
  cash_type: number | null
  cash: number | null
  cash_abs: number | null
  fee: number | null
  point_type: number | null
  point: number | null
  point_abs: number | null
  point_expired_at: string | null
  reward_type: number | null
  reward: number | null
  reward_abs: number | null
  reward_expired_at: string | null
  activity_reward_type: number | null
  activity_reward: number | null
  activity_reward_abs: number | null
  activity_reward_expired_at: string | null
  memo: string | null
}

export interface IGetMemberOrdersRequest {
  create_at_start_time: string | null
  create_at_end_time: string | null
  sorting: string | null
  descending: boolean
  page: number
  size: number
}

export interface IGetMemberOrdersResponse {
  items: IOrderItem[]
  offset: number
  size: number
  total: number
}

export interface IOrderItem {
  member_id: number
  order_id: number
  order_no: string
  game_id: number
  game_title: string
  order_status: number
  totl_amount: number
  total_win_amount: number
  total_win_lose_amount: number
  pay_from_point: number
  pay_from_reward: number
  pay_from_activity_reward: number
  memo: string
  created_at: string
  created_by: number
  order_details: IOrderDetail[]
}

export interface IOrderDetail {
  member_id: number
  detail_id: number
  order_id: number
  order_no: string
  game_id: number
  game_title: string
  method_id: number
  method_name: string
  no: string
  amount: number
  odds: number
  bet_result_status: number
  result_amount: number
  order_status: number
  totl_amount: number
  created_at: string
}

export interface IGetMemberReportRequest {
  search: string | null
  create_at_start_time: string | null
  create_at_start_time_unix: number | null
  create_at_end_time: string | null
  create_at_end_time_unix: number | null
  sorting: string | null
  descending: boolean
  page: number
  size: number
}

export interface IGetMemberReportResponse {
  report_data: {
    items: IReportItem[]
    offset: number
    size: number
    total: number
  }
  sum_of_amount: {
    sum_of_total_amount: number
    sum_of_total_win_amount: number
    sum_of_total_win_lose_amount: number
    sum_of_total_amount_top1: number
    sum_of_total_win_amount_top1: number
    sum_of_total_win_lose_amount_top1: number
    sum_of_total_amount_big_small: number
    sum_of_total_win_amount_big_small: number
    sum_of_total_win_lose_amount_big_small: number
    sum_of_total_amount_odd_even: number
    sum_of_total_win_amount_odd_even: number
    sum_of_total_win_lose_amount_odd_even: number
  }
}

export interface IReportItem {
  member_id: number
  member_name: string
  account: string
  total_amount: number
  total_win_amount: number
  total_win_lose_amount: number
  total_amount_top1: number
  total_win_amount_top1: number
  total_win_lose_amount_top1: number
  total_amount_big_small: number
  total_win_amount_big_small: number
  total_win_lose_amount_big_small: number
  total_amount_odd_even: number
  total_win_amount_odd_even: number
  total_win_lose_amount_odd_even: number
}

export interface IGetMemberReportByMemberIdRequest {
  memberId: number
  create_at_start_time: string | null
  create_at_start_time_unix: number | null
  create_at_end_time: string | null
  create_at_end_time_unix: number | null
}

export interface IGetMemberReportByMemberIdResponse {
  member_id: number
  member_name: string
  account: string
  method_reports: MethodReportItem[]
}

export interface MethodReportItem {
  method_id: number
  method_name: string
  total_amount: number
  total_win_amount: number
  total_win_lose_amount: number
}
