import { SavingsProduct } from "../../../types";

// Initial hardcoded savings products data (9 entries as specified)
// This data will later be replaced with Strapi CMS integration
// Each entry follows the SavingsProduct interface for Strapi compatibility
export const savingsProductsData: SavingsProduct[] = [
  {
    id: "1",
    serialNumber: 1,
    savingProductName: "Regular Savings Account",
    interestRate: "6.5%"
  },
  {
    id: "2",
    serialNumber: 2, 
    savingProductName: "Premium Savings Account",
    interestRate: "7.5%"
  },
  {
    id: "3",
    serialNumber: 3,
    savingProductName: "Fixed Deposit Account",
    interestRate: "9.5%"
  },
  {
    id: "4",
    serialNumber: 4,
    savingProductName: "Recurring Deposit Account",
    interestRate: "8.5%"
  },
  {
    id: "5",
    serialNumber: 5,
    savingProductName: "Children Savings Account",
    interestRate: "7%"
  },
  {
    id: "6",
    serialNumber: 6,
    savingProductName: "Senior Citizen Savings",
    interestRate: "8%"
  },
  {
    id: "7",
    serialNumber: 7,
    savingProductName: "Term Deposit Account",
    interestRate: "10%"
  },
  {
    id: "8",
    serialNumber: 8,
    savingProductName: "Flexible Savings Account", 
    interestRate: "6%"
  },
  {
    id: "9",
    serialNumber: 9,
    savingProductName: "High Yield Savings Account",
    interestRate: "8.5%"
  }
];
