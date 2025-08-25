import { LoanProduct } from "../../../types";

// Initial hardcoded loan products data (12 entries as specified)
// This data will later be replaced with Strapi CMS integration
// Each entry follows the LoanProduct interface for Strapi compatibility
export const loanProductsData: LoanProduct[] = [
  {
    id: "1",
    serialNumber: 1,
    loanProductName: "Personal Loan",
    loanVolume: "NPR 50,000 - NPR 5,00,000",
    interestRate: "12.5%",
    serviceCharge: "2%",
    loanTerm: "1-5 Years"
  },
  {
    id: "2", 
    serialNumber: 2,
    loanProductName: "Home Loan",
    loanVolume: "NPR 5,00,000 - NPR 50,00,000", 
    interestRate: "10.5%",
    serviceCharge: "1.5%",
    loanTerm: "5-20 Years"
  },
  {
    id: "3",
    serialNumber: 3,
    loanProductName: "Business Loan",
    loanVolume: "NPR 1,00,000 - NPR 20,00,000",
    interestRate: "13%",
    serviceCharge: "2.5%", 
    loanTerm: "1-7 Years"
  },
  {
    id: "4",
    serialNumber: 4,
    loanProductName: "Education Loan",
    loanVolume: "NPR 50,000 - NPR 10,00,000",
    interestRate: "9.5%",
    serviceCharge: "1%",
    loanTerm: "2-10 Years"
  },
  {
    id: "5",
    serialNumber: 5,
    loanProductName: "Vehicle Loan",
    loanVolume: "NPR 2,00,000 - NPR 25,00,000",
    interestRate: "11%",
    serviceCharge: "1.5%",
    loanTerm: "2-7 Years"
  },
  {
    id: "6",
    serialNumber: 6,
    loanProductName: "Agricultural Loan",
    loanVolume: "NPR 25,000 - NPR 5,00,000",
    interestRate: "8%",
    serviceCharge: "1%",
    loanTerm: "6 Months - 3 Years"
  },
  {
    id: "7",
    serialNumber: 7,
    loanProductName: "Micro Credit Loan",
    loanVolume: "NPR 10,000 - NPR 1,00,000",
    interestRate: "15%",
    serviceCharge: "2%",
    loanTerm: "3 Months - 2 Years"
  },
  {
    id: "8",
    serialNumber: 8,
    loanProductName: "SME Loan",
    loanVolume: "NPR 5,00,000 - NPR 30,00,000",
    interestRate: "12%",
    serviceCharge: "2%",
    loanTerm: "1-5 Years"
  },
  {
    id: "9",
    serialNumber: 9,
    loanProductName: "Term Loan",
    loanVolume: "NPR 1,00,000 - NPR 15,00,000", 
    interestRate: "11.5%",
    serviceCharge: "1.5%",
    loanTerm: "1-8 Years"
  },
  {
    id: "10",
    serialNumber: 10,
    loanProductName: "Working Capital Loan",
    loanVolume: "NPR 2,00,000 - NPR 10,00,000",
    interestRate: "13.5%",
    serviceCharge: "2.5%",
    loanTerm: "1-3 Years"
  },
  {
    id: "11",
    serialNumber: 11,
    loanProductName: "Emergency Loan",
    loanVolume: "NPR 15,000 - NPR 2,00,000",
    interestRate: "16%",
    serviceCharge: "3%",
    loanTerm: "3-18 Months"
  },
  {
    id: "12",
    serialNumber: 12,
    loanProductName: "Loan Against Property",
    loanVolume: "NPR 10,00,000 - NPR 1,00,00,000",
    interestRate: "9%",
    serviceCharge: "1%",
    loanTerm: "5-25 Years"
  }
];
