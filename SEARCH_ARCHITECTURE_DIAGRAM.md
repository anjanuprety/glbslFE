# Search Feature - Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           APPLICATION ROOT                               │
│                          (main.tsx)                                      │
│                                                                          │
│  ┌────────────────────────────────────────────────────────────────┐    │
│  │                    HelmetProvider                               │    │
│  │  ┌──────────────────────────────────────────────────────────┐  │    │
│  │  │              LanguageProvider                             │  │    │
│  │  │  ┌────────────────────────────────────────────────────┐  │  │    │
│  │  │  │         SearchProvider (NEW)                       │  │  │    │
│  │  │  │                                                    │  │  │    │
│  │  │  │  • Search State Management                        │  │  │    │
│  │  │  │  • Fuzzy Matching Logic                           │  │  │    │
│  │  │  │  • Search Index (29 pages)                        │  │  │    │
│  │  │  │  • Relevance Scoring                              │  │  │    │
│  │  │  │                                                    │  │  │    │
│  │  │  │  ┌──────────────────────────────────────────┐    │  │  │    │
│  │  │  │  │       RouterProvider                      │    │  │  │    │
│  │  │  │  │                                           │    │  │  │    │
│  │  │  │  │  Main Layout (Main.tsx)                  │    │  │  │    │
│  │  │  │  │    ↓                                      │    │  │  │    │
│  │  │  │  │  Navbar (MODIFIED)                       │    │  │  │    │
│  │  │  │  │    ↓                                      │    │  │  │    │
│  │  │  │  │  SearchBar (NEW) ←─────────────┐         │    │  │  │    │
│  │  │  │  │    ↓                            │         │    │  │  │    │
│  │  │  │  │  Pages                          │         │    │  │  │    │
│  │  │  │  │    ↓                            │         │    │  │  │    │
│  │  │  │  │  Footer                         │         │    │  │  │    │
│  │  │  │  │                                 │         │    │  │  │    │
│  │  │  │  └──────────────────────────────────────────┘    │  │  │    │
│  │  │  │                                                    │  │  │    │
│  │  │  └────────────────────────────────────────────────────┘  │  │    │
│  │  │                                                           │  │    │
│  │  └───────────────────────────────────────────────────────────┘  │    │
│  │                                                                  │    │
│  └──────────────────────────────────────────────────────────────────┘    │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

## Component Hierarchy

```
Main.tsx
  └── Navbar.tsx
        ├── Logo
        ├── Navigation Links
        ├── SearchBar (NEW) ──────┐
        │     ├── Search Input     │
        │     ├── Clear Button     │
        │     └── Results Dropdown │
        │           ├── Loading    │
        │           ├── Results    │
        │           └── Empty      │
        └── Language Toggle        │
                                   │
                                   │ Uses useSearch() hook
                                   │
        ┌──────────────────────────┘
        │
        ▼
  SearchContext.tsx
    ├── Search State
    ├── Search Index
    ├── Fuzzy Matching
    └── Navigation Logic
```

## Data Flow

```
User Types Query
        │
        ▼
    Input Event
        │
        ▼
  setSearchQuery() ─────────────┐
        │                       │
        ▼                       │
  300ms Debounce               │
        │                       │
        ▼                       │
  performSearch()               │ SearchContext
        │                       │
        ├─► Get Current Language│
        │                       │
        ├─► Normalize Query    │
        │                       │
        ├─► For Each Index Item:│
        │   ├─► Compare Title   │
        │   ├─► Compare Keywords│
        │   └─► Calculate Score │
        │                       │
        ├─► Filter by Threshold │
        │   (score > 30%)       │
        │                       │
        ├─► Sort by Score       │
        │                       │
        └─► Take Top 10        │
                │               │
                ▼               │
          searchResults ────────┘
                │
                ▼
          SearchBar
                │
                ├─► Display Results
                │   ├─► Title
                │   ├─► Category
                │   └─► Score
                │
                └─► User Clicks
                        │
                        ▼
                  Navigate to Page
```

## Search Algorithm Flow

```
Query: "bord"
    │
    ├─► Search in English
    │   │
    │   ├─► Title: "Board of Directors"
    │   │   └─► Levenshtein("bord", "board") = 1 char difference
    │   │       └─► Similarity = 80%
    │   │
    │   ├─► Keywords: ["board", "directors", "leadership"]
    │   │   └─► Levenshtein("bord", "board") = 1 char difference
    │   │       └─► Similarity = 80%
    │   │
    │   └─► Final Score = max(80%, 80%) = 80%
    │
    └─► Compare with other items
        │
        ├─► "Management Team" → 15% (filtered out)
        ├─► "Corporate Team" → 12% (filtered out)
        └─► "Committee" → 45% (included)
            │
            ▼
        Results = [
          { title: "Board of Directors", score: 80% },
          { title: "Committee", score: 45% }
        ]
            │
            ▼
        Display in dropdown
```

## State Management

```
SearchContext.tsx
    │
    ├─── State Variables
    │    ├─► searchQuery: string
    │    ├─► searchResults: SearchResult[]
    │    └─► isSearching: boolean
    │
    ├─── Functions
    │    ├─► setSearchQuery()
    │    ├─► performSearch()
    │    ├─► clearSearch()
    │    ├─► navigateToResult()
    │    ├─► levenshteinDistance()
    │    └─► calculateSimilarity()
    │
    └─── Data
         └─► searchIndex: SearchResult[]
              ├─► 29 pages
              ├─► 58 language variants
              └─► ~300 keywords
```

## Search Index Structure

```
searchIndex: SearchResult[]
    │
    ├─► [0] Home
    │   ├─► id: 'home'
    │   ├─► title: 'Home'
    │   ├─► titleNe: 'गृहपृष्ठ'
    │   ├─► path: '/'
    │   ├─► category: 'Main'
    │   ├─► categoryNe: 'मुख्य'
    │   ├─► keywords: ['home', 'main', ...]
    │   └─► keywordsNe: ['गृहपृष्ठ', 'मुख्य', ...]
    │
    ├─► [1] About Us
    │   └─► ... (same structure)
    │
    ├─► [2] Board of Directors
    │   └─► ... (same structure)
    │
    └─► [28] Contact
        └─► ... (same structure)
```

## Component Communication

```
┌─────────────────┐
│   SearchBar     │  ←─────── User Input
└────────┬────────┘
         │ useSearch()
         ▼
┌─────────────────┐
│ SearchContext   │  ←─────── Search Logic
└────────┬────────┘
         │ useLanguage()
         ▼
┌─────────────────┐
│ LanguageContext │  ←─────── Current Language
└─────────────────┘
         │
         ▼
┌─────────────────┐
│ Translations    │  ←─────── Display Text
└─────────────────┘
```

## File Dependencies

```
main.tsx
  ├─► imports SearchProvider from contexts/SearchContext.tsx
  └─► wraps app with SearchProvider

Navbar.tsx
  ├─► imports SearchBar from Shared/SearchBar/SearchBar.tsx
  └─► renders SearchBar component

SearchBar.tsx
  ├─► imports useSearch from contexts/SearchContext.tsx
  ├─► imports useLanguage from contexts/LanguageContext.tsx
  └─► imports icons from react-icons

SearchContext.tsx
  ├─► imports useLanguage from contexts/LanguageContext.tsx
  ├─► imports useNavigate from react-router-dom
  └─► provides search functionality

translations.ts
  └─► contains search-related translations

index.css
  └─► contains search styling
```

## Workflow Sequence

```
1. App Starts
   └─► SearchProvider initializes
       └─► Search index loaded into memory

2. User Opens Page
   └─► Navbar renders
       └─► SearchBar renders (empty state)

3. User Types "loan"
   └─► Input onChange fires
       └─► setSearchQuery("loan")
           └─► Debounce timer starts (300ms)

4. Debounce Completes
   └─► performSearch("loan") executes
       ├─► Normalizes query
       ├─► Loops through search index
       ├─► Calculates scores
       ├─► Filters results (>30%)
       ├─► Sorts by score
       └─► Updates searchResults state

5. SearchBar Re-renders
   └─► Dropdown appears with results

6. User Clicks Result
   └─► navigateToResult() executes
       ├─► Calls navigate(path)
       ├─► Clears search
       └─► Closes dropdown

7. Page Changes
   └─► User at destination page
```

## Performance Optimization

```
Search Operation
    │
    ├─► Debounce (300ms)
    │   └─► Reduces computations
    │
    ├─► Static Index
    │   └─► No API calls
    │
    ├─► Memoization
    │   └─► Context value cached
    │
    ├─► Limited Results (10)
    │   └─► Fast rendering
    │
    └─► Threshold Filter (>30%)
        └─► Reduces noise
```

## Error Handling

```
SearchContext
    │
    ├─► Empty Query
    │   └─► Clear results
    │
    ├─► Short Query (<2 chars)
    │   └─► Don't search
    │
    ├─► No Results
    │   └─► Return empty array
    │
    ├─► Invalid Context
    │   └─► Throw error
    │
    └─► Navigation Error
        └─► React Router handles
```

## Styling Architecture

```
Tailwind Classes (Component Level)
    │
    ├─► SearchBar.tsx
    │   ├─► Input styling
    │   ├─► Dropdown styling
    │   └─► Result styling
    │
Custom CSS (Global Level)
    │
    └─► index.css
        ├─► .search-container
        ├─► .search-results-dropdown
        ├─► Custom scrollbar
        └─► Hover effects
```

## Bilingual Architecture

```
User Selects Language
        │
        ├─► LanguageContext updates
        │
        └─► SearchContext listens
                │
                ├─► getLocale() returns 'en' or 'ne'
                │
                └─► performSearch() uses:
                    │
                    ├─► language === 'ne'
                    │   ├─► titleNe
                    │   ├─► categoryNe
                    │   └─► keywordsNe
                    │
                    └─► language === 'en'
                        ├─► title
                        ├─► category
                        └─► keywords
```

## Legend

```
┌─────┐
│ Box │  = Component/Module
└─────┘

  ───►   = Data Flow

  ────   = Hierarchy/Contains

  ▼      = Direction

  (NEW)  = Newly Created

  (MODIFIED) = Modified Existing File
```

---

This diagram shows the complete architecture of the search feature implementation,
from the top-level app structure down to individual components and data flows.
