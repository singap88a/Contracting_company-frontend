import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Building2, Home, Ruler, Hammer, PaintBucket, Truck, ArrowLeft } from 'lucide-react';

const ServicesList = () => {
  const services = [
    {
      id: 1,
      icon: Building2,
      title: 'بناء الأبراج التجارية',
      desc: 'تنفيذ الأبراج والمباني التجارية بأحدث الأنظمة الإنشائية والتقنيات الذكية.',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000&auto=format&fit=crop'
    },
    {
      id: 2,
      icon: Home,
      title: 'الفلل السكنية',
      desc: 'بناء فلل وقصور فاخرة بتصاميم عصرية وتشطيبات عالية الجودة تناسب ذوقك.',
      image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1000&auto=format&fit=crop'
    },
    {
      id: 3,
      icon: Ruler,
      title: 'التخطيط العمراني',
      desc: 'تخطيط وتصميم المجمعات السكنية والمخططات العمرانية وفق المعايير العالمية.',
      image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1000&auto=format&fit=crop'
    },
    {
      id: 4,
      icon: Hammer,
      title: 'أعمال الترميم',
      desc: 'خدمات صيانة وترميم المباني القديمة وإعادة تأهيلها لتواكب العصر.',
      image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=1000&auto=format&fit=crop'
    },
    {
      id: 5,
      icon: PaintBucket,
      title: 'الديكور الداخلي',
      desc: 'تصميم وتنفيذ ديكورات داخلية وخارجية بلمسات فنية وإبداعية.',
      image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1000&auto=format&fit=crop'
    },
    {
      id: 6,
      icon: Truck,
      title: 'تجهيز المواقع',
      desc: 'أعمال الحفر والردم وتجهيز المواقع الإنشائية والبنية التحتية.',
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1000&auto=format&fit=crop'
    },
  ];

  return (
    <div className="container mx-auto px-4 max-w-7xl relative z-10 py-24">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {services.map((service, index) => (
          <Link to="/request-service" key={service.id}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="group relative h-[480px] rounded-[2.5rem] overflow-hidden cursor-pointer shadow-xl transition-all duration-500 hover:shadow-primary-500/20"
            >
              {/* Background Image - Always Visible */}
              <div className="absolute inset-0">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary-900 via-secondary-900/60 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-80"></div>
              </div>
              
              <div className="relative h-full p-10 flex flex-col justify-end z-10 text-right" dir="rtl">
                 <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-primary-500 mb-6 border border-white/20 group-hover:bg-primary-500 group-hover:text-white transition-all duration-500 group-hover:rotate-[360deg]">
                    <service.icon size={32} strokeWidth={1.5} />
                 </div>
                 
                 <h3 className="text-3xl font-black text-white mb-4 font-cairo group-hover:text-primary-500 transition-colors">
                   {service.title}
                 </h3>
                 
                 <p className="text-gray-300 text-lg leading-relaxed mb-8 opacity-100 transform translate-y-0 transition-all duration-500">
                   {service.desc}
                 </p>
                 
                 <div className="w-full h-[1px] bg-white/20 group-hover:bg-primary-500 transition-colors duration-300 flex items-center justify-end">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileHover={{ width: '100%' }}
                      className="h-full bg-primary-500 origin-right transition-all duration-500"
                    />
                 </div>
                 
                 {/* Floating Arrow for better UX */}
                 <div className="absolute top-8 left-8 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-500 transform -translate-x-4 group-hover:translate-x-0">
                    <ArrowLeft size={24} />
                 </div>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ServicesList;
