import axios from '@/library/axios'
import { odd } from '@/types/api/odds'

export function getOddsApi(): Promise<odd[]> {
  return axios.get(`odds/`)
}

export function putOddsApi(code: string, odds: number) {
  return axios.put(`odds/${code}`, { odds })
}
