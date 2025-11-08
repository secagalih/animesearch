import axios from 'axios'
import { AnimeDetailResponse } from '@/components/dto/response'

const API_URL = 'https://api.jikan.moe/v4'

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const response = await axios.get<AnimeDetailResponse>(`${API_URL}/anime/${id}`)
    const anime = response.data.data
    
    return Response.json({
      id: anime.mal_id,
      title: anime.title,
      image: anime.images?.jpg?.large_image_url || anime.images?.jpg?.image_url,
      year: anime.year || 0,
      score: anime.score || 0,
      episodes: anime.episodes || 0,
      status: anime.status,
      synopsis: anime.synopsis || 'No synopsis available',
      genres: anime.genres?.map((g) => g.name) || [],
      studios: anime.studios?.map((s) => s.name) || [],
      season: anime.season ? `${anime.season.charAt(0).toUpperCase() + anime.season.slice(1)} ${anime.year}` : 'N/A',
      airedFrom: anime.aired?.from ? new Date(anime.aired.from).toLocaleDateString() : 'N/A',
      airedTo: anime.aired?.to ? new Date(anime.aired.to).toLocaleDateString() : 'N/A',
      source: anime.source || 'Unknown',
      duration: anime.duration || 'Unknown',
      rating: anime.rating || 'N/A'
    })
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return Response.json(
        { error: error.response?.data?.message || 'Failed to fetch anime details' },
        { status: error.response?.status ?? 500 }
      )
    }
    return Response.json({ error: 'Failed to fetch anime details' }, { status: 500 })
  }
}