# 🚀 Complete Strapi Setup Guide for Reports & Notices

## 📊 **Current API Status: ✅ WORKING**

Your Strapi APIs are working! Here's what I found:

### **Reports API Response:**
```json
{
  "data": [{
    "id": 2,
    "title": "Dummy Report",
    "slug": "report", 
    "description": null,
    "reportType": "quarterly",
    "publishDate": "2025-09-19",
    "fiscalYear": null,
    "quarter": "Q1",
    "file_Id": "1FPVeAqTGaVmqjfWPVJ8IZTH-6B_luvL6",
    "fileName": "QuarterlyDummy",
    "featured": true,
    "isActive": true
  }]
}
```

### **Notices API Response:**
```json
{
  "data": [{
    "id": 2,
    "title": "New Report",
    "slug": "notice",
    "content": [{"type": "paragraph", "children": [{"text": "Hello this is a new report."}]}],
    "noticeType": "general",
    "publishDate": "2025-09-20",
    "isUrgent": true,
    "priority": 1,
    "isActive": true,
    "attatchmentFile_Id": null
  }]
}
```

---

## 🎯 **Content Type Configuration**

### **Report Content Type Fields:**
| Field Name | Type | Required | Description |
|------------|------|----------|-------------|
| title | Text | ✅ | Report title |
| slug | Text | ✅ | URL slug |
| description | Text | ❌ | Report description |
| reportType | Text | ❌ | Type (quarterly, annual, etc.) |
| publishDate | Date | ❌ | Publication date |
| fiscalYear | Text | ❌ | Fiscal year |
| quarter | Text | ❌ | Quarter (Q1, Q2, Q3, Q4) |
| file_Id | Text | ✅ | Google Drive file ID |
| fileName | Text | ✅ | Display file name |
| featured | Boolean | ❌ | Featured flag |
| isActive | Boolean | ✅ | Active status |

### **Notice Content Type Fields:**
| Field Name | Type | Required | Description |
|------------|------|----------|-------------|
| title | Text | ✅ | Notice title |
| slug | Text | ✅ | URL slug |
| content | Rich Text | ❌ | Notice content (blocks) |
| noticeType | Text | ❌ | Type (general, urgent, etc.) |
| publishDate | Date | ❌ | Publication date |
| expiryDate | Date | ❌ | Expiry date |
| isUrgent | Boolean | ❌ | Urgent flag |
| priority | Number | ❌ | Priority level |
| isActive | Boolean | ✅ | Active status |
| attatchmentFile_Id | Text | ❌ | Google Drive attachment ID |
| attatchmentFileName | Text | ❌ | Attachment file name |
| attatchmentFileSize | Text | ❌ | File size |

---

## 📝 **How to Add Content**

### **Adding Reports:**

1. **Go to Strapi Admin**: `https://gurans-cms-dlm49.ondigitalocean.app/admin`
2. **Navigate to**: Content Manager → Report
3. **Click**: "Create new entry"
4. **Fill in the fields**:
   ```
   Title: "Q4 2024 Financial Report"
   Slug: "q4-2024-financial-report"
   Description: "Fourth quarter financial performance and highlights"
   Report Type: "quarterly"
   Publish Date: "2024-12-31"
   Fiscal Year: "2024"
   Quarter: "Q4"
   File ID: "YOUR_GOOGLE_DRIVE_FILE_ID"
   File Name: "Q4-2024-Financial-Report.pdf"
   Featured: ✅ (if you want it highlighted)
   Is Active: ✅ (always check this)
   ```
5. **Click**: "Save and Publish"

### **Adding Notices:**

1. **Go to**: Content Manager → Notice
2. **Click**: "Create new entry"
3. **Fill in the fields**:
   ```
   Title: "Annual General Meeting Notice"
   Slug: "agm-notice-2024"
   Content: "The Annual General Meeting will be held on..."
   Notice Type: "general"
   Publish Date: "2024-09-20"
   Is Urgent: ✅ (if urgent)
   Priority: 1 (1-5, higher = more important)
   Is Active: ✅ (always check this)
   Attachment File ID: "YOUR_GOOGLE_DRIVE_FILE_ID" (optional)
   ```
4. **Click**: "Save and Publish"

---

## 🔧 **Google Drive Integration**

### **How to Get Google Drive File ID:**

1. **Upload your PDF** to Google Drive
2. **Right-click** the file → "Get link"
3. **Make sure** it's set to "Anyone with the link can view"
4. **Copy the link**: `https://drive.google.com/file/d/FILE_ID_HERE/view`
5. **Extract the FILE_ID** (the long string between `/d/` and `/view`)
6. **Use this ID** in the `file_Id` field

### **Example:**
- **Link**: `https://drive.google.com/file/d/1FPVeAqTGaVmqjfWPVJ8IZTH-6B_luvL6/view`
- **File ID**: `1FPVeAqTGaVmqjfWPVJ8IZTH-6B_luvL6`

---

## 🌐 **Frontend Pages**

### **Available Pages:**
1. **Main Reports**: `http://localhost:3001/reports`
2. **Quarterly Reports**: `http://localhost:3001/reports/quarterly-report`
3. **Notices**: `http://localhost:3001/reports/notices`

### **What Each Page Shows:**
- **Main Reports**: Overview of all report types
- **Quarterly Reports**: Filtered quarterly reports from Strapi
- **Notices**: All active notices from Strapi

---

## ✅ **Testing Checklist**

### **Backend Tests:**
- [ ] Can access Strapi admin panel
- [ ] Report content type exists with correct fields
- [ ] Notice content type exists with correct fields
- [ ] Public permissions are set (find & findOne)
- [ ] Sample content is created and published
- [ ] APIs return data: 
  - `https://gurans-cms-dlm49.ondigitalocean.app/api/reports`
  - `https://gurans-cms-dlm49.ondigitalocean.app/api/notices`

### **Frontend Tests:**
- [ ] Development server runs without errors
- [ ] Main reports page loads and shows content
- [ ] Quarterly reports page shows Strapi data
- [ ] Notices page shows Strapi data
- [ ] Google Drive files can be viewed/downloaded
- [ ] No console errors in browser

### **Google Drive Tests:**
- [ ] PDF files are uploaded to Google Drive
- [ ] Files are set to "Anyone with link can view"
- [ ] File IDs are correctly added to Strapi
- [ ] Preview thumbnails load (may take time)
- [ ] Download links work
- [ ] View links open PDFs in new tab

---

## 🚨 **Troubleshooting**

### **Common Issues:**

1. **"No data" or empty pages**:
   - ✅ Check content is published in Strapi (not draft)
   - ✅ Verify `isActive` is set to `true`
   - ✅ Check API permissions are public

2. **Google Drive files not loading**:
   - ✅ Ensure files are public ("Anyone with link can view")
   - ✅ Check file ID is correct (no extra characters)
   - ✅ Wait for thumbnail generation (can take minutes)

3. **API returns 403/404**:
   - ✅ Check Strapi permissions: Settings → Roles → Public
   - ✅ Verify content types exist in Content-Type Builder
   - ✅ Ensure content exists and is published

### **Debug Commands:**
```bash
# Test APIs
curl "https://gurans-cms-dlm49.ondigitalocean.app/api/reports"
curl "https://gurans-cms-dlm49.ondigitalocean.app/api/notices"

# Check specific content
curl "https://gurans-cms-dlm49.ondigitalocean.app/api/reports?populate=*"
curl "https://gurans-cms-dlm49.ondigitalocean.app/api/notices?populate=*"
```

---

## 🎯 **Next Steps**

1. **Add more sample content** using the guide above
2. **Upload actual PDFs** to Google Drive and get their IDs
3. **Test the frontend pages** to see your content
4. **Customize the content types** if needed (add more fields)
5. **Add media images** to notices for better visual appeal

Your system is ready to go! 🚀