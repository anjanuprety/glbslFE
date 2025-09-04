# Frontend Integration Guide for Gurans Bank CMS

## Table of Contents
1. [Project Overview](#project-overview)
2. [API Architecture & Configuration](#api-architecture--configuration)
3. [Content Types & Schema](#content-types--schema)
4. [API Service Layer Setup](#api-service-layer-setup)
5. [TypeScript Integration](#typescript-integration)
6. [Internationalization Implementation](#internationalization-implementation)
7. [Media Management](#media-management)
8. [Component Examples](#component-examples)
9. [Error Handling & Loading States](#error-handling--loading-states)
10. [Environment Configuration](#environment-configuration)
11. [API Reference](#api-reference)
12. [Best Practices](#best-practices)

---

## Project Overview

### Strapi CMS Details
| Configuration | Value |
|---------------|-------|
| **Strapi Version** | 5.23.0 |
| **Database** | SQLite (development) |
| **Port** | 1337 |
| **Internationalization** | English (en) + Nepali (ne) |
| **Admin URL** | http://localhost:1337/admin |
| **API URL** | http://localhost:1337/api |

### Content Architecture
The CMS is structured for a bank website with the following main sections:
- **About Us**: Company information, team, organization structure
- **Services**: Loan products, savings, remittance, member welfare
- **Media**: Organized folder structure for assets

---

## API Architecture & Configuration

### Server Configuration
```typescript
// Server runs on port 1337 by default
// REST API with the following limits:
{
  defaultLimit: 25,    // Default number of items per request
  maxLimit: 100,      // Maximum items that can be requested
  withCount: true     // Include total count in responses
}
```

### Middleware Stack
```typescript
// Enabled middleware (in order):
[
  'strapi::logger',     // Request logging
  'strapi::errors',     // Error handling
  'strapi::security',   // Security headers
  'strapi::cors',       // CORS configuration
  'strapi::poweredBy',  // X-Powered-By header
  'strapi::query',      // Query parsing
  'strapi::body',       // Body parsing
  'strapi::session',    // Session management
  'strapi::favicon',    // Favicon serving
  'strapi::public',     // Static file serving
]
```

---

## Content Types & Schema

### 1. About Us Setting (Single Type)
**API Endpoint**: `/api/about-us-setting`

| Field | Type | Localized | Required | Description |
|-------|------|-----------|----------|-------------|
| Mission | Blocks (Rich Text) | ✅ | ❌ | Company mission statement |
| Vision | Blocks (Rich Text) | ✅ | ❌ | Company vision |
| Goal | Blocks (Rich Text) | ✅ | ❌ | Company goals/values |
| AboutUsDescription | Blocks (Rich Text) | ✅ | ❌ | Main about us content |
| AboutUsImage | Media (Single) | ✅ | ❌ | About us banner image |

### 2. Person (Collection Type)
**API Endpoint**: `/api/people`

| Field | Type | Localized | Required | Default | Description |
|-------|------|-----------|----------|---------|-------------|
| name | String | ✅ | ✅ | - | Person's full name |
| position | String | ✅ | ✅ | - | Job title/position |
| department | String | ✅ | ❌ | - | Department/division |
| bio | Blocks (Rich Text) | ✅ | ❌ | - | Biography/description |
| email | Email | ❌ | ❌ | - | Contact email |
| phone | String | ✅ | ❌ | - | Phone number |
| image | Media | ✅ | ❌ | - | Profile photo |
| order | Integer | ✅ | ❌ | 0 | Display order |
| personType | Enumeration | ✅ | ✅ | - | See PersonType values |
| committees | Relation | ❌ | ❌ | - | Many-to-many with Committee |

**PersonType Values**:
- `boardMember` - Board of Directors
- `managementTeam` - Management Team
- `corporateTeam` - Corporate Team
- `committeeMember` - Committee Members

### 3. Committee (Collection Type)
**API Endpoint**: `/api/committees`

| Field | Type | Localized | Required | Description |
|-------|------|-----------|----------|-------------|
| name | String | ✅ | ✅ | Committee name |
| description | Blocks (Rich Text) | ✅ | ❌ | Committee description |
| people | Relation | ❌ | ❌ | Many-to-many with Person |

### 4. Organization Structure (Single Type)
**API Endpoint**: `/api/organization-structure`

| Field | Type | Localized | Required | Description |
|-------|------|-----------|----------|-------------|
| title | String | ✅ | ✅ | Structure title |
| description | Blocks (Rich Text) | ✅ | ❌ | Structure description |
| structureImage | Media | ✅ | ❌ | Organization chart image |

### 5. Service Category (Collection Type)
**API Endpoint**: `/api/service-categories`

| Field | Type | Localized | Required | Default | Description |
|-------|------|-----------|----------|---------|-------------|
| title | String | ✅ | ✅ | - | Category name |
| description | Blocks (Rich Text) | ✅ | ❌ | - | Category description |
| icon | Media | ✅ | ❌ | - | Category icon |
| slug | UID (based on title) | ✅ | ❌ | - | URL-friendly identifier |
| order | Integer | ✅ | ❌ | 0 | Display order |

### 6. Loan Product (Collection Type)
**API Endpoint**: `/api/loan-products`

| Field | Type | Localized | Required | Default | Description |
|-------|------|-----------|----------|---------|-------------|
| name | String | ✅ | ✅ | - | Product name |
| volume | String | ✅ | ❌ | - | Loan volume/amount |
| rate | String | ✅ | ❌ | - | Interest rate |
| serviceCharge | String | ✅ | ❌ | - | Service charges |
| term | String | ✅ | ❌ | - | Loan term/duration |
| order | Integer | ✅ | ❌ | 0 | Display order |

### 7. Savings Product (Collection Type)
**API Endpoint**: `/api/savings-products`

| Field | Type | Localized | Required | Default | Description |
|-------|------|-----------|----------|---------|-------------|
| name | String | ✅ | ✅ | - | Product name |
| interestRate | String | ✅ | ❌ | - | Interest rate |
| order | Integer | ✅ | ❌ | 0 | Display order |

### 8. Service Feature Component
**Component**: `service-components.service-feature`

| Field | Type | Localized | Required | Description |
|-------|------|-----------|----------|-------------|
| title | String | ❌ | ✅ | Feature title |
| description | Text | ❌ | ❌ | Feature description |
| icon | Media | ❌ | ❌ | Feature icon |

### 9. Remittance Service (Single Type)
**API Endpoint**: `/api/remittance-service`

| Field | Type | Localized | Required | Description |
|-------|------|-----------|----------|-------------|
| title | String | ✅ | ✅ | Service title |
| description | Blocks (Rich Text) | ✅ | ❌ | Service description |
| images | Media (Multiple) | ✅ | ❌ | Partner/service images |
| features | Component (Repeatable) | ✅ | ❌ | Service Feature components |

### 10. Member Welfare Service (Single Type)
**API Endpoint**: `/api/member-welfare-servicee`

| Field | Type | Localized | Required | Description |
|-------|------|-----------|----------|-------------|
| title | String | ✅ | ✅ | Service title |
| description | Blocks (Rich Text) | ✅ | ❌ | Service description |
| welfareServices | Component (Repeatable) | ✅ | ❌ | Service Feature components |

---

## API Service Layer Setup

### 1. Base API Configuration

Create `src/services/api/config.ts`:
```typescript
import axios from 'axios';

// Base configuration
export const API_URL = process.env.REACT_APP_STRAPI_API_URL || 'http://localhost:1337';
export const API_BASE = `${API_URL}/api`;

// Axios instance
export const apiClient = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
apiClient.interceptors.request.use((config) => {
  // Add any default headers or transformations
  return config;
});

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);
```

### 2. Locale Management

Create `src/services/api/locale.ts`:
```typescript
// Locale management
export type SupportedLocale = 'en' | 'ne';

export const getLocale = (): SupportedLocale => {
  return (localStorage.getItem('locale') as SupportedLocale) || 'en';
};

export const setLocale = (locale: SupportedLocale) => {
  localStorage.setItem('locale', locale);
};

export const formatLocaleParam = (locale?: SupportedLocale) => {
  return locale || getLocale();
};
```

### 3. Media URL Helper

Create `src/services/api/media.ts`:
```typescript
import { API_URL } from './config';

export interface StrapiMedia {
  data: {
    attributes: {
      url: string;
      name: string;
      alternativeText?: string;
      caption?: string;
      width?: number;
      height?: number;
      formats?: {
        thumbnail?: { url: string };
        small?: { url: string };
        medium?: { url: string };
        large?: { url: string };
      };
    };
  } | null;
}

export interface StrapiMediaArray {
  data: Array<{
    attributes: {
      url: string;
      name: string;
      alternativeText?: string;
      caption?: string;
      width?: number;
      height?: number;
    };
  }>;
}

export const getStrapiMediaUrl = (media: StrapiMedia | string | null): string => {
  if (!media) return '';
  
  if (typeof media === 'string') {
    return media.startsWith('http') ? media : `${API_URL}${media}`;
  }
  
  const url = media.data?.attributes?.url;
  if (!url) return '';
  
  return url.startsWith('http') ? url : `${API_URL}${url}`;
};

export const getStrapiMediaArray = (media: StrapiMediaArray): string[] => {
  if (!media?.data) return [];
  
  return media.data.map(item => {
    const url = item.attributes.url;
    return url.startsWith('http') ? url : `${API_URL}${url}`;
  });
};
```

### 4. About Us Service

Create `src/services/api/aboutService.ts`:
```typescript
import { apiClient } from './config';
import { formatLocaleParam, SupportedLocale } from './locale';

export interface AboutUsData {
  id: number;
  attributes: {
    Mission?: any[]; // Strapi blocks
    Vision?: any[];
    Goal?: any[];
    AboutUsDescription?: any[];
    AboutUsImage?: {
      data: {
        attributes: {
          url: string;
          name: string;
          alternativeText?: string;
        };
      } | null;
    };
    locale: string;
    localizations: {
      data: Array<{ attributes: { locale: string } }>;
    };
  };
}

export interface PersonData {
  id: number;
  attributes: {
    name: string;
    position: string;
    department?: string;
    bio?: any[]; // Strapi blocks
    email?: string;
    phone?: string;
    image?: {
      data: {
        attributes: {
          url: string;
          name: string;
          alternativeText?: string;
        };
      } | null;
    };
    order: number;
    personType: 'boardMember' | 'managementTeam' | 'corporateTeam' | 'committeeMember';
    locale: string;
  };
}

export interface CommitteeData {
  id: number;
  attributes: {
    name: string;
    description?: any[];
    people?: {
      data: PersonData[];
    };
    locale: string;
  };
}

export interface OrganizationStructureData {
  id: number;
  attributes: {
    title: string;
    description?: any[];
    structureImage?: {
      data: {
        attributes: {
          url: string;
          name: string;
          alternativeText?: string;
        };
      } | null;
    };
    locale: string;
  };
}

export const aboutService = {
  // Get About Us Settings
  async getAboutUs(locale?: SupportedLocale): Promise<AboutUsData> {
    const response = await apiClient.get('/about-us-setting', {
      params: {
        locale: formatLocaleParam(locale),
        populate: '*'
      }
    });
    return response.data.data;
  },

  // Get People by Type
  async getPeopleByType(
    personType: string,
    locale?: SupportedLocale
  ): Promise<PersonData[]> {
    const response = await apiClient.get('/people', {
      params: {
        'filters[personType][$eq]': personType,
        locale: formatLocaleParam(locale),
        populate: '*',
        sort: 'order:asc'
      }
    });
    return response.data.data;
  },

  // Get Board Members
  async getBoardMembers(locale?: SupportedLocale): Promise<PersonData[]> {
    return this.getPeopleByType('boardMember', locale);
  },

  // Get Management Team
  async getManagementTeam(locale?: SupportedLocale): Promise<PersonData[]> {
    return this.getPeopleByType('managementTeam', locale);
  },

  // Get Corporate Team
  async getCorporateTeam(locale?: SupportedLocale): Promise<PersonData[]> {
    return this.getPeopleByType('corporateTeam', locale);
  },

  // Get Committee Members
  async getCommitteeMembers(locale?: SupportedLocale): Promise<PersonData[]> {
    return this.getPeopleByType('committeeMember', locale);
  },

  // Get All Committees
  async getCommittees(locale?: SupportedLocale): Promise<CommitteeData[]> {
    const response = await apiClient.get('/committees', {
      params: {
        locale: formatLocaleParam(locale),
        populate: '*'
      }
    });
    return response.data.data;
  },

  // Get Organization Structure
  async getOrganizationStructure(locale?: SupportedLocale): Promise<OrganizationStructureData> {
    const response = await apiClient.get('/organization-structure', {
      params: {
        locale: formatLocaleParam(locale),
        populate: '*'
      }
    });
    return response.data.data;
  },

  // Get Person by ID
  async getPersonById(id: number, locale?: SupportedLocale): Promise<PersonData> {
    const response = await apiClient.get(`/people/${id}`, {
      params: {
        locale: formatLocaleParam(locale),
        populate: '*'
      }
    });
    return response.data.data;
  }
};
```

### 5. Services Service

Create `src/services/api/servicesService.ts`:
```typescript
import { apiClient } from './config';
import { formatLocaleParam, SupportedLocale } from './locale';

export interface ServiceCategoryData {
  id: number;
  attributes: {
    title: string;
    description?: any[];
    icon?: {
      data: {
        attributes: {
          url: string;
          name: string;
          alternativeText?: string;
        };
      } | null;
    };
    slug: string;
    order: number;
    locale: string;
  };
}

export interface LoanProductData {
  id: number;
  attributes: {
    name: string;
    volume?: string;
    rate?: string;
    serviceCharge?: string;
    term?: string;
    order: number;
    locale: string;
  };
}

export interface SavingsProductData {
  id: number;
  attributes: {
    name: string;
    interestRate?: string;
    order: number;
    locale: string;
  };
}

export interface ServiceFeature {
  id: number;
  title: string;
  description?: string;
  icon?: {
    data: {
      attributes: {
        url: string;
        name: string;
        alternativeText?: string;
      };
    } | null;
  };
}

export interface RemittanceServiceData {
  id: number;
  attributes: {
    title: string;
    description?: any[];
    images?: {
      data: Array<{
        attributes: {
          url: string;
          name: string;
          alternativeText?: string;
        };
      }>;
    };
    features?: ServiceFeature[];
    locale: string;
  };
}

export interface MemberWelfareServiceData {
  id: number;
  attributes: {
    title: string;
    description?: any[];
    welfareServices?: ServiceFeature[];
    locale: string;
  };
}

export const servicesService = {
  // Get Service Categories
  async getServiceCategories(locale?: SupportedLocale): Promise<ServiceCategoryData[]> {
    const response = await apiClient.get('/service-categories', {
      params: {
        locale: formatLocaleParam(locale),
        populate: '*',
        sort: 'order:asc'
      }
    });
    return response.data.data;
  },

  // Get Service Category by Slug
  async getServiceCategoryBySlug(
    slug: string,
    locale?: SupportedLocale
  ): Promise<ServiceCategoryData | null> {
    const response = await apiClient.get('/service-categories', {
      params: {
        'filters[slug][$eq]': slug,
        locale: formatLocaleParam(locale),
        populate: '*'
      }
    });
    return response.data.data[0] || null;
  },

  // Get Loan Products
  async getLoanProducts(locale?: SupportedLocale): Promise<LoanProductData[]> {
    const response = await apiClient.get('/loan-products', {
      params: {
        locale: formatLocaleParam(locale),
        sort: 'order:asc'
      }
    });
    return response.data.data;
  },

  // Get Savings Products
  async getSavingsProducts(locale?: SupportedLocale): Promise<SavingsProductData[]> {
    const response = await apiClient.get('/savings-products', {
      params: {
        locale: formatLocaleParam(locale),
        sort: 'order:asc'
      }
    });
    return response.data.data;
  },

  // Get Remittance Service
  async getRemittanceService(locale?: SupportedLocale): Promise<RemittanceServiceData> {
    const response = await apiClient.get('/remittance-service', {
      params: {
        locale: formatLocaleParam(locale),
        populate: '*'
      }
    });
    return response.data.data;
  },

  // Get Member Welfare Service
  async getMemberWelfareService(locale?: SupportedLocale): Promise<MemberWelfareServiceData> {
    const response = await apiClient.get('/member-welfare-servicee', {
      params: {
        locale: formatLocaleParam(locale),
        populate: '*'
      }
    });
    return response.data.data;
  }
};
```

---

## TypeScript Integration

### 1. Generated Types Usage

The Strapi project includes auto-generated TypeScript definitions in `types/generated/contentTypes.d.ts`. You can reference these in your frontend:

```typescript
// Import Strapi types
import type { 
  ApiPersonPerson,
  ApiAboutUsSettingAboutUsSetting,
  ApiServiceCategoryServiceCategory 
} from '@strapi/strapi';

// Use in your components
interface BoardMemberProps {
  person: ApiPersonPerson;
}
```

### 2. Custom Type Definitions

Create `src/types/strapi.ts`:
```typescript
// Common Strapi response structure
export interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

// Strapi blocks content (rich text)
export interface StrapiBlocks {
  type: string;
  level?: number;
  children: Array<{
    type: string;
    text?: string;
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
    strikethrough?: boolean;
    code?: boolean;
  }>;
}

// Error response structure
export interface StrapiError {
  data: null;
  error: {
    status: number;
    name: string;
    message: string;
    details: any;
  };
}
```

---

## Internationalization Implementation

### 1. Language Context

Create `src/contexts/LanguageContext.tsx`:
```typescript
import React, { createContext, useContext, useState, useEffect } from 'react';
import { SupportedLocale, getLocale, setLocale } from '../services/api/locale';

interface LanguageContextType {
  locale: SupportedLocale;
  setLanguage: (locale: SupportedLocale) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Simple translation function (you can replace with a proper i18n library)
const translations: Record<SupportedLocale, Record<string, string>> = {
  en: {
    'nav.about': 'About Us',
    'nav.services': 'Services',
    'nav.contact': 'Contact',
    'loading': 'Loading...',
    'error.general': 'Something went wrong',
    // Add more translations
  },
  ne: {
    'nav.about': 'हाम्रो बारेमा',
    'nav.services': 'सेवाहरू',
    'nav.contact': 'सम्पर्क',
    'loading': 'लोड हुँदैछ...',
    'error.general': 'केही गलत भयो',
    // Add more translations
  }
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setCurrentLocale] = useState<SupportedLocale>(getLocale());

  const setLanguage = (newLocale: SupportedLocale) => {
    setCurrentLocale(newLocale);
    setLocale(newLocale);
  };

  const t = (key: string): string => {
    return translations[locale]?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ locale, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
```

### 2. Strapi Blocks Renderer

Create `src/components/StrapiBlocksRenderer.tsx`:
```typescript
import React from 'react';

interface StrapiBlock {
  type: string;
  level?: number;
  format?: string;
  children?: Array<{
    type: string;
    text?: string;
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
    strikethrough?: boolean;
    code?: boolean;
  }>;
}

interface StrapiBlocksRendererProps {
  blocks: StrapiBlock[];
  className?: string;
}

export const StrapiBlocksRenderer: React.FC<StrapiBlocksRendererProps> = ({ 
  blocks, 
  className = '' 
}) => {
  if (!blocks || blocks.length === 0) return null;

  const renderBlock = (block: StrapiBlock, index: number) => {
    const renderChildren = (children: any[]) => {
      if (!children) return null;
      
      return children.map((child, childIndex) => {
        if (child.type === 'text') {
          let element = child.text || '';
          
          if (child.bold) element = <strong key={childIndex}>{element}</strong>;
          if (child.italic) element = <em key={childIndex}>{element}</em>;
          if (child.underline) element = <u key={childIndex}>{element}</u>;
          if (child.strikethrough) element = <del key={childIndex}>{element}</del>;
          if (child.code) element = <code key={childIndex}>{element}</code>;
          
          return element;
        }
        return null;
      });
    };

    switch (block.type) {
      case 'paragraph':
        return (
          <p key={index} className="mb-4">
            {renderChildren(block.children || [])}
          </p>
        );
      
      case 'heading':
        const HeadingTag = `h${block.level || 1}` as keyof JSX.IntrinsicElements;
        return (
          <HeadingTag key={index} className="font-bold mb-3">
            {renderChildren(block.children || [])}
          </HeadingTag>
        );
      
      case 'list':
        const ListTag = block.format === 'ordered' ? 'ol' : 'ul';
        return (
          <ListTag key={index} className="mb-4 ml-6">
            {block.children?.map((listItem, listIndex) => (
              <li key={listIndex} className="mb-1">
                {renderChildren(listItem.children || [])}
              </li>
            ))}
          </ListTag>
        );
      
      default:
        return (
          <div key={index}>
            {renderChildren(block.children || [])}
          </div>
        );
    }
  };

  return (
    <div className={className}>
      {blocks.map(renderBlock)}
    </div>
  );
};
```

---

## Media Management

### 1. Media Folders Organization

The CMS has organized media folders:
```
Media Library/
├── about/          # About section images
├── services/       # Service-related media
├── people/         # Profile pictures
└── icons/          # UI icons and symbols
```

### 2. Optimized Image Component

Create `src/components/OptimizedImage.tsx`:
```typescript
import React, { useState } from 'react';
import { getStrapiMediaUrl, StrapiMedia } from '../services/api/media';

interface OptimizedImageProps {
  media: StrapiMedia;
  alt?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  media,
  alt,
  className = '',
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  priority = false
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  if (!media?.data) {
    return <div className={`bg-gray-200 ${className}`} />;
  }

  const { attributes } = media.data;
  const imageUrl = getStrapiMediaUrl(media);
  const imageAlt = alt || attributes.alternativeText || attributes.name || 'Image';

  // Generate srcSet for responsive images
  const generateSrcSet = () => {
    const srcSet: string[] = [imageUrl];
    
    if (attributes.formats) {
      if (attributes.formats.small) {
        srcSet.unshift(getStrapiMediaUrl(attributes.formats.small.url) + ' 500w');
      }
      if (attributes.formats.medium) {
        srcSet.unshift(getStrapiMediaUrl(attributes.formats.medium.url) + ' 750w');
      }
      if (attributes.formats.large) {
        srcSet.unshift(getStrapiMediaUrl(attributes.formats.large.url) + ' 1000w');
      }
    }
    
    return srcSet.join(', ');
  };

  if (hasError) {
    return (
      <div className={`bg-gray-200 flex items-center justify-center ${className}`}>
        <span className="text-gray-500 text-sm">Image not available</span>
      </div>
    );
  }

  return (
    <div className="relative">
      {isLoading && (
        <div className={`absolute inset-0 bg-gray-200 animate-pulse ${className}`} />
      )}
      <img
        src={imageUrl}
        srcSet={generateSrcSet()}
        sizes={sizes}
        alt={imageAlt}
        className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        loading={priority ? 'eager' : 'lazy'}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setHasError(true);
        }}
        width={attributes.width}
        height={attributes.height}
      />
    </div>
  );
};
```

---

## Component Examples

### 1. Board of Directors Component

Create `src/components/BoardOfDirectors.tsx`:
```typescript
import React, { useEffect, useState } from 'react';
import { aboutService, PersonData } from '../services/api/aboutService';
import { useLanguage } from '../contexts/LanguageContext';
import { OptimizedImage } from './OptimizedImage';
import { StrapiBlocksRenderer } from './StrapiBlocksRenderer';
import { LoadingSpinner } from './LoadingSpinner';
import { ErrorMessage } from './ErrorMessage';

interface PersonCardProps {
  person: PersonData;
}

const PersonCard: React.FC<PersonCardProps> = ({ person }) => {
  const { attributes } = person;
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="aspect-square">
        <OptimizedImage
          media={attributes.image}
          alt={attributes.name}
          className="w-full h-full object-cover"
          priority={false}
        />
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 text-gray-900">
          {attributes.name}
        </h3>
        
        <p className="text-blue-600 font-medium mb-2">
          {attributes.position}
        </p>
        
        {attributes.department && (
          <p className="text-gray-600 text-sm mb-3">
            {attributes.department}
          </p>
        )}
        
        {attributes.bio && (
          <StrapiBlocksRenderer
            blocks={attributes.bio}
            className="text-gray-700 text-sm mb-4"
          />
        )}
        
        <div className="flex flex-col space-y-1">
          {attributes.email && (
            <a
              href={`mailto:${attributes.email}`}
              className="text-blue-600 hover:text-blue-800 text-sm"
            >
              {attributes.email}
            </a>
          )}
          
          {attributes.phone && (
            <a
              href={`tel:${attributes.phone}`}
              className="text-blue-600 hover:text-blue-800 text-sm"
            >
              {attributes.phone}
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export const BoardOfDirectors: React.FC = () => {
  const [directors, setDirectors] = useState<PersonData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { locale, t } = useLanguage();

  useEffect(() => {
    const fetchDirectors = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await aboutService.getBoardMembers(locale);
        setDirectors(data);
      } catch (err) {
        console.error('Error fetching board members:', err);
        setError(t('error.general'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchDirectors();
  }, [locale, t]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-gray-900">
          {t('about.boardOfDirectors')}
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          {t('about.boardDescription')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {directors.map((director) => (
          <PersonCard key={director.id} person={director} />
        ))}
      </div>
    </section>
  );
};
```

### 2. Services Overview Component

Create `src/components/ServicesOverview.tsx`:
```typescript
import React, { useEffect, useState } from 'react';
import { servicesService, ServiceCategoryData } from '../services/api/servicesService';
import { useLanguage } from '../contexts/LanguageContext';
import { OptimizedImage } from './OptimizedImage';
import { StrapiBlocksRenderer } from './StrapiBlocksRenderer';
import { LoadingSpinner } from './LoadingSpinner';
import { ErrorMessage } from './ErrorMessage';

interface ServiceCategoryCardProps {
  category: ServiceCategoryData;
  onCategoryClick: (slug: string) => void;
}

const ServiceCategoryCard: React.FC<ServiceCategoryCardProps> = ({ 
  category, 
  onCategoryClick 
}) => {
  const { attributes } = category;
  
  return (
    <div 
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
      onClick={() => onCategoryClick(attributes.slug)}
    >
      <div className="p-8">
        <div className="flex items-center justify-center w-16 h-16 mb-6 mx-auto bg-blue-100 rounded-full">
          {attributes.icon ? (
            <OptimizedImage
              media={attributes.icon}
              alt={attributes.title}
              className="w-8 h-8"
            />
          ) : (
            <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
          )}
        </div>
        
        <h3 className="text-xl font-bold text-center mb-4 text-gray-900">
          {attributes.title}
        </h3>
        
        {attributes.description && (
          <StrapiBlocksRenderer
            blocks={attributes.description}
            className="text-gray-600 text-center text-sm"
          />
        )}
      </div>
    </div>
  );
};

interface ServicesOverviewProps {
  onCategorySelect?: (slug: string) => void;
}

export const ServicesOverview: React.FC<ServicesOverviewProps> = ({
  onCategorySelect
}) => {
  const [categories, setCategories] = useState<ServiceCategoryData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { locale, t } = useLanguage();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await servicesService.getServiceCategories(locale);
        setCategories(data);
      } catch (err) {
        console.error('Error fetching service categories:', err);
        setError(t('error.general'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, [locale, t]);

  const handleCategoryClick = (slug: string) => {
    if (onCategorySelect) {
      onCategorySelect(slug);
    } else {
      // Default navigation behavior
      window.location.href = `/services/${slug}`;
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4 text-gray-900">
          {t('services.title')}
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          {t('services.description')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <ServiceCategoryCard
            key={category.id}
            category={category}
            onCategoryClick={handleCategoryClick}
          />
        ))}
      </div>
    </section>
  );
};
```

---

## Error Handling & Loading States

### 1. Loading Spinner Component

Create `src/components/LoadingSpinner.tsx`:
```typescript
import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  message?: string;
  className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  message = 'Loading...',
  className = ''
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div className={`flex flex-col items-center justify-center py-8 ${className}`}>
      <div
        className={`animate-spin rounded-full border-4 border-gray-200 border-t-blue-600 ${sizeClasses[size]}`}
        role="status"
        aria-label="Loading"
      />
      {message && (
        <p className="mt-4 text-gray-600 text-sm">{message}</p>
      )}
    </div>
  );
};
```

### 2. Error Message Component

Create `src/components/ErrorMessage.tsx`:
```typescript
import React from 'react';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
  className?: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  onRetry,
  className = ''
}) => {
  return (
    <div className={`text-center py-8 ${className}`}>
      <div className="max-w-md mx-auto">
        <div className="text-red-600 text-lg mb-4">⚠️</div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Oops! Something went wrong
        </h3>
        <p className="text-gray-600 mb-4">{message}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-200"
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  );
};
```

### 3. API Error Handler Hook

Create `src/hooks/useApiError.ts`:
```typescript
import { useState, useCallback } from 'react';
import { AxiosError } from 'axios';

interface ApiError {
  message: string;
  status?: number;
  code?: string;
}

export const useApiError = () => {
  const [error, setError] = useState<ApiError | null>(null);

  const handleError = useCallback((err: unknown) => {
    if (err instanceof AxiosError) {
      const status = err.response?.status;
      const message = err.response?.data?.error?.message || err.message;
      
      setError({
        message,
        status,
        code: err.code
      });
    } else if (err instanceof Error) {
      setError({
        message: err.message
      });
    } else {
      setError({
        message: 'An unexpected error occurred'
      });
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    error,
    handleError,
    clearError
  };
};
```

---

## Environment Configuration

### 1. Environment Variables

Create `.env.local`:
```env
# Strapi Configuration
REACT_APP_STRAPI_API_URL=http://localhost:1337

# Optional: API timeout (in milliseconds)
REACT_APP_API_TIMEOUT=10000

# Optional: Default locale
REACT_APP_DEFAULT_LOCALE=en

# Production environment
# REACT_APP_STRAPI_API_URL=https://your-production-strapi-url.com
```

### 2. Environment Configuration File

Create `src/config/environment.ts`:
```typescript
export const config = {
  api: {
    baseUrl: process.env.REACT_APP_STRAPI_API_URL || 'http://localhost:1337',
    timeout: parseInt(process.env.REACT_APP_API_TIMEOUT || '10000', 10),
  },
  app: {
    defaultLocale: (process.env.REACT_APP_DEFAULT_LOCALE as 'en' | 'ne') || 'en',
    isDevelopment: process.env.NODE_ENV === 'development',
    isProduction: process.env.NODE_ENV === 'production',
  }
};
```

---

## API Reference

### About Us Endpoints

| Endpoint | Method | Description | Parameters |
|----------|--------|-------------|------------|
| `/api/about-us-setting` | GET | Get about us content | `locale`, `populate` |
| `/api/people` | GET | Get all people | `filters`, `locale`, `populate`, `sort` |
| `/api/people/{id}` | GET | Get person by ID | `id`, `locale`, `populate` |
| `/api/committees` | GET | Get all committees | `locale`, `populate` |
| `/api/organization-structure` | GET | Get org structure | `locale`, `populate` |

### Services Endpoints

| Endpoint | Method | Description | Parameters |
|----------|--------|-------------|------------|
| `/api/service-categories` | GET | Get service categories | `locale`, `populate`, `sort` |
| `/api/loan-products` | GET | Get loan products | `locale`, `sort` |
| `/api/savings-products` | GET | Get savings products | `locale`, `sort` |
| `/api/remittance-service` | GET | Get remittance service | `locale`, `populate` |
| `/api/member-welfare-servicee` | GET | Get welfare service | `locale`, `populate` |

### Common Query Parameters

| Parameter | Description | Example |
|-----------|-------------|---------|
| `locale` | Language locale | `en`, `ne` |
| `populate` | Include related data | `*`, `image`, `people.image` |
| `sort` | Sort results | `order:asc`, `name:desc` |
| `filters` | Filter results | `filters[personType][$eq]=boardMember` |
| `pagination[page]` | Page number | `1`, `2`, `3` |
| `pagination[pageSize]` | Items per page | `10`, `25`, `100` |

### Filtering Examples

```typescript
// Get board members only
const boardMembers = await apiClient.get('/people', {
  params: {
    'filters[personType][$eq]': 'boardMember',
    locale: 'en',
    populate: '*',
    sort: 'order:asc'
  }
});

// Get published content only
const publishedCategories = await apiClient.get('/service-categories', {
  params: {
    'filters[publishedAt][$notNull]': true,
    locale: 'en'
  }
});

// Search by name
const searchResults = await apiClient.get('/people', {
  params: {
    'filters[name][$containsi]': 'john',
    locale: 'en'
  }
});
```

---

## Best Practices

### 1. API Integration Best Practices

```typescript
// ✅ Good: Use proper error handling
const fetchData = async () => {
  try {
    setLoading(true);
    const data = await aboutService.getBoardMembers(locale);
    setData(data);
  } catch (error) {
    handleError(error);
  } finally {
    setLoading(false);
  }
};

// ✅ Good: Cache data when appropriate
const useBoardMembers = (locale: SupportedLocale) => {
  return useSWR(
    ['boardMembers', locale],
    () => aboutService.getBoardMembers(locale),
    {
      revalidateOnFocus: false,
      dedupingInterval: 5 * 60 * 1000, // 5 minutes
    }
  );
};

// ✅ Good: Optimize images
<OptimizedImage
  media={person.attributes.image}
  alt={person.attributes.name}
  className="w-full h-64 object-cover"
  sizes="(max-width: 768px) 100vw, 300px"
/>
```

### 2. Performance Optimizations

```typescript
// ✅ Lazy load components
const BoardOfDirectors = lazy(() => import('./components/BoardOfDirectors'));

// ✅ Memoize expensive calculations
const sortedMembers = useMemo(() => {
  return members.sort((a, b) => a.attributes.order - b.attributes.order);
}, [members]);

// ✅ Debounce search inputs
const debouncedSearch = useMemo(
  () => debounce((query: string) => {
    // Perform search
  }, 300),
  []
);
```

### 3. Type Safety

```typescript
// ✅ Good: Use proper TypeScript types
interface ComponentProps {
  data: PersonData[];
  onPersonSelect: (id: number) => void;
}

// ✅ Good: Validate API responses
const validatePersonData = (data: unknown): data is PersonData => {
  return (
    typeof data === 'object' &&
    data !== null &&
    'id' in data &&
    'attributes' in data
  );
};
```

### 4. Error Boundaries

```typescript
// ✅ Implement error boundaries for components
class ErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): { hasError: boolean } {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorMessage message="Something went wrong" />;
    }

    return this.props.children;
  }
}
```

---

*This comprehensive guide provides everything needed to integrate the Gurans Bank Strapi CMS with a React frontend, including complete API services, TypeScript types, internationalization, and production-ready components.*
