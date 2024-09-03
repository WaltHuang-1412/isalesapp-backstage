/* eslint-disable @typescript-eslint/no-explicit-any */

export interface IPostAccountLoginRequest {
  account: string | undefined | null
  password: string | undefined | null
}

export interface IPostAccountLoginResponse {
  data: any
}
