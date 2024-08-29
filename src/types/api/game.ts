export interface IPostGameRequest {
  game_type: number | null
  area: string | null
  title: string | null
  start_bet_time: Date | null
  end_bet_time: Date | null
  start_race_time: Date | null
  end_race_time: Date | null
  start_bet_time_unix: number | null
  end_bet_time_unix: number | null
  start_race_time_unix: number | null
  end_race_time_unix: number | null
  player_number: number | null
  player_settings: IPigeonNoItem[]
  start_longitude: number | null
  start_latitude: number | null
  end_longitude: number | null
  end_latitude: number | null
  no_rank_list: number[]
}

export interface IGetGamesRequest {
  title: string | null
  page: number
  size: number
  sorting: string | null
  descending: boolean | null
}

export interface IGetGamesResponse {
  items: IGame[]
  offset: number
  size: number
  total: number
}

export interface IGetGameResponse {
  game_type: number | null
  area: string | null
  title: string | null
  start_bet_time: Date | null
  end_bet_time: Date | null
  start_race_time: Date | null
  end_race_time: Date | null
  start_bet_time_unix: number | null
  end_bet_time_unix: number | null
  start_race_time_unix: number | null
  end_race_time_unix: number | null
  player_number: number | null
  player_settings: IPigeonNoItem[]
  start_longitude: number | null
  start_latitude: number | null
  end_longitude: number | null
  end_latitude: number | null
  no_rank_list: number[]
}

export interface IGame {
  game_id: number
  game_type: number
  area: string
  title: string
  start_bet_time: Date | string
  end_bet_time: Date | string
  start_race_time: Date | string
  end_race_time: Date | string
  start_bet_time_unix: number
  end_bet_time_unix: number
  start_race_time_unix: number
  end_race_time_unix: number
  player_number: number
  player_settings: {
    player_id: number
    player_name: string | null
    no: string
    odds: number
    gpx_file: string
    gpx_file_url: string | null
  }[]
  start_longitude: number
  start_latitude: number
  end_longitude: number
  end_latitude: number
  is_show: boolean
}

export interface IPutGameRequest {
  game_type: number | null
  area: string | null
  title: string | null
  start_bet_time: Date | null
  end_bet_time: Date | null
  start_race_time: Date | null
  end_race_time: Date | null
  start_bet_time_unix: number | null
  end_bet_time_unix: number | null
  start_race_time_unix: number | null
  end_race_time_unix: number | null
  player_number: number | null
  player_settings: IPigeonNoItem[]
  start_longitude: number | null
  start_latitude: number | null
  end_longitude: number | null
  end_latitude: number | null
  no_rank_list: number[]
}

export interface IPatchGameShowRequest {
  show: number | null
}

export interface IPigeonNoItem {
  color?: string
  player_id: number | null
  player_name: string | null
  no: number | null
  odds: number | null
  gpx_file: string | undefined
  gpx_file_url: string | undefined
}

export interface IGameMethod {
  method_id: number
  method_name: string
  method_description: string
  bet_limit: number
  bet_limit_in_order: number
  bet_limit_per_method: number
  trigger_auto_odds_amount: number
  auto_odds_per_amount: number
  auto_per_odds: number
  is_show: boolean
}

export interface OddItem {
  id: number
  game_id: number
  method_id: number
  method_name: string
  no: string
  odds: number
  amount: number
  show: boolean
}

export interface IPatchGameOddsCloseByIdRequest {
  show: boolean
}
