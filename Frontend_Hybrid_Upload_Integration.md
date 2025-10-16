# Frontend Integration: Hybrid File Upload Support

## 🎯 **Task Overview**
Update the frontend to support both Google Drive files AND direct uploads from Strapi CMS. The backend now has hybrid file upload capability - frontend needs to handle both sources.

---

## 📋 **Backend Schema Changes**
The Strapi CMS now has these new fields:

### **Notice Content Type:**
- `FileSource` (enum): "Upload" | "Google_Drive"  
- `UploadedFile` (media): Direct upload file object
- **Existing fields still present:** `attatchmentFile_Id`, `attatchmentFileName`, `attatchmentFileSize`

### **Report Content Type:**
- `File_Source` (enum): "Upload" | "Google_Drive"
- `Uploaded_File` (media): Direct upload file object  
- **Existing fields still present:** `file_Id`, `fileName`

---

## 🔧 **Required Frontend Updates**

### **1. API Response Structure**
When fetching notices/reports, you'll now get:

```javascript
// Notice API Response
{
  id: 1,
  title: "Important Notice",
  content: "...",
  // NEW HYBRID FIELDS
  FileSource: "Upload", // or "Google_Drive"
  UploadedFile: {
    url: "https://gurans-cms-media.blr1.digitaloceanspaces.com/uploads/document_123.pdf",
    name: "Important_Notice.pdf",
    size: 245760,
    mime: "application/pdf"
  },
  // EXISTING GOOGLE DRIVE FIELDS (still present)
  attatchmentFile_Id: "1ABC123...",
  attatchmentFileName: "notice.pdf",
  attatchmentFileSize: "240KB"
}

// Report API Response  
{
  id: 1,
  title: "Quarterly Report",
  description: "...",
  // NEW HYBRID FIELDS
  File_Source: "Upload", // or "Google_Drive" 
  Uploaded_File: {
    url: "https://gurans-cms-media.blr1.digitaloceanspaces.com/uploads/report_456.pdf",
    name: "Q1_Report.pdf",
    size: 1048576,
    mime: "application/pdf"
  },
  // EXISTING GOOGLE DRIVE FIELDS (still present)
  file_Id: "1XYZ789...",
  fileName: "quarterly-report.pdf"
}
```

### **2. File URL Generation Logic**

**Replace your current file URL logic with:**

```javascript
// For Notices
const getNoticeFileUrl = (notice) => {
  // Check which source is being used
  if (notice.FileSource === 'Google_Drive') {
    // Use existing Google Drive logic
    return `https://drive.google.com/file/d/${notice.attatchmentFile_Id}/view`;
  } else if (notice.FileSource === 'Upload' && notice.UploadedFile?.url) {
    // Use direct upload from DigitalOcean Spaces
    return notice.UploadedFile.url;
  }
  return null; // No file available
};

// For Reports
const getReportFileUrl = (report) => {
  // Check which source is being used  
  if (report.File_Source === 'Google_Drive') {
    // Use existing Google Drive logic
    return `https://drive.google.com/file/d/${report.file_Id}/view`;
  } else if (report.File_Source === 'Upload' && report.Uploaded_File?.url) {
    // Use direct upload from DigitalOcean Spaces
    return report.Uploaded_File.url;
  }
  return null; // No file available
};

// Get file name for display
const getNoticeFileName = (notice) => {
  if (notice.FileSource === 'Google_Drive') {
    return notice.attatchmentFileName;
  } else if (notice.FileSource === 'Upload' && notice.UploadedFile?.name) {
    return notice.UploadedFile.name;
  }
  return 'Attachment';
};

const getReportFileName = (report) => {
  if (report.File_Source === 'Google_Drive') {
    return report.fileName;
  } else if (report.File_Source === 'Upload' && report.Uploaded_File?.name) {
    return report.Uploaded_File.name;
  }
  return 'Report File';
};
```

### **3. File Availability Check**

```javascript
// Check if notice has any file attached
const hasNoticeFile = (notice) => {
  return (
    (notice.FileSource === 'Google_Drive' && notice.attatchmentFile_Id) ||
    (notice.FileSource === 'Upload' && notice.UploadedFile?.url)
  );
};

// Check if report has any file attached
const hasReportFile = (report) => {
  return (
    (report.File_Source === 'Google_Drive' && report.file_Id) ||
    (report.File_Source === 'Upload' && report.Uploaded_File?.url)
  );
};
```

### **4. Component Update Examples**

**Notice Component:**
```jsx
const NoticeCard = ({ notice }) => {
  const fileUrl = getNoticeFileUrl(notice);
  const fileName = getNoticeFileName(notice);
  const hasFile = hasNoticeFile(notice);

  return (
    <div className="notice-card">
      <h3>{notice.title}</h3>
      <div>{notice.content}</div>
      
      {hasFile ? (
        <div className="attachment-section">
          <a 
            href={fileUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="download-link"
          >
            📎 {fileName}
          </a>
          {notice.FileSource === 'Upload' && (
            <span className="file-badge">Direct Download</span>
          )}
        </div>
      ) : (
        <p className="no-attachment">No attachment available</p>
      )}
    </div>
  );
};
```

**Report Component:**
```jsx
const ReportCard = ({ report }) => {
  const fileUrl = getReportFileUrl(report);
  const fileName = getReportFileName(report);
  const hasFile = hasReportFile(report);

  return (
    <div className="report-card">
      <h3>{report.title}</h3>
      <p>{report.description}</p>
      
      {hasFile ? (
        <div className="download-section">
          <a 
            href={fileUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="download-btn"
          >
            📥 Download {fileName}
          </a>
          {report.File_Source === 'Upload' && (
            <span className="direct-download-badge">🚀 Fast Download</span>
          )}
        </div>
      ) : (
        <p className="no-file">No report file available</p>
      )}
    </div>
  );
};
```

---

## 🚀 **Implementation Steps**

### **Step 1: Update API Calls**
Make sure your API calls include the new fields:

```javascript
// When fetching notices
const fetchNotices = async () => {
  const response = await fetch('/api/notices?populate=UploadedFile');
  return response.json();
};

// When fetching reports  
const fetchReports = async () => {
  const response = await fetch('/api/reports?populate=Uploaded_File');
  return response.json();
};
```

### **Step 2: Replace File Logic**
Find all places in your code where you currently handle:
- `attatchmentFile_Id` (notices)
- `file_Id` (reports)

Replace with the hybrid logic provided above.

### **Step 3: Test Both Sources**
1. Create a test notice with Google Drive file
2. Create a test notice with direct upload
3. Verify both show attachments correctly
4. Test the same for reports

---

## 🎯 **Expected Results**

After implementation:
- ✅ **Google Drive files:** Continue working as before
- ✅ **Direct uploads:** Show download links to DigitalOcean Spaces  
- ✅ **No files:** Show appropriate "no attachment" message
- ✅ **Mixed content:** Site handles both sources seamlessly

---

## 🐛 **Debugging Tips**

If "no attachment available" still shows:

1. **Check API response:** Console.log the notice/report object
2. **Verify field names:** Ensure `FileSource`/`File_Source` and `UploadedFile`/`Uploaded_File` are present
3. **Check populate:** Make sure media fields are populated in API calls
4. **Test file URLs:** Manually visit the DigitalOcean Spaces URLs

---

## 📞 **Need Help?**

If you encounter issues:
1. Share the console.log output of a notice/report object
2. Show the current file handling code
3. Mention which framework you're using (React, Vue, Next.js, etc.)

The backend is ready - just need the frontend to handle both file sources! 🚀