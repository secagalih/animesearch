import { AnimeDetailPageView } from '@/components/pages/anime-detail';

export default async function AnimeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  return <AnimeDetailPageView animeId={id} />
}