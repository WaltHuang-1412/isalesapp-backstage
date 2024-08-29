import { accountType } from '@/models/enum'
/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IPostAuthLoginRequest {
  account: string | undefined | null
  password: string | undefined | null
  google_captcha_token: string | undefined | null
}

export interface IPostAuthLoginResponse {
  access: string
  refresh: string
}

export interface IPutAuthTokenRefreshRequest {
  token: string
}

export interface IPutAuthTokenRefreshResponse {
  access: string
}

export interface IGetAuthProfileResponse {
  user_id: number
  user_name: string
  account: string
  email: string
  is_active: boolean
  is_valid: boolean
  user_code: string
  account_type: accountType
  fee: number
}
