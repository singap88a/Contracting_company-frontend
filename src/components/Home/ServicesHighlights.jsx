import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Building2, HardHat, Ruler, ArrowLeft } from 'lucide-react';

const ServicesHighlights = () => {
  const services = [
    { 
      id: 1,
      icon: Building2, 
      title: 'التصميم المعماري', 
      desc: 'ابتكار تصاميم أيقونية تجمع بين جماليات الفن ووظائف الهندسة الحديثة.',
      image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=800&auto=format&fit=crop'
    },
    { 
      id: 2,
      icon: HardHat, 
      title: 'التنفيذ والإنشاءات', 
      desc: 'إدارة وتشييد مشاريع معقدة بأعلى معايير السلامة والجودة العالمية.',
      image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=800&auto=format&fit=crop'
    },
    { 
      id: 3,
      icon: Ruler, 
      title: 'التصميم الداخلي', 
      desc: 'صياغة مساحات داخلية فاخرة تعكس ذوقكم الرفيع وتلبي احتياجاتكم.',
      image: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?q=80&w=800&auto=format&fit=crop'
    },
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-3xl">
            <span className="text-secondary-500 font-bold tracking-widest uppercase mb-4 block">خدماتنا المتميزة</span>
            <h2 className="text-3xl lg:text-5xl font-black text-secondary-900 leading-[1.1]">
              نقدم حلولاً هندسية <br />
              <span className="text-primary-500 relative">
                 متكاملة
                 <svg className="absolute w-full h-3 -bottom-1 right-0 text-primary-200 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none"/></svg>
              </span> تفوق التوقعات
            </h2>
          </div>
          
          <Link 
            to="/services" 
            className="group relative inline-flex items-center justify-center px-8 py-4 overflow-hidden rounded-full transition-all bg-primary-500 hover:bg-primary-600 "
          >
            <span className="relative flex items-center gap-3 text-white font-bold text-lg">
              جميع الخدمات
              <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
            </span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="group relative h-[450px] rounded-[2rem] overflow-hidden cursor-pointer shadow-xl"
            >
              {/* Background Image - Always Visible */}
              <div className="absolute inset-0">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Permanent Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-secondary-900 via-secondary-900/60 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-80"></div>
              </div>
              
              <div className="relative h-full p-8 flex flex-col justify-end z-10">
                 <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-primary-500 mb-6 border border-white/20 group-hover:bg-primary-500 group-hover:text-white transition-all duration-300">
                    <service.icon size={32} strokeWidth={1.5} />
                 </div>
                 
                 <h3 className="text-3xl font-bold text-white mb-4 font-cairo">
                   {service.title}
                 </h3>
                 
                 <p className="text-gray-300 text-lg leading-relaxed mb-6 opacity-100 transform translate-y-0 transition-all duration-500">
                   {service.desc}
                 </p>
                 
                 <div className="w-full h-[1px] bg-white/20 group-hover:bg-primary-500 transition-colors duration-300"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesHighlights;
