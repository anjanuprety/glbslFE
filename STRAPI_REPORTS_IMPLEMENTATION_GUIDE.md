# Comprehensive Strapi Implementation Guide: Reports & Notices System

## Table of Contents
1. [Overview](#overview)
2. [Google Drive Strategy](#google-drive-strategy)
3. [Content Type Architecture](#content-type-architecture)
4. [Backend Implementation](#backend-implementation)
5. [Frontend Integration](#frontend-integration)
6. [API Endpoints](#api-endpoints)
7. [File Management](#file-management)
8. [Testing & Validation](#testing-validation)
9. [Best Practices](#best-practices)

---

## Overview

This guide provides a complete implementation strategy for integrating Reports and Notices functionality with Strapi v5 CMS, utilizing Google Drive for file storage and Strapi for metadata management.

### Why Google Drive + Strapi?

✅ **Advantages:**
- **Cost Effective**: Google Drive provides 15GB free storage
- **Scalable**: Easy to upgrade storage as needed
- **Reliable**: Google's infrastructure ensures 99.9% uptime
- **SEO Friendly**: Files can be indexed and discovered
- **Version Control**: Google Drive handles file versioning automatically
- **Bandwidth**: Google serves files directly, reducing server load
- **Security**: Granular permission controls and sharing options

✅ **Perfect For:**
- PDF reports, documents, images
- Large file hosting without server storage costs
- Quick file sharing and collaboration
- Automatic backups and redundancy

---

## Google Drive Strategy

### File Organization Structure
```
GLBSL Reports (Shared Drive)
├── Reports/
│   ├── Quarterly/
│   │   ├── 2024/
│   │   │   ├── Q1-2024-Financial-Report.pdf
│   │   │   └── Q2-2024-Financial-Report.pdf
│   │   └── 2023/
│   ├── Annual/
│   │   ├── Annual-Report-2023.pdf
│   │   └── Annual-Report-2022.pdf
│   ├── AGM/
│   │   ├── AGM-Minutes-2024.pdf
│   │   └── AGM-Presentation-2024.pdf
│   ├── Base-Rate/
│   ├── Staff-Training/
│   └── Governance/
└── Notices/
    ├── General/
    ├── Regulatory/
    ├── Urgent/
    └── Public/
```

### File ID Extraction
From a Google Drive shareable link:
```
https://drive.google.com/file/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/view?usp=sharing
                              ↑ This is the File ID ↑
```

The File ID: `1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms`

---

## Content Type Architecture

Quick answers (plain language)

- Do I need `nameNP` / `descriptionNP` / `titleNP` etc? No — if you've enabled Internationalization (i18n) in Strapi, use the single fields (`name`, `title`, `description`) and add translations via the locale selector in Content Manager. You only need separate `*NP` fields if you *don't* want to use Strapi's i18n feature (not recommended).

- What does a relation like "Many to One report-category" mean? Read it as a sentence: "Many Reports belong to one Report Category." In normal English you can say either:
  - "Report Category has many Reports." OR
  - "A Report belongs to one Report Category."

- Short how-to for translations (what you do in Strapi UI):
  1. In Strapi Admin go to **Settings → Internationalization** and make sure `Nepali (ne)` exists.
  2. In **Content-Type Builder**, enable Internationalization for the content type (Advanced Settings).
 3. In **Content Manager**, create the entry in the default language (English).
 4. Open the same entry, use the language dropdown (top-left of the entry page) and switch to **Nepali**.
 5. Fill the same fields (`name`, `description`, `title`, etc.) with Nepali text and **Save**.
 6. The same single fields will now hold translations for both locales — you DON'T need `*NP` fields.

If you're already creating translations using the locale dropdown for other content types, follow the same flow for Reports and Notices.

Plain-English relation cheat-sheet (what Strapi shows → what it means):

| Strapi label | Plain English sentence |
|--------------|------------------------|
| Many to one (report → report-category) | "Many Reports belong to one Report Category." / "Report Category has many Reports." |
| One to many (category → report) | "A Report Category has many Reports." |
| Many to many (reports ↔ tags) | "A Report has many Tags; a Tag is used by many Reports." |
| One to one (notice → attachment) | "A Notice has one Attachment; the Attachment belongs to one Notice." |

If you'd like, tell me the exact relation strings you see in Strapi (the UI text), and I'll convert each to a simple sentence you can copy into documentation.


### 1. Report Categories Collection Type

**Step-by-Step Setup:**
1. Go to Strapi Admin → **Content-Type Builder**
2. Click **"Create new collection type"**
3. Enter **Collection Name:** `report-category`
4. Click **Continue**
5. Add these fields one by one by clicking the **"+" button:**

| Field Name | Type to pick in Strapi | Do this in the UI | What to put (example) |
|------------|----------------------|--------------------|----------------------|
| `name` | Text | Required: Yes, Unique: Yes | "Financial Reports" |
| `slug` | UID | Attached to `name` (auto-generate) | `financial-reports` |
| `description` | Long text | Optional | "Quarterly and annual financial statements" |
| `order` | Number | Optional, Default 0 | `1` (lower = higher priority) |
| `isActive` | Boolean | Optional, Default true | `true` (hide by setting false) |
| `icon` | Text | Optional | `📊` or `fa-chart` |
| `color` | Text | Optional | `#3B82F6` (hex color) |

**Example Data:**
| English | Nepali |
|---------|--------|
| name: "Financial Reports" | nameNP: "वित्तीय प्रतिवेदनहरू" |
| description: "Quarterly and annual financial statements" | descriptionNP: "त्रैमासिक र वार्षिक वित्तीय विवरणहरू" |

---

### 2. Reports Collection Type

**Step-by-Step Setup:**
1. Click **"Create new collection type"** again
2. Enter **Collection Name:** `report`
3. Click **Continue**
4. Add these fields:

| Field Name | Type to pick in Strapi | Do this in the UI | What to put (example) |
|------------|----------------------|--------------------|----------------------|
| `title` | Text | Required: Yes | "Q1 2024 Financial Report" |
| `slug` | UID | Attached to `title` (auto-generate) | `q1-2024-financial-report` |
| `description` | Long text | Optional | "First quarter financial performance" |
| `reportType` | Enumeration | Required: Yes — add choices | `quarterly` |
| `category` | Relation | Optional — choose: Many to One → report-category | Select category (Financial Reports) |
| `publishDate` | Date | Required: Yes | `2024-04-15` |
| `fiscalYear` | Text | Optional | `2024-25` |
| `quarter` | Enumeration | Optional — add choices Q1..Q4 | `Q1` |
| `fileId` | Text | Required: Yes | `1BxiMVs0XRA5...` (Google Drive file ID) |
| `fileName` | Text | Required: Yes | `Q1-2024-Financial-Report.pdf` |
| `fileSize` | Text | Optional | `2.5 MB` |
| `thumbnailId` | Text | Optional | `drive-thumb-id` |
| `downloadCount` | Number | Optional, Default: 0 | `0` |
| `featured` | Boolean | Optional, Default: false | `true` |
| `isActive` | Boolean | Optional, Default: true | `true` |
| `order` | Number | Optional, Default: 0 | `1` |
| `tags` | JSON | Optional | `["finance","q1"]` |
| `seoTitle` | Text | Optional | `Q1 2024 Financial Report - GLBSL` |
| `seoDescription` | Long text | Optional | `Summary of Q1 2024 financials...` |

**Special Field Setup:**

**For `reportType` Enumeration:**
- Click **"Add another choice"** for each option:
  - quarterly
  - annual
  - agm
  - base-rate
  - staff-training
  - governance
  - other

**For `category` Relation:**
- Relation type: **Many to One**
- Target collection: **report-category**

---

### 3. Notices Collection Type

**Step-by-Step Setup:**
1. Click **"Create new collection type"** again
2. Enter **Collection Name:** `notice`
3. Click **Continue**
4. Add these fields:

| Field Name | Type to pick in Strapi | Do this in the UI | What to put (example) |
|------------|----------------------|--------------------|----------------------|
| `title` | Text | Required: Yes | "Annual General Meeting 2024" |
| `slug` | UID | Attached to `title` (auto-generate) | `annual-general-meeting-2024` |
| `content` | Rich text | Optional | "Dear shareholders..." |
| `noticeType` | Enumeration | Required: Yes — add choices | `event` |
| `publishDate` | Date & time | Required: Yes | `2024-09-20T10:00:00.000Z` |
| `expiryDate` | Date & time | Optional | `2024-10-01T00:00:00.000Z` |
| `isUrgent` | Boolean | Optional | `false` |
| `priority` | Number | Optional, Default: 0 | `5` |
| `isActive` | Boolean | Optional, Default: true | `true` |
| `attachmentFileId` | Text | Optional | `1BxiMVs0XRA5...` |
| `attachmentFileName` | Text | Optional | `agm-agenda.pdf` |
| `attachmentFileSize` | Text | Optional | `1.2 MB` |
| `viewCount` | Number | Optional, Default: 0 | `0` |
| `tags` | JSON | Optional | `["agm","2024"]` |
| `seoTitle` | Text | Optional | `AGM 2024 - GLBSL` |
| `seoDescription` | Long text | Optional | `Notice for AGM 2024...` |

**Special Field Setup:**

**For `noticeType` Enumeration:**
- Click **"Add another choice"** for each option:
  - general
  - regulatory
  - urgent
  - public
  - internal
  - event
- Set **Default value:** general

**For `priority` Number:**
- Number format: **integer**
- Minimum value: **0**
- Maximum value: **10**
- Default value: **0**

---

## Backend Implementation

### Step 1: Create Content Types in Strapi

#### 🎯 **Quick Setup Checklist:**

**Phase 1: Report Categories**
- [ ] Go to Strapi Admin Panel (`http://localhost:1337/admin`)
- [ ] Click **Content-Type Builder** (left sidebar)
- [ ] Click **"Create new collection type"**
- [ ] Name: `report-category` → Click **Continue**
- [ ] Add all 9 fields from the table above
- [ ] Click **Save** (Strapi will restart)

**Phase 2: Reports**
- [ ] Click **"Create new collection type"** again
- [ ] Name: `report` → Click **Continue**
- [ ] Add all 18 fields from the table above
- [ ] Set up the relation to `report-category`
- [ ] Click **Save** (Strapi will restart)

**Phase 3: Notices**
- [ ] Click **"Create new collection type"** again
- [ ] Name: `notice` → Click **Continue**
- [ ] Add all 16 fields from the table above
- [ ] Click **Save** (Strapi will restart)

---

### Step 2: Configure Internationalization

**Enable i18n (if not already enabled):**

1. **Check if i18n plugin exists:**
   - Go to **Settings** → **Internationalization**
   - If you see it, skip to step 3
   - If not, continue to step 2

2. **Install i18n plugin** (if needed):
   ```bash
   # In your Strapi project folder
   npm install @strapi/plugin-i18n
   # Then restart Strapi
   npm run develop
   ```

3. **Configure locales:**
   - Go to **Settings** → **Internationalization** → **Locales**
   - You should see **English (en)** as default
   - Click **"Add new locale"**
   - Select **Nepali (ne)** or **Nepal (ne-NP)**
   - Click **Save**

4. **Enable i18n for content types:**
   - Go to **Content-Type Builder**
   - Edit **report-category**:
     - Click **Advanced Settings** tab
     - Enable **"Internationalization"** ✅
     - Click **Save**
   - Repeat for **report** and **notice**

---

### Step 3: Set Up Permissions

**Configure Public Access:**

1. **Go to Settings → Users & Permissions → Roles**
2. **Click on "Public" role**
3. **Enable these permissions:**

| Content Type | Permissions to Enable |
|--------------|----------------------|
| **Report** | ✅ find, ✅ findOne |
| **Report-category** | ✅ find, ✅ findOne |
| **Notice** | ✅ find, ✅ findOne |

4. **Click Save**

**Configure Authenticated Access (same as Public + update for tracking):**

1. **Click on "Authenticated" role**
2. **Enable these permissions:**

| Content Type | Permissions to Enable |
|--------------|----------------------|
| **Report** | ✅ find, ✅ findOne, ✅ update |
| **Report-category** | ✅ find, ✅ findOne |
| **Notice** | ✅ find, ✅ findOne, ✅ update |

3. **Click Save**

---

### Step 4: Create Sample Data

**Create Report Categories First:**

1. **Go to Content Manager → Report Categories**
2. **Click "Create new entry"**
3. **Add these categories one by one:**

#### Category 1: Financial Reports
| Field | English Value | Nepali Value |
|-------|---------------|--------------|
| name | "Financial Reports" | - |
| nameNP | - | "वित्तीय प्रतिवेदनहरू" |
| description | "Quarterly and annual financial statements" | - |
| descriptionNP | - | "त्रैमासिक र वार्षिक वित्तीय विवरणहरू" |
| order | 1 | - |
| icon | "📊" | - |
| color | "#3B82F6" | - |
| isActive | ✅ true | - |

#### Category 2: Governance
| Field | English Value | Nepali Value |
|-------|---------------|--------------|
| name | "Governance" | - |
| nameNP | - | "शासन" |
| description | "AGM minutes, policies and governance documents" | - |
| descriptionNP | - | "AGM मिनेट्स, नीतिहरू र शासन कागजातहरू" |
| order | 2 | - |
| icon | "⚖️" | - |
| color | "#10B981" | - |
| isActive | ✅ true | - |

#### Category 3: Regulatory
| Field | English Value | Nepali Value |
|-------|---------------|--------------|
| name | "Regulatory" | - |
| nameNP | - | "नियामक" |
| description | "Regulatory compliance and base rate documents" | - |
| descriptionNP | - | "नियामक अनुपालन र आधार दर कागजातहरू" |
| order | 3 | - |
| icon | "📋" | - |
| color | "#F59E0B" | - |
| isActive | ✅ true | - |

**Save each category and publish them!**

---

### Step 5: Google Drive File Setup

**Before creating reports, you need Google Drive file IDs:**

#### How to Get Google Drive File ID:

1. **Upload your PDF to Google Drive**
2. **Right-click the file → Share**
3. **Change access to "Anyone with the link can view"**
4. **Copy the shareable link**
5. **Extract the File ID:**

**Example:**
```
Full URL: https://drive.google.com/file/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/view?usp=sharing
File ID:  1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms
```

**The File ID is the long string between `/d/` and `/view`**

---

### Step 6: Create Sample Reports

**Go to Content Manager → Reports → Create new entry:**

#### Sample Report 1: Quarterly Report
| Field | Value |
|-------|-------|
| title | "Q1 2024 Financial Report" |
| titleNP | "Q1 2024 वित्तीय प्रतिवेदन" |
| description | "First quarter financial performance and analysis" |
| descriptionNP | "पहिलो त्रैमासिक वित्तीय प्रदर्शन र विश्लेषण" |
| reportType | quarterly |
| category | Financial Reports (select from dropdown) |
| publishDate | 2024-04-15 |
| fiscalYear | "2024-25" |
| quarter | Q1 |
| fileId | YOUR_GOOGLE_DRIVE_FILE_ID |
| fileName | "Q1-2024-Financial-Report.pdf" |
| fileSize | "2.5 MB" |
| featured | ✅ true |
| isActive | ✅ true |
| order | 1 |

**Save and Publish!**

---

### Step 7: Create Sample Notices

**Go to Content Manager → Notices → Create new entry:**

#### Sample Notice 1: General Notice
| Field | Value |
|-------|-------|
| title | "Annual General Meeting 2024" |
| titleNP | "वार्षिक साधारण सभा 2024" |
| content | "Dear shareholders, we are pleased to announce..." |
| contentNP | "प्रिय शेयरधारकहरू, हामी घोषणा गर्न पाउँदा खुसी छौं..." |
| noticeType | event |
| publishDate | 2024-09-20T10:00:00.000Z |
| isUrgent | ❌ false |
| priority | 5 |
| isActive | ✅ true |

**Save and Publish!**

---

## Frontend Integration

### Step 1: Update Components

#### 1. QuarterlyReportPage Component
```typescript
// src/Pages/InnerPage/QuarterlyReportPage/QuarterlyReportPage.tsx
import React, { useState, useEffect } from 'react';
import { reportsService, googleDriveHelpers } from '../../../services/strapi';

interface QuarterlyReport {
  id: number;
  attributes: {
    title: string;
    titleNP: string;
    description: string;
    descriptionNP: string;
    publishDate: string;
    fiscalYear: string;
    quarter: string;
    fileId: string;
    fileName: string;
    fileSize: string;
    downloadCount: number;
    featured: boolean;
  };
}

const QuarterlyReportPage: React.FC = () => {
  const [reports, setReports] = useState<QuarterlyReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        setLoading(true);
        const data = await reportsService.getReportsByType('quarterly');
        setReports(data);
      } catch (err) {
        setError('Failed to load quarterly reports');
        console.error('Error fetching reports:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  const handleDownload = async (report: QuarterlyReport) => {
    try {
      // Track download
      await reportsService.trackDownload(report.id.toString());
      
      // Download file
      await googleDriveHelpers.downloadFile(
        report.attributes.fileId,
        report.attributes.fileName,
        () => {
          // Optional: Show download started message
          console.log('Download started for:', report.attributes.fileName);
        }
      );
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  const handlePreview = (fileId: string) => {
    googleDriveHelpers.openInNewTab(fileId);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Quarterly Reports
        </h1>
        <p className="text-gray-600">
          Access our latest quarterly financial reports and performance updates.
        </p>
      </div>

      {reports.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No quarterly reports available at the moment.</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reports.map((report) => (
            <div
              key={report.id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6"
            >
              {report.attributes.featured && (
                <div className="mb-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    Featured
                  </span>
                </div>
              )}
              
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {report.attributes.title}
              </h3>
              
              <p className="text-gray-600 text-sm mb-3">
                {report.attributes.description}
              </p>
              
              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <span>{report.attributes.fiscalYear} - {report.attributes.quarter}</span>
                <span>{new Date(report.attributes.publishDate).toLocaleDateString()}</span>
              </div>
              
              <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
                <span>{report.attributes.fileSize}</span>
                <span>{report.attributes.downloadCount} downloads</span>
              </div>
              
              <div className="flex space-x-2">
                <button
                  onClick={() => handlePreview(report.attributes.fileId)}
                  className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200 text-sm"
                >
                  Preview
                </button>
                <button
                  onClick={() => handleDownload(report)}
                  className="flex-1 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors duration-200 text-sm"
                >
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default QuarterlyReportPage;
```

#### 2. NoticePage Component
```typescript
// src/Pages/InnerPage/NoticePage/NoticePage.tsx
import React, { useState, useEffect } from 'react';
import { noticesService, googleDriveHelpers } from '../../../services/strapi';

interface Notice {
  id: number;
  attributes: {
    title: string;
    titleNP: string;
    content: string;
    contentNP: string;
    publishDate: string;
    expiryDate?: string;
    noticeType: string;
    isUrgent: boolean;
    priority: number;
    attachmentFileId?: string;
    attachmentFileName?: string;
    attachmentFileSize?: string;
    viewCount: number;
  };
}

const NoticePage: React.FC = () => {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [filteredNotices, setFilteredNotices] = useState<Notice[]>([]);
  const [selectedType, setSelectedType] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const noticeTypes = [
    { value: 'all', label: 'All Notices' },
    { value: 'general', label: 'General' },
    { value: 'regulatory', label: 'Regulatory' },
    { value: 'urgent', label: 'Urgent' },
    { value: 'public', label: 'Public' },
    { value: 'event', label: 'Events' }
  ];

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        setLoading(true);
        const data = await noticesService.getNotices();
        setNotices(data);
        setFilteredNotices(data);
      } catch (err) {
        setError('Failed to load notices');
        console.error('Error fetching notices:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, []);

  useEffect(() => {
    if (selectedType === 'all') {
      setFilteredNotices(notices);
    } else {
      setFilteredNotices(
        notices.filter(notice => notice.attributes.noticeType === selectedType)
      );
    }
  }, [selectedType, notices]);

  const getNoticeTypeColor = (type: string) => {
    const colors = {
      urgent: 'bg-red-100 text-red-800',
      regulatory: 'bg-yellow-100 text-yellow-800',
      public: 'bg-blue-100 text-blue-800',
      event: 'bg-green-100 text-green-800',
      general: 'bg-gray-100 text-gray-800'
    };
    return colors[type as keyof typeof colors] || colors.general;
  };

  const handleDownloadAttachment = async (notice: Notice) => {
    if (!notice.attributes.attachmentFileId) return;
    
    try {
      await googleDriveHelpers.downloadFile(
        notice.attributes.attachmentFileId,
        notice.attributes.attachmentFileName || 'attachment.pdf'
      );
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Notices & Announcements
        </h1>
        <p className="text-gray-600 mb-6">
          Stay updated with our latest notices, announcements, and important information.
        </p>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2">
          {noticeTypes.map((type) => (
            <button
              key={type.value}
              onClick={() => setSelectedType(type.value)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                selectedType === type.value
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>
      </div>

      {filteredNotices.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">
            {selectedType === 'all' 
              ? 'No notices available at the moment.' 
              : `No ${selectedType} notices found.`
            }
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredNotices.map((notice) => (
            <div
              key={notice.id}
              className={`bg-white rounded-lg shadow-md p-6 border-l-4 ${
                notice.attributes.isUrgent 
                  ? 'border-red-500' 
                  : 'border-blue-500'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getNoticeTypeColor(notice.attributes.noticeType)}`}>
                      {notice.attributes.noticeType.charAt(0).toUpperCase() + notice.attributes.noticeType.slice(1)}
                    </span>
                    {notice.attributes.isUrgent && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        🚨 Urgent
                      </span>
                    )}
                    <span className="text-sm text-gray-500">
                      Priority: {notice.attributes.priority}/10
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {notice.attributes.title}
                  </h3>
                  
                  <div className="prose prose-sm max-w-none text-gray-700 mb-4"
                       dangerouslySetInnerHTML={{ __html: notice.attributes.content }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <div className="flex items-center gap-4">
                  <span>Published: {formatDate(notice.attributes.publishDate)}</span>
                  {notice.attributes.expiryDate && (
                    <span>Expires: {formatDate(notice.attributes.expiryDate)}</span>
                  )}
                </div>
                <span>{notice.attributes.viewCount} views</span>
              </div>

              {notice.attributes.attachmentFileId && (
                <div className="flex items-center gap-2 pt-4 border-t border-gray-200">
                  <span className="text-sm text-gray-600">Attachment:</span>
                  <button
                    onClick={() => handleDownloadAttachment(notice)}
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm"
                  >
                    📎 {notice.attributes.attachmentFileName}
                    {notice.attributes.attachmentFileSize && (
                      <span className="ml-1 text-gray-500">
                        ({notice.attributes.attachmentFileSize})
                      </span>
                    )}
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NoticePage;
```

### Step 2: Update PDFPreview Component
```typescript
// src/Components/PDFPreview/PDFPreview.tsx
import React, { useState } from 'react';
import { googleDriveHelpers } from '../../services/strapi';

interface PDFPreviewProps {
  fileId: string;
  fileName: string;
  title?: string;
  onDownload?: () => void;
}

const PDFPreview: React.FC<PDFPreviewProps> = ({ 
  fileId, 
  fileName, 
  title,
  onDownload 
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const embedUrl = googleDriveHelpers.getViewUrl(fileId);

  const handleDownload = async () => {
    try {
      await googleDriveHelpers.downloadFile(fileId, fileName);
      if (onDownload) {
        onDownload();
      }
    } catch (err) {
      console.error('Download failed:', err);
    }
  };

  const handleOpenInNewTab = () => {
    googleDriveHelpers.openInNewTab(fileId);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {title && (
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <p className="text-sm text-gray-600">{fileName}</p>
        </div>
      )}
      
      <div className="relative">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-2 text-gray-600">Loading PDF...</span>
          </div>
        )}
        
        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="text-center">
              <p className="text-gray-600 mb-4">Unable to load PDF preview</p>
              <button
                onClick={handleOpenInNewTab}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Open in New Tab
              </button>
            </div>
          </div>
        )}
        
        <iframe
          src={embedUrl}
          className="w-full h-96 border-0"
          onLoad={() => setLoading(false)}
          onError={() => {
            setLoading(false);
            setError(true);
          }}
          title={fileName}
        />
      </div>
      
      <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-between items-center">
        <span className="text-sm text-gray-600">
          {fileName}
        </span>
        <div className="flex space-x-2">
          <button
            onClick={handleOpenInNewTab}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm"
          >
            Open in New Tab
          </button>
          <button
            onClick={handleDownload}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 text-sm"
          >
            Download
          </button>
        </div>
      </div>
    </div>
  );
};

export default PDFPreview;
```

---

## API Endpoints

### Reports API
```
GET /api/reports                           # Get all reports
GET /api/reports?locale=en                 # Get reports in English
GET /api/reports?locale=ne                 # Get reports in Nepali
GET /api/reports?filters[reportType][$eq]=quarterly  # Get quarterly reports
GET /api/reports?filters[featured][$eq]=true        # Get featured reports
GET /api/reports/:id                       # Get single report
PUT /api/reports/:id                       # Update report (for tracking)

GET /api/report-categories                 # Get all categories
GET /api/report-categories?locale=ne       # Get categories in Nepali
```

### Notices API
```
GET /api/notices                           # Get all notices
GET /api/notices?locale=en                 # Get notices in English  
GET /api/notices?locale=ne                 # Get notices in Nepali
GET /api/notices?filters[noticeType][$eq]=urgent    # Get urgent notices
GET /api/notices?filters[isActive][$eq]=true        # Get active notices
GET /api/notices/:id                       # Get single notice
```

### Advanced Filtering Examples
```javascript
// Get reports by category
/api/reports?filters[category][slug][$eq]=financial-reports

// Get reports by date range
/api/reports?filters[publishDate][$gte]=2024-01-01&filters[publishDate][$lte]=2024-12-31

// Get reports with pagination
/api/reports?pagination[page]=1&pagination[pageSize]=10

// Get reports with sorting
/api/reports?sort=publishDate:desc,order:asc

// Complex filtering
/api/reports?filters[reportType][$eq]=quarterly&filters[fiscalYear][$eq]=2024&sort=quarter:asc
```

---

## File Management

### Google Drive Setup

1. **Create Google Drive Folder Structure**
   ```
   GLBSL Reports/
   ├── Reports/
   │   ├── Quarterly/
   │   ├── Annual/
   │   ├── AGM/
   │   ├── Base-Rate/
   │   ├── Staff-Training/
   │   └── Governance/
   └── Notices/
       ├── General/
       ├── Regulatory/
       ├── Urgent/
       └── Public/
   ```

2. **Set Sharing Permissions**
   - Right-click folder → Share
   - Set to "Anyone with the link can view"
   - Copy shareable links for each file

3. **Extract File IDs**
   ```javascript
   // Helper function to extract file ID from Google Drive URL
   const extractFileId = (url) => {
     const match = url.match(/\/d\/([a-zA-Z0-9-_]+)/);
     return match ? match[1] : null;
   };

   // Example
   const url = "https://drive.google.com/file/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/view";
   const fileId = extractFileId(url); // "1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms"
   ```

### File Upload Workflow

1. **Upload to Google Drive**
   - Upload file to appropriate folder
   - Set sharing to "Anyone with link can view"
   - Copy the file ID

2. **Create Entry in Strapi**
   ```javascript
   // Example report entry
   {
     "title": "Q1 2024 Financial Report",
     "titleNP": "Q1 2024 वित्तीय प्रतिवेदन", 
     "description": "First quarter financial performance",
     "reportType": "quarterly",
     "fiscalYear": "2024",
     "quarter": "Q1",
     "publishDate": "2024-04-15",
     "fileId": "1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms",
     "fileName": "Q1-2024-Financial-Report.pdf",
     "fileSize": "2.5 MB",
     "isActive": true,
     "featured": true
   }
   ```

### File Management Helper Functions

```typescript
// src/utils/fileHelpers.ts
export const fileHelpers = {
  // Format file size
  formatFileSize: (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  },

  // Validate file ID format
  isValidGoogleDriveFileId: (fileId: string): boolean => {
    const pattern = /^[a-zA-Z0-9-_]{25,}$/;
    return pattern.test(fileId);
  },

  // Extract file extension
  getFileExtension: (fileName: string): string => {
    return fileName.split('.').pop()?.toLowerCase() || '';
  },

  // Check if file is PDF
  isPDF: (fileName: string): boolean => {
    return fileHelpers.getFileExtension(fileName) === 'pdf';
  }
};
```

---

## Testing & Validation

### Backend API Testing

**Test your newly created content types using these API calls:**

#### 1. Test Report Categories
```bash
# Test in PowerShell (your current setup)
curl "https://gurans-cms-dlm49.ondigitalocean.app/api/report-categories" | ConvertFrom-Json

# Test with Nepali locale
curl "https://gurans-cms-dlm49.ondigitalocean.app/api/report-categories?locale=ne" | ConvertFrom-Json

# Test with population (to get all field data)
curl "https://gurans-cms-dlm49.ondigitalocean.app/api/report-categories?populate=*" | ConvertFrom-Json
```

#### 2. Test Reports
```bash
# Get all reports
curl "https://gurans-cms-dlm49.ondigitalocean.app/api/reports" | ConvertFrom-Json

# Get quarterly reports only
curl "https://gurans-cms-dlm49.ondigitalocean.app/api/reports?filters[reportType][\$eq]=quarterly" | ConvertFrom-Json

# Get reports with category information
curl "https://gurans-cms-dlm49.ondigitalocean.app/api/reports?populate=category" | ConvertFrom-Json

# Get featured reports
curl "https://gurans-cms-dlm49.ondigitalocean.app/api/reports?filters[featured][\$eq]=true" | ConvertFrom-Json
```

#### 3. Test Notices
```bash
# Get all active notices
curl "https://gurans-cms-dlm49.ondigitalocean.app/api/notices?filters[isActive][\$eq]=true" | ConvertFrom-Json

# Get urgent notices only
curl "https://gurans-cms-dlm49.ondigitalocean.app/api/notices?filters[isUrgent][\$eq]=true" | ConvertFrom-Json

# Get notices by type
curl "https://gurans-cms-dlm49.ondigitalocean.app/api/notices?filters[noticeType][\$eq]=urgent" | ConvertFrom-Json
```

### Expected API Response Format

**Sample Report Category Response:**
```json
{
  "data": [
    {
      "id": 1,
      "attributes": {
        "name": "Financial Reports",
        "nameNP": "वित्तीय प्रतिवेदनहरू",
        "slug": "financial-reports",
        "description": "Quarterly and annual financial statements",
        "descriptionNP": "त्रैमासिक र वार्षिक वित्तीय विवरणहरू",
        "order": 1,
        "isActive": true,
        "icon": "📊",
        "color": "#3B82F6",
        "createdAt": "2024-09-20T10:00:00.000Z",
        "updatedAt": "2024-09-20T10:00:00.000Z",
        "locale": "en"
      }
    }
  ]
}
```

### Frontend Integration Testing

**Test your frontend components step by step:**

#### 1. Test API Service Functions
```typescript
// In your browser console or component
import { reportsService, noticesService } from '../services/strapi';

// Test report categories
reportsService.getReportCategories().then(console.log);

// Test quarterly reports
reportsService.getReportsByType('quarterly').then(console.log);

// Test notices
noticesService.getNotices().then(console.log);
```

#### 2. Test Google Drive Integration
```typescript
// Test file ID validation
import { googleDriveHelpers } from '../services/strapi';

const testFileId = "1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms";

// Test URL generation
console.log('View URL:', googleDriveHelpers.getViewUrl(testFileId));
console.log('Download URL:', googleDriveHelpers.getDownloadUrl(testFileId));
console.log('Thumbnail URL:', googleDriveHelpers.getThumbnailUrl(testFileId));
```

### Troubleshooting Common Issues

#### ❌ **Problem:** "Cannot GET /api/reports"
**✅ Solution:**
- Check if content type is created and saved
- Verify permissions are set for Public role
- Make sure Strapi server is running

#### ❌ **Problem:** Empty response `{"data": []}`
**✅ Solution:**
- Create and publish some sample data
- Check if `isActive` field is set to `true`
- Verify the API endpoint URL is correct

#### ❌ **Problem:** Missing Nepali content
**✅ Solution:**
- Check if internationalization is enabled for content types
- Create entries for both `en` and `ne` locales
- Use `?locale=ne` in API calls

#### ❌ **Problem:** Google Drive files not loading
**✅ Solution:**
- Verify file sharing settings: "Anyone with link can view"
- Check if file ID is correct (no extra characters)
- Test file ID in browser: `https://drive.google.com/file/d/YOUR_FILE_ID/view`

### Pre-Launch Validation Checklist

#### Backend Checklist ✅
- [ ] All 3 content types created (report-category, report, notice)
- [ ] All required fields added with correct types
- [ ] Internationalization enabled and locales configured
- [ ] Permissions set for Public and Authenticated roles
- [ ] Sample data created and published
- [ ] API endpoints responding correctly
- [ ] Both English and Nepali content working

#### Frontend Checklist ✅
- [ ] API service functions added to strapi.ts
- [ ] Google Drive helper functions working
- [ ] QuarterlyReportPage component updated
- [ ] NoticePage component updated
- [ ] PDFPreview component updated
- [ ] Error handling implemented
- [ ] Loading states working
- [ ] Download tracking functional
- [ ] Responsive design tested

#### Google Drive Checklist ✅
- [ ] Files uploaded and organized in folders
- [ ] Sharing permissions set correctly
- [ ] File IDs extracted and stored in Strapi
- [ ] Preview URLs working in browser
- [ ] Download URLs working
- [ ] File sizes recorded

#### Performance Checklist ✅
- [ ] API responses under 2 seconds
- [ ] Google Drive files loading quickly
- [ ] No console errors in browser
- [ ] Mobile responsiveness working
- [ ] Search functionality operational
- [ ] Filtering working correctly

### Testing Commands Summary

**Quick Test All APIs:**
```bash
# Test everything at once
echo "Testing Report Categories..." && curl "https://gurans-cms-dlm49.ondigitalocean.app/api/report-categories" | ConvertFrom-Json
echo "Testing Reports..." && curl "https://gurans-cms-dlm49.ondigitalocean.app/api/reports" | ConvertFrom-Json  
echo "Testing Notices..." && curl "https://gurans-cms-dlm49.ondigitalocean.app/api/notices" | ConvertFrom-Json
```

**Test Different Locales:**
```bash
# English
curl "https://gurans-cms-dlm49.ondigitalocean.app/api/reports?locale=en" | ConvertFrom-Json

# Nepali  
curl "https://gurans-cms-dlm49.ondigitalocean.app/api/reports?locale=ne" | ConvertFrom-Json
```

---

## Best Practices

### 1. Performance Optimization

```typescript
// Use React Query for caching
import { useQuery } from '@tanstack/react-query';

const useReports = (reportType?: string) => {
  return useQuery({
    queryKey: ['reports', reportType],
    queryFn: () => reportType 
      ? reportsService.getReportsByType(reportType)
      : reportsService.getFeaturedReports(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 30 * 60 * 1000, // 30 minutes
  });
};
```

### 2. SEO Optimization

```typescript
// Add structured data for reports
const reportStructuredData = (report: any) => ({
  "@context": "https://schema.org",
  "@type": "Report",
  "name": report.attributes.title,
  "description": report.attributes.description,
  "datePublished": report.attributes.publishDate,
  "author": {
    "@type": "Organization",
    "name": "GLBSL"
  },
  "publisher": {
    "@type": "Organization", 
    "name": "GLBSL"
  }
});
```

### 3. Security Considerations

```typescript
// Validate file IDs before processing
const validateFileId = (fileId: string): boolean => {
  if (!fileId || typeof fileId !== 'string') return false;
  if (fileId.length < 25 || fileId.length > 50) return false;
  return /^[a-zA-Z0-9-_]+$/.test(fileId);
};

// Sanitize user inputs
const sanitizeInput = (input: string): string => {
  return input.replace(/[<>]/g, '');
};
```

### 4. Error Monitoring

```typescript
// Error logging service
const logError = (error: any, context: string) => {
  console.error(`Error in ${context}:`, error);
  // Send to monitoring service (Sentry, LogRocket, etc.)
};

// Usage in components
try {
  const reports = await reportsService.getReports();
} catch (error) {
  logError(error, 'ReportsPage.fetchReports');
  setError('Failed to load reports. Please try again.');
}
```

### 5. Accessibility

```typescript
// ARIA labels and semantic HTML
<button
  onClick={handleDownload}
  aria-label={`Download ${report.attributes.fileName}`}
  className="download-button"
>
  Download PDF
</button>

// Focus management
const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === 'Enter' || event.key === ' ') {
    handleDownload();
  }
};
```

---

## Conclusion

This comprehensive guide provides everything needed to implement a robust Reports and Notices system using Strapi v5 CMS with Google Drive integration. The approach offers:

✅ **Scalable Architecture**: Clean separation of concerns with content management in Strapi and file storage in Google Drive

✅ **Cost-Effective Solution**: Leverage free Google Drive storage with powerful Strapi CMS capabilities  

✅ **Internationalization**: Full support for English and Nepali content

✅ **SEO Optimized**: Proper meta tags, structured data, and semantic HTML

✅ **User Experience**: Fast loading, responsive design, and intuitive navigation

✅ **Developer Experience**: Clean API design, reusable components, and comprehensive error handling

The implementation is production-ready and follows modern web development best practices while being specifically tailored for GLBSL's requirements.