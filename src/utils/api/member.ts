import axios from '@/library/axios'
import {
  IGetMembersRequest,
  IGetMembersResponse,
  IGetMemberResponse,
  IPutMemberRequest,
  IGetMemberPointRequest,
  IGetMemberPointResponse,
  IPostMemberPointRequest,
  IGetMemberOrdersRequest,
  IGetMemberOrdersResponse,
  IGetMemberReportRequest,
  IGetMemberReportResponse,
  IGetMemberReportByMemberIdRequest,
  IGetMemberReportByMemberIdResponse
} from '@/types/api/member'

export function getMembersApi(
  request: IGetMembersRequest
): Promise<IGetMembersResponse> {
  return axios.get('members', { params: request })
}

export function getMemberApi(member_id: number): Promise<IGetMemberResponse> {
  return axios.get(`members/${member_id}`)
}

export function putMemberApi(member_id: number, request: IPutMemberRequest) {
  return axios.put(`members/${member_id}`, { ...request })
}

export function getMemberPoint(
  request: IGetMemberPointRequest
): Promise<IGetMemberPointResponse> {
  return axios.get('members/point', { params: request })
}

export function postMemberPoint(request: IPostMemberPointRequest) {
  return axios.post('members/point', request)
}

export function getMemberOrders(
  member_id: number,
  request: IGetMemberOrdersRequest
): Promise<IGetMemberOrdersResponse> {
  return axios.get(`members/${member_id}/orders`, { params: request })
}

export function getMemberReport(
  request: IGetMemberReportRequest
): Promise<IGetMemberReportResponse> {
  return axios.get(`members/report`, { params: request })
}

export function getMemberReportByMemberId(
  request: IGetMemberReportByMemberIdRequest
): Promise<IGetMemberReportByMemberIdResponse> {
  return axios.get(`members/report/${request.memberId}`, { params: request })
}
