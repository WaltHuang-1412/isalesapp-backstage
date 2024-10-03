/* eslint-disable @typescript-eslint/no-explicit-any */

export interface IPostAccountLoginRequest {
  account: string | undefined | null
  pwd: string | undefined | null
}

export interface IPostAccountLoginResponse {
  token: any
}
