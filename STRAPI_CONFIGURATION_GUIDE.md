# 🚀 Complete Strapi Configuration Guide for Reports & Notices

## 📋 Overview
This guide will help you configure Strapi backend for Reports & Notices functionality and connect it with your frontend.

---

## 🎯 **Step 1: Create Content Types in Strapi**

### 📊 **Report Category Content Type**

1. **Go to Strapi Admin Panel**: `https://gurans-cms-dlm49.ondigitalocean.app/admin`
2. **Navigate to**: Content-Types Builder → Create new collection type
3. **Name**: `Report Category` (API ID: `report-category`)
4. **Add these fields**:

| Field Name | Field Type | Required | Additional Settings |
|------------|------------|----------|-------------------|
| **Name** | Text | ✅ Yes | Short text, unique |
| **description** | Text | ❌ No | Long text |
| **slug** | Text | ✅ Yes | Short text, unique |
| **isActive** | Boolean | ✅ Yes | Default: true |

### 📄 **Report Content Type**

1. **Create new collection type**: `Report` (API ID: `report`)
2. **Add these fields**:

| Field Name | Field Type | Required | Additional Settings |
|------------|------------|----------|-------------------|
| **title** | Text | ✅ Yes | Short text |
| **description** | Text | ❌ No | Long text |
| **fileName** | Text | ✅ Yes | Short text |
| **file_Id** | Text | ✅ Yes | Google Drive file ID |
| **quarter** | Number | ❌ No | Integer (1-4) |
| **year** | Number | ✅ Yes | Integer (e.g., 2024) |
| **publishDate** | Date | ❌ No | Date picker |
| **featured** | Boolean | ❌ No | Default: false |
| **isActive** | Boolean | ✅ Yes | Default: true |
| **category** | Relation | ❌ No | Report Category (Many to One) |

### 📢 **Notice Content Type**

1. **Create new collection type**: `Notice` (API ID: `notice`)
2. **Add these fields**:

| Field Name | Field Type | Required | Additional Settings |
|------------|------------|----------|-------------------|
| **title** | Text | ✅ Yes | Short text |
| **content** | Text | ❌ No | Long text |
| **blocks** | Rich Text | ❌ No | Rich text editor |
| **publishDate** | Date | ❌ No | Date picker |
| **attatchmentFile_Id** | Text | ❌ No | Google Drive file ID |
| **noticeImage** | Media | ❌ No | Single media |
| **featured** | Boolean | ❌ No | Default: false |
| **isActive** | Boolean | ✅ Yes | Default: true |

---

## 🔐 **Step 2: Configure API Permissions**

### **Set Public Access (Important!)**

1. **Go to**: Settings → Users & Permissions plugin → Roles
2. **Click on**: "Public" role
3. **Scroll down** to find your content types
4. **For Report-category**:
   - ✅ Check: `find` and `findOne`
   - ❌ Leave unchecked: `create`, `update`, `delete`

5. **For Report**:
   - ✅ Check: `find` and `findOne`
   - ❌ Leave unchecked: `create`, `update`, `delete`

6. **For Notice**:
   - ✅ Check: `find` and `findOne`
   - ❌ Leave unchecked: `create`, `update`, `delete`

7. **Click**: "Save" button

---

## 📊 **Step 3: Add Sample Data**

### **Sample Report Categories**

1. **Go to**: Content Manager → Report Category
2. **Create these categories**:

| Name | Description | Slug | isActive |
|------|-------------|------|----------|
| Quarterly Reports | Financial quarterly reports | quarterly-reports | ✅ |
| Annual Reports | Yearly comprehensive reports | annual-reports | ✅ |
| Financial Statements | Balance sheets and P&L | financial-statements | ✅ |

### **Sample Reports**

1. **Go to**: Content Manager → Report
2. **Create sample reports**:

#### Report 1:
- **Title**: `Q1 2024 Quarterly Report`
- **Description**: `First quarter financial performance and business highlights`
- **fileName**: `Q1-2024-Financial-Report.pdf`
- **file_Id**: `1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms` *(sample Google Drive ID)*
- **quarter**: `1`
- **year**: `2024`
- **publishDate**: `2024-04-15`
- **featured**: ✅ true
- **isActive**: ✅ true
- **category**: Select "Quarterly Reports"

#### Report 2:
- **Title**: `Q2 2024 Quarterly Report`
- **Description**: `Second quarter financial performance and business highlights`
- **fileName**: `Q2-2024-Financial-Report.pdf`
- **file_Id**: `1Bx9MA0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms` *(sample Google Drive ID)*
- **quarter**: `2`
- **year**: `2024`
- **publishDate**: `2024-07-15`
- **featured**: ❌ false
- **isActive**: ✅ true
- **category**: Select "Quarterly Reports"

### **Sample Notices**

1. **Go to**: Content Manager → Notice
2. **Create sample notices**:

#### Notice 1:
- **Title**: `Annual General Meeting Notice 2024`
- **content**: `Notice for the 24th Annual General Meeting scheduled for March 15, 2024`
- **publishDate**: `2024-02-15`
- **attatchmentFile_Id**: `1Cx9MA0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms` *(sample Google Drive ID)*
- **featured**: ✅ true
- **isActive**: ✅ true

#### Notice 2:
- **Title**: `Branch Holiday Notice`
- **content**: `All branches will remain closed on September 25, 2024 due to public holiday`
- **publishDate**: `2024-09-20`
- **featured**: ❌ false
- **isActive**: ✅ true

---

## 🔧 **Step 4: Test API Endpoints**

Once you've set up the content types and permissions, test these endpoints:

```bash
# Test Reports
curl "https://gurans-cms-dlm49.ondigitalocean.app/api/reports?populate=*"

# Test Report Categories  
curl "https://gurans-cms-dlm49.ondigitalocean.app/api/report-categories?populate=*"

# Test Notices
curl "https://gurans-cms-dlm49.ondigitalocean.app/api/notices?populate=*"
```

---

## 🌐 **Step 5: Frontend Configuration**

### **Update Strapi Base URL (if needed)**

Check your `src/services/strapi.ts` file and ensure the base URL is correct:

```typescript
const STRAPI_BASE_URL = "https://gurans-cms-dlm49.ondigitalocean.app/api";
```

### **Test Frontend Pages**

1. **Start your frontend**: `npm run dev`
2. **Navigate to**:
   - `http://localhost:3001/reports` - Main reports page
   - `http://localhost:3001/reports/quarterly-report` - Quarterly reports
   - `http://localhost:3001/reports/notices` - Notices page

---

## 🔍 **Step 6: Troubleshooting**

### **Common Issues & Solutions**

1. **"Failed to load quarterly report"**:
   - ✅ Check API permissions are set to public
   - ✅ Verify content types are created with correct field names
   - ✅ Ensure sample data exists

2. **403 Forbidden Error**:
   - ✅ Go to Settings → Roles → Public
   - ✅ Enable `find` and `findOne` for all content types

3. **Empty data arrays**:
   - ✅ Add sample content in Content Manager
   - ✅ Set `isActive: true` for test content

4. **Google Drive files not working**:
   - ✅ Use actual Google Drive file IDs
   - ✅ Ensure files are publicly accessible

---

## 📝 **Quick Checklist**

- [ ] Created Report Category content type
- [ ] Created Report content type  
- [ ] Created Notice content type
- [ ] Set public API permissions
- [ ] Added sample categories
- [ ] Added sample reports
- [ ] Added sample notices  
- [ ] Tested API endpoints
- [ ] Tested frontend pages

---

## 🎯 **Expected Results**

After following this guide:

1. **API endpoints** should return data instead of 403 errors
2. **Frontend pages** should load and display reports/notices
3. **Google Drive integration** should show PDF previews
4. **No console errors** in browser developer tools

---

## 🆘 **Need Help?**

If you encounter issues:

1. **Check browser console** for JavaScript errors
2. **Verify API responses** using curl or browser network tab
3. **Confirm Strapi permissions** are set correctly
4. **Ensure content exists** and is published in Strapi

Follow these steps in order, and your Reports & Notices system should work perfectly! 🚀