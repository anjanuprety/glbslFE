# Copilot Instructions for GLBSL Frontend

## Project Overview
React + TypeScript + Vite application for Gurans Bank (GLBSL) with Strapi CMS backend integration. Bilingual support (English/Nepali) with locale-aware content fetching.

## Architecture & Data Flow

### Backend Integration
- **CMS**: Strapi 5.23.0 headless CMS (default: `localhost:1337`, production: DigitalOcean)
- **API Service**: Centralized in `src/services/strapi.ts` with axios instance
- **Locale Strategy**: Fetch content based on `localStorage.getItem('language')` ('en' or 'ne')
- **Media URLs**: Transform relative paths via `getStrapiMediaUrl()` helper

### Key Service Modules (src/services/strapi.ts)
```typescript
aboutService      // Board members, teams, committees, org structure
servicesService   // Loan products, savings, remittance, member welfare
reportsService    // Annual reports, quarterly reports, AGM minutes
noticesService    // Public notices by type (career, general, etc.)
branchesService   // Branch location data
```

**Pattern**: All fetch functions use `getLocale()` internally and include `&populate=*` for media relations.

### Internationalization (i18n)
- **Context**: `LanguageContext` provides `{ language, setLanguage, t }` via `useLanguage()` hook
- **Translations**: Centralized key-value pairs in `src/utils/translations.ts`
- **Usage**: Always use `t('translation.key')` in components, never hardcoded strings
- **Storage**: Language persisted to `localStorage` on change, triggers content refetch

### Component Patterns

#### Data Fetching Standard
```tsx
// Example: src/Pages/About/BoardOfDirectors.tsx
const [data, setData] = useState<any[]>([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null);
const { language } = useLanguage(); // Include for refetch on language change

useEffect(() => {
  const fetchData = async () => {
    try {
      setLoading(true);
      const result = await aboutService.getBoardMembers();
      const mapped = result.map(d => ({
        ...mapStrapiPersonData(d),
        image: getStrapiMediaUrl(d.image?.url)
      }));
      setData(mapped);
    } catch (err) {
      setError("Failed to load data");
    } finally {
      setLoading(false);
    }
  };
  fetchData();
}, [language]); // Always depend on language for CMS-backed pages
```

#### Calculator Components with Dynamic Data
```tsx
// Example: EMICalculatorPage, InterestCalculatorPage
// Fetch product data from Strapi, handle rate field parsing
const [products, setProducts] = useState<Product[]>([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await servicesService.getLoanProducts(); // or getSavingsProducts()
      const mapped = data.map((item: any) => ({
        id: item.id,
        name: item.name || item.attributes?.name,
        rate: (item.rate || item.attributes?.rate || '0').replace('%', '').trim()
      }));
      setProducts(mapped);
    } finally {
      setLoading(false);
    }
  };
  fetchProducts();
}, [language]);
```

#### Strapi Data Mapping
- Use `mapStrapiPersonData()` for person entities (handles nested attributes)
- Use `renderStrapiBlocks()` for rich text fields (converts blocks to plain text)
- Always check for both direct and `attributes.*` nested structures
- Strip `%` symbols from rate fields before calculations: `.replace('%', '').trim()`

## Critical Workflows

### Development Commands
```bash
npm run dev           # Vite dev server on port 3000 (configured)
npm run dev:5173      # Alternative port 5173
npm run build         # Production build (ES2015 target, no minify)
npm run preview       # Preview production build
npm run lint          # ESLint check
```

### Environment Configuration
- **Required Variable**: `VITE_STRAPI_API_URL` (defaults to `http://localhost:1337`)
- **Production**: `https://gurans-cms-dlm49.ondigitalocean.app` (see PRODUCTION_FIXES.md)
- Access via `import.meta.env.VITE_STRAPI_API_URL` (Vite convention)

### Routing Structure (src/Router/Router.tsx)
- **Layout**: `Main.tsx` wraps all routes (Navbar, Footer, ScrollToTop, AOS init)
- **Nested Routes**: About, Services, Reports, Career, Online, Gunaso sections
- **Dynamic Pages**: Services pull data from Strapi at runtime (no static routes)

## Project-Specific Conventions

### Styling
- **Framework**: Tailwind CSS + Flowbite plugin
- **Dark Mode**: `dark:` classes applied throughout (e.g., `dark:bg-normalBlack`)
- **Custom Colors**: 
  - `khaki` (yellow-gold color for accents and CTAs)
  - `lightBlack` (dark green for primary backgrounds)
  - `normalBlack` (medium green for secondary backgrounds)
- **Fonts**: 
  - `font-Garamond`: Headings (Cormorant Garamond)
  - `font-Lora`: Body text
  - `font-Nepali`: Nepali text (Noto Sans Devanagari)
- **Responsive**: Custom breakpoints (esm:480px, sm:576px, lg:992px, xl:1200px, 2xl:1400px)

### Form Handling
- **Libraries**: Formik + Yup (available but sparsely used; check for plain controlled forms)
- **Validation**: See `src/utils/validation.ts` for custom validators
- **Example**: `ApplyForLoanPage.tsx` uses plain React state (no Formik)

### File Organization
- **Pages**: Domain-organized (`Pages/About/`, `Pages/Services/`, `Pages/InnerPage/`)
- **Shared**: Reusable UI (`Shared/Navbar/`, `Shared/Footer/`, `Shared/ErrorPage/`)
- **Components**: Feature-specific (`Components/Reports/`, `Components/Rooms/`)
- **Types**: TypeScript types in `src/types/` (language.ts, index.ts)

### Navigation
- **Active Links**: Use `NavLink` with custom className logic (see Navbar.tsx)
- **Breadcrumbs**: `BreadCrumb` component for inner pages (props: title, home)
- **Language Toggle**: Top-right in Navbar (EN ⇄ NE)

## Integration Points

### Strapi Content Types
- **Single Types**: `about-us-setting`, `organization-structure`, `remittance-service`, `member-welfare-servicee` (note typo in CMS)
- **Collections**: `people`, `committees`, `loan-products`, `savings-products`, `reports`, `notices`, `branches`
- **Person Types**: Enum filter `personType` (boardMember, managementTeam, corporateTeam, committeeMember, monitoringSupervision)

### External Dependencies
- **AOS**: Animation on scroll (initialized in Main.tsx `useEffect`)
- **React Icons**: Icon library (FaBars, BiChevronDown, etc.)
- **SweetAlert2**: Alert modals (`sweetalert2`)
- **Swiper/Keen-slider**: Carousels (check Components/*)

### State Management
- **No Redux/Zustand**: Context API only (LanguageContext)
- **LocalStorage**: Used for language preference and localforage for larger data

## Common Pitfalls
1. **Typo in CMS**: `member-welfare-servicee` (double 'e') - don't "fix" this in frontend
2. **Image URLs**: Always wrap with `getStrapiMediaUrl()` - don't assume absolute paths
3. **Language Refetch**: Missing `[language]` dependency causes stale content on toggle
4. **Populate Parameter**: Strapi relations require `&populate=*` or specific field population
5. **Error Logging**: Console logs are verbose (prod-ready logging not implemented)

## Documentation References
- **API Integration**: `Frontend_Integration_Guide.md` (comprehensive Strapi schema)
- **Production Setup**: `PRODUCTION_FIXES.md`, `DigitalOcean_Setup_Guide.md`
- **Strapi Config**: `STRAPI_CONFIGURATION_GUIDE.md`, `COMPLETE_STRAPI_SETUP_GUIDE.md`
- **Reports Implementation**: `STRAPI_REPORTS_IMPLEMENTATION_GUIDE.md`

## Quick Start for New Features
1. **Add Translation**: Update `src/utils/translations.ts` with `en` and `ne` keys
2. **Add Route**: Edit `src/Router/Router.tsx` and create page in `Pages/`
3. **Add Strapi Service**: Extend relevant service in `src/services/strapi.ts`
4. **Add Nav Link**: Update `src/Shared/Navbar/Navbar.tsx` with translated label
5. **Test Both Languages**: Toggle EN/NE to verify content fetching
