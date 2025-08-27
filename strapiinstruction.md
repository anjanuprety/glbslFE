# Beginner-Friendly Guide: Setting Up Strapi CMS for Your Bank Website

This step-by-step guide is designed for first-time Strapi users. I'll walk you through every detail with clear instructions and explain exactly which options to choose.

## 1. Installing Strapi

### What You Need Before Starting:
- Node.js installed (version 14, 16, or 18)
- About 15 minutes of your time
- A terminal/command prompt window

### Installation Steps:

1. Open your terminal or command prompt
2. Type this command exactly as shown:
   ```
   npx create-strapi-app@latest bank-cms
   ```
3. Press Enter
4. You'll see a question: "Would you like to use a template?" 
   - Select: **"No"** (Use arrow keys and Enter to select)
5. You'll see: "Choose your installation type"
   - For beginners, select: **"Quickstart (recommended)"** - this uses SQLite, which doesn't require separate database setup

6. Wait for installation (5-10 minutes)
7. Your browser will automatically open to `http://localhost:1337/admin/auth/register-admin`
8. Create your admin user:
   - Fill in your first name, last name, email, and password
   - Click the blue "Ready to start" button

Congratulations! You're now logged into Strapi admin panel.

## 2. Setting Up Internationalization

### Enabling Multiple Languages:

1. In the left sidebar, click **"Settings"** (gear icon at the bottom)
2. Under "Global Settings", click **"Internationalization"**
3. Click the blue **"Add new locale"** button
4. In the dropdown, scroll and select **"Nepali (ne)"**
5. Click the blue **"Save"** button
6. You should now see both English (en) and Nepali (ne) listed, with English set as default

### Setting Up Default Locale Fallback:

1. While still in Internationalization settings, click the **"Advanced Settings"** tab at the top
2. Find "Default locale fallback" and toggle it ON (to blue)
3. Click the blue **"Save"** button at the bottom right

## 3. Configuring Content Types for About Us Section

### A. Creating the About Us Settings (Single Type)

1. In the left sidebar, click **"Content-Type Builder"** (the icon looks like a box with two vertical lines)
2. Click the blue **"Create new single type"** button
3. In the popup:
   - Display name: type **"About Us Setting"** 
   - API UID will auto-fill as "api::about-us-setting.about-us-setting" - leave it as is
   - Click the blue **"Continue"** button

4. Now you'll add fields. Click the **"Add another field"** button
5. Select **"Text"** type
6. Select **"Rich text"** (choose **"Rich text - Block"** - this gives you a visual editor with formatting options)
7. In the next screen:
   - Name: type **"mission"** (lowercase)
   - Click the **"Advanced Settings"** tab
   - Turn ON **"Enable localization for this field"** (toggle to blue)
   - Click the green **"Add another field"** button

8. Repeat the same steps to add these fields:
   - **"vision"** (Rich text - Block, with localization enabled)
   - **"values"** (Rich text - Block, with localization enabled)
   - **"aboutUsDescription"** (Rich text - Block, with localization enabled)

9. Now add an image field:
   - Click "Add another field"
   - Select **"Media"**
   - Select **"Single media"**
   - Name: type **"aboutUsImage"**
   - Under "Allowed types of media", select only **"Images"**
   - Click **"Finish"** button

10. Click the green **"Save"** button in the top right

### B. Creating Person Collection (Collection Type)

1. In the left sidebar, click **"Content-Type Builder"**
2. Click the blue **"Create new collection type"** button
3. In the popup:
   - Display name: type **"Person"** 
   - The API UID will auto-fill - leave it as is
   - Click the blue **"Continue"** button

4. Now add fields:
   - Click **"Add another field"**
   - Select **"Text"**
   - Select **"Short text"**
   - Name: type **"name"**
   - Switch to the **"Advanced Settings"** tab
   - Turn ON **"Enable localization for this field"**
   - Turn ON **"Required field"**
   - Click the green **"Add another field"** button

5. Add position field:
   - Select **"Text"**
   - Select **"Short text"**
   - Name: type **"position"**
   - Switch to **"Advanced Settings"** tab
   - Turn ON **"Enable localization for this field"**
   - Turn ON **"Required field"**
   - Click **"Add another field"** button

6. Add department field:
   - Select **"Text"**
   - Select **"Short text"**
   - Name: type **"department"**
   - Switch to **"Advanced Settings"** tab
   - Turn ON **"Enable localization for this field"**
   - Click **"Add another field"** button

7. Add bio field:
   - Select **"Text"**
   - Select **"Rich text - Block"**
   - Name: type **"bio"**
   - Switch to **"Advanced Settings"** tab
   - Turn ON **"Enable localization for this field"**
   - Click **"Add another field"** button

8. Add email field:
   - Select **"Email"**
   - Name: type **"email"**
   - Click **"Add another field"** button

9. Add phone field:
   - Select **"Text"**
   - Select **"Short text"**
   - Name: type **"phone"**
   - Click **"Add another field"** button

10. Add image field:
    - Select **"Media"**
    - Select **"Single media"**
    - Name: type **"image"**
    - Under "Allowed types of media", select only **"Images"**
    - Click **"Add another field"** button

11. Add order field:
    - Select **"Number"**
    - Select **"Integer"**
    - Name: type **"order"**
    - Default value: type **"0"**
    - Click **"Add another field"** button

12. Add personType field:
    - Select **"Enumeration"**
    - Name: type **"personType"**
    - Values: type each of these on separate lines:
      ```
      boardMember
      managementTeam
      corporateTeam
      committeeMember
      ```
    - Turn ON **"Required field"** in Advanced Settings
    - Click **"Finish"** button

13. Click the green **"Save"** button in the top right

### C. Creating Organization Structure (Single Type)

1. In the left sidebar, click **"Content-Type Builder"**
2. Click the blue **"Create new single type"** button
3. In the popup:
   - Display name: type **"Organization Structure"** 
   - The API UID will auto-fill - leave it as is
   - Click the blue **"Continue"** button

4. Add title field:
   - Click **"Add another field"**
   - Select **"Text"**
   - Select **"Short text"**
   - Name: type **"title"**
   - Switch to **"Advanced Settings"** tab
   - Turn ON **"Enable localization for this field"**
   - Turn ON **"Required field"**
   - Click **"Add another field"** button

5. Add description field:
   - Select **"Text"**
   - Select **"Rich text - Block"**
   - Name: type **"description"**
   - Switch to **"Advanced Settings"** tab
   - Turn ON **"Enable localization for this field"**
   - Click **"Add another field"** button

6. Add structureImage field:
   - Select **"Media"**
   - Select **"Single media"**
   - Name: type **"structureImage"**
   - Under "Allowed types of media", select only **"Images"**
   - Click **"Finish"** button

7. Click the green **"Save"** button in the top right

### D. Creating Committee (Collection Type)

1. In the left sidebar, click **"Content-Type Builder"**
2. Click the blue **"Create new collection type"** button
3. In the popup:
   - Display name: type **"Committee"** 
   - The API UID will auto-fill - leave it as is
   - Click the blue **"Continue"** button

4. Add name field:
   - Click **"Add another field"**
   - Select **"Text"**
   - Select **"Short text"**
   - Name: type **"name"**
   - Switch to **"Advanced Settings"** tab
   - Turn ON **"Enable localization for this field"**
   - Turn ON **"Required field"**
   - Click **"Add another field"** button

5. Add description field:
   - Select **"Text"**
   - Select **"Rich text - Block"**
   - Name: type **"description"**
   - Switch to **"Advanced Settings"** tab
   - Turn ON **"Enable localization for this field"**
   - Click **"Add another field"** button

6. Add members relation field:
   - Select **"Relation"**
   - You'll see a visual interface for relations
   - Select relation type: **"Committee has and belongs to many People"**
   - This creates a many-to-many relationship
   - Click **"Finish"** button

7. Click the green **"Save"** button in the top right

## 4. Configuring Content Types for Services Section

### A. Creating Service Category (Collection Type)

1. In the left sidebar, click **"Content-Type Builder"**
2. Click the blue **"Create new collection type"** button
3. In the popup:
   - Display name: type **"Service Category"** 
   - The API UID will auto-fill - leave it as is
   - Click the blue **"Continue"** button

4. Add title field:
   - Click **"Add another field"**
   - Select **"Text"**
   - Select **"Short text"**
   - Name: type **"title"**
   - Switch to **"Advanced Settings"** tab
   - Turn ON **"Enable localization for this field"**
   - Turn ON **"Required field"**
   - Click **"Add another field"** button

5. Add description field:
   - Select **"Text"**
   - Select **"Rich text - Block"**
   - Name: type **"description"**
   - Switch to **"Advanced Settings"** tab
   - Turn ON **"Enable localization for this field"**
   - Click **"Add another field"** button

6. Add icon field:
   - Select **"Media"**
   - Select **"Single media"**
   - Name: type **"icon"**
   - Under "Allowed types of media", select only **"Images"**
   - Click **"Add another field"** button

7. Add slug field:
   - Select **"UID"**
   - Name: type **"slug"**
   - Select "Based on field": **"title"**
   - Click **"Add another field"** button

8. Add order field:
   - Select **"Number"**
   - Select **"Integer"**
   - Name: type **"order"**
   - Default value: type **"0"**
   - Click **"Finish"** button

9. Click the green **"Save"** button in the top right

### B. Creating Loan Product (Collection Type)

1. In the left sidebar, click **"Content-Type Builder"**
2. Click the blue **"Create new collection type"** button
3. In the popup:
   - Display name: type **"Loan Product"** 
   - The API UID will auto-fill - leave it as is
   - Click the blue **"Continue"** button

4. Add name field:
   - Click **"Add another field"**
   - Select **"Text"**
   - Select **"Short text"**
   - Name: type **"name"**
   - Switch to **"Advanced Settings"** tab
   - Turn ON **"Enable localization for this field"**
   - Turn ON **"Required field"**
   - Click **"Add another field"** button

5. Add volume field:
   - Select **"Text"**
   - Select **"Short text"**
   - Name: type **"volume"**
   - Switch to **"Advanced Settings"** tab
   - Turn ON **"Enable localization for this field"**
   - Click **"Add another field"** button

6. Add rate field:
   - Select **"Text"**
   - Select **"Short text"**
   - Name: type **"rate"**
   - Click **"Add another field"** button

7. Add serviceCharge field:
   - Select **"Text"**
   - Select **"Short text"**
   - Name: type **"serviceCharge"**
   - Click **"Add another field"** button

8. Add term field:
   - Select **"Text"**
   - Select **"Short text"**
   - Name: type **"term"**
   - Switch to **"Advanced Settings"** tab
   - Turn ON **"Enable localization for this field"**
   - Click **"Add another field"** button

9. Add order field:
   - Select **"Number"**
   - Select **"Integer"**
   - Name: type **"order"**
   - Default value: type **"0"**
   - Click **"Finish"** button

10. Click the green **"Save"** button in the top right

### C. Creating Savings Product (Collection Type)

1. In the left sidebar, click **"Content-Type Builder"**
2. Click the blue **"Create new collection type"** button
3. In the popup:
   - Display name: type **"Savings Product"** 
   - The API UID will auto-fill - leave it as is
   - Click the blue **"Continue"** button

4. Add name field:
   - Click **"Add another field"**
   - Select **"Text"**
   - Select **"Short text"**
   - Name: type **"name"**
   - Switch to **"Advanced Settings"** tab
   - Turn ON **"Enable localization for this field"**
   - Turn ON **"Required field"**
   - Click **"Add another field"** button

5. Add interestRate field:
   - Select **"Text"**
   - Select **"Short text"**
   - Name: type **"interestRate"**
   - Click **"Add another field"** button

6. Add order field:
   - Select **"Number"**
   - Select **"Integer"**
   - Name: type **"order"**
   - Default value: type **"0"**
   - Click **"Finish"** button

7. Click the green **"Save"** button in the top right

### D. Creating Service Feature Component

Before creating Remittance Service, we need to create a component for service features:

1. In the left sidebar, click **"Content-Type Builder"**
2. Click on **"Components"** tab at the top
3. Click the blue **"Create a new component"** button
4. In the popup:
   - Display name: type **"Service Feature"**
   - Icon: select any icon you like
   - Category: select **"Create new category"**
   - New category name: type **"Service Components"**
   - Click the blue **"Continue"** button

5. Add title field:
   - Click **"Add another field"**
   - Select **"Text"**
   - Select **"Short text"**
   - Name: type **"title"**
   - Switch to **"Advanced Settings"** tab
   - Turn ON **"Enable localization for this field"**
   - Turn ON **"Required field"**
   - Click **"Add another field"** button

6. Add description field:
   - Select **"Text"**
   - Select **"Long text"**
   - Name: type **"description"**
   - Switch to **"Advanced Settings"** tab
   - Turn ON **"Enable localization for this field"**
   - Click **"Add another field"** button

7. Add icon field:
   - Select **"Media"**
   - Select **"Single media"**
   - Name: type **"icon"**
   - Under "Allowed types of media", select only **"Images"**
   - Click **"Finish"** button

8. Click the green **"Save"** button in the top right

### E. Creating Remittance Service (Single Type)

1. In the left sidebar, click **"Content-Type Builder"**
2. Click the blue **"Create new single type"** button
3. In the popup:
   - Display name: type **"Remittance Service"** 
   - The API UID will auto-fill - leave it as is
   - Click the blue **"Continue"** button

4. Add title field:
   - Click **"Add another field"**
   - Select **"Text"**
   - Select **"Short text"**
   - Name: type **"title"**
   - Switch to **"Advanced Settings"** tab
   - Turn ON **"Enable localization for this field"**
   - Turn ON **"Required field"**
   - Click **"Add another field"** button

5. Add description field:
   - Select **"Text"**
   - Select **"Rich text - Block"**
   - Name: type **"description"**
   - Switch to **"Advanced Settings"** tab
   - Turn ON **"Enable localization for this field"**
   - Click **"Add another field"** button

6. Add partnerImages field:
   - Select **"Media"**
   - Select **"Multiple media"**
   - Name: type **"partnerImages"**
   - Under "Allowed types of media", select only **"Images"**
   - Click **"Add another field"** button

7. Add features component field:
   - Select **"Component"**
   - In the popup:
     - Select **"Service Components.Service Feature"** from the dropdown
     - Select **"Repeatable component"**
     - Name: type **"features"**
     - Click **"Finish"** button

8. Click the green **"Save"** button in the top right

### F. Creating Member Welfare Service (Single Type)

1. In the left sidebar, click **"Content-Type Builder"**
2. Click the blue **"Create new single type"** button
3. In the popup:
   - Display name: type **"Member Welfare Service"** 
   - The API UID will auto-fill - leave it as is
   - Click the blue **"Continue"** button

4. Add title field:
   - Click **"Add another field"**
   - Select **"Text"**
   - Select **"Short text"**
   - Name: type **"title"**
   - Switch to **"Advanced Settings"** tab
   - Turn ON **"Enable localization for this field"**
   - Turn ON **"Required field"**
   - Click **"Add another field"** button

5. Add description field:
   - Select **"Text"**
   - Select **"Rich text - Block"**
   - Name: type **"description"**
   - Switch to **"Advanced Settings"** tab
   - Turn ON **"Enable localization for this field"**
   - Click **"Add another field"** button

6. Add welfareServices component field:
   - Select **"Component"**
   - In the popup:
     - Select **"Service Components.Service Feature"** from the dropdown
     - Select **"Repeatable component"**
     - Name: type **"welfareServices"**
     - Click **"Finish"** button

7. Click the green **"Save"** button in the top right

## 5. Setting Up Media Library

### Creating Folder Structure for Media

1. In the left sidebar, click **"Media Library"**
2. Click the **"+ Add new folder"** button (in the top right)
3. Type **"about"** and click **"Create"**
4. Click the **"+ Add new folder"** button again
5. Type **"services"** and click **"Create"**
6. Click the **"+ Add new folder"** button again
7. Type **"people"** and click **"Create"**
8. Click the **"+ Add new folder"** button again
9. Type **"icons"** and click **"Create"**

You now have organized folders for your different media types.

## 6. Setting Up API Permissions

### Configuring Public API Access

1. In the left sidebar, click **"Settings"** (gear icon at the bottom)
2. Under "Users & Permissions Plugin", click **"Roles"**
3. Click on the **"Public"** role (we need to allow public access to our content)
4. You'll see a list of all your content types

5. For each content type, set these permissions:
   - Click on **"About Us Setting"**
   - Under "Permissions", check boxes for:
     - **"find"** (find all entries)
     - **"findOne"** (find one entry by ID)
   - Click **"Save"** at the bottom of the page

6. Repeat step 5 for all content types:
   - Person
   - Organization Structure
   - Committee
   - Service Category
   - Loan Product
   - Savings Product
   - Remittance Service
   - Member Welfare Service

7. Scroll down to "Files Upload" (or "Upload") section and set permissions:
   - Check boxes for:
     - **"find"**
     - **"findOne"**
   - Click **"Save"** at the bottom of the page

## 7. Adding Sample Content to Test

Now that everything is set up, let's add some sample content:

### Adding a Board Member

1. In the left sidebar, click **"Content Manager"**
2. On the left side under "COLLECTION TYPES", click **"People"**
3. Click the blue **"Create new entry"** button
4. Fill in the fields:
   - **Name**: "John Smith"
   - **Position**: "Board Member"
   - **Department**: "Board of Directors"
   - **Bio**: Write a short description
   - **Email**: "john.smith@example.com"
   - **Phone**: "+977 1234567890"
   - **Image**: Click "Browse" and upload a profile picture or sample image
   - **Order**: "1"
   - **Person Type**: Select "boardMember" from dropdown

5. In the right sidebar, make sure "English (en)" is selected
6. Click the blue **"Save"** button
7. To add the Nepali translation, click on "Nepali (ne)" in the right sidebar
8. Fill in the translated fields (name, position, etc.)
9. Click the blue **"Save"** button

10. Click **"Publish"** to make it publicly available

### Adding About Us Content

1. In the left sidebar under "SINGLE TYPES", click **"About Us Setting"**
2. Fill in all fields with appropriate content
3. Upload an image for aboutUsImage
4. Make sure to add both English and Nepali content using the language selector in the right sidebar
5. Click **"Save"** and then **"Publish"**

### Adding a Service Category

1. In the left sidebar under "COLLECTION TYPES", click **"Service Categories"**
2. Click the blue **"Create new entry"** button
3. Fill in:
   - **Title**: "Loan Services"
   - **Description**: Write about your loan services
   - **Icon**: Upload an appropriate icon
   - **Order**: "1"
4. Add the Nepali translations
5. Click **"Save"** and then **"Publish"**
6. Repeat for other service categories like "Savings", "Remittance", and "Member Welfare"

## 8. Connecting to Your Frontend

Once your Strapi setup is complete and you've added some sample data, you can integrate it with your React frontend.

### Creating the API Service File

Create a new file `src/services/strapi.ts` in your React project with this code:

```typescript
import axios from 'axios';

// Base URL of your Strapi server
const API_URL = process.env.REACT_APP_STRAPI_API_URL || 'http://localhost:1337';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
});

// Helper function to get current locale
const getLocale = () => {
  // Replace with your locale management logic
  return localStorage.getItem('locale') || 'en';
};

// Helper function to get full image URL
export const getStrapiMediaUrl = (url: string | null) => {
  if (!url) return '';
  if (url.startsWith('http')) return url;
  return `${API_URL}${url}`;
};

// API services for About section
export const aboutService = {
  // Get About Us content
  getAboutUs: async () => {
    const locale = getLocale();
    const response = await api.get(`/api/about-us-setting?locale=${locale}&populate=*`);
    return response.data.data;
  },
  
  // Get Board Members
  getBoardMembers: async () => {
    const locale = getLocale();
    const response = await api.get(`/api/people?filters[personType][$eq]=boardMember&locale=${locale}&populate=*&sort=order:asc`);
    return response.data.data;
  },
  
  // Get Management Team
  getManagementTeam: async () => {
    const locale = getLocale();
    const response = await api.get(`/api/people?filters[personType][$eq]=managementTeam&locale=${locale}&populate=*&sort=order:asc`);
    return response.data.data;
  },
  
  // Get other people functions...
};

// API services for Services section
export const servicesService = {
  // Get all service categories
  getServiceCategories: async () => {
    const locale = getLocale();
    const response = await api.get(`/api/service-categories?locale=${locale}&populate=*&sort=order:asc`);
    return response.data.data;
  },
  
  // Other service functions...
};
```

### Create `.env.local` File

Create a file named `.env.local` in your React project root:

```
REACT_APP_STRAPI_API_URL=http://localhost:1337
```

### Update a Component to Use Strapi Data

Let's update the BoardOfDirectors component to use Strapi data:

```typescript
import React, { useEffect, useState } from 'react';
import { aboutService, getStrapiMediaUrl } from '../../services/strapi';
import PersonTile from './components/PersonTile';

// Add loading and error handling components

const BoardOfDirectors = () => {
  const [directors, setDirectors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchDirectors = async () => {
      try {
        setIsLoading(true);
        const data = await aboutService.getBoardMembers();
        setDirectors(data);
      } catch (err) {
        console.error('Error fetching board members:', err);
        setError('Failed to load board members');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchDirectors();
  }, []);
  
  // Add loading and error handling here
  
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="text-center mb-10">
        <h1 className="text-3xl lg:text-4xl font-bold mb-4 font-Garamond">Board of Directors</h1>
        <p className="text-gray-600 dark:text-gray-300">Meet our dedicated board members</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {directors.map(director => (
          <PersonTile 
            key={director.id}
            name={director.attributes.name}
            position={director.attributes.position}
            email={director.attributes.email || ""}
            phone={director.attributes.phone || ""}
            image={getStrapiMediaUrl(
              director.attributes.image?.data?.attributes?.url
            )}
          />
        ))}
      </div>
    </div>
  );
};

export default BoardOfDirectors;
```

## Need More Help?

If you have questions about specific steps or encounter any issues during setup, please let me know and I'll provide additional guidance. I can also provide more detailed examples for implementing other components with Strapi data.