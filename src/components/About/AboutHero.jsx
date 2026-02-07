import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

const AboutHero = () => {
  return (
    <section className="relative h-[85vh] flex items-center overflow-hidden" dir="rtl">
      {/* Background with improved visibility & Technical Layers */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://www.shutterstock.com/image-photo/construction-engineer-civil-team-work-600nw-2140542901.jpg" 
          className="w-full h-full object-cover brightness-[0.45] contrast-110" 
          alt="Construction Site" 
        />
        
        {/* Professional Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-l from-secondary-900/40 via-secondary-900/30 to-transparent"></div>
        
        {/* Decorative Grid / Technical Elements */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        
        {/* Moving Background Shapes */}
        <motion.div 
          animate={{ 
            rotate: [0, 360],
            x: [0, 50, 0],
            y: [0, 30, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-20 -right-20 w-96 h-96 border border-primary-500/10 rounded-full"
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-1/2 right-1/4 w-64 h-64 bg-primary-500/5 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="flex flex-col items-start max-w-3xl text-right mr-0 ml-auto">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-6  ">
              <span className="text-primary-500 font-extrabold uppercase tracking-[0.4em] text-sm">ريدان الخليج للسلامة والمقاولات</span>
              <div className="w-12 h-px bg-primary-500/50"></div>
            </div>
            
            <h1 className="text-5xl md:text-8xl font-black text-white leading-tight mb-8">
              الأمان <span className="text-primary-500">أولاً</span><br />
              والبناء بإتقان
            </h1>
            
            <p className="text-gray-300 text-lg md:text-xl leading-relaxed mb-12 max-w-2xl">
              مؤسسة رائدة متخصصة في منظومة السلامة المتكاملة وأعمال المقاولات العامة، نضع معايير الجودة والاستدامة في قلب كل مشروع نلمسه، لنضمن بيئة عمل آمنة ومستقبلاً مستداماً.
            </p>
            
            <div className="flex flex-wrap items-center gap-4 justify-start">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative py-5 px-10 bg-primary-500 text-secondary-950 font-black text-lg rounded-2xl overflow-hidden transition-all hover:shadow-[0_20px_40px_-15px_rgba(249,115,22,0.6)] flex items-center gap-3"
              >
                <span className="text-white">خدماتنا الهندسية</span>
                <ArrowLeft size={20} className="group-hover:-translate-x-2 transition-transform text-white" />
              </motion.button>

              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group py-5 px-10 border-2 border-white/20 text-white font-black text-lg rounded-2xl hover:bg-white hover:text-secondary-900 transition-all duration-300 flex items-center gap-3 backdrop-blur-sm"
              >
                <span>تواصل معنا</span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative Floating Squares at bottom */}
      <div className="absolute bottom-10 left-10 flex gap-4 opacity-20">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, delay: i * 0.5, repeat: Infinity }}
            className="w-4 h-4 bg-primary-500 rounded-sm"
          />
        ))}
      </div>
    </section>
  );
};

export default AboutHero;
