import axios from '@/library/axios'
import {
  IDeleteFileRequest,
  IGetFileStreamFileRequest,
  IPostFileResponse,
  IGetFileStreamFileResponse
} from '@/types/api/file'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function postFileApi(formData: any): Promise<IPostFileResponse> {
  return axios.post('file', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export function deleteFileApi(fileId: IDeleteFileRequest) {
  return axios.delete(`file/${fileId}`)
}

export function getFileStreamFileApi(
  fileId: IGetFileStreamFileRequest
): Promise<IGetFileStreamFileResponse> {
  return axios.get(`file/stream/file/${fileId}`)
}
