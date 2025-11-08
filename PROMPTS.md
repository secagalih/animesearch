# AI Assistance Prompts
## Project Entries

<!-- Add your entries below -->

### UI Components Generation (v0.app)
**Context:** Need to create anime search and detail pages with modern UI using shadcn components. Building a user-friendly interface for browsing and viewing anime information.

**Prompt:**
```
create anime sarch page with pagination, with can click to get detail pages about selected anime use shadcn
```

**Tool Used:** https://v0.app/chat/

**Results:**
- Generated search page layout with shadcn/ui components
- Implemented pagination controls
- Created detail page structure with routing
- Provided base component structure with Tailwind styling

**Files Affected:**
- `components/pages/anime-search.tsx`
- `components/pages/anime-detail.tsx`
- `components/ui/pagination.tsx`
- `components/ui/skeleton.tsx`

**Notes:**
- Required manual integration with Redux store for state management
- Added API route handlers for data fetching
- Enhanced with filtering capabilities and responsive design

---

### Redux State Management Integration (Cursor AI)
**Context:** Needed to integrate Redux for centralized state management in anime search and detail pages, replacing local component state.

**Prompt:**
```
@anime-search.tsx apply redux for anime search
```

**Tool Used:** Cursor AI

**Results:**
- Created Redux slice for anime search (`lib/features/searchAnimeSlice.ts`)
- Created Redux slice for anime detail (`lib/features/animeDetailSlice.ts`)
- Configured Redux store with both reducers
- Implemented async thunks for API calls
- Added typed hooks for Redux (useAppDispatch, useAppSelector)
- Migrated component state to Redux
- Added selectors for accessing state

**Files Affected:**
- `lib/features/searchAnimeSlice.ts` (new)
- `lib/features/animeDetailSlice.ts` (new)
- `lib/store.ts` (updated)
- `lib/hooks.ts` (new)
- `components/pages/anime-search.tsx` (refactored)
- `components/pages/anime-detail.tsx` (refactored)

**Notes:**
- All state management now handled by Redux
- Removed useState hooks in favor of Redux selectors
- Consistent pattern across search and detail pages
- Added `hasSearched` state to Redux for better empty state handling

---

### API Integration & Data Fetching (Cursor AI)
**Context:** Required proper integration with Jikan API for anime search and detail pages, including error handling and response transformation.

**Prompts:**
```
integrate api anime and detail
use response from components/dto
@route.ts use request from components/dto/request.ts
fix fetch api in anime detail
```

**Tool Used:** Cursor AI

**Results:**
- Created API routes using Next.js App Router
- Integrated Jikan API v4 for anime data
- Implemented request/response DTOs for type safety
- Added proper error handling with axios
- Transformed API responses to simplified format
- Fixed undefined errors in detail page
- Added response validation
- Configured Next.js Image for external CDN

**Files Affected:**
- `app/api/anime/route.ts` (new) - Search endpoint
- `app/api/anime/[id]/route.ts` (new) - Detail endpoint
- `components/dto/request.ts` (used)
- `components/dto/response.ts` (used)
- `next.config.ts` (added remotePatterns)
- `components/pages/anime-detail.tsx` (improved error handling)

**Notes:**
- Used axios for HTTP requests with proper typing
- Map frontend filter names to Jikan API parameters
- Return pagination metadata from API
- Handle edge cases (missing data, API errors)
- Added null checks for optional fields

---

### Responsive Design & Mobile Optimization (Cursor AI)
**Context:** Needed to make the application mobile-friendly with proper responsive layouts, loading states, and optimized filter UI.

**Prompts:**
```
add loading skeleton from shadcn, and make this page is responsive for mobile
anime search filter when on mobile is not very good fix it
```

**Tool Used:** Cursor AI

**Results:**
- Created Skeleton component for loading states
- Replaced spinner with card-based skeletons
- Added responsive breakpoints (sm, md, lg)
- Optimized filter layout for mobile
- Created collapsible filter section for mobile
- Implemented 2-column grid for mobile filters
- Made desktop filters inline with search
- Added responsive text sizing
- Optimized touch targets for mobile

**Files Affected:**
- `components/ui/skeleton.tsx` (new)
- `components/pages/anime-search.tsx` (responsive updates)
- `components/pages/anime-detail.tsx` (responsive updates)

**Key Changes:**
- **Search Page**: Separate mobile (collapsible) and desktop (inline) layouts
- **Loading States**: 8 skeleton cards matching actual content structure
- **Mobile Filters**: Toggle button + 2-column grid when expanded
- **Desktop Filters**: All inline beside search bar
- **Typography**: Scales from `text-xs` to `text-base` across breakpoints
- **Spacing**: Compact on mobile (`gap-3`), standard on desktop (`gap-4`)

**Notes:**
- Used Tailwind's responsive prefixes (sm:, md:, lg:)
- Hidden/shown elements with `hidden lg:flex` and `lg:hidden`
- Mobile-first approach with progressive enhancement

---

### Search Layout Optimization (Cursor AI)
**Context:** Optimized desktop search layout to maximize search bar width while making filters compact and content-fitted.

**Prompts:**
```
make the filter option is side the serch when desktop
i want more width on search
make every filter width when desktop mode fit the content of component so the search is wider
```

**Tool Used:** Cursor AI

**Results:**
- Search bar uses `flex-1` to take all available space
- Filters use `w-auto shrink-0` to fit content
- Labels use `whitespace-nowrap` to prevent wrapping
- SelectTrigger uses `w-auto min-w-[90px]` for compact sizing
- Buttons have `shrink-0` to prevent compression
- Removed unused function to keep code clean

**Files Affected:**
- `components/pages/anime-search.tsx`

**Layout Result:**
```
Desktop: [────── Search ──────] [G][Y][S][F] Reset More
Mobile:  [Search]
         [Show Filters] [Reset]
         Grid layout when expanded
```

**Notes:**
- Search bar now significantly wider on desktop
- Filters take minimum necessary space
- Better use of horizontal real estate
- No layout shift or overflow issues

---

### Code Quality & Best Practices (Cursor AI)
**Context:** Throughout development, maintained code quality by removing unused code, fixing linter errors, and following best practices.

**Actions Taken:**
- Removed unused constants (ANIME_TYPES)
- Removed unused functions (handleNextPage, handlePrevPage)
- Fixed Tailwind CSS class warnings
- Replaced `<img>` with Next.js `<Image>` component
- Wrapped callbacks with `useCallback` for optimization
- Added proper TypeScript types throughout
- Removed console.log statements
- Created reusable SmartPagination component
- Extracted pagination logic to UI component

**Results:**
- Zero linter errors
- Optimized performance with React hooks
- Clean, maintainable codebase
- Follows Next.js and React best practices
- Type-safe throughout with TypeScript

---

