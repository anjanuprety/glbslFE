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

export default api;
