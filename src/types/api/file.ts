export interface IPostFileRequest {
  file: Blob | File
}
export interface IPostFileResponse {
  url: string | undefined
  file_id: string | undefined
}

export interface IDeleteFileRequest {
  fileId: string
}

export interface IGetFileStreamFileRequest {
  fileId: string
}

export interface IGetFileStreamFileResponse {
  url: string | null
  file_id: string | null
}
