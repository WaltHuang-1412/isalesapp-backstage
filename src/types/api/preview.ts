export interface IPostPreviewRequest {
  preview_type: number | null
  preview_title: string | null
  preview_link: string | null
  preview: string | null
  publish_time: string | null
  publish_time_unix: number | null
  publish_status: number | null
  start_time: string | null
  end_time: string | null
  start_time_unix: number | null
  end_time_unix: number | null
}
export interface IGetPreviewRequest {
  preview_title: string | null
  page: number
  size: number
  sorting: string | null
  descending: boolean | null
}

export interface IGetPreviewResponse {
  items: IPreview[]
  offset: number
  size: number
  total: number
}

export interface IPreview {
  preview_id: number
  previewType: number
  preview_title: string
  preview_link: string
  preview: string
  preview_url: string
  publish_time: string
  publish_time_unix: number
  publish_status: number
  start_time: string
  end_time: string
  start_time_unix: number
  end_time_unix: number
}

export interface IPutPreviewRequest {
  preview_type: number | null
  preview_title: string | null
  preview_link: string | null
  preview: string | null
  publish_time: string | null
  publish_time_unix: number | null
  publish_status: number | null
  start_time: string | null
  end_time: string | null
  start_time_unix: number | null
  end_time_unix: number | null
}

export interface IPatchPreviewStatusRequest {
  status: number | null
}
