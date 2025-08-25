import { WelfareService } from "../../../types";

// Member welfare services data as specified in requirements
// This data will later be replaced with Strapi CMS integration
// Each entry follows the WelfareService interface for Strapi compatibility  
export const welfareServicesData: WelfareService[] = [
  {
    id: "1",
    serviceName: "Skill Oriented Training",
    description: "Provide skill oriented training to increase economic status of group members.",
    order: 1
  },
  {
    id: "2",
    serviceName: "Pre-Group Training",
    description: "Provide pre group Training to the member of new group.",
    order: 2
  },
  {
    id: "3", 
    serviceName: "Delivery Expense Support",
    description: "Provide delivery expenses to group members.",
    order: 3
  },
  {
    id: "4",
    serviceName: "Member Death Expenses",
    description: "Provide member/client death expenses.",
    order: 4
  },
  {
    id: "5",
    serviceName: "Income Generation Training",
    description: "Provide income generated trainings.",
    order: 5
  },
  {
    id: "6",
    serviceName: "Healthcare Support",
    description: "Provide health Camps, Eye Camps and other, help of health institutions.",
    order: 6
  },
  {
    id: "7",
    serviceName: "Spouse Death Expenses", 
    description: "Husband's death expenses of group members.",
    order: 7
  }
];
