import React, { useState, useEffect } from "react";
import BreadCrumb from "../../../BreadCrumb/BreadCrumb";
import { BsDownload, BsEye, BsShare } from "react-icons/bs";
import { HiArrowLongLeft } from "react-icons/hi2";
import { Link } from "react-router-dom";
import PDFPreview from "../../../Components/Reports/PDFPreview";
import { noticesService, googleDriveHelpers } from "../../../services/strapi";

// TypeScript interface for Notice from Strapi v5 API
interface StrapiNotice {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  content?: Array<{
    type: string;
    children: Array<{
      text: string;
      type: string;
    }>;
  }>;
  noticeType?: string;
  publishDate?: string;
  expiryDate?: string;
  isUrgent?: boolean;
  priority?: number;
  isActive?: boolean;
  attatchmentFile_Id?: string;
  attatchmentFileName?: string;
  attatchmentFileSize?: string;
  viewCount?: number;
  tags?: string;
  seoTitle?: string;
  seoDescription?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
}

// Helper function to generate Google Drive download URL
const getGoogleDriveDownloadUrl = (fileId: string): string => {
  return googleDriveHelpers.getDownloadUrl(fileId);
};

// Helper function to generate Google Drive view URL  
const getGoogleDriveViewUrl = (fileId: string): string => {
  return googleDriveHelpers.getViewUrl(fileId);
};

// Helper function to format date
const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long', 
    day: 'numeric'
  });
};

// Helper function to extract text from rich content
const extractTextFromContent = (content?: Array<any>): string => {
  if (!content || !Array.isArray(content)) return '';
  
  return content.map(block => {
    if (block.children && Array.isArray(block.children)) {
      return block.children.map((child: any) => child.text || '').join('');
    }
    return '';
  }).join(' ');
};

const NoticePage: React.FC = () => {
  const [notices, setNotices] = useState<StrapiNotice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        setLoading(true);
        const response = await noticesService.getNotices();
        setNotices(response.data);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch notices:', err);
        setError('Failed to load notices. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, []);  const handleDownload = (notice: StrapiNotice) => {
    if (notice.attatchmentFile_Id) {
      const downloadUrl = getGoogleDriveDownloadUrl(notice.attatchmentFile_Id);
      window.open(downloadUrl, '_blank');
    } else {
      alert('No attachment file available for this notice.');
    }
  };

  const handleView = (notice: StrapiNotice) => {
    if (notice.attatchmentFile_Id) {
      const viewUrl = getGoogleDriveViewUrl(notice.attatchmentFile_Id);
      window.open(viewUrl, '_blank');
    } else {
      alert('No attachment file available for this notice.');
    }
  };

  const handleShare = async (notice: StrapiNotice) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${notice.title} - GLBSL`,
          text: `Check out our notice: ${notice.title}`,
          url: `${window.location.origin}/reports/notices/${notice.id}`,
        });
      } catch (error) {
        console.log('Error sharing:', error);
        alert(`${notice.title} link copied to clipboard!`);
      }
    } else {
      alert(`${notice.title} link copied to clipboard!`);
    }
  };

  return (
    <section className="">
      <BreadCrumb title="NOTICES" home={"/"} />

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
                Official Notices & Announcements
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
                Stay informed with our latest official notices, announcements, and important updates
              </p>
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center py-16">
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-khaki"></div>
                <p className="mt-4 text-gray-600 dark:text-gray-400">Loading notices...</p>
              </div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center py-16">
              <p className="text-red-500 dark:text-red-400">{error}</p>
            </div>
          )}

          {/* Notices Grid */}
          {!loading && !error && (
            <>
              {notices.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-gray-500 dark:text-gray-400">No notices available at the moment.</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 pt-8">
                  {notices.map((notice: StrapiNotice, index: number) => (
                    <div
                      key={notice.id}
                      className="overflow-x-hidden 3xl:w-[410px] group"
                      data-aos="fade-up"
                      data-aos-duration={800 + (index * 200)}
                    >
                      <div className="relative">
                        <div className="overflow-hidden">
                          <PDFPreview 
                            title={notice.title} 
                            description={extractTextFromContent(notice.content) || "Click to view notice"}
                            fileId={notice.attatchmentFile_Id}
                            showThumbnail={!!notice.attatchmentFile_Id}
                          />
                        </div>

                        <div className="flex space-x-2 absolute bottom-2 -left-52 group-hover:left-2 transition-all duration-300">
                          <button
                            onClick={() => handleView(notice)}
                            className="flex items-center justify-center text-[13px] leading-[32px] bg-khaki px-4 py-1 text-white hover:bg-opacity-90 transition-all duration-300"
                            title="View Notice"
                          >
                            <BsEye className="w-3 h-3 mr-1" />
                            View
                          </button>
                          {notice.attatchmentFile_Id && (
                            <button
                              onClick={() => handleDownload(notice)}
                              className="flex items-center justify-center text-[13px] leading-[32px] bg-green-600 px-4 py-1 text-white hover:bg-opacity-90 transition-all duration-300"
                              title="Download PDF"
                            >
                              <BsDownload className="w-3 h-3 mr-1" />
                              Download
                            </button>
                          )}
                          <button
                            onClick={() => handleShare(notice)}
                            className="flex items-center justify-center text-[13px] leading-[32px] bg-blue-600 px-4 py-1 text-white hover:bg-opacity-90 transition-all duration-300"
                            title="Share Notice"
                          >
                            <BsShare className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                      <div className="font-Garamond">
                        <div className=" border-[1px] border-[#e8e8e8] dark:border-[#424242]  border-t-0">
                          <div className="py-6 px-[30px]">
                            {notice.isUrgent && (
                              <div className="mb-2">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-500 text-white">
                                  Urgent
                                </span>
                              </div>
                            )}
                            <h2 className="text-lg lg:text-[20px] xl:text-[22px] leading-[24px] font-semibold text-lightBlack dark:text-white py-3">
                              {notice.title}
                            </h2>
                            <p className="text-sm font-normal text-gray dark:text-lightGray font-Lora mb-3">
                              {extractTextFromContent(notice.content) || "No description available"}
                            </p>
                            {notice.publishDate && (
                              <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                                Published: {formatDate(notice.publishDate)}
                              </p>
                            )}
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleView(notice)}
                                className="text-xs text-khaki hover:text-opacity-80 transition-colors duration-300"
                              >
                                View
                              </button>
                              {notice.attatchmentFile_Id && (
                                <>
                                  <span className="text-xs text-gray-300">|</span>
                                  <button
                                    onClick={() => handleDownload(notice)}
                                    className="text-xs text-green-600 hover:text-opacity-80 transition-colors duration-300"
                                  >
                                    Download
                                  </button>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
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

export default NoticePage;
