import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

import 'swiper/css';

const Brands = () => {
  const brands = [
    'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg',
    'https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg',
    'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg',
    'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
    'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg',
    'https://upload.wikimedia.org/wikipedia/commons/c/ce/Coca-Cola_logo.svg',
    'https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg',
  ];

  return (
    <section className="py-12 bg-gray-50 border-b border-gray-100">
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
               className="h-8 md:h-10 w-auto object-contain transition-all duration-300 filter brightness-100 opacity-80 hover:opacity-100" 
             />
           </SwiperSlide>
         ))}
       </Swiper>
    </section>
  );
};

export default Brands;
