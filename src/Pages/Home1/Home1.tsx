import React from "react";
import Action from "../../Components/CallDoAction/Action";
import Facilities from "../../Components/Facilities/Facilities";
import HeroSection from "../../Components/HeroSection/HeroSection";
// import HotelAndFacilities from "../../Components/HotelAndFacilities/HotelAndFacilities";
import HotelAndResort from "../../Components/HotelAndResort/HotelAndResort";
// import LatestBlog from "../../Components/LatestBlog/LatestBlog";
import Offers from "../../Components/Offers/Offers";
import Reports from "../../Components/Reports/Reports";
import Testimonial from "../../Components/Testimonial/Testimonial";

const Home1: React.FC = () => {
  return (
    <>
      <HeroSection />
      <Reports />
      <HotelAndResort />
      {/* <HotelAndFacilities /> */}
      <Action />
      <Facilities />
      <Offers />
      <Testimonial />
      {/* <LatestBlog /> */}
    </>
  );
};

export default Home1;
