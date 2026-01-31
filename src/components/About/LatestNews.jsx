import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

const LatestNews = () => {
  const news = [
    {
      title: "بدء تنفيذ مشروع برج الريادة الذكي في قلب العاصمة",
      date: "31 يناير 2026",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=600&auto=format&fit=crop"
    },
    {
      title: "حصول الشركة على جائزة الابتكار الهندسي للعام الثاني",
      date: "25 يناير 2026",
      image: "https://images.unsplash.com/photo-1541888946425-d81bb194882e?q=80&w=600&auto=format&fit=crop"
    },
    {
      title: "توسيع شراكتنا مع كبرى المكاتب الاستشارية العالمية",
      date: "15 يناير 2026",
      image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=600&auto=format&fit=crop"
    }
  ];

  return (
    <section className="py-24 bg-white text-right">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex justify-between items-end mb-16 px-4">
           <button className="py-3 px-8 border-2 border-primary-500 text-primary-500 rounded-xl font-black text-sm hover:bg-primary-500 hover:text-white transition-all">
              عرض الكل
           </button>
           <div>
              <span className="text-primary-500 font-black uppercase tracking-widest text-sm mb-4 block">أخبارنا</span>
              <h2 className="text-4xl md:text-5xl font-black text-secondary-900 leading-tight">آخر الأخبار والمستجدات</h2>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {news.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[4/3] rounded-[2.5rem] overflow-hidden mb-8 shadow-xl">
                 <img src={item.image} className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110" alt={item.title} />
                 <div className="absolute top-6 right-6 py-2 px-4 bg-primary-500 text-white rounded-xl font-black text-xs">
                    {item.date}
                 </div>
              </div>
              <h3 className="text-2xl font-black text-secondary-900 mb-6 group-hover:text-primary-500 transition-colors leading-tight">
                 {item.title}
              </h3>
              <div className="flex items-center gap-2 text-primary-500 font-bold group-hover:gap-4 transition-all justify-end">
                 <span>إقرأ المزيد</span>
                 <ArrowLeft size={18} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestNews;
