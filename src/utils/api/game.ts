import axios from '@/library/axios'
import {
  IPostGameRequest,
  IGetGamesRequest,
  IGetGamesResponse,
  IGetGameResponse,
  IPutGameRequest,
  IPatchGameShowRequest,
  IGameMethod,
  OddItem,
  IPatchGameOddsCloseByIdRequest
} from '@/types/api/game'

export function postGameApi(request: IPostGameRequest) {
  return axios.post('game', request)
}

export function getGamesApi(
  payload: IGetGamesRequest
): Promise<IGetGamesResponse> {
  return axios.get('game', { params: payload })
}

export function putGameApi(gameId: number, request: IPutGameRequest) {
  return axios.put(`game/${gameId}`, request)
}

export function getGameApi(gameId: number | null): Promise<IGetGameResponse> {
  return axios.get(`game/${gameId}`)
}

export function patchGameShowApi(
  gameId: number,
  request: IPatchGameShowRequest
) {
  return axios.patch(`game/${gameId}/show`, request)
}

export function getGameMethodApi(): Promise<IGameMethod[]> {
  return axios.get(`game/method`)
}

export function putGameMethodApi(methodId: number, item: IGameMethod) {
  return axios.put(`game/method/${methodId}`, { ...item })
}

export function getGameOddsByGameId(gameId: number): Promise<OddItem[]> {
  return axios.get(`game/${gameId}/odds`)
}

export function patchGameOddsCloseById(
  id: number,
  request: IPatchGameOddsCloseByIdRequest
) {
  return axios.patch(`game/${id}/odds/close`, request)
}
