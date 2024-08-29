import axios from '@/library/axios'
import {
  IPostPreviewRequest,
  IGetPreviewRequest,
  IGetPreviewResponse,
  IPutPreviewRequest,
  IPatchPreviewStatusRequest
} from '@/types/api/preview'

export function postPreviewApi(request: IPostPreviewRequest) {
  return axios.post('preview', request)
}

export function getPreviewsApi(
  payload: IGetPreviewRequest
): Promise<IGetPreviewResponse> {
  return axios.get('preview', { params: payload })
}

export function putPreviewApi(previewId: number, request: IPutPreviewRequest) {
  return axios.put(`preview/${previewId}`, request)
}

export function getPreviewApi(
  previewId: number | null
): Promise<IGetPreviewResponse> {
  return axios.get(`preview/${previewId}`)
}

export function patchPreviewStatusApi(
  previewId: number,
  request: IPatchPreviewStatusRequest
) {
  return axios.patch(`preview/${previewId}/status`, request)
}
