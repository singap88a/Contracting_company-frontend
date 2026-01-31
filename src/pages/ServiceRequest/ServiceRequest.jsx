import React from 'react';
import { motion } from 'framer-motion';
import ServiceForm from '../../components/ServiceRequest/ServiceForm';

const ServiceRequest = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Mini Hero Banner */}
      <section className="relative h-[45vh] flex items-center overflow-hidden" dir="rtl">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2000&auto=format&fit=crop" 
            className="w-full h-full object-cover brightness-[0.4]" 
            alt="Request Service" 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-secondary-900/50 to-secondary-900/50"></div>
        </div>

        <div className="container mx-auto px-4 max-w-7xl relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-black text-white leading-tight">
              طلب <span className="text-primary-500">خـدمة</span>
            </h1>
            <p className="text-gray-300 text-lg md:text-xl mt-4 max-w-2xl mx-auto">
              أخبرنا عن مشروعك القادم، وسنقوم بتحويل رؤيتك إلى واقع ملموس بأعلى معايير الجودة.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form Section */}
      <div className="container mx-auto px-4 max-w-4xl -mt-16 relative z-20 pb-20">
        <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-gray-100">
          <ServiceForm />
        </div>
      </div>
    </div>
  );
};

export default ServiceRequest;
