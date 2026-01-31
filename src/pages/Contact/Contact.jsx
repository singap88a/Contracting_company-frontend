import React from 'react';
import { motion } from 'framer-motion';
import ContactInfo from '../../components/Contact/ContactInfo';
import ContactForm from '../../components/Contact/ContactForm';
import Map from '../../components/Contact/Map';

const Contact = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Banner Section */}
      <section className="relative h-[40vh] md:h-[50vh] flex items-center overflow-hidden" dir="rtl">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop" 
            className="w-full h-full object-cover brightness-[0.4] contrast-110" 
            alt="Corporate Building" 
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-secondary-900/60 to-secondary-900/90"></div>
          
          {/* Decorative Elements */}
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
        </div>

        <div className="container mx-auto px-4 max-w-7xl relative z-10 text-right">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-4  ">
              <div className="w-12 h-px bg-primary-500/50"></div>
              <span className="text-primary-500 font-extrabold uppercase tracking-widest text-sm">اترك لنا رسالة</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black text-white leading-tight">
              <span className="text-primary-500">تـواصل</span> <span className="text-white">معنا</span>
            </h1>
            
            <p className="text-gray-300 text-lg md:text-xl mt-6 max-w-2xl ml-0  ">
              نحن هنا للإجابة على جميع استفساراتك. لا تتردد في الاتصال بنا لبدء رحلتك نحو التميز المعماري.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content Section */}
      <div className="container mx-auto px-4 max-w-7xl -mt-20 relative z-20 pb-20">
        {/* Compact Info Section */}
        <div className="mb-12">
          <ContactInfo />
        </div>

        {/* Clean Form & Map Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Contact Form Card */}
          <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-xl border border-gray-100 h-full">
            <ContactForm />
          </div>

          {/* Map Card */}
          <div className="h-[400px] lg:h-full min-h-[400px] bg-white rounded-[2.5rem] overflow-hidden shadow-xl border border-gray-100">
            <Map />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
