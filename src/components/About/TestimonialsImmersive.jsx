import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Quote, ArrowRight, ArrowLeft } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

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
    <section className="py-10 bg-white overflow-hidden text-right relative">
      {/* Background Dots */}
      <div className="absolute top-0 right-0 w-full h-full opacity-40 bg-[radial-gradient(#e5e7eb_1.5px,transparent_1.5px)] [background-size:32px_32px]"></div>
      
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8">
           <div className="text-center md:text-right">
              <span className="text-primary-500 font-extrabold uppercase tracking-[0.4em] text-sm mb-4 block">آراء العملاء</span>
              <h2 className="text-4xl md:text-6xl font-[1000] text-secondary-900 leading-tight">
                 بصمةُ ثقةٍ <span className="text-primary-500">في كل مشروع</span>
              </h2>
           </div>
           
           <div className="flex gap-4">
              <button className="testimonial-prev w-14 h-14 rounded-2xl border border-gray-200 flex items-center justify-center text-secondary-900 hover:bg-primary-500 hover:border-primary-500 hover:text-white transition-all duration-500 shadow-sm hover:shadow-xl">
                 <ArrowRight size={24} />
              </button>
              <button className="testimonial-next w-14 h-14 rounded-2xl border border-gray-200 flex items-center justify-center text-secondary-900 hover:bg-primary-500 hover:border-primary-500 hover:text-white transition-all duration-500 shadow-sm hover:shadow-xl">
                 <ArrowLeft size={24} />
              </button>
           </div>
        </div>

        <Swiper
          modules={[Autoplay, Navigation, Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          autoplay={{ delay: 6000 }}
          navigation={{
            prevEl: '.testimonial-prev',
            nextEl: '.testimonial-next',
          }}
          pagination={{ clickable: true, el: '.custom-pagination' }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1280: { slidesPerView: 3 }
          }}
          className="!pb-24"
        >
          {reviews.map((review, index) => (
            <SwiperSlide key={index}>
                <div className="bg-white p-10 rounded-[3rem] border border-gray-100 h-full flex flex-col group hover:border-primary-500/30 transition-all duration-500 shadow-[0_15px_60px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_40px_80px_-20px_rgba(249,115,22,0.1)] relative">
                    {/* Floating Quote Icon */}
                    <div className="absolute top-10 left-10 opacity-5 group-hover:opacity-10 transition-opacity">
                        <Quote size={80} className="text-secondary-950" />
                    </div>

                    {/* Header: Author Info */}
                    <div className="flex items-center justify-between mb-10 relative z-10">
                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <img 
                                   src={review.image} 
                                   className="w-16 h-16 rounded-2xl object-cover ring-4 ring-gray-50 group-hover:ring-primary-100 transition-all" 
                                   alt={review.name}
                                />
                                <div className="absolute -bottom-1 -left-1 w-6 h-6 bg-primary-500 rounded-lg flex items-center justify-center text-secondary-950 text-[10px] font-black shadow-lg">★</div>
                            </div>
                            <div className="text-right">
                               <h4 className="text-xl font-black text-secondary-900 group-hover:text-primary-500 transition-colors leading-tight">{review.name}</h4>
                               <p className="text-gray-400 text-xs font-extrabold uppercase tracking-widest mt-1">{review.role}</p>
                                          {/* Bottom Features */}
                    <div className="mt-auto    border-gray-50 flex items-center justify-between">
                        <div className="flex gap-1">
                            {[...Array(5)].map((_, i) => (
                                <span key={i} className="text-primary-500 text-sm">★</span>
                            ))}
                        </div>
                     </div>
                            </div>
                        </div>
                     </div>

                    {/* Review Text */}
                    <p className="text-lg text-gray-600 leading-relaxed font-bold  relative z-10">
                       "{review.text}"
                    </p>
                    
         
                </div>
            </SwiperSlide>
          ))}
        </Swiper>
        
        <div className="custom-pagination flex justify-center mt-6 gap-2"></div>
      </div>
    </section>
  );
};

export default TestimonialsImmersive;
