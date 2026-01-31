import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Award, Clock, Target, Users } from 'lucide-react';

const AboutIntro = () => {
  return (
    <section className="py-20 md:py-32 bg-white overflow-hidden" dir="rtl">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-right"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-px bg-primary-500"></div>
              <span className="text-primary-500 font-bold text-xs md:text-sm tracking-[0.3em] uppercase">
                رؤيتنا التصميمية
              </span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-black text-secondary-900 mb-8 leading-tight tracking-tight">
              هندسة <span className="text-primary-500">تتحدى</span> الزمن،<br />
              وتصنع <span className="text-primary-500">إرثاً</span> مستقبلياً
            </h2>
            
            <p className="text-gray-600 text-lg md:text-xl leading-relaxed mb-10 font-medium">
              ندمج بين الإبداع والدقة الهندسية لتقديم حلول معمارية تتجاوز التوقعات. نحن لا نبني هياكل فحسب، بل نصنع بيئات مستدامة تلهم الأجيال القادمة.
            </p>

            {/* المزايا في تخطيط 2x2 احترافي */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
              {[
                { text: "التزام بالجودة العالمية", icon: Award, desc: "معايير صارمة في كل مرحلة" },
                { text: "فريق هندسي متخصص", icon: Users, desc: "خبرات تتجاوز الحدود" },
                { text: "أحدث تقنيات البناء", icon: Target, desc: "نوظف التكنولوجيا لخدمتكم" },
                { text: "التسليم في الموعد المحدد", icon: Clock, desc: "دقة في التنفيذ والجدولة" }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex   gap-3 p-4 rounded-2xl bg-gray-50 border border-gray-100 hover:border-primary-500/30 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-xl bg-white shadow-sm text-primary-500 flex items-center justify-center group-hover:bg-primary-500 group-hover:text-white transition-all duration-300">
                    <item.icon size={22} />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-secondary-900 mb-1">{item.text}</h4>
                    <p className="text-xs text-gray-500">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* إحصائية أنيقة */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="flex items-center gap-8"
            >
              <div className="text-right">
                <div className="text-3xl md:text-4xl font-black text-primary-500">+120</div>
                <div className="text-sm text-gray-500">مشروع ناجح</div>
              </div>
              <div className="h-12 w-px bg-gray-200"></div>
              <div className="text-right">
                <div className="text-3xl md:text-4xl font-black text-primary-500">15</div>
                <div className="text-sm text-gray-500">عام من الخبرة</div>
              </div>
            </motion.div>
          </motion.div>

          {/* تخطيط الصور الاحترافي جداً */}
          <div className="relative">
            {/* عناصر خلفية متحركة (الاشكال والمربعات) */}
            <div className="absolute -inset-10 pointer-events-none">
              <motion.div
                animate={{ 
                  y: [0, -20, 0],
                  rotate: [0, 5, 0]
                }}
                transition={{ duration: 6, repeat: Infinity }}
                className="absolute top-0 right-10 w-32 h-32 bg-primary-100/50 rounded-3xl -z-10"
              />
              <motion.div
                animate={{ 
                  x: [0, 20, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ duration: 8, repeat: Infinity }}
                className="absolute bottom-10 left-0 w-44 h-44 border-2 border-primary-200/30 rounded-[3rem] -z-10"
              />
              {/* مربعات صغيرة متحركة */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ 
                    y: [0, Math.random() * -30, 0],
                    opacity: [0.2, 0.5, 0.2]
                  }}
                  transition={{ 
                    duration: 3 + Math.random() * 2, 
                    repeat: Infinity,
                    delay: i * 0.5
                  }}
                  className="absolute w-4 h-4 bg-primary-500/20 rounded-sm"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`
                  }}
                />
              ))}
            </div>

            {/* شبكة الصور الرئيسية */}
            <div className="relative z-10 grid grid-cols-12 gap-4">
              {/* الصورة الرئيسية */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="col-span-12 relative rounded-[2.5rem] overflow-hidden shadow-2xl aspect-[4/3] border-[8px] border-white ring-1 ring-gray-100"
              >
                <img 
                  src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                  className="w-full h-full object-cover transition-transform duration-1000 hover:scale-110" 
                  alt="مشروع بناء حديث" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary-900/40 via-transparent to-transparent"></div>
              </motion.div>
              
              {/* صورة ثانوية متداخلة */}
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="absolute -bottom-10 -right-8 w-1/2 rounded-[2rem] overflow-hidden shadow-2xl aspect-square border-[6px] border-white z-20"
              >
                <img 
                  src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" 
                  alt="التفاصيل الهندسية" 
                />
              </motion.div>

              {/* شارة الخبرة العائمة */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="absolute -top-6 -left-6 bg-secondary-900 text-white p-6 rounded-3xl shadow-2xl z-20 flex flex-col items-center justify-center min-w-[140px]"
              >
                <Award size={32} className="text-primary-500 mb-2" />
                <span className="text-2xl font-black italic">TOP TIER</span>
                <span className="text-[10px] tracking-widest uppercase opacity-60">Global Quality</span>
              </motion.div>
            </div>
            
            {/* زخرفة هندسية إضافية */}
            <div className="absolute -bottom-16 -left-10 w-32 h-32 opacity-10">
              <div className="grid grid-cols-4 gap-2">
                {[...Array(16)].map((_, i) => (
                  <div key={i} className="w-1.5 h-1.5 bg-secondary-900 rounded-full"></div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutIntro;