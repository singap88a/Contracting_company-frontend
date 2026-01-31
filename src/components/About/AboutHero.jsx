import React from 'react';
import { motion } from 'framer-motion';

const AboutHero = () => {
  return (
    <section className="relative h-[70vh] md:h-[85vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1541888946425-d81bb194882e?q=80&w=2070&auto=format&fit=crop" 
          className="w-full h-full object-cover" 
          alt="Construction Background" 
        />
        <div className="absolute inset-0 bg-secondary-900/40"></div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10 text-center">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8 }}
        >
          <span className="text-primary-500 font-black tracking-widest uppercase mb-6 block text-sm md:text-base">
            مرحباً بكم في صرح البناء
          </span>
          <h1 className="text-4xl md:text-8xl font-black text-white mb-10 leading-[1.1] tracking-tighter uppercase">
             نقوم بالبناء <br /> <span className="text-primary-500">لأفضل خدمة</span>
          </h1>
          <p className="text-white/90 text-lg md:text-xl max-w-3xl mx-auto mb-12 font-medium leading-relaxed">
             نحن نقدم حلولاً إنشائية متكاملة تجمع بين الجودة والابتكار لتحقيق رؤية عملائنا على أرض الواقع.
          </p>
          <button className="py-5 px-12 bg-primary-500 text-white rounded-xl font-black text-lg hover:bg-white hover:text-primary-500 transition-all duration-300 transform hover:scale-105 shadow-xl shadow-primary-500/30">
             إقرأ المزيد
          </button>
        </motion.div>
      </div>
 
    </section>
  );
};

export default AboutHero;
