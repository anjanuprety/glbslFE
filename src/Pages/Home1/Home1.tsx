import React from "react";
import Action from "../../components/CallDoAction/Action";
import Facilities from "../../components/Facilities/Facilities";
import HeroSection from "../../components/HeroSection/HeroSection";
// import HotelAndFacilities from "../../components/HotelAndFacilities/HotelAndFacilities";
import HotelAndResort from "../../components/HotelAndResort/HotelAndResort";
// import LatestBlog from "../../components/LatestBlog/LatestBlog";
import Offers from "../../components/Offers/Offers";
import Reports from "../../components/Reports/Reports";
import Rooms from "../../components/Rooms/Rooms";
import Testimonial from "../../components/Testimonial/Testimonial";

const Home1: React.FC = () => {
  return (
    <>
      <HeroSection />
      <Rooms />
      <HotelAndResort />
      {/* <HotelAndFacilities /> */}
      <Action />
      <Facilities />
      <Offers />
      <Reports />
      <Testimonial />
      {/* <LatestBlog /> */}
    </>
  );
};

export default Home1;
