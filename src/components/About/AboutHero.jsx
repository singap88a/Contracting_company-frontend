import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

const AboutHero = () => {
  return (
    <section className="relative h-[50vh] md:h-[60vh] flex items-center justify-center overflow-hidden">
      {/* Background with improved visibility */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://t3.ftcdn.net/jpg/07/39/72/02/360_F_739720225_wI41mPgiTu3bg0AhBbg7ckMmouvlOcN4.jpg" 
          className="w-full h-full object-cover brightness-[0.4] contrast-125" 
          alt="Construction Site" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-secondary-900/40 to-secondary-950/80"></div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10 text-center">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8 }}
        >
          <span className="text-primary-500 font-extrabold uppercase tracking-[0.4em] text-sm mb-6 block">شركة صرح البناء المقاولات</span>
          <h1 className="text-6xl md:text-8xl font-black text-white leading-tight mb-10">
             عن <span className="text-primary-500">الشركة</span>
          </h1>
          
          <div className="flex justify-center">
            <button className="group relative py-5 px-12 bg-primary-500 text-secondary-950 font-black text-lg rounded-2xl overflow-hidden transition-all hover:shadow-[0_20px_40px_-10px_rgba(249,115,22,0.5)] flex items-center gap-3">
              <span>اكتشف المزيد</span>
              <ArrowLeft size={20} className="group-hover:-translate-x-2 transition-transform" />
            </button>
          </div>
        </motion.div>
      </div>

      {/* Subtle Bottom Fade */}
      <div className="absolute bottom-0 left-0 w-full h-10 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
};

export default AboutHero;
