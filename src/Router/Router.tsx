import { createBrowserRouter } from "react-router-dom";

// Main app (only Home1 in this repo)
import Main from "../Main/Main";
import Home1 from "../Pages/Home1/Home1";

// About pages
import { AboutUs, BoardOfDirectors, ManagementTeam, CorporateTeam, Committee, OrganizationStructure } from "../Pages/About";

// Branches page
import BranchesPage from "../Pages/Branches/BranchesPage";

// Inner pages
import Room from "../Pages/InnerPage/Room";
import FindRoom from "../Pages/InnerPage/FindRoom";
import RoomDetails from "../Pages/InnerPage/RoomDetails";
import Services from "../Pages/InnerPage/Services";
import ServiceDetails from "../Pages/InnerPage/ServiceDetails";
import Team from "../Pages/InnerPage/Team";
import Pricing from "../Pages/InnerPage/Pricing";
import Blog from "../Pages/InnerPage/Blog";
import BlogDetails from "../Pages/InnerPage/BlogDetails";
import Contact from "../Pages/InnerPage/Contact";
import ErrorPage from "../Shared/ErrorPage/ErrorPage";

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
        path: "/room",
        element: <Room />,
      },
      {
        path: "/find_room",
        element: <FindRoom />,
      },
      {
        path: "/room_details",
        element: <RoomDetails />,
      },
      {
        path: "/services",
        element: <Services />,
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
        path: "/pricing",
        element: <Pricing />,
      },
      {
        path: "/blog",
        element: <Blog />,
      },
      {
        path: "/blog_details",
        element: <BlogDetails />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
    ],
  },
]);

export default router;
