import axios from '@/library/axios'
import {
  IPostPlayerRequest,
  IGetPlayerListRequest,
  IGetPlayerListResponse,
  IPutPlayerRequest,
  IGetPlayerResponse
} from '@/types/api/player'

export function postPlayerApi(request: IPostPlayerRequest) {
  return axios.post('player', request)
}

export function getPlayersApi(
  payload: IGetPlayerListRequest
): Promise<IGetPlayerListResponse> {
  return axios.get('player', { params: payload })
}

export function putPlayerApi(playerId: number, request: IPutPlayerRequest) {
  return axios.put(`/player/${playerId}`, request)
}

export function getPlayerApi(playerId: number): Promise<IGetPlayerResponse> {
  return axios.get(`player/${playerId}`)
}
