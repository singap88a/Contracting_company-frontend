import React from 'react';
import { motion } from 'framer-motion';
import ServicesList from '../../components/Services/ServicesList';

const Services = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Banner Section */}
      <section className="relative h-[50vh] flex items-center overflow-hidden" dir="rtl">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1541976590-713941681591?q=80&w=2000&auto=format&fit=crop" 
            className="w-full h-full object-cover brightness-[0.35] contrast-110" 
            alt="Construction Excellence" 
          />
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-secondary-900/60 to-secondary-900/90"></div>
          
          {/* Decorative Grid */}
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
        </div>

        <div className="container mx-auto px-4 max-w-7xl relative z-10 text-right">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-6 ">
              <div className="w-12 h-px bg-primary-500/50"></div>
              <span className="text-primary-500 font-extrabold uppercase tracking-widest text-sm">خدماتنا الهندسية</span>
            </div>
            
            <h1 className="text-5xl md:text-8xl font-black text-white leading-tight mb-6">
              نـبني <span className="text-primary-500 text-shadow-glow">المستقبل</span><br />
              <span className="text-white">بإتقان واحتراف</span>
            </h1>
            
            <p className="text-gray-300 text-lg md:text-2xl mt-6 max-w-3xl ml-0">
              نقدم باقة شاملة من الخدمات الهندسية والمقاولات، مصممة لتلبية احتياجات عملائنا بدقة واحترافية عالية تفوق التوقعات.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid Section */}
      <ServicesList />
    </div>
  );
};

export default Services;
