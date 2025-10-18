import React from "react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./style.css";

// import required modules
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const HeroSection: React.FC = () => {
  return (
    <div className="">
      <Swiper
        centeredSlides={true}
        navigation={true}
        speed={3000}
        autoplay={{
          delay: 10000,
          disableOnInteraction: true,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Navigation, Autoplay, Pagination]}
        className="mySwiper"
      >
        {/* slider 1 */}
        <SwiperSlide>
          <div
            className="bg-[url('/images/home-1/hero-bg.jpg')] w-full h-[700px] md:h-[800px] xl:h-[850px] 3xl:h-[950px]  bg-[rgba(30,30,30,0.4)] bg-opacity-40 grid items-center bg-cover justify-center text-white relative pb-[150px] lg:pb-16 xl:pb-0 "
            data-aos="fade-down"
          >
            {/* Intentionally left blank to show image only */}
          </div>
        </SwiperSlide>
        {/* slider 2 */}
        <SwiperSlide>
          <div
            className="bg-[url('/images/home-1/hero-bg2.jpg')] w-full h-[700px] md:h-[800px] xl:h-[850px] 3xl:h-[950px]  bg-[rgba(30,30,30,0.4)] bg-opacity-40 grid items-center bg-cover justify-center text-white relative pb-[150px] lg:pb-20 xl:pb-0"
            data-aos="fade-down"
          >
            {/* Intentionally left blank to show image only */}
          </div>
        </SwiperSlide>
        {/* slider 3 */}
        <SwiperSlide>
          <div
            className="bg-[url('/images/home-1/hero-bg.jpg')] w-full h-[700px] md:h-[800px] xl:h-[850px] 3xl:h-[950px]  bg-[rgba(30,30,30,0.4)] bg-opacity-40 grid items-center bg-cover justify-center text-white relative pb-[150px] lg:pb-20 xl:pb-0"
            data-aos="fade-down"
          >
            {/* Intentionally left blank to show image only */}
          </div>
        </SwiperSlide>
        {/* slider 4 */}
        <SwiperSlide>
          <div
            className="bg-[url('/images/home-1/hero-bg2.jpg')] w-full h-[700px] md:h-[800px] xl:h-[850px] 3xl:h-[950px]  bg-[rgba(30,30,30,0.4)] bg-opacity-40 grid items-center bg-cover justify-center text-white relative pb-[150px] lg:pb-20 xl:pb-0"
            data-aos="fade-down"
          >
            {/* Intentionally left blank to show image only */}
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default HeroSection;
