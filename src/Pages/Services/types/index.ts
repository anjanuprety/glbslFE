// TypeScript interfaces for Services system
// Designed for future Strapi CMS integration

// Interface for Loan Products - compatible with Strapi collection
export interface LoanProduct {
  id: string;
  serialNumber: number;
  loanProductName: string;
  loanVolume: string;
  interestRate: string;
  serviceCharge: string;
  loanTerm: string;
}

// Interface for Savings Products - compatible with Strapi collection  
export interface SavingsProduct {
  id: string;
  serialNumber: number;
  savingProductName: string;
  interestRate: string;
}

// Interface for Member Welfare Services - compatible with Strapi collection
export interface WelfareService {
  id: string;
  serviceName: string;
  description: string;
  order?: number; // For ordering in Strapi
}

// Interface for Remittance Service Content - compatible with Strapi single type
export interface RemittanceContent {
  id: string;
  title: string;
  description: string;
  features: RemittanceFeature[];
}

// Interface for Remittance Features - compatible with Strapi component
export interface RemittanceFeature {
  id: string;
  featureName: string;
  featureDescription: string;
}

// Interface for Service Card component props
export interface ServiceCardProps {
  id: string;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  linkTo: string;
  orderNumber: string;
}

// Interface for API responses from Strapi (future integration)
export interface StrapiResponse<T> {
  data: T[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

// Interface for single API response from Strapi (future integration)
export interface StrapiSingleResponse<T> {
  data: T;
  meta: {};
}

// Service categories enum for type safety
export enum ServiceCategory {
  LOAN = 'loan',
  SAVINGS = 'savings', 
  REMITTANCE = 'remittance',
  MEMBER_WELFARE = 'member-welfare'
}
