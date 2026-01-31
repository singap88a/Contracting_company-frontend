import React from 'react';
import { motion } from 'framer-motion';

const AboutIntro = () => {
  return (
    <section className="py-24 md:py-32 bg-white overflow-hidden text-right">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-primary-500 font-black text-sm md:text-base tracking-widest uppercase mb-6 block border-r-4 border-primary-500 pr-4">
              أهلاً بكم في صرحنا المعماري
            </span>
            <h2 className="text-4xl md:text-6xl font-black text-secondary-900 mb-8 leading-[1.2]">
               لدينا أكثر من <span className="text-primary-500">15 عاماً</span> من الخبرة في المقاولات والإنشاءات
            </h2>
            <p className="text-gray-500 text-lg md:text-xl leading-relaxed mb-10 font-medium">
               نحن نؤمن بأن كل مبنى هو بصمة فريدة في تاريخ المعمار. من خلال فريقنا المتخصص، نسعى لتحويل التطلعات الهندسية إلى واقع ملموس يتميز بالدقة، الجودة، والاستدامة.
            </p>
            <p className="text-gray-400 text-base md:text-lg mb-12 italic border-r-2 border-gray-200 pr-6">
               "هدفنا ليس فقط البناء، بل خلق مساحات تلهم الإنسان وتعزز جودة الحياة."
            </p>
            <button className="py-4 px-10 bg-primary-500 text-white rounded-lg font-black text-lg hover:bg-secondary-900 transition-all duration-300 shadow-lg shadow-primary-500/20">
               إقرأ المزيد
            </button>
          </motion.div>

          {/* Layered Images (Inspired by Image 1 & 2) */}
          <div className="relative">
            <motion.div 
               initial={{ opacity: 0, scale: 0.9 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white"
            >
               <img src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1000&auto=format&fit=crop" className="w-full h-full object-cover" alt="Construction Worker" />
            </motion.div>
            
            {/* Experience Box Overlay (Image 1 style) */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="absolute -top-10 -right-10 md:-top-16 md:-right-16 bg-primary-500 text-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl z-20 text-center flex flex-col items-center justify-center min-w-[180px] md:min-w-[220px]"
            >
               <span className="text-4xl md:text-6xl font-black mb-2">30+</span>
               <span className="text-xs md:text-sm font-bold uppercase tracking-widest leading-tight">سنة من <br /> الخبرة العملية</span>
            </motion.div>

            {/* Subtle shapes/patterns */}
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-gray-100 rounded-full -z-10 blur-3xl"></div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutIntro;
