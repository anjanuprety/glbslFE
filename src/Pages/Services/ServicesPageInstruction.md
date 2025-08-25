# Services Page Implementation Instructions

## Project Overview
This document provides comprehensive instructions for implementing a Services page system for a financial institution frontend that will later integrate with Strapi CMS. The implementation should be written at a junior developer level with clear, understandable comments and no emojis.

## Core Requirements

### 1. Services Page Structure
- **Base Page**: Modify existing Services page template to display exactly 4 service items
- **Service Categories**: 
  1. Loan Services
  2. Savings Services  
  3. Remittance Services
  4. Member Welfare Services
- **Navigation**: Each service item must have a clickable link/icon that opens its dedicated detail page
- **Strapi Compatibility**: All data structures must be designed for future Strapi CMS integration

### 2. Service Categories Implementation

#### 2.1 Loan Services (Service 1)
**Page Type**: Table-based data display
**Route**: `/services/loan` or `/loan-services`
**Data Structure**:
```typescript
interface LoanProduct {
  id: string;
  serialNumber: number;
  loanProductName: string;
  loanVolume: string;
  interestRate: string;
  serviceCharge: string;
  loanTerm: string;
}
```

**Table Configuration**:
- **Columns**: 6 total
  1. S.N. (Serial Number)
  2. Name of Loan Products
  3. Volume of Loan
  4. Rate (Interest Rate)
  5. Service Charge
  6. Term
- **Initial Data**: 12 entries (hardcoded for now)
- **Strapi Integration**: Ready for dynamic data fetching
- **Responsive Design**: Table should be mobile-friendly

#### 2.2 Savings Services (Service 2)
**Page Type**: Table-based data display
**Route**: `/services/savings` or `/savings-services`
**Data Structure**:
```typescript
interface SavingsProduct {
  id: string;
  serialNumber: number;
  savingProductName: string;
  interestRate: string;
}
```

**Table Configuration**:
- **Columns**: 3 total
  1. S.N. (Serial Number)
  2. Name of Saving Product
  3. Interest Rate
- **Initial Data**: 9 entries (hardcoded for now)
- **Strapi Integration**: Ready for dynamic data fetching
- **Responsive Design**: Table should be mobile-friendly

#### 2.3 Remittance Services (Service 3)
**Page Type**: Content/description page
**Route**: `/services/remittance` or `/remittance-services`
**Content Type**: Generic descriptive content about remittance services
**Structure**: 
- Hero section with title
- Service description paragraphs
- Key features/benefits list
- Contact information section
**Strapi Integration**: Content should be editable via Strapi CMS

#### 2.4 Member Welfare Services (Service 4)
**Page Type**: List-based content page
**Route**: `/services/member-welfare` or `/member-welfare-services`
**Data Structure**:
```typescript
interface WelfareService {
  id: string;
  serviceName: string;
  description: string;
}
```

**Required Services List**:
1. Provide skill oriented training to increase economic status of group members
2. Provide pre group Training to the member of new group
3. Provide delivery expenses to group members
4. Provide member/client death expenses
5. Provide income generated trainings
6. Provide health Camps, Eye Camps and other, help of health institutions
7. Husband's death expenses of group members

**Layout**: Clean list or card-based design showing each welfare service

## Technical Implementation Guidelines

### 3. File Structure
```
src/Pages/Services/
├── ServicesPage.tsx (main services page)
├── ServicesPageInstruction.md (this file)
├── components/
│   ├── ServiceCard.tsx (reusable service item component)
│   ├── ServiceTable.tsx (reusable table component)
│   └── ServiceHeader.tsx (page header component)
├── services/
│   ├── LoanServices/
│   │   ├── LoanServicesPage.tsx
│   │   ├── components/
│   │   │   └── LoanTable.tsx
│   │   └── data/
│   │       └── loanData.ts (initial hardcoded data)
│   ├── SavingsServices/
│   │   ├── SavingsServicesPage.tsx
│   │   ├── components/
│   │   │   └── SavingsTable.tsx
│   │   └── data/
│   │       └── savingsData.ts (initial hardcoded data)
│   ├── RemittanceServices/
│   │   ├── RemittanceServicesPage.tsx
│   │   └── components/
│   │       └── RemittanceContent.tsx
│   └── MemberWelfare/
│       ├── MemberWelfareServicesPage.tsx
│       ├── components/
│       │   └── WelfareServicesList.tsx
│       └── data/
│           └── welfareData.ts (initial hardcoded data)
└── types/
    └── index.ts (TypeScript interfaces)
```

### 4. Routing Configuration
Update `src/Router/Router.tsx` to include:
- `/services` - Main services page
- `/services/loan` - Loan services detail page
- `/services/savings` - Savings services detail page  
- `/services/remittance` - Remittance services detail page
- `/services/member-welfare` - Member welfare services detail page

### 5. Strapi CMS Integration Preparation

#### 5.1 Data Models for Strapi
**Loan Products Collection**:
- Collection Name: `loan-products`
- Fields: serialNumber (Number), loanProductName (Text), loanVolume (Text), interestRate (Text), serviceCharge (Text), loanTerm (Text)

**Savings Products Collection**:
- Collection Name: `savings-products`
- Fields: serialNumber (Number), savingProductName (Text), interestRate (Text)

**Remittance Content Single Type**:
- Single Type Name: `remittance-service`
- Fields: title (Text), description (Rich Text), features (Component - repeatable)

**Member Welfare Collection**:
- Collection Name: `welfare-services`
- Fields: serviceName (Text), description (Rich Text), order (Number)

#### 5.2 API Integration Points
- Create service functions in `src/services/api/` for future Strapi integration
- Use React Query or similar for data fetching and caching
- Implement loading states and error handling
- Create TypeScript interfaces matching Strapi response format

### 6. Design Guidelines

#### 6.1 UI/UX Requirements
- **Consistency**: Follow existing design patterns from the project
- **Responsiveness**: All components must be mobile-friendly
- **Accessibility**: Proper ARIA labels and keyboard navigation
- **Loading States**: Implement skeleton loaders for tables and content
- **Error Handling**: User-friendly error messages

#### 6.2 Styling Guidelines
- Use existing Tailwind CSS classes from the project
- Follow the project's color scheme and typography
- Maintain consistent spacing and layout patterns
- Use existing component patterns (similar to PersonTile, BranchTile)
 - Ensure individual service detail pages follow the overall website theme: reuse the global header/footer and shared layout components, adhere to the project's color palette and typography, and match spacing and interaction patterns so service pages feel consistent with the rest of the site.

### 7. Component Development Standards

#### 7.1 Code Quality
- **Comments**: Clear, descriptive comments for all major functions and components
- **TypeScript**: Strict typing for all props, state, and data structures
- **Error Handling**: Proper try-catch blocks and error boundaries
- **Performance**: Memoization where appropriate, efficient rendering

#### 7.2 Component Structure
```typescript
// Example component structure
interface ComponentProps {
  // Clearly defined props with descriptions
}

const ComponentName: React.FC<ComponentProps> = ({
  // Destructured props with defaults
}) => {
  // Component logic with comments
  
  return (
    // JSX with descriptive class names and structure
  );
};

export default ComponentName;
```

### 8. Testing and Quality Assurance

#### 8.1 Testing Requirements
- Test all routing functionality
- Verify table responsiveness on different screen sizes
- Check data display accuracy
- Validate TypeScript compilation
- Ensure no console errors

#### 8.2 Commit Strategy
- Commit after each major component completion
- Use descriptive commit messages
- Test before each commit
- Follow conventional commit format

### 9. Implementation Phases

#### Phase 1: Main Services Page
1. Update existing ServicesPage.tsx to show 4 service categories
2. Create ServiceCard component for consistent service item display
3. Add navigation links to detail pages
4. Update routing configuration

#### Phase 2: Loan Services Detail Page
1. Create LoanServicesPage.tsx
2. Implement LoanTable component with 6 columns
3. Add initial hardcoded data (12 entries)
4. Ensure responsive table design

#### Phase 3: Savings Services Detail Page
1. Create SavingsServicesPage.tsx  
2. Implement SavingsTable component with 3 columns
3. Add initial hardcoded data (9 entries)
4. Ensure responsive table design

#### Phase 4: Remittance Services Detail Page
1. Create RemittanceServicesPage.tsx
2. Add generic remittance service content
3. Implement responsive content layout

#### Phase 5: Member Welfare Services Detail Page
1. Create MemberWelfareServicesPage.tsx
2. Implement WelfareServicesList component
3. Add the 7 required welfare services
4. Create clean list/card layout

#### Phase 6: Strapi Integration Preparation
1. Create TypeScript interfaces matching Strapi models
2. Implement API service functions (stubbed for now)
3. Add loading and error states
4. Document integration points

### 10. Important Notes

#### 10.1 Restrictions
- **No emojis**: Absolutely no emoji usage in code or UI
- **Junior Level Code**: Code should be clear and understandable for junior developers
- **Strapi Ready**: All data structures must be compatible with Strapi CMS

#### 10.2 Quality Standards
- All TypeScript errors must be resolved
- Code must compile and run without errors
- Responsive design is mandatory
- Proper error handling is required
- Clear documentation and comments are essential

#### 10.3 Future Considerations
- Data will eventually come from Strapi CMS
- Content should be easily editable via CMS
- API endpoints will replace hardcoded data
- Real-time updates should be considered in the architecture

## Conclusion
This implementation will create a comprehensive Services page system that provides detailed information about financial services while being fully prepared for Strapi CMS integration. The modular structure ensures maintainability and scalability for future enhancements.
