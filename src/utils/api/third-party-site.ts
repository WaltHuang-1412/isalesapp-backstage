import axios from '@/library/axios'
import { IGetThirdPartySiteResponse } from '@/types/api/third-party-site'

export function getThirdPartySiteListApi(): Promise<
  IGetThirdPartySiteResponse[]
> {
  return axios.get('thirdpartysite')
}
