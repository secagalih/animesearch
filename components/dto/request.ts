export interface AnimeSearchRequest {
  query?: string
  page?: number
  type?: string
  status?: string
  rating?: string
  minScore?: string
  maxScore?: string
  genres?: string
  orderBy?: string
  sort?: string
  startDate?: string
  endDate?: string
  producers?: string
  letter?: string
  sfw?: string
  unapproved?: boolean
  limit?: number
}