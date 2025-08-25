# Implementation Guide: Branches Page

## Overview
This guide outlines the implementation of the Branches page for Global IME Bank's website. The bank currently has 36 branches and is expanding. The page will display information about each branch including the branch manager, their image, phone number, and location.

## Objectives
- Create a dedicated Branches page accessible from the navigation menu
- Develop a BranchTile component similar to PersonTile but focused on branch information
- Implement a responsive grid layout for displaying multiple branches
- Structure code to easily integrate with Strapi CMS in the future
- Follow existing design patterns of the website

## Component Structure

### Pages
1. **BranchesPage**: Main container for displaying all branches
2. **BranchLocator**: (Optional) Interactive map or search feature for finding branches

### Components
1. **BranchTile**: Display individual branch information (inspired by `PersonTile` but implemented as a distinct component tailored for branches)
2. **BranchesGrid**: Container for displaying multiple BranchTile components
3. **BranchFilter**: (Optional) Filter branches by region/province

## Data Structure
Each branch should contain the following information:
```typescript
interface BranchData {
  id: string;
  name: string;
  location: string;
  address: string;
  phoneNumber: string;
  manager: {
    name: string;
    position: string;
    image: string;
    phone: string;
    email?: string;
  };
  
}
```

## Implementation Steps

### 1. Project Setup
- Create necessary folder structure in `src/Pages/Branches/`
- Add routing configuration for the Branches page

### 2. Create BranchTile Component
- Create a new component similar to PersonTile but adapted for branch information
- Include image, name, position, contact details for branch manager
- Add branch location and contact information
- Implement hover effects with green color scheme (not yellow)

### 3. BranchesPage Implementation
- Create main page component with header and description
- Implement responsive grid for branch tiles
- Add loading state for future data fetching
- Include section for filtering/searching branches (optional)

### 4. Data Management
- Create initial static data for the 36 branches in a separate file
- Structure the data to match the expected Strapi API format
- Implement functions to fetch and transform data (will use static data for now)

### 4.1 Maps integration (required)
- Each `BranchData` object should include `coordinates` (latitude, longitude). These coordinates will power per-branch map pins and an optional BranchLocator map view.
- Add a small, reusable `BranchMap` component (in `src/Pages/Branches/components/BranchMap.tsx`) that:
  - Accepts `coordinates` and `location` as props.
  - Renders a lightweight map using a map library (Leaflet or Mapbox GL JS). For now include clear comments with the intended integration steps; actual API keys and configuration will be added later.
  - Exposes a simple API (center, zoom, marker) so BranchTile can render a small thumbnail map or link to a full map modal.
  - Is accessible: map tiles must have an accessible label and the marker should have an accessible description.

Notes on map choice and abstraction:
- Prefer Leaflet (open-source, zero-cost) with a small wrapper so swap to Mapbox or Google Maps later without much change.
- Abstract map initialization and tile-provider configuration into a single file under `src/utils/maps.ts` that documents where to change provider/tokens.
- For Strapi integration, store coordinates as numeric fields on the branch content-type so they can be read directly into `BranchData.coordinates`.

### 5. UI/UX Considerations
- Ensure the page is responsive for mobile, tablet, and desktop
- Follow the existing design system and color scheme
- Implement pagination if necessary for a large number of branches
- Add smooth transitions and loading states

### 6. Routing
- Add route for the Branches page in the router
- Update navigation to include link to Branches page

## Future Integration with Strapi CMS
- Current implementation should use static data with the same structure as Strapi API
- Include comments explaining where Strapi integration will occur
- Prepare API service functions that will later connect to Strapi endpoints
- Use data fetching patterns that can be easily replaced with API calls

## Code Structure Best Practices
- Create modular components with single responsibilities
- Implement proper TypeScript interfaces for all data structures
- Use meaningful and consistent naming conventions
- Add detailed comments explaining component functionality
- Follow existing project code style and patterns

## Testing Checklist
- Verify all branches display correctly on desktop, tablet, and mobile
- Check all hover effects and interactions
- Validate all links and contact information
- Test page load performance with all 36+ branches
- Ensure accessibility standards are met

## Commit Guidelines
- Make atomic commits with clear messages
- Verify code builds without errors before committing
- Test functionality before finalizing commits

## Notes for Developers
- Do not modify the existing PersonTile component
- Ensure all code is well-commented for future maintainability
- Write code with clear structure appropriate for junior developers
- Do not use emojis in the UI or code
- Remember this frontend will connect to Strapi CMS in production

## Implementation Checklist
- [ ] Create folder structure and files
- [ ] Implement BranchTile component
- [ ] Create static data file
- [ ] Build BranchesPage component with grid layout
- [ ] Add routing configuration
- [ ] Update navigation menu
- [ ] Test responsiveness on all devices
- [ ] Verify all visual elements match design system
- [ ] Check for errors and edge cases
- [ ] Commit changes with clear messages