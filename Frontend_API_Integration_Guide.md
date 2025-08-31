# Frontend API Integration Guide
*Generated on August 31, 2025*

## 🎯 **Overview**
This document provides all necessary information for integrating your frontend application with the Strapi CMS backend that is now live on DigitalOcean with PostgreSQL (Neon.tech) database.

## 🌐 **API Endpoints**

### **Base URLs:**
- **Production API**: `https://your-digitalocean-app-name.ondigitalocean.app/api`
- **Local Development**: `http://localhost:1337/api`
- **Admin Panel**: `https://your-digitalocean-app-name.ondigitalocean.app/admin`

### **Authentication Endpoints:**
```
POST /api/auth/local                    # Login
POST /api/auth/local/register          # Register
POST /api/auth/forgot-password         # Password reset
POST /api/auth/reset-password          # Password reset confirmation
```

## 📊 **Available Content Types & API Routes**

### **1. About Us Setting (Single Type)**
```
GET    /api/about-us-setting           # Get about us content
PUT    /api/about-us-setting           # Update about us (authenticated)
```
**Fields Available:**
- `title` (Text)
- `description` (Rich Text)
- `mission` (Rich Text)
- `vision` (Rich Text)

### **2. Committee Members (Collection)**
```
GET    /api/committees                 # Get all committees
GET    /api/committees/:id             # Get specific committee
POST   /api/committees                 # Create committee (authenticated)
PUT    /api/committees/:id             # Update committee (authenticated)
DELETE /api/committees/:id             # Delete committee (authenticated)
```
**Fields Available:**
- `name` (Text)
- `position` (Text)
- `description` (Rich Text)
- `image` (Media)

### **3. Person Records (Collection)**
```
GET    /api/people                     # Get all people
GET    /api/people/:id                 # Get specific person
POST   /api/people                     # Create person (authenticated)
PUT    /api/people/:id                 # Update person (authenticated)
DELETE /api/people/:id                 # Delete person (authenticated)
```
**Fields Available:**
- `name` (Text)
- `position` (Text)
- `email` (Email)
- `phone` (Text)
- `bio` (Rich Text)
- `avatar` (Media)

### **4. Loan Products (Collection)**
```
GET    /api/loan-products              # Get all loan products
GET    /api/loan-products/:id          # Get specific loan product
POST   /api/loan-products              # Create loan product (authenticated)
PUT    /api/loan-products/:id          # Update loan product (authenticated)
DELETE /api/loan-products/:id          # Delete loan product (authenticated)
```
**Fields Available:**
- `title` (Text)
- `description` (Rich Text)
- `interestRate` (Number)
- `minAmount` (Number)
- `maxAmount` (Number)
- `tenure` (Text)
- `features` (JSON)

### **5. Savings Products (Collection)**
```
GET    /api/savings-products           # Get all savings products
GET    /api/savings-products/:id       # Get specific savings product
POST   /api/savings-products           # Create savings product (authenticated)
PUT    /api/savings-products/:id       # Update savings product (authenticated)
DELETE /api/savings-products/:id       # Delete savings product (authenticated)
```
**Fields Available:**
- `title` (Text)
- `description` (Rich Text)
- `interestRate` (Number)
- `minBalance` (Number)
- `features` (JSON)

## 🔑 **Authentication Setup**

### **API Token Configuration:**
```javascript
// For authenticated requests
const API_TOKEN = 'your-strapi-api-token';
const headers = {
  'Authorization': `Bearer ${API_TOKEN}`,
  'Content-Type': 'application/json'
};
```

### **Getting API Token:**
1. Access admin panel: `https://your-app-url/admin`
2. Go to Settings → API Tokens
3. Create new token with appropriate permissions
4. Use token in your frontend requests

## 🌍 **Internationalization (i18n)**

### **Available Locales:**
- `en` (English) - Default
- `ne` (Nepali) - Secondary

### **i18n API Usage:**
```javascript
// Get English content
GET /api/committees?locale=en

// Get Nepali content
GET /api/committees?locale=ne

// Get all locales
GET /api/committees?locale=all
```

## 📝 **API Query Parameters**

### **Population (Include Relations):**
```javascript
// Include all relations
GET /api/committees?populate=*

// Include specific fields
GET /api/committees?populate[image]=*

// Deep population
GET /api/committees?populate[category][populate]=image
```

### **Filtering:**
```javascript
// Filter by field
GET /api/committees?filters[position][$eq]=Chairman

// Search
GET /api/people?filters[name][$contains]=John

// Date filters
GET /api/loan-products?filters[createdAt][$gte]=2025-01-01
```

### **Sorting:**
```javascript
// Sort ascending
GET /api/committees?sort=name:asc

// Sort descending
GET /api/people?sort=createdAt:desc

// Multiple sort
GET /api/loan-products?sort[0]=interestRate:asc&sort[1]=title:asc
```

### **Pagination:**
```javascript
// Pagination
GET /api/committees?pagination[page]=1&pagination[pageSize]=10

// Start and limit
GET /api/people?pagination[start]=0&pagination[limit]=25
```

## 🔧 **Frontend Environment Variables**

### **Required Environment Variables:**
```env
# API Configuration for Vite (replace your-actual-app-name with your DigitalOcean app name)
VITE_STRAPI_API_URL=https://your-actual-app-name.ondigitalocean.app

# For local development (comment out when using production)
# VITE_STRAPI_API_URL=http://localhost:1337
```

### **Setup Instructions:**
1. **Find Your DigitalOcean App URL**:
   - Go to your DigitalOcean dashboard
   - Navigate to Apps section
   - Copy your Strapi app's live URL

2. **Create Environment File**:
   - Create `.env` file in your project root
   - Add `VITE_STRAPI_API_URL=https://your-actual-app-url`
   - Replace "your-actual-app-url" with your real DigitalOcean URL

3. **Test Connection**:
   - Restart your development server
   - Check browser network tab for API calls to new URL

## 🖼️ **Media/Image Handling**

### **Image URLs:**
```javascript
// Images are served from your Strapi instance (Vite version)
const STRAPI_URL = import.meta.env.VITE_STRAPI_API_URL || 'http://localhost:1337';
const imageUrl = `${STRAPI_URL}${image.url}`;

// Example response structure
{
  "id": 1,
  "name": "John Doe",
  "image": {
    "id": 5,
    "url": "/uploads/avatar_123.jpg",
    "alternativeText": "John Doe Avatar",
    "width": 300,
    "height": 300
  }
}
```

## 📱 **Sample Frontend Code**

### **React/Vite API Client:**
```javascript
// services/strapi.js (Vite version)
const API_URL = import.meta.env.VITE_STRAPI_API_URL || 'http://localhost:1337';

export async function fetchAPI(endpoint, options = {}) {
  const url = `${API_URL}/api${endpoint}`;
  
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }

  return response.json();
}

// Usage Examples
export const getCommittees = () => fetchAPI('/committees?populate=*');
export const getPeople = () => fetchAPI('/people?populate=*');
export const getLoanProducts = () => fetchAPI('/loan-products');
export const getSavingsProducts = () => fetchAPI('/savings-products');
export const getAboutUs = () => fetchAPI('/about-us-setting?populate=*');
```

### **TypeScript Interfaces:**
```typescript
// types/strapi.ts
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

export interface Committee {
  id: number;
  attributes: {
    name: string;
    position: string;
    description: string;
    image: {
      data: {
        attributes: {
          url: string;
          alternativeText: string;
        };
      };
    };
    createdAt: string;
    updatedAt: string;
    locale: string;
  };
}

export interface Person {
  id: number;
  attributes: {
    name: string;
    position: string;
    email: string;
    phone: string;
    bio: string;
    avatar: {
      data: {
        attributes: {
          url: string;
          alternativeText: string;
        };
      };
    };
    createdAt: string;
    updatedAt: string;
    locale: string;
  };
}
```

## 🚀 **Testing Your Integration**

### **Quick API Tests:**
```bash
# Test if API is accessible
curl https://your-app-url/api/committees

# Test with population
curl "https://your-app-url/api/committees?populate=*"

# Test specific content
curl https://your-app-url/api/about-us-setting
```

## 📋 **Migration Checklist for Frontend Team**

### **✅ Environment Setup:**
- [ ] Update `NEXT_PUBLIC_STRAPI_URL` to DigitalOcean URL
- [ ] Generate and configure API token
- [ ] Test API connectivity
- [ ] Verify image URLs are working

### **✅ Code Updates:**
- [ ] Replace old localhost URLs with production URLs
- [ ] Update any hardcoded API endpoints
- [ ] Test all content type fetching
- [ ] Implement error handling for API calls
- [ ] Add loading states for async data

### **✅ Content Verification:**
- [ ] Verify all 24 person records display correctly
- [ ] Check 8 committee members are visible
- [ ] Confirm 24 loan products load properly
- [ ] Test 18 savings products functionality
- [ ] Validate about us content renders
- [ ] Ensure all 26 media files are accessible

## 🔒 **Security Notes**

### **Important Security Practices:**
1. **Never expose API tokens** in client-side code
2. **Use environment variables** for all sensitive data
3. **Implement proper error handling** to avoid exposing backend errors
4. **Validate API responses** before using in components
5. **Use HTTPS only** for production API calls

## 📞 **Support Information**

### **Database Details:**
- **Provider**: Neon.tech (PostgreSQL)
- **Host**: `ep-long-river-a1rill6e-pooler.ap-southeast-1.aws.neon.tech`
- **Database**: `neondb`
- **SSL**: Required

### **Deployment Details:**
- **Platform**: DigitalOcean App Platform
- **Node.js Version**: 20.x
- **Strapi Version**: 5.23.0
- **Database**: PostgreSQL via Neon

### **Content Summary:**
- **Total Entries**: 121 content entries restored
- **Media Files**: 26 assets (9.1 MB)
- **Languages**: English (en), Nepali (ne)
- **Last Updated**: August 31, 2025

---

## 🎉 **Ready to Go!**
Your Strapi CMS is fully configured and live with all data restored. Use this guide to connect your frontend and start building amazing user experiences!

For any issues, check the admin panel at `https://your-app-url/admin` first to verify data availability.
