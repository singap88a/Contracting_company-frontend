import React from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import { ArrowLeft, ArrowRight, Quote } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/navigation';

const TestimonialsImmersive = () => {
  const reviews = [
    {
      name: "سالم العلي",
      role: "عميل سكني",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
      text: "الخدمة كانت ممتازة جداً، الالتزام بالمواعيد والدقة في التنفيذ هي ما يميز فريق صرح البناء دائماً."
    },
    {
      name: "أمل القحطاني",
      role: "مديرة مشاريع",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop",
      text: "اعتمدنا عليهم في تنفيذ مجمعنا السكني الجديد وكانت النتائج مبهرة وتفوق التوقعات."
    },
    {
      name: "م. خالد المانع",
      role: "استشاري هندسي",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop",
      text: "مهنية عالية في التعامل وفهم عميق للمتطلبات التقنية الحديثة. أنصح بالتعامل معهم وبشدة."
    }
  ];

  return (
    <section className="py-24 bg-white overflow-hidden text-right">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
           <div className="max-w-xl">
              <span className="text-primary-500 font-black uppercase tracking-[0.4em] text-sm mb-4 block">آراء عملائنا</span>
              <h2 className="text-4xl md:text-5xl font-black text-secondary-900 leading-[1.2]">ماذا يقول <span className="text-primary-500">شركاء النجاح</span> عن تجربتهم معنا</h2>
           </div>
           
           {/* Custom Navigation (Image 3 style) */}
           <div className="flex gap-4">
              <button className="testimonial-prev w-14 h-14 rounded-full border-2 border-gray-100 flex items-center justify-center text-secondary-900 hover:bg-primary-500 hover:border-primary-500 hover:text-white transition-all duration-300 shadow-sm">
                 <ArrowRight size={24} />
              </button>
              <button className="testimonial-next w-14 h-14 rounded-full border-2 border-gray-100 flex items-center justify-center text-secondary-900 hover:bg-primary-500 hover:border-primary-500 hover:text-white transition-all duration-300 shadow-sm">
                 <ArrowLeft size={24} />
              </button>
           </div>
        </div>

        <Swiper
          modules={[Autoplay, Navigation]}
          spaceBetween={30}
          slidesPerView={1}
          autoplay={{ delay: 5000 }}
          navigation={{
            prevEl: '.testimonial-prev',
            nextEl: '.testimonial-next',
          }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 2.5 }
          }}
          className="pb-16"
        >
          {reviews.map((review, index) => (
            <SwiperSlide key={index}>
                <div className="bg-gray-50 p-10 rounded-[2.5rem] border border-gray-100 relative group hover:bg-white hover:shadow-2xl transition-all duration-500 h-full flex flex-col justify-between">
                    <div>
                        <div className="bg-primary-500/10 w-16 h-16 rounded-2xl flex items-center justify-center text-primary-500 mb-8 group-hover:bg-primary-500 group-hover:text-white transition-all">
                           <Quote size={32} />
                        </div>
                        <p className="text-xl text-secondary-900 leading-relaxed font-medium mb-12">
                           "{review.text}"
                        </p>
                    </div>

                    <div className="flex items-center gap-4 justify-end border-t border-gray-200 pt-8">
                        <div className="text-right">
                           <h4 className="text-lg font-black text-secondary-900">{review.name}</h4>
                           <p className="text-gray-400 text-xs font-bold uppercase tracking-wider">{review.role}</p>
                        </div>
                        <img 
                           src={review.image} 
                           className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-md" 
                           alt={review.name}
                        />
                    </div>
                </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default TestimonialsImmersive;
