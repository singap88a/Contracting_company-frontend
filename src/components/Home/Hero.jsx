import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import { motion } from 'framer-motion';
import { ArrowLeft, Play } from 'lucide-react';
import { Link } from 'react-router-dom';

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Hero = () => {
  const slides = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1920&auto=format&fit=crop',
      title: 'نبني المستقبل',
      subtitle: 'برؤية هندسية مبتكرة',
      description: 'نحول الأحلام المعمارية إلى واقع ملموس بأعلى معايير الجودة والإتقان، لنصنع غداً أفضل.',
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1920&auto=format&fit=crop',
      title: 'دقة في التنفيذ',
      subtitle: 'واحترافية بلا حدود',
      description: 'التزام تام بالمواصفات والجداول الزمنية، مع اهتمام فائق بأدق التفاصيل الإنشائية.',
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1531834685032-c34bf0d84c7c?q=80&w=1920&auto=format&fit=crop',
      title: 'حلول ذكية',
      subtitle: 'لمساحات عصرية',
      description: 'نبتكر تصاميم داخلية وخارجية تعكس هويتكم وتلبي احتياجاتكم الوظيفية بأسلوب عصري.',
    }
  ];

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 right-20 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-secondary-900/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <Swiper
        modules={[Autoplay, EffectFade, Navigation, Pagination]}
        effect={'fade'}
        speed={1500}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
            clickable: true,
            renderBullet: (index, className) => {
                return '<span class="' + className + ' custom-bullet"></span>';
            }
        }}
        loop={true}
        className="h-full w-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id} className="relative h-full w-full">
            {/* Background Image - Full Screen */}
            <div className="absolute inset-0">
               <motion.img 
                 initial={{ scale: 1.1 }}
                 whileInView={{ scale: 1 }}
                 transition={{ duration: 6, ease: "easeOut" }}
                 src={slide.image} 
                 alt={slide.title} 
                 className="w-full h-full object-cover"
               />
               {/* Enhanced Gradients */}
               <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent"></div>
               <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent"></div>
               <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-transparent to-secondary-900/10"></div>
            </div>

            {/* Geometric Overlay */}
            <div className="absolute inset-0 z-10 opacity-10">
              <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(249,115,22,0.1),transparent_50%)]"></div>
              <div className="absolute bottom-0 left-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,rgba(30,58,138,0.1),transparent_50%)]"></div>
            </div>

            {/* Content Overlay */}
            <div className="absolute inset-0 flex items-center z-20">
              <div className="container mx-auto px-4 max-w-7xl">
                <div className="max-w-3xl relative z-10 px-4 lg:px-0">
                    <motion.div
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1, delay: 0.3 }}
                      className="relative"
                    >
                      {/* Decorative Line */}
                      <div className="absolute right-0 top-0 w-1 h-24 bg-gradient-to-b from-primary-500 to-transparent mb-8"></div>
                      
                      <div className="pr-8 md:pr-12">
                        <motion.div
                          initial={{ opacity: 0, x: -30 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.8, delay: 0.5 }}
                          className="inline-flex items-center gap-3 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full mb-6"
                        >
                          <div className="w-2 h-2 rounded-full bg-primary-500 animate-pulse"></div>
                          <h2 className="text-sm md:text-base font-bold text-primary-400 uppercase tracking-widest">{slide.subtitle}</h2>
                        </motion.div>
                        
                        <motion.h1 
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.8, delay: 0.6 }}
                          className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-6 drop-shadow-2xl"
                        >
                          {slide.title}
                        </motion.h1>
                        
                        <motion.p 
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.8, delay: 0.7 }}
                          className="text-base md:text-xl text-gray-200 leading-relaxed max-w-2xl mb-10 font-medium"
                        >
                          {slide.description}
                        </motion.p>
                        
                        <motion.div 
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.8, delay: 0.8 }}
                          className="flex flex-col sm:flex-row gap-4"
                        >
                          <Link 
                            to="/contact" 
                            className="group relative px-8 py-4 bg-primary-500 hover:bg-primary-600 text-white font-black text-base rounded-full transition-all transform hover:-translate-y-1 shadow-2xl shadow-primary-500/40 flex items-center justify-center gap-3 overflow-hidden"
                          >
                            <div className="absolute inset-0 bg-white/20 translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
                            <span className="relative z-10">ابدأ مشروعك</span>
                            <ArrowLeft size={20} className="relative z-10 group-hover:-translate-x-1 transition-transform" />
                          </Link>
                          <Link 
                            to="/projects" 
                            className="group px-8 py-4 bg-white/10 backdrop-blur-md border-2 border-white/30 hover:bg-white hover:text-secondary-900 text-white font-black text-base rounded-full transition-all transform hover:-translate-y-1 flex items-center justify-center gap-3 shadow-xl"
                          >
                            <Play size={18} fill="currentColor" className="group-hover:scale-110 transition-transform" />
                            <span>شاهد أعمالنا</span>
                          </Link>
                        </motion.div>
                      </div>
                    </motion.div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute top-1/4 left-10 w-32 h-32 border border-white/5 rounded-full hidden lg:block animate-pulse"></div>
            <div className="absolute bottom-1/4 right-10 w-24 h-24 border border-primary-500/10 rounded-full hidden lg:block animate-pulse delay-1000"></div>

          </SwiperSlide>
        ))}
      </Swiper>

      {/* Enhanced Pagination Info */}
      <div className="absolute bottom-12 right-12 z-30 hidden lg:flex flex-col items-end gap-3 text-white/60">
          <div className="flex items-center gap-3">
            <span className="text-2xl font-black text-white">01</span>
            <div className="w-16 h-[2px] bg-gradient-to-r from-primary-500 to-transparent"></div>
            <span className="text-sm font-bold">03</span>
          </div>
          <p className="text-xs text-white/40 uppercase tracking-widest">اسحب للاستكشاف</p>
      </div>

       <style>{`
        .custom-bullet {
           width: 14px;
           height: 14px;
           background: transparent;
           border: 2px solid rgba(255,255,255,0.4);
           display: inline-block;
           margin: 0 8px;
           border-radius: 50%;
           transition: all 0.4s;
           cursor: pointer;
           position: relative;
        }
        .custom-bullet::before {
           content: '';
           position: absolute;
           top: 50%;
           left: 50%;
           transform: translate(-50%, -50%);
           width: 6px;
           height: 6px;
           background: rgba(255,255,255,0.3);
           border-radius: 50%;
           transition: all 0.3s;
        }
        .swiper-pagination-bullet-active.custom-bullet {
           background: #F97316;
           border-color: #F97316;
           transform: scale(1.3);
        }
        .swiper-pagination-bullet-active.custom-bullet::before {
           background: white;
           width: 8px;
           height: 8px;
        }
        .swiper-pagination {
            bottom: 80px !important;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        .animate-pulse {
          animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </section>
  );
};

export default Hero;
