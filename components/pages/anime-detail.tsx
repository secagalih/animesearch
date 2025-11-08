'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { ScoreBadge } from '@/components/ui/score-badge'
import { ArrowLeft, Calendar, Zap } from 'lucide-react'
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
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className='min-h-screen'
    >
      <div className='mx-auto max-w-4xl px-4 py-6 sm:py-8 sm:px-6 lg:px-8'>
        {/* Back Button */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Link href='/'>
            <Button variant='outline' className='mb-6 sm:mb-8 gap-2 bg-transparent text-sm sm:text-base hover:scale-105 transition-transform'>
              <ArrowLeft className='h-3 w-3 sm:h-4 sm:w-4' />
              <span className='hidden sm:inline'>Back to Search</span>
              <span className='sm:hidden'>Back</span>
            </Button>
          </Link>
        </motion.div>

        {/* Main Content */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8'>
          {/* Poster Image */}
          <motion.div 
            className='md:col-span-1'
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, type: 'spring' }}
          >
            <div className='sticky top-8'>
              <motion.div 
                className='overflow-hidden rounded-lg shadow-2xl bg-muted aspect-3/4 relative'
                whileHover={{ scale: 1.02, rotate: 1 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <Image 
                  src={anime.image || '/placeholder.svg'} 
                  alt={anime.title} 
                  fill
                  className='object-cover'
                  priority
                />
                {/* Glow effect on hover */}
                <motion.div 
                  className='absolute inset-0 bg-gradient-to-t from-purple-500/20 via-transparent to-transparent'
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            </div>
          </motion.div>

          {/* Details */}
          <div className='md:col-span-2 space-y-4 sm:space-y-6'>
            {/* Title and Rating */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-3 sm:mb-4'>
                {anime.title || 'Untitled'}
              </h1>
              <div className='flex flex-wrap gap-2 sm:gap-4 items-center text-xs sm:text-sm'>
                {anime.score && anime.score > 0 && (
                  <ScoreBadge score={anime.score} size='md' />
                )}
                <span className='text-muted-foreground'>•</span>
                <span className='text-muted-foreground font-medium'>{anime.status || 'Unknown'}</span>
                <span className='text-muted-foreground'>•</span>
                <span className='text-muted-foreground font-medium'>{anime.year || 'N/A'}</span>
              </div>
            </motion.div>

            {/* Quick Info Cards */}
            <motion.div 
              className='grid grid-cols-2 gap-3 sm:gap-4'
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <motion.div whileHover={{ scale: 1.05 }} transition={{ type: 'spring' }}>
                <Card className='border-2 hover:border-primary/50 transition-colors'>
                  <CardContent className='pt-3 sm:pt-4'>
                    <div className='flex items-start gap-2 sm:gap-3'>
                      <Zap className='h-4 w-4 sm:h-5 sm:w-5 text-primary mt-0.5 shrink-0' />
                      <div>
                        <p className='text-xs sm:text-sm text-muted-foreground'>Episodes</p>
                        <p className='text-lg sm:text-xl font-semibold text-foreground'>{anime.episodes || 'N/A'}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} transition={{ type: 'spring' }}>
                <Card className='border-2 hover:border-primary/50 transition-colors'>
                  <CardContent className='pt-3 sm:pt-4'>
                    <div className='flex items-start gap-2 sm:gap-3'>
                      <Calendar className='h-4 w-4 sm:h-5 sm:w-5 text-primary mt-0.5 shrink-0' />
                      <div>
                        <p className='text-xs sm:text-sm text-muted-foreground'>Season</p>
                        <p className='text-base sm:text-lg font-semibold text-foreground'>{anime.season || 'N/A'}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>

            {/* Genres */}
            {anime.genres && anime.genres.length > 0 && (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <Card className='border-2 hover:border-primary/30 transition-colors'>
                  <CardHeader className='pb-3 sm:pb-6'>
                    <CardTitle className='text-base sm:text-lg'>Genres</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className='flex flex-wrap gap-1.5 sm:gap-2'>
                      {anime.genres.map((genre, index) => (
                        <motion.span
                          key={genre}
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ delay: 0.7 + index * 0.05, type: 'spring' }}
                          whileHover={{ scale: 1.1, y: -2 }}
                          className='inline-block bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-primary px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm font-medium border border-primary/30 cursor-default'
                        >
                          {genre}
                        </motion.span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Synopsis */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <Card className='border-2 hover:border-primary/30 transition-colors'>
                <CardHeader className='pb-3 sm:pb-6'>
                  <CardTitle className='text-base sm:text-lg'>Synopsis</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className='text-foreground/90 leading-relaxed whitespace-pre-wrap text-sm sm:text-base'>
                    {anime.synopsis || 'No synopsis available'}
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Additional Information */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <Card className='border-2 hover:border-primary/30 transition-colors'>
                <CardHeader className='pb-3 sm:pb-6'>
                  <CardTitle className='text-base sm:text-lg'>Information</CardTitle>
                </CardHeader>
                <CardContent className='space-y-3'>
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
          </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
