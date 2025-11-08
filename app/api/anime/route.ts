import axios from 'axios'
import { AnimeSearchResponse } from '@/components/dto/response'
import { AnimeSearchRequest } from '@/components/dto/request'

const API_URL = 'https://api.jikan.moe/v4'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    
    const searchRequest: AnimeSearchRequest = {
      query: searchParams.get('query') || undefined,
      page: searchParams.get('page') ? Number(searchParams.get('page')) : undefined,
      type: searchParams.get('type') || undefined,
      status: searchParams.get('status') || undefined,
      rating: searchParams.get('rating') || undefined,
      minScore: searchParams.get('minScore') || undefined,
      maxScore: searchParams.get('maxScore') || undefined,
      genres: searchParams.get('genres') || undefined,
      orderBy: searchParams.get('orderBy') || undefined,
      sort: searchParams.get('sort') || undefined,
      startDate: searchParams.get('startDate') || undefined,
      endDate: searchParams.get('endDate') || undefined,
      producers: searchParams.get('producers') || undefined,
      letter: searchParams.get('letter') || undefined,
      sfw: searchParams.get('sfw') || undefined,
      unapproved: searchParams.get('unapproved') === 'true',
      limit:20
    }
    
    const params: Record<string, string> = {}
    
    if (searchRequest.query?.trim()) params.q = searchRequest.query
    if (searchRequest.page) params.page = searchRequest.page.toString()
    if (searchRequest.type && searchRequest.type !== 'all') params.type = searchRequest.type
    if (searchRequest.status && searchRequest.status !== 'all') params.status = searchRequest.status
    if (searchRequest.rating && searchRequest.rating !== 'all') params.rating = searchRequest.rating
    if (searchRequest.minScore && searchRequest.minScore !== 'all') params.min_score = searchRequest.minScore
    if (searchRequest.maxScore && searchRequest.maxScore !== 'all') params.max_score = searchRequest.maxScore
    if (searchRequest.genres && searchRequest.genres !== 'all') params.genres = searchRequest.genres
    if (searchRequest.orderBy) params.order_by = searchRequest.orderBy
    if (searchRequest.sort) params.sort = searchRequest.sort
    if (searchRequest.startDate && searchRequest.startDate !== 'none') params.start_date = searchRequest.startDate
    if (searchRequest.endDate) params.end_date = searchRequest.endDate
    if (searchRequest.producers) params.producers = searchRequest.producers
    if (searchRequest.letter && searchRequest.letter !== 'all') params.letter = searchRequest.letter
    if (searchRequest.sfw) params.sfw = searchRequest.sfw
    if (searchRequest.unapproved) params.unapproved = 'true'
    if (searchRequest.limit) params.limit = searchRequest.limit.toString()
    const response = await axios.get<AnimeSearchResponse>(`${API_URL}/anime`, { params })
    
    return Response.json({
      results: response.data.data.map((anime) => ({
        id: anime.mal_id,
        title: anime.title,
        image: anime.images?.jpg?.large_image_url || anime.images?.jpg?.image_url,
        year: anime.year || 0,
        score: anime.score || 0,
        episodes: anime.episodes || 0,
        status: anime.status,
        synopsis: anime.synopsis || 'No synopsis available',
        genres: anime.genres?.map((g) => g.name) || []
      })),
      total: response.data.pagination?.items?.total || 0,
      pagination: {
        currentPage: response.data.pagination?.current_page || 1,
        lastVisiblePage: response.data.pagination?.last_visible_page || 1,
        hasNextPage: response.data.pagination?.has_next_page || false,
      }
    })
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return Response.json({ error: error.response?.data }, { status: error.response?.status ?? 500 })
    }
    return Response.json({ error: 'Failed to fetch anime' }, { status: 500 })
  }
}