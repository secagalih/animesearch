'use client'

import type React from 'react'
import { useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search, Settings2 } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Empty, EmptyDescription, EmptyMedia, EmptyTitle } from '../ui/empty'
import { Skeleton } from '../ui/skeleton'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import {
  searchAnime,
  setSearchQuery,
  setFilters,
  toggleShowAllFilters,
  clearResults,
  selectSearchQuery,
  selectAnimeList,
  selectCurrentPage,
  selectTotalPages,
  selectIsLoading,
  selectShowAllFilters,
  selectFilters,
  selectHasSearched,
} from '@/lib/features/searchAnimeSlice'
import { SmartPagination } from '../ui/pagination'

const YEARS = Array.from({ length: 30 }, (_, i) => new Date().getFullYear() - i)
const SEASONS = ["all", "winter", "spring", "summer", "fall"]
const STATUS_OPTIONS = ["all", "airing", "complete", "upcoming"]
const RATING_OPTIONS = ["all", "g", "pg", "pg13", "r", "rplus", "rx"]
const SCORE_OPTIONS = [
  { value: "all", label: "All Scores" },
  { value: "9.0", label: "9.0+" },
  { value: "8.0", label: "8.0+" },
  { value: "7.0", label: "7.0+" },
  { value: "6.0", label: "6.0+" },
  { value: "5.0", label: "5.0+" },
]
const ORDER_BY_OPTIONS = [
  { value: "score", label: "Score" },
  { value: "members", label: "Popularity" },
  { value: "aired", label: "Recently Aired" },
  { value: "title", label: "Title" },
  { value: "episodes", label: "Episodes" },
  { value: "mal_id", label: "ID" },
]
const LETTER_OPTIONS = ["all", ...Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i))]

const GENRES = [
  "all",
  "action",
  "adventure",
  "comedy",
  "drama",
  "ecchi",
  "fantasy",
  "hentai",
  "horror",
  "josei",
  "kids",
  "magic",
  "mahou-shoujo",
  "mecha",
  "military",
  "music",
  "mystery",
  "parody",
  "police",
  "psychological",
  "romance",
  "samurai",
  "school",
  "sci-fi",
  "seinen",
  "shoujo",
  "shoujo-ai",
  "shounen",
  "shounen-ai",
  "slice-of-life",
  "space",
  "sports",
  "supernatural",
  "thriller",
  "vampire",
  "yaoi",
  "yuri",
]

export function AnimeSearchPageView() {
  const dispatch = useAppDispatch()
  const searchQuery = useAppSelector(selectSearchQuery)
  const animeList = useAppSelector(selectAnimeList)
  const currentPage = useAppSelector(selectCurrentPage)
  const totalPages = useAppSelector(selectTotalPages)
  const isLoading = useAppSelector(selectIsLoading)
  const showAllFilters = useAppSelector(selectShowAllFilters)
  const filters = useAppSelector(selectFilters)
  const hasSearched = useAppSelector(selectHasSearched)

  const handleSearch = useCallback(
    (query: string, page = 1) => {
      if (!query.trim()) {
        dispatch(clearResults())
        return
      }
      dispatch(searchAnime({ query, page, filters }))
    },
    [dispatch, filters],
  )

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSearch(searchQuery, 1)
  }

  const handleFilterChange = useCallback(
    (newFilters: Parameters<typeof setFilters>[0]) => {
      dispatch(setFilters(newFilters))
      if (searchQuery.trim()) {
        handleSearch(searchQuery, 1)
      }
    },
    [dispatch, handleSearch, searchQuery],
  )

  const handlePageChange = useCallback(
    (page: number) => {
      if (page >= 1 && page <= totalPages && page !== currentPage) {
        handleSearch(searchQuery, page)
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    },
    [currentPage, handleSearch, searchQuery, totalPages],
  )

  return (
    <div className="min-h-screen">
      <section className="border-b backdrop-blur-md sticky top-0 z-50 bg-background/95">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-4 sm:py-6">
          <h1 className="text-xl sm:text-2xl font-bold mb-4">
            Anime Search
          </h1>
          
          {/* Desktop: Search + Filters in one row */}
          <div className="hidden lg:flex lg:flex-row gap-3 items-end mb-0">
            <div className="flex-1 min-w-0 flex gap-2">
              <form onSubmit={handleSearchSubmit} className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search anime..."
                  value={searchQuery}
                  onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                  className="pl-10 h-10"
                />
              </form>
              <Button 
                type="submit" 
                onClick={handleSearchSubmit}
                className="h-10 px-6 shrink-0"
              >
                Search
              </Button>
            </div>

            <div className="w-auto shrink-0">
              <label className="block text-sm font-medium mb-2 whitespace-nowrap">Genres</label>
              <Select value={filters.genres} onValueChange={(value) => handleFilterChange({ genres: value })}>
                <SelectTrigger className="h-10 w-auto min-w-[90px]">
                  <SelectValue placeholder="Any" />
                </SelectTrigger>
                <SelectContent>
                  {GENRES.map((genre) => (
                    <SelectItem key={genre} value={genre}>
                      {genre === "all" ? "Any" : genre.charAt(0).toUpperCase() + genre.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="w-auto shrink-0">
              <label className="block text-sm font-medium mb-2 whitespace-nowrap">Year</label>
              <Select value={filters.startDate} onValueChange={(value) => handleFilterChange({ startDate: value })}>
                <SelectTrigger className="h-10 w-auto min-w-[90px]">
                  <SelectValue placeholder="Any" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Any</SelectItem>
                  {YEARS.map((year) => (
                    <SelectItem key={year} value={year.toString()}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="w-auto shrink-0">
              <label className="block text-sm font-medium mb-2 whitespace-nowrap">Season</label>
              <Select value={filters.type} onValueChange={(value) => handleFilterChange({ type: value })}>
                <SelectTrigger className="h-10 w-auto min-w-[90px]">
                  <SelectValue placeholder="Any" />
                </SelectTrigger>
                <SelectContent>
                  {SEASONS.map((season) => (
                    <SelectItem key={season} value={season}>
                      {season === "all" ? "Any" : season.charAt(0).toUpperCase() + season.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="w-auto shrink-0">
              <label className="block text-sm font-medium mb-2 whitespace-nowrap">Format</label>
              <Select value={filters.rating} onValueChange={(value) => handleFilterChange({ rating: value })}>
                <SelectTrigger className="h-10 w-auto min-w-[90px]">
                  <SelectValue placeholder="Any" />
                </SelectTrigger>
                <SelectContent>
                  {RATING_OPTIONS.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option === "all" ? "Any" : option.toUpperCase()}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2 shrink-0">
              {hasSearched && <Button
                onClick={() => {
                  dispatch(setSearchQuery(''))
                  dispatch(setFilters({
                    query: '',
                    type: 'all',
                    status: 'all',
                    rating: 'all',
                    minScore: 'all',
                    maxScore: 'all',
                    genres: 'all',
                    orderBy: 'score',
                    sort: 'desc',
                    startDate: '',
                    endDate: '',
                    producers: '',
                    letter: 'all',
                    sfw: 'true',
                    unapproved: false,
                  }))
                  dispatch(clearResults())
                }}
                variant="outline"
                size="sm"
                className="gap-2"
              >
                Reset
              </Button>}
              <Button
                onClick={() => dispatch(toggleShowAllFilters())}
                variant="outline"
                size="sm"
                className="gap-2"
              >
                <Settings2 className="h-4 w-4" />
                More Filters
              </Button>
            </div>
          </div>

          {/* Mobile: Search + Filter Toggle */}
          <div className="lg:hidden space-y-3">
            <div className="w-full flex gap-2">
              <form onSubmit={handleSearchSubmit} className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search anime..."
                  value={searchQuery}
                  onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                  className="pl-10 h-10 text-sm"
                />
              </form>
              <Button 
                type="submit" 
                onClick={handleSearchSubmit}
                className="h-10 px-4 shrink-0"
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex gap-2">
              <Button
                onClick={() => dispatch(toggleShowAllFilters())}
                variant="outline"
                size="sm"
                className="flex-1 gap-2 text-sm"
              >
                <Settings2 className="h-4 w-4" />
                {showAllFilters ? 'Hide Filters' : 'Show Filters'}
              </Button>
              {hasSearched && <Button
                onClick={() => {
                  dispatch(setSearchQuery(''))
                  dispatch(setFilters({
                    query: '',
                    type: 'all',
                    status: 'all',
                    rating: 'all',
                    minScore: 'all',
                    maxScore: 'all',
                    genres: 'all',
                    orderBy: 'score',
                    sort: 'desc',
                    startDate: '',
                    endDate: '',
                    producers: '',
                    letter: 'all',
                    sfw: 'true',
                    unapproved: false,
                  }))
                  dispatch(clearResults())
                }}
                variant="outline"
                size="sm"
                className="gap-2 text-sm"
              >
                Reset
              </Button>}
            </div>
          </div>

          {/* Mobile Filters - Expandable */}
          {showAllFilters && (
            <div className="lg:hidden mt-4 space-y-3 pb-2">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium mb-1.5">Genres</label>
                  <Select value={filters.genres} onValueChange={(value) => handleFilterChange({ genres: value })}>
                    <SelectTrigger className="h-9 text-sm">
                      <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent>
                      {GENRES.map((genre) => (
                        <SelectItem key={genre} value={genre}>
                          {genre === "all" ? "Any" : genre.charAt(0).toUpperCase() + genre.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-xs font-medium mb-1.5">Year</label>
                  <Select value={filters.startDate} onValueChange={(value) => handleFilterChange({ startDate: value })}>
                    <SelectTrigger className="h-9 text-sm">
                      <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">Any</SelectItem>
                      {YEARS.map((year) => (
                        <SelectItem key={year} value={year.toString()}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-xs font-medium mb-1.5">Season</label>
                  <Select value={filters.type} onValueChange={(value) => handleFilterChange({ type: value })}>
                    <SelectTrigger className="h-9 text-sm">
                      <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent>
                      {SEASONS.map((season) => (
                        <SelectItem key={season} value={season}>
                          {season === "all" ? "Any" : season.charAt(0).toUpperCase() + season.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-xs font-medium mb-1.5">Format</label>
                  <Select value={filters.rating} onValueChange={(value) => handleFilterChange({ rating: value })}>
                    <SelectTrigger className="h-9 text-sm">
                      <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent>
                      {RATING_OPTIONS.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option === "all" ? "Any" : option.toUpperCase()}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-xs font-medium mb-1.5">Status</label>
                  <Select value={filters.status} onValueChange={(value) => handleFilterChange({ status: value })}>
                    <SelectTrigger className="h-9 text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {STATUS_OPTIONS.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option === "all" ? "Any" : option.charAt(0).toUpperCase() + option.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-xs font-medium mb-1.5">Min Score</label>
                  <Select value={filters.minScore} onValueChange={(value) => handleFilterChange({ minScore: value })}>
                    <SelectTrigger className="h-9 text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {SCORE_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}

          {/* Desktop Advanced Filters - Only show on desktop */}
          {showAllFilters && (
            <div className="hidden lg:grid lg:grid-cols-5 gap-4 pt-4 mt-4 border-t">
              {/* Status Filter */}
              <div>
                <label className="block text-xs font-medium mb-2">Status</label>
                <Select value={filters.status} onValueChange={(value) => handleFilterChange({ status: value })}>
                  <SelectTrigger className="h-10 text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {STATUS_OPTIONS.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option === "all" ? "Any" : option.charAt(0).toUpperCase() + option.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Min Score Filter */}
              <div>
                <label className="block text-xs font-medium mb-2">Min Score</label>
                <Select value={filters.minScore} onValueChange={(value) => handleFilterChange({ minScore: value })}>
                  <SelectTrigger className="h-10 text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {SCORE_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Max Score Filter */}
              <div>
                <label className="block text-xs font-medium mb-2">Max Score</label>
                <Select value={filters.maxScore} onValueChange={(value) => handleFilterChange({ maxScore: value })}>
                  <SelectTrigger className="h-10 text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {SCORE_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Order By Filter */}
              <div>
                <label className="block text-xs font-medium mb-2">Order By</label>
                <Select value={filters.orderBy} onValueChange={(value) => handleFilterChange({ orderBy: value })}>
                  <SelectTrigger className="h-10 text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {ORDER_BY_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Sort Filter */}
              <div>
                <label className="block text-xs font-medium mb-2">Sort</label>
                <Select value={filters.sort} onValueChange={(value) => handleFilterChange({ sort: value })}>
                  <SelectTrigger className="h-10 text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="asc">Ascending</SelectItem>
                    <SelectItem value="desc">Descending</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Letter Filter */}
              <div>
                <label className="block text-xs font-medium mb-2">Starts With</label>
                <Select value={filters.letter} onValueChange={(value) => handleFilterChange({ letter: value })}>
                  <SelectTrigger className="h-10 text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="max-h-60">
                    {LETTER_OPTIONS.map((letter) => (
                      <SelectItem key={letter} value={letter}>
                        {letter === "all" ? "Any" : letter}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-8 sm:py-12">
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <Card key={index} className="overflow-hidden">
                <Skeleton className="aspect-video w-full" />
                <CardContent className="pt-4 space-y-2">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {!hasSearched && animeList.length === 0 && (
          <Empty>
            <EmptyMedia>
              <Image src="/empty.svg" alt="Search" width={200} height={200} />
            </EmptyMedia>
            <EmptyTitle>Start Your Search </EmptyTitle>
            <EmptyDescription>Enter an anime title to search and discover your next favorite series</EmptyDescription>
          </Empty>
        )}

        {!isLoading && hasSearched && animeList.length === 0 && (
          <Empty>
            <EmptyMedia>
              <Image src="/empty2.jpeg" alt="Search" width={200} height={200} />
            </EmptyMedia>
            <EmptyTitle>No Results Found</EmptyTitle>
            <EmptyDescription>No anime found for &quot;{searchQuery}&quot;. Try different keywords or filters</EmptyDescription>
          </Empty>
        )}

        {!isLoading && animeList.length > 0 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
              {animeList.map((anime) => (
                <Link key={anime.id} href={`/details/${anime.id}`}>
                  <Card className="group h-full overflow-hidden transition-all hover:shadow-2xl hover:scale-105 cursor-pointer">
                    <div className="relative overflow-hidden aspect-video">
                      <Image
                        src={anime.image || '/placeholder.svg'}
                        alt={anime.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <CardContent className="pt-4">
                      <h3 className="font-semibold line-clamp-2 transition-colors">
                        {anime.title}
                      </h3>
                      <div className="mt-2 flex gap-2 text-xs text-muted-foreground">
                        <span>{anime.year}</span>
                        <span>•</span>
                        <span>★ {anime.score.toFixed(1)}</span>
                      </div>
                      <p className="mt-3 text-xs text-muted-foreground line-clamp-2">{anime.synopsis}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            <SmartPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </section>
    </div>
  )
}
