'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { ArrowLeft, Star, Calendar, Zap } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import {
  fetchAnimeDetail,
  clearAnimeDetail,
  selectAnime,
  selectIsLoading,
  selectError,
} from '@/lib/features/animeDetailSlice'

export function AnimeDetailPageView({ animeId }: { animeId: string }) {
  const dispatch = useAppDispatch()
  const anime = useAppSelector(selectAnime)
  const isLoading = useAppSelector(selectIsLoading)
  const error = useAppSelector(selectError)

  useEffect(() => {
    if (animeId) {
      dispatch(fetchAnimeDetail(animeId))
    }

    return () => {
      dispatch(clearAnimeDetail())
    }
  }, [animeId, dispatch])

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
          <Skeleton className="h-10 w-40 mb-8" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Poster Skeleton */}
            <div className="md:col-span-1">
              <Skeleton className="aspect-3/4 w-full rounded-lg" />
            </div>

            {/* Details Skeleton */}
            <div className="md:col-span-2 space-y-6">
              <div>
                <Skeleton className="h-10 w-3/4 mb-4" />
                <div className="flex gap-4">
                  <Skeleton className="h-6 w-20" />
                  <Skeleton className="h-6 w-20" />
                  <Skeleton className="h-6 w-20" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Skeleton className="h-24 w-full rounded-lg" />
                <Skeleton className="h-24 w-full rounded-lg" />
              </div>

              <Skeleton className="h-32 w-full rounded-lg" />
              <Skeleton className="h-48 w-full rounded-lg" />
              <Skeleton className="h-64 w-full rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !anime) {
    return (
      <div className="min-h-screen bg-background">
        <div className="mx-auto max-w-4xl px-4 py-12">
          <Link href="/">
            <Button variant="outline" className="mb-8 gap-2 bg-transparent">
              <ArrowLeft className="h-4 w-4" />
              Back to Search
            </Button>
          </Link>
          <Card>
            <CardContent className="pt-12 text-center">
              <p className="text-destructive text-lg">{error || "Anime not found"}</p>
              <p className="text-muted-foreground mt-2">
                The anime you&apos;re looking for doesn&apos;t exist or has been removed.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-4xl px-4 py-6 sm:py-8 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link href="/">
          <Button variant="outline" className="mb-6 sm:mb-8 gap-2 bg-transparent text-sm sm:text-base">
            <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Back to Search</span>
            <span className="sm:hidden">Back</span>
          </Button>
        </Link>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Poster Image */}
          <div className="md:col-span-1">
            <div className="sticky top-8">
              <div className="overflow-hidden rounded-lg shadow-lg bg-muted aspect-3/4 relative">
                <Image 
                  src={anime.image || '/placeholder.svg'} 
                  alt={anime.title} 
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="md:col-span-2 space-y-4 sm:space-y-6">
            {/* Title and Rating */}
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4">{anime.title || 'Untitled'}</h1>
              <div className="flex flex-wrap gap-2 sm:gap-4 items-center text-xs sm:text-sm">
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 fill-primary text-primary" />
                  <span className="font-semibold text-lg">
                    {anime.score && anime.score > 0 ? anime.score.toFixed(1) : 'N/A'}/10
                  </span>
                </div>
                <span className="text-muted-foreground">•</span>
                <span className="text-muted-foreground">{anime.status || 'Unknown'}</span>
                <span className="text-muted-foreground">•</span>
                <span className="text-muted-foreground">{anime.year || 'N/A'}</span>
              </div>
            </div>

            {/* Quick Info Cards */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <Card>
                <CardContent className="pt-3 sm:pt-4">
                  <div className="flex items-start gap-2 sm:gap-3">
                    <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-primary mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs sm:text-sm text-muted-foreground">Episodes</p>
                      <p className="text-lg sm:text-xl font-semibold text-foreground">{anime.episodes || "N/A"}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-3 sm:pt-4">
                  <div className="flex items-start gap-2 sm:gap-3">
                    <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-primary mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs sm:text-sm text-muted-foreground">Season</p>
                      <p className="text-base sm:text-lg font-semibold text-foreground">{anime.season || "N/A"}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Genres */}
            {anime.genres && anime.genres.length > 0 && (
              <Card>
                <CardHeader className="pb-3 sm:pb-6">
                  <CardTitle className="text-base sm:text-lg">Genres</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {anime.genres.map((genre) => (
                      <span
                        key={genre}
                        className="inline-block bg-primary/10 text-primary px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm font-medium"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Synopsis */}
            <Card>
              <CardHeader className="pb-3 sm:pb-6">
                <CardTitle className="text-base sm:text-lg">Synopsis</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/90 leading-relaxed whitespace-pre-wrap text-sm sm:text-base">
                  {anime.synopsis || 'No synopsis available'}
                </p>
              </CardContent>
            </Card>

            {/* Additional Information */}
            <Card>
              <CardHeader className="pb-3 sm:pb-6">
                <CardTitle className="text-base sm:text-lg">Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <p className="text-xs sm:text-sm text-muted-foreground">Source</p>
                    <p className="font-medium text-foreground text-sm sm:text-base">{anime.source || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-muted-foreground">Duration</p>
                    <p className="font-medium text-foreground text-sm sm:text-base">{anime.duration || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-muted-foreground">Rating</p>
                    <p className="font-medium text-foreground text-sm sm:text-base">{anime.rating || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-muted-foreground">Status</p>
                    <p className="font-medium text-foreground text-sm sm:text-base">{anime.status || 'Unknown'}</p>
                  </div>
                </div>

                {anime.studios && anime.studios.length > 0 && (
                  <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t">
                    <p className="text-xs sm:text-sm text-muted-foreground mb-2">Studios</p>
                    <p className="font-medium text-foreground text-sm sm:text-base">{anime.studios.join(", ")}</p>
                  </div>
                )}

                {anime.airedFrom && (
                  <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t">
                    <p className="text-xs sm:text-sm text-muted-foreground">Aired</p>
                    <p className="font-medium text-foreground text-sm sm:text-base">
                      {anime.airedFrom}
                      {anime.airedTo && ` to ${anime.airedTo}`}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
