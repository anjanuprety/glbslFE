# Search Feature - Quick Start Guide

## 🚀 Getting Started

The search feature is now fully integrated into the GLBSL Frontend application. Follow this guide to start using it immediately.

---

## For End Users

### Desktop
1. Look at the top navigation bar
2. Find the search box on the right side (before language toggle)
3. Click and start typing
4. Results appear instantly as you type
5. Click any result to navigate to that page

### Mobile
1. Tap the hamburger menu (☰) to open navigation
2. Search bar appears at the top of the menu
3. Tap and start typing
4. Results appear in a dropdown
5. Tap any result to navigate

### Tips
- Type at least 2 characters to see results
- Search works in both English and Nepali
- Try partial words (e.g., "calc" for calculator)
- Typos are handled automatically
- Click the × button to clear search

---

## For Developers

### How to Run

1. **Install dependencies** (if not already done):
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

3. **Open browser**:
   Navigate to `http://localhost:3000`

4. **Test the search**:
   - Search bar is visible in the navbar
   - Try typing "loan", "board", "report", etc.
   - Try Nepali: "ऋण", "बोर्ड", "प्रतिवेदन"

### File Structure

```
src/
├── contexts/
│   ├── LanguageContext.tsx    # Existing
│   └── SearchContext.tsx      # NEW - Search logic
│
├── Shared/
│   ├── Navbar/
│   │   └── Navbar.tsx         # MODIFIED - Added SearchBar
│   └── SearchBar/
│       ├── SearchBar.tsx      # NEW - Search UI
│       └── index.ts           # NEW - Export
│
├── utils/
│   └── translations.ts        # MODIFIED - Added search translations
│
├── index.css                  # MODIFIED - Added search styles
└── main.tsx                   # MODIFIED - Added SearchProvider
```

### Key Components

#### 1. SearchContext (State Management)
```typescript
import { useSearch } from './contexts/SearchContext';

// In your component:
const { 
  searchQuery,      // Current search text
  setSearchQuery,   // Update search text
  searchResults,    // Array of results
  isSearching,      // Loading state
  clearSearch,      // Clear everything
  navigateToResult  // Navigate to result
} = useSearch();
```

#### 2. SearchBar (UI Component)
```typescript
import SearchBar from '../Shared/SearchBar/SearchBar';

// Desktop version
<SearchBar />

// Mobile version
<SearchBar isMobile={true} />
```

### Adding New Searchable Content

Edit `src/contexts/SearchContext.tsx` and add to the `searchIndex` array:

```typescript
{
  id: 'unique-identifier',
  title: 'Page Title in English',
  titleNe: 'पृष्ठ शीर्षक नेपालीमा',
  path: '/route-to-page',
  category: 'Category Name',
  categoryNe: 'श्रेणी नाम',
  keywords: ['keyword1', 'keyword2', 'alias'],
  keywordsNe: ['कुञ्जी शब्द१', 'कुञ्जी शब्द२']
}
```

**Example:**
```typescript
{
  id: 'faq-page',
  title: 'Frequently Asked Questions',
  titleNe: 'बारम्बार सोधिने प्रश्नहरू',
  path: '/faq',
  category: 'Help',
  categoryNe: 'सहायता',
  keywords: ['faq', 'questions', 'help', 'support'],
  keywordsNe: ['प्रश्न', 'सहायता']
}
```

### Customizing Search Behavior

#### Change Minimum Characters
In `SearchContext.tsx`, find:
```typescript
if (!query || query.trim().length < 2) {
```
Change `2` to your desired minimum.

#### Adjust Relevance Threshold
Find:
```typescript
.filter(result => result.score && result.score > 30)
```
Change `30` to adjust sensitivity (higher = stricter).

#### Change Max Results
Find:
```typescript
.slice(0, 10)
```
Change `10` to show more/fewer results.

#### Modify Debounce Delay
Find:
```typescript
setTimeout(() => {
  // search logic
}, 300);
```
Change `300` (milliseconds) to adjust delay.

### Styling Customization

#### Component-level (Tailwind)
Edit `src/Shared/SearchBar/SearchBar.tsx`:
```typescript
// Change background color
className="bg-white dark:bg-normalBlack"

// Change text color
className="text-gray-700 dark:text-gray-200"

// Change border
className="border border-gray-300 dark:border-gray-600"
```

#### Global styles (CSS)
Edit `src/index.css`:
```css
/* Custom scrollbar */
.search-results-dropdown::-webkit-scrollbar {
  width: 8px; /* Change width */
}

/* Hover effect */
.search-result-item {
  @apply hover:bg-gray-50; /* Change hover color */
}
```

### Translations

Add/modify in `src/utils/translations.ts`:
```typescript
'search.placeholder': {
  en: 'Search...',
  ne: 'खोज्नुहोस्...'
},
'search.no_results': {
  en: 'No results found',
  ne: 'कुनै परिणाम फेला परेन'
}
```

---

## Common Tasks

### Task 1: Add a New Page to Search
```typescript
// In SearchContext.tsx, add to searchIndex:
{
  id: 'new-page',
  title: 'New Feature',
  titleNe: 'नयाँ सुविधा',
  path: '/new-feature',
  category: 'Features',
  categoryNe: 'सुविधाहरू',
  keywords: ['new', 'feature', 'latest'],
  keywordsNe: ['नयाँ', 'सुविधा']
}
```

### Task 2: Change Search Bar Position
```typescript
// In Navbar.tsx, move the SearchBar component:
<div className="flex items-center gap-4">
  {/* Move SearchBar here */}
  <SearchBar />
  {/* Other navbar items */}
</div>
```

### Task 3: Add Search Analytics
```typescript
// In SearchContext.tsx, add tracking to performSearch:
const performSearch = (query: string) => {
  // ... existing code ...
  
  // Add your analytics tracking
  analytics.track('search_performed', {
    query: query,
    results_count: results.length,
    language: language
  });
};
```

### Task 4: Customize Result Display
```typescript
// In SearchBar.tsx, modify the result item:
<button className="...">
  <div className="...">
    {/* Add custom content */}
    <img src={result.icon} alt="" />
    <h4>{result.title}</h4>
    <span>{result.description}</span>
  </div>
</button>
```

---

## Debugging

### Issue: Search not appearing
**Check:**
1. Is `SearchProvider` in `main.tsx`?
2. Is `SearchBar` imported in `Navbar.tsx`?
3. Any console errors?

**Fix:**
```typescript
// Verify main.tsx has:
<SearchProvider>
  <RouterProvider router={router} />
</SearchProvider>

// Verify Navbar.tsx has:
import SearchBar from '../SearchBar/SearchBar';
```

### Issue: No results showing
**Check:**
1. Are you typing at least 2 characters?
2. Is the search index populated?
3. Is relevance threshold too high?

**Debug:**
```typescript
// In SearchContext.tsx, add console logs:
const performSearch = (query: string) => {
  console.log('Query:', query);
  console.log('Results:', results);
  console.log('Scores:', results.map(r => r.score));
};
```

### Issue: Language not switching
**Check:**
1. Is LanguageContext working?
2. Are translations defined?
3. Is localStorage saving language?

**Fix:**
```typescript
// Check localStorage in browser console:
localStorage.getItem('language')

// Should return 'en' or 'ne'
```

---

## Testing

### Manual Testing
```bash
# Start dev server
npm run dev

# Test these searches:
- "loan"      → Should find loan services
- "board"     → Should find board of directors
- "ऋण"       → Should find loan in Nepali
- "calc"      → Should find calculators
- "xyz123"    → Should show no results
```

### Browser Console Testing
```javascript
// Get search context (for debugging)
// This requires React DevTools

// Check if search index loaded:
console.log('Search index size:', searchIndex.length);

// Test fuzzy matching:
levenshteinDistance('board', 'bord'); // Should return 1

// Test similarity:
calculateSimilarity('loan', 'lona'); // Should return ~75%
```

---

## Performance

### Current Performance
- **Search Response**: <300ms
- **Index Size**: ~40 items
- **Memory Usage**: Minimal (<1MB)
- **Network**: None (all client-side)

### Optimization Tips
- Keep search index size reasonable (<100 items)
- Adjust debounce delay based on UX needs
- Use production build for best performance
- Monitor with React DevTools Profiler

---

## Resources

### Documentation
- `SEARCH_FEATURE_DOCUMENTATION.md` - Complete technical docs
- `SEARCH_IMPLEMENTATION_SUMMARY.md` - High-level overview
- `SEARCH_TESTING_CHECKLIST.md` - Testing guide
- This file - Quick start guide

### External Resources
- [Levenshtein Distance](https://en.wikipedia.org/wiki/Levenshtein_distance)
- [React Context API](https://react.dev/reference/react/useContext)
- [Fuzzy Matching](https://en.wikipedia.org/wiki/Approximate_string_matching)

---

## Support

### Getting Help
1. Check documentation files
2. Review inline code comments
3. Check browser console for errors
4. Use React DevTools for debugging

### Common Questions

**Q: How do I change the search algorithm?**
A: Edit the `performSearch` function in `SearchContext.tsx`.

**Q: Can I use a different fuzzy matching algorithm?**
A: Yes, replace `levenshteinDistance` with your preferred algorithm.

**Q: How do I add search to other components?**
A: Use the `useSearch()` hook in any component.

**Q: Can I make search server-side?**
A: Yes, modify `performSearch` to call an API instead.

---

## Next Steps

1. ✅ Search is ready to use
2. 🧪 Run through testing checklist
3. 🎨 Customize styling if needed
4. 📊 Add analytics tracking (optional)
5. 🚀 Deploy to production

---

**Happy Searching! 🔍**

For questions or issues, refer to the documentation files or check the inline code comments.
