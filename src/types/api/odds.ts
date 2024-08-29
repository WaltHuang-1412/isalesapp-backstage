export interface IGetOddsApiResponse {
  odds: odd[]
  total: number
  offset: number
  size: number
}

export interface odd {
  code: string
  name: string
  odds: number
}
