import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

import 'swiper/css';

const Brands = () => {
  const brands = [
    '/prand_img/Picture1.png',
    '/prand_img/Picture2.png',
    '/prand_img/Picture3.png',
    '/prand_img/Picture4.png',
    '/prand_img/Picture5.png',
    '/prand_img/Picture6.png',
    '/prand_img/Picture7.png',
    '/prand_img/Picture8.png',
    '/prand_img/Picture9.png',
    '/prand_img/Picture10.png',
    '/prand_img/Picture11.png',
    '/prand_img/Picture12.png',
    '/prand_img/Picture13.png',
    '/prand_img/Picture14.png',
    '/prand_img/Picture15.png',
    '/prand_img/Picture16.png',
    '/prand_img/Picture17.png',
    '/prand_img/Picture18.png',
    '/prand_img/Picture19.png',
    '/prand_img/Picture20.png',
    '/prand_img/Picture21.png',
    '/prand_img/Picture22.png',
    '/prand_img/Picture23.png',
  ];

  return (
    <section className="py-4 bg-gray-50 border-b border-gray-100">
       <Swiper
         modules={[Autoplay]}
         spaceBetween={60}
         slidesPerView={2}
         loop={true}
         speed={4000}
         autoplay={{
           delay: 0,
           disableOnInteraction: false,
         }}
         breakpoints={{
           640: { slidesPerView: 3 },
           768: { slidesPerView: 4 },
           1024: { slidesPerView: 5 },
         }}
         className="w-full"
         wrapperClass="items-center ease-linear"
       >
         {brands.map((logo, index) => (
           <SwiperSlide key={index} className="flex justify-center items-center px-4">
             <img 
               src={logo} 
               alt={`Brand ${index}`} 
               className="h-[100px] w-auto object-contain transition-all duration-300 filter brightness-100 opacity-80 hover:opacity-100" 
             />
           </SwiperSlide>
         ))}
       </Swiper>
    </section>
  );
};

export default Brands;
