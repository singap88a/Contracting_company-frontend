import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Phone } from 'lucide-react';

const CTA = () => {
  return (
    <section className="py-12 relative overflow-hidden bg-gray-50">
      <div className="container mx-auto px-4 max-w-5xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative bg-secondary-900 rounded-3xl p-8 md:p-10 border-2 border-secondary-800 shadow-2xl overflow-hidden"
        >
          {/* Professional Background with Squares */}
          <div className="absolute inset-0 opacity-[0.05]">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-2xl"></div>
          </div>
          
          {/* Grid Pattern with Squares */}
          <div 
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px'
            }}
          ></div>
          
          {/* Decorative Squares */}
          <div className="absolute top-8 right-8 w-16 h-16 border border-white/10 rotate-45 opacity-20"></div>
          <div className="absolute bottom-8 left-8 w-12 h-12 border border-primary-500/20 rotate-45 opacity-20"></div>
          <div className="absolute top-1/2 right-1/4 w-8 h-8 bg-primary-500/10 rounded-sm opacity-30"></div>
          <div className="absolute bottom-1/4 left-1/3 w-6 h-6 bg-white/10 rounded-sm opacity-20"></div>

          <div className="relative z-10 text-center">
            <h2 className="text-2xl md:text-3xl font-black text-white mb-4 leading-tight">
              مستعدون لبدء مشروعك القادم؟
            </h2>
            
            <p className="text-gray-300 text-sm md:text-base mb-8 max-w-xl mx-auto">
              تواصل معنا الآن واحصل على عرض سعر مجاني لمشروعك
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link 
                  to="/contact" 
                  className="px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-bold rounded-xl transition-all shadow-lg shadow-primary-500/30 hover:shadow-primary-500/50 hover:-translate-y-1 flex items-center justify-center gap-2 group"
                >
                    اطلب عرض سعر
                    <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />
                </Link>
                
                <a 
                  href="tel:+966500000000" 
                  className="px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white font-bold rounded-xl transition-all hover:-translate-y-1 flex items-center justify-center gap-2"
                >
                    <Phone size={18} />
                    تواصل معنا
                </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
