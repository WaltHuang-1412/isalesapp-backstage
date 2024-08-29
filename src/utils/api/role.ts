import axios from '@/library/axios'
import { IGetRoleListRequest, IGetRoleListResponse } from '@/types/api/role'

export function getRolesApi(
  payload: IGetRoleListRequest
): Promise<IGetRoleListResponse> {
  return axios.get('roles', { params: payload })
}
