import React from "react";
// import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Pagination, Navigation } from "swiper";

import Passat from "../../assets/images/passat.png";
import ID4 from "../../assets/images/VW_ID4.png";
import ID7 from "../../assets/images/VW_ID7.png";
import T7 from "../../assets/images/VW_T7.png";

const Slider = () => {
  return (
    <div className="w-full shadow-md ">
      <Swiper
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        grabCursor={true}
        navigation={true}
        spaceBetween={5}
        loop={true}
        slidesPerView={1}
        modules={[Navigation, Pagination, Autoplay]}
        pagination={{ clickable: true }}
        className=" mySwiper w-full h-96"
      >
        <SwiperSlide className="w-full h-full text-center flex items-center justify-center bg-white">
          <div className="flex h-full flex-row justify-evenly items-center ">
            <div className="flex h-full flex-col pt-10 ">
              <h1 className="text-7xl font-bold">V.W ID7</h1>
              <h1 className="text-3xl font-bold tracking-wide -mt-1">
                Volkswagen
              </h1>
            </div>

            <img src={ID7} alt="ID7_Car" className="w-auto h-fit" />
          </div>
        </SwiperSlide>
        <SwiperSlide className="w-full h-full bg-white  text-center flex items-center justify-center ">
          <div className="h-full flex flex-row items-center justify-evenly ">
            <div className="flex h-full flex-col pt-10 ">
              <h1 className="text-7xl font-bold text-blue-800">V.W ID4</h1>
              <h1 className="text-3xl font-bold tracking-wide -mt-1">
                Volkswagen
              </h1>
            </div>

            <img src={ID4} alt="ID4_Car" className="w-auto h-fit" />
          </div>
        </SwiperSlide>
        <SwiperSlide className="w-full h-full bg-white  text-center flex items-center justify-center ">
          <div className="h-full  flex flex-row items-center justify-evenly ">
            <div className="flex h-full flex-col pt-10 ">
              <h1 className="text-7xl font-bold  text-gray-700">Passat B8</h1>
              <h1 className="text-3xl font-bold tracking-wide -mt-1">
                Volkswagen
              </h1>
            </div>

            <img src={Passat} alt="passat_Car" className="w-auto h-full" />
          </div>
        </SwiperSlide>
        <SwiperSlide className="w-full h-full bg-white  text-center flex items-center justify-center ">
          <div className="h-full  flex flex-row items-center justify-evenly">
            <div className="flex h-full flex-col pt-10 ">
              <h1 className="text-7xl font-bold text-orange-400">
                Transporter T7
              </h1>
              <h1 className="text-3xl font-bold tracking-wide ">Volkswagen</h1>
            </div>
            <img src={T7} alt="T7_Car" className="w-auto h-fit" />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Slider;
