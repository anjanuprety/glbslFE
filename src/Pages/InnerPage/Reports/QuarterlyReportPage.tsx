import React, { useState, useEffect } from "react";
import BreadCrumb from "../../../BreadCrumb/BreadCrumb";
import { BsDownload, BsEye, BsShare } from "react-icons/bs";
import { HiArrowLongLeft } from "react-icons/hi2";
import { Link } from "react-router-dom";
import PDFPreview from "../../../Components/Reports/PDFPreview";
import PDFViewer from "../../../Components/Reports/PDFViewer";
import { reportsService, googleDriveHelpers } from "../../../services/strapi";

// TypeScript interface for Report from Strapi v5 API with Hybrid Upload Support
interface StrapiReport {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  description?: string;
  reportType?: string;
  publishDate?: string;
  fiscalYear?: string;
  quarter?: string;
  // NEW HYBRID UPLOAD FIELDS
  File_Source?: "Upload" | "Google_Drive";
  Uploaded_File?: {
    url: string;
    name: string;
    size: number;
    mime: string;
  };
  // EXISTING GOOGLE DRIVE FIELDS (still present for backwards compatibility)
  file_Id?: string;
  fileName?: string;
  featured?: boolean;
  isActive?: boolean;
  order?: number;
  tags?: string;
  seoTitle?: string;
  seoDescription?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
}

// HYBRID FILE HANDLING UTILITIES FOR REPORTS
// Get file URL based on source (Google Drive or Direct Upload)
const getReportFileUrl = (report: StrapiReport): string | null => {
  if (report.File_Source === 'Google_Drive' && report.file_Id) {
    return `https://drive.google.com/file/d/${report.file_Id}/view`;
  } else if (report.File_Source === 'Upload' && report.Uploaded_File?.url) {
    return report.Uploaded_File.url;
  }
  return null;
};

// Get download URL based on source
const getReportDownloadUrl = (report: StrapiReport): string | null => {
  if (report.File_Source === 'Google_Drive' && report.file_Id) {
    return googleDriveHelpers.getDownloadUrl(report.file_Id);
  } else if (report.File_Source === 'Upload' && report.Uploaded_File?.url) {
    return report.Uploaded_File.url;
  }
  return null;
};

// Get file name for display
const getReportFileName = (report: StrapiReport): string => {
  if (report.File_Source === 'Google_Drive' && report.fileName) {
    return report.fileName;
  } else if (report.File_Source === 'Upload' && report.Uploaded_File?.name) {
    return report.Uploaded_File.name;
  }
  return 'Report File';
};

// Check if report has any file attached
const hasReportFile = (report: StrapiReport): boolean => {
  return (
    (report.File_Source === 'Google_Drive' && !!report.file_Id) ||
    (report.File_Source === 'Upload' && !!report.Uploaded_File?.url)
  );
};

// Get file size for display
const getReportFileSize = (report: StrapiReport): string => {
  if (report.File_Source === 'Upload' && report.Uploaded_File?.size) {
    const size = report.Uploaded_File.size;
    if (size < 1024) return `${size} B`;
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
    return `${(size / (1024 * 1024)).toFixed(1)} MB`;
  }
  return '';
};

const QuarterlyReportPage: React.FC = () => {
  const [reports, setReports] = useState<StrapiReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewerOpen, setViewerOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState<StrapiReport | null>(null);

  useEffect(() => {
    const fetchQuarterlyReports = async () => {
      try {
        setLoading(true);
        const response = await reportsService.getAllReports();
        setReports(response.data || []);
      } catch (err) {
        setError('Failed to load quarterly reports');
        console.error('Error fetching quarterly reports:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuarterlyReports();
  }, []);

  const handleDownload = async (report: StrapiReport) => {
    try {
      const downloadUrl = getReportDownloadUrl(report);
      if (downloadUrl) {
        window.open(downloadUrl, '_blank');
        alert(`Downloading ${getReportFileName(report)}`);
      } else {
        alert('No report file available for download.');
      }
    } catch (error) {
      console.error('Download failed:', error);
      alert('Download failed. Please try again.');
    }
  };

  const handleView = (report: StrapiReport) => {
    if (hasReportFile(report)) {
      setSelectedReport(report);
      setViewerOpen(true);
    } else {
      alert('No report file available for viewing.');
    }
  };

  const handleShare = async (report: StrapiReport) => {
    const shareUrl = `${window.location.origin}/reports/quarterly/${report.slug}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${report.title} - GLBSL`,
          text: `Check out our ${report.title}`,
          url: shareUrl,
        });
      } catch (error) {
        console.log('Error sharing:', error);
        // Fallback to clipboard
        await navigator.clipboard.writeText(shareUrl);
        alert('Report link copied to clipboard!');
      }
    } else {
      // Fallback for browsers without Web Share API
      try {
        await navigator.clipboard.writeText(shareUrl);
        alert('Report link copied to clipboard!');
      } catch (error) {
        console.error('Failed to copy to clipboard:', error);
        alert(`Share this link: ${shareUrl}`);
      }
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long'
    });
  };

  const getQuarterDisplay = (report: StrapiReport) => {
    const { quarter, fiscalYear, publishDate } = report;
    if (quarter && fiscalYear) {
      return `${quarter} ${fiscalYear}`;
    }
    return formatDate(publishDate || '');
  };

  if (loading) {
    return (
      <section className="">
        <BreadCrumb title="QUARTERLY REPORTS" home={"/"} />
        <div className="bg-whiteSmoke dark:bg-lightBlack py-20 2xl:py-[120px]">
          <div className="Container">
            <div className="flex justify-center items-center min-h-[300px]">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-khaki"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="">
        <BreadCrumb title="QUARTERLY REPORTS" home={"/"} />
        <div className="bg-whiteSmoke dark:bg-lightBlack py-20 2xl:py-[120px]">
          <div className="Container">
            <div className="flex justify-center items-center min-h-[300px]">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 max-w-md">
                <p className="text-red-800">{error}</p>
                <button 
                  onClick={() => window.location.reload()} 
                  className="mt-2 text-sm text-red-600 hover:text-red-800 underline"
                >
                  Try again
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="">
      {/* PDF Viewer Modal */}
      {selectedReport && (
        <PDFViewer
          isOpen={viewerOpen}
          onClose={() => {
            setViewerOpen(false);
            setSelectedReport(null);
          }}
          fileUrl={selectedReport.File_Source === 'Google_Drive' 
            ? selectedReport.file_Id || '' 
            : getReportFileUrl(selectedReport) || ''}
          fileName={getReportFileName(selectedReport)}
          fileSource={selectedReport.File_Source}
        />
      )}

      <BreadCrumb title="QUARTERLY REPORTS" home={"/"} />

      <div className="bg-whiteSmoke dark:bg-lightBlack py-20 2xl:py-[120px]">
        <div className="Container">
          {/* Section heading */}
          <div
            className="flex justify-center"
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            <div className="text-center">
              <h1 className="text-xl sm:text-2xl md:text-3xl 2xl:text-[38px] leading-7 sm:leading-8 md:leading-9 lg:leading-[42px] 2xl:leading-[52px] text-lightBlack dark:text-white font-Garamond font-semibold capitalize">
                Quarterly Financial Reports
              </h1>
              <div className="flex items-center justify-center text-center mx-auto mt-2 lg:mt-[6px]">
                <div className="w-[100px] h-[1px] bg-[#ccc] dark:bg-[#3b3b3b] mr-5 "></div>
                <img
                  src="/images/home-1/section-shape1.png"
                  className="w-[30px] h-[30px]"
                  alt=""
                />
                <div className="w-[100px] h-[1px] bg-[#ccc] dark:bg-[#3b3b3b] ml-5"></div>
              </div>
              <p className="text-center text-sm lg:text-base leading-[26px] text-gray dark:text-lightGray font-Lora font-normal mt-[10px]">
                Access our quarterly financial performance reports and business highlights
              </p>
            </div>
          </div>

          {/* Reports Grid */}
          {reports.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-500 dark:text-gray-400">No quarterly reports available at the moment.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 pt-16 2xl:pt-20">
              {reports.map((report: StrapiReport, index: number) => (
                <div
                  key={report.id}
                  className="overflow-x-hidden 3xl:w-[410px] group"
                  data-aos="fade-up"
                  data-aos-duration={800 + (index * 200)}
                >
                  <div className="relative">
                    <div className="overflow-hidden">
                      <PDFPreview 
                        title={report.title} 
                        description={report.description || "Click to view report"}
                        fileId={report.File_Source === 'Google_Drive' ? report.file_Id : undefined}
                        fileUrl={report.File_Source === 'Upload' ? (getReportFileUrl(report) || undefined) : undefined}
                        showThumbnail={true}
                      />
                    </div>

                    <div className="flex space-x-2 absolute bottom-2 -left-52 group-hover:left-2 transition-all duration-300">
                      <button
                        onClick={() => handleView(report)}
                        className="flex items-center justify-center text-[13px] leading-[32px] bg-khaki px-4 py-1 text-white hover:bg-opacity-90 transition-all duration-300"
                        title="View PDF"
                      >
                        <BsEye className="w-3 h-3 mr-1" />
                        View
                      </button>
                      <button
                        onClick={() => handleDownload(report)}
                        className="flex items-center justify-center text-[13px] leading-[32px] bg-green-600 px-4 py-1 text-white hover:bg-opacity-90 transition-all duration-300"
                        title="Download PDF"
                      >
                        <BsDownload className="w-3 h-3 mr-1" />
                        Download
                      </button>
                    </div>
                  </div>
                  <div className="font-Garamond">
                    <div className=" border-[1px] border-[#e8e8e8] dark:border-[#424242]  border-t-0">
                      <div className="py-6 px-[30px]">
                        {report.featured && (
                          <div className="mb-2">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-khaki text-white">
                              Featured
                            </span>
                          </div>
                        )}
                        <h4 className="text-sm leading-[26px] text-khaki uppercase font-semibold">
                          {getQuarterDisplay(report)}
                        </h4>
                        <h2 className="text-lg lg:text-[20px] xl:text-[22px] leading-[24px] font-semibold text-lightBlack dark:text-white py-3">
                          {report.title}
                        </h2>
                        <p className="text-sm font-normal text-gray dark:text-lightGray font-Lora mb-3">
                          {report.description || "No description available"}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            <span>File: {getReportFileName(report)}</span>
                            {getReportFileSize(report) && (
                              <span className="ml-2">({getReportFileSize(report)})</span>
                            )}
                          </div>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleView(report)}
                              className="text-xs text-khaki hover:text-opacity-80 transition-colors duration-300"
                            >
                              Quick View
                            </button>
                            <span className="text-xs text-gray-300">|</span>
                            <button
                              onClick={() => handleDownload(report)}
                              className="text-xs text-green-600 hover:text-opacity-80 transition-colors duration-300"
                            >
                              Download
                            </button>
                          </div>
                        </div>
                        {report.reportType && (
                          <div className="mt-2">
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                              {report.reportType}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Back to Reports Navigation */}
          <div className="flex justify-center mt-16">
            <Link
              to="/reports"
              className="flex items-center text-khaki hover:text-opacity-80 transition-colors duration-300"
            >
              <HiArrowLongLeft className="w-5 h-5 mr-2" />
              Back to All Reports
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuarterlyReportPage;
