import axios from 'axios';

const API_URL = (import.meta as any).env.VITE_STRAPI_API_URL || 'http://localhost:1337';
console.log('🔍 API_URL being used:', API_URL);

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

// Add request interceptor to log requests
api.interceptors.request.use(
  (config) => {
    console.log('🚀 Making API request to:', `${config.baseURL || ''}${config.url || ''}`);
    return config;
  },
  (error) => {
    console.error('❌ Request error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor to log responses
api.interceptors.response.use(
  (response) => {
    console.log('✅ API response received:', response.status, response.data);
    return response;
  },
  (error) => {
    console.error('❌ API response error:', error.response?.status, error.response?.data, error.message);
    return Promise.reject(error);
  }
);

const getLocale = () => {
  return (localStorage.getItem('language') as string) || 'en';
};

export const getStrapiMediaUrl = (url?: string | null) => {
  if (!url) return '';
  if (url.startsWith('http')) return url;
  return `${API_URL}${url}`;
};

export const aboutService = {
  getAboutUs: async () => {
    const locale = getLocale();
    const res = await api.get(`/api/about-us-setting?locale=${locale}&populate=*`);
    return res.data.data || null;
  },
  getBoardMembers: async () => {
    const locale = getLocale();
    const res = await api.get(`/api/people?filters[personType][$eq]=boardMember&locale=${locale}&populate=*&sort=order:asc`);
    return res.data.data || [];
  },
  getManagementTeam: async () => {
    const locale = getLocale();
    const res = await api.get(`/api/people?filters[personType][$eq]=managementTeam&locale=${locale}&populate=*&sort=order:asc`);
    return res.data.data || [];
  },
  getCorporateTeam: async () => {
    const locale = getLocale();
    const res = await api.get(`/api/people?filters[personType][$eq]=corporateTeam&locale=${locale}&populate=*&sort=order:asc`);
    return res.data.data || [];
  },
  getCommitteeMembers: async () => {
    const locale = getLocale();
    const res = await api.get(`/api/people?filters[personType][$eq]=committeeMember&locale=${locale}&populate=*&sort=order:asc`);
    return res.data.data || [];
  },
  getCommittees: async () => {
    const locale = getLocale();
    const res = await api.get(`/api/committees?locale=${locale}&populate[members][populate][person][populate]=image`);
    return res.data.data || [];
  },
  getMonitoringSupervision: async () => {
    const locale = getLocale();
    const res = await api.get(`/api/people?filters[personType][$eq]=monitoringSupervision&locale=${locale}&populate=*&sort=order:asc`);
    return res.data.data || [];
  },
  getOrganizationStructure: async () => {
    const locale = getLocale();
    const res = await api.get(`/api/organization-structure?locale=${locale}&populate=*`);
    return res.data.data || null;
  },
};

export const servicesService = {
  getLoanProducts: async () => {
    const locale = getLocale();
    const res = await api.get(`/api/loan-products?locale=${locale}&sort=order:asc`);
    return res.data.data || [];
  },
  getSavingsProducts: async () => {
    const locale = getLocale();
    const res = await api.get(`/api/savings-products?locale=${locale}&sort=order:asc`);
    return res.data.data || [];
  },
  getRemittanceService: async () => {
    const locale = getLocale();
    const res = await api.get(`/api/remittance-service?locale=${locale}&populate=*`);
    return res.data.data || null;
  },
  getMemberWelfareService: async () => {
    const locale = getLocale();
    const res = await api.get(`/api/member-welfare-servicee?locale=${locale}&populate=*`);
    return res.data.data || null;
  },
  getServiceCategories: async () => {
    const locale = getLocale();
    const res = await api.get(`/api/service-categories?locale=${locale}&populate=*&sort=order:asc`);
    return res.data.data || [];
  },
};

export const reportsService = {
  // Get all active reports with proper population
  getAllReports: async () => {
    const locale = getLocale();
    const res = await api.get(`/api/reports?locale=${locale}&filters[isActive][$eq]=true&populate=category&sort=featured:desc,publishDate:desc`);
    return res.data || { data: [] };
  },

  // Get reports by category
  getReportsByCategory: async (categorySlug: string) => {
    const locale = getLocale();
    const res = await api.get(`/api/reports?locale=${locale}&filters[category][slug][$eq]=${categorySlug}&filters[isActive][$eq]=true&populate=category&sort=publishDate:desc`);
    return res.data || { data: [] };
  },

  // Get featured reports
  getFeaturedReports: async () => {
    const locale = getLocale();
    const res = await api.get(`/api/reports?locale=${locale}&filters[featured][$eq]=true&filters[isActive][$eq]=true&populate=category&sort=publishDate:desc`);
    return res.data || { data: [] };
  },

  // Get single report
  getReport: async (slug: string) => {
    const locale = getLocale();
    const res = await api.get(`/api/reports?locale=${locale}&filters[slug][$eq]=${slug}&populate=category`);
    return res.data?.data?.[0] || null;
  }
};

export const noticesService = {
  // Get all active notices with proper population
  getNotices: async () => {
    const locale = getLocale();
    const res = await api.get(`/api/notices?locale=${locale}&filters[isActive][$eq]=true&sort=publishDate:desc&populate=noticeImage`);
    return res.data || { data: [] };
  },

  // Get notices by type
  getNoticesByType: async (noticeType: string) => {
    const locale = getLocale();
    const res = await api.get(`/api/notices?locale=${locale}&filters[noticeType][$eq]=${noticeType}&filters[isActive][$eq]=true&sort=publishDate:desc&populate=noticeImage`);
    return res.data || { data: [] };
  },

  // Get urgent notices
  getUrgentNotices: async () => {
    const locale = getLocale();
    const res = await api.get(`/api/notices?locale=${locale}&filters[featured][$eq]=true&filters[isActive][$eq]=true&sort=publishDate:desc&populate=noticeImage`);
    return res.data || { data: [] };
  },

  // Get single notice
  getNotice: async (slug: string) => {
    const locale = getLocale();
    const res = await api.get(`/api/notices?locale=${locale}&filters[slug][$eq]=${slug}&populate=noticeImage`);
    return res.data?.data?.[0] || null;
  }
};

// Helper functions for Google Drive integration
export const googleDriveHelpers = {
  // Generate view URL for embedding
  getViewUrl: (fileId: string) => {
    return `https://drive.google.com/file/d/${fileId}/preview`;
  },

  // Generate download URL
  getDownloadUrl: (fileId: string) => {
    return `https://drive.google.com/uc?export=download&id=${fileId}`;
  },

  // Generate thumbnail URL
  getThumbnailUrl: (fileId: string, size: string = 'w400') => {
    return `https://drive.google.com/thumbnail?id=${fileId}&sz=${size}`;
  },

  // Open file in new tab
  openInNewTab: (fileId: string) => {
    const url = `https://drive.google.com/file/d/${fileId}/view`;
    window.open(url, '_blank');
  },

  // Download file directly
  downloadFile: async (fileId: string, fileName: string, trackingCallback?: () => void) => {
    const downloadUrl = googleDriveHelpers.getDownloadUrl(fileId);
    
    // Track download if callback provided
    if (trackingCallback) {
      trackingCallback();
    }

    // Create temporary link for download
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

export default api;
