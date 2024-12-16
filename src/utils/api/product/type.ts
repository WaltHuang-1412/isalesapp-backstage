export interface ICreateProductItemRequest {
  id?: string | null
  productName: string | null
  brandId: number | null
  productKindId: number | null
  productType: string | null
  basePrice: number | null
  costPrice: number | null
  warrantyYear: number | null
  note: string | null
}
