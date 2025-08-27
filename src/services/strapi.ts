import axios from 'axios';

const API_URL = process.env.REACT_APP_STRAPI_API_URL || 'http://localhost:1337';

const api = axios.create({
  baseURL: API_URL,
});

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
    return res.data.data?.attributes || null;
  },
  getBoardMembers: async () => {
    const locale = getLocale();
    const res = await api.get(`/api/people?filters[personType][$eq]=boardMember&locale=${locale}&populate=*&sort=order:asc`);
    return res.data.data || [];
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
    return res.data.data?.attributes || null;
  },
  getMemberWelfareService: async () => {
    const locale = getLocale();
    const res = await api.get(`/api/member-welfare-service?locale=${locale}&populate=*`);
    return res.data.data?.attributes || null;
  },
  getServiceCategories: async () => {
    const locale = getLocale();
    const res = await api.get(`/api/service-categories?locale=${locale}&populate=*&sort=order:asc`);
    return res.data.data || [];
  },
};

export default api;
