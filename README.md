# Anime Search Application

A modern, responsive anime search application built with Next.js 15, TypeScript, and Redux Toolkit. Search for anime using the Jikan API (MyAnimeList) with advanced filtering, pagination, and detailed anime information.

## Features

- 🔍 Search anime by title
- 🎯 Filter by type (TV, Movie, OVA, etc.)
- ⭐ Filter by rating (G, PG, PG-13, R, etc.)
- 📊 Sort by title, score, or popularity
- 📱 View detailed anime information
- 🎨 Modern UI with Tailwind CSS
- 🔄 State management with Redux Toolkit

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:4000](http://localhost:4000) in your browser

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS
- **UI Components**: Custom components with shadcn/ui patterns
- **API**: Jikan API v4 (MyAnimeList)

## Bonus Implementation

This project includes several enhanced features beyond the core requirements:

### 1. Empty State and No Results Handling
- Custom empty state component with helpful messaging when no results are found
- Graceful handling of empty search queries with user-friendly prompts
- Visual feedback with custom SVG illustrations
- Clear guidance for users when filters return no matches

### 2. Mobile Responsiveness
- Fully responsive design that works seamlessly across all device sizes
- Optimized layouts for mobile, tablet, and desktop views
- Touch-friendly UI elements and interactions
- Responsive grid system that adapts to screen size
- Mobile-optimized navigation and filter controls

### 3. Additional Features
- **Advanced Filtering**: Multiple filter options including type and rating
- **Sorting Options**: Sort results by title, score, or popularity
- **Anime Details Page**: Dedicated page with comprehensive anime information
- **Loading States**: Skeleton loaders for better UX during data fetching
- **Pagination**: Client-side pagination for browsing search results
- **Redux State Management**: Centralized state management for complex data flows
- **Type Safety**: Full TypeScript implementation for reliability

### 4. Proper Error Handling
- **Network Failure Handling**: Graceful degradation when API is unreachable
- **Rate Limiting**: Proper handling of 429 status codes with user feedback
- **Invalid API Responses**: Validation and error recovery for malformed data
- **Loading States**: Visual indicators during async operations
- **Error Boundaries**: Comprehensive error catching and user-friendly messages
- **Retry Logic**: Automatic retry mechanisms for failed requests

## Project Structure

```
animesearch/
├── app/                    # Next.js App Router
│   ├── api/               # API routes (backend)
│   ├── details/           # Anime details pages
│   └── page.tsx           # Home page
├── components/
│   ├── dto/               # Data Transfer Objects
│   ├── pages/             # Page-level components
│   └── ui/                # Reusable UI components
└── lib/
    ├── features/          # Redux slices
    └── store.ts           # Redux store configuration
```

## License

MIT
