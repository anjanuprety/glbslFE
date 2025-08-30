import { createBrowserRouter } from "react-router-dom";

// Main app (only Home1 in this repo)
import Main from "../Main/Main";
import Home1 from "../Pages/Home1/Home1";

// About pages
import { AboutUs, BoardOfDirectors, ManagementTeam, CorporateTeam, Committee, OrganizationStructure } from "../Pages/About";

// Branches page
import BranchesPage from "../Pages/Branches/BranchesPage";

// Service pages
import LoanServicesPage from "../Pages/Services/services/LoanServices/LoanServicesPage";
import SavingsServicesPage from "../Pages/Services/services/SavingsServices/SavingsServicesPage";
import RemittanceServicesPage from "../Pages/Services/services/RemittanceServices/RemittanceServicesPage";
import MemberWelfareServicesPage from "../Pages/Services/services/MemberWelfare/MemberWelfareServicesPage";

// Inner pages
import ReportsPage from "../Pages/InnerPage/ReportsPage";
import Services from "../Pages/InnerPage/Services";
import ServiceDetails from "../Pages/InnerPage/ServiceDetails";
import Team from "../Pages/InnerPage/Team";
import Contact from "../Pages/InnerPage/Contact";
import ErrorPage from "../Shared/ErrorPage/ErrorPage";

// Report pages
import { 
  QuarterlyReportPage, 
  AnnualReportPage, 
  AGMMinutesPage, 
  BaseRatePage, 
  StaffTrainingPage, 
  GovernanceReportPage,
  NoticePage 
} from "../Pages/InnerPage/Reports";

// Career pages
import { 
  CareerNoticesPage, 
  ApplyForJobPage, 
  ApplicationFormPage 
} from "../Pages/InnerPage/Career";

// Only the primary route is kept (Home1). Extra homepage routes removed.
const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home1 />,
      },
      {
        path: "/about",
        element: <AboutUs />,
      },
      {
        path: "/board-of-directors",
        element: <BoardOfDirectors />,
      },
      {
        path: "/management-team",
        element: <ManagementTeam />,
      },
      {
        path: "/corporate-team",
        element: <CorporateTeam />,
      },
      {
        path: "/committee",
        element: <Committee />,
      },
      {
        path: "/organization-structure",
        element: <OrganizationStructure />,
      },
      {
        path: "/branches",
        element: <BranchesPage />,
      },
      {
        path: "/reports",
        element: <ReportsPage />,
      },
      {
        path: "/reports/quarterly-report",
        element: <QuarterlyReportPage />,
      },
      {
        path: "/reports/annual-report",
        element: <AnnualReportPage />,
      },
      {
        path: "/reports/agm-minutes",
        element: <AGMMinutesPage />,
      },
      {
        path: "/reports/base-rate",
        element: <BaseRatePage />,
      },
      {
        path: "/reports/staff-training",
        element: <StaffTrainingPage />,
      },
      {
        path: "/reports/governance-report",
        element: <GovernanceReportPage />,
      },
      {
        path: "/reports/notices",
        element: <NoticePage />,
      },
      {
        path: "/career/notices",
        element: <CareerNoticesPage />,
      },
      {
        path: "/career/apply",
        element: <ApplyForJobPage />,
      },
      {
        path: "/career/application-form",
        element: <ApplicationFormPage />,
      },
      {
        path: "/services",
        element: <Services />,
      },
      {
        path: "/services/loan",
        element: <LoanServicesPage />,
      },
      {
        path: "/services/savings",
        element: <SavingsServicesPage />,
      },
      {
        path: "/services/remittance",
        element: <RemittanceServicesPage />,
      },
      {
        path: "/services/member-welfare",
        element: <MemberWelfareServicesPage />,
      },
      {
        path: "/service_details",
        element: <ServiceDetails />,
      },
      {
        path: "/our_team",
        element: <Team />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
    ],
  },
]);

export default router;
