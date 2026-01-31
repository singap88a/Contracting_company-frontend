import React from 'react';
import { motion } from 'framer-motion';
import { HardHat, Ruler, ShieldCheck, Zap } from 'lucide-react';

const AboutValues = () => {
  const values = [
    {
      icon: <HardHat className="w-10 h-10" />,
      title: "احترافية التنفيذ",
      desc: "نلتزم بمعايير صارمة في التنفيذ لضمان أعلى مستويات الجودة والأمان في كل موقع بناء.",
    },
    {
      icon: <Ruler className="w-10 h-10" />,
      title: "دقة التخطيط",
      desc: "نعتمد على أدوات هندسية متطورة لتخطيط كل تفصيلة بدقة متناهية قبل البدء في أي عمل.",
    },
    {
      icon: <ShieldCheck className="w-10 h-10" />,
      title: "ضمان الجودة",
      desc: "نقدم ضمانات حقيقية وشاملة على كافة الأعمال الإنشائية لبيئة آمنة وراحة بال دائمة.",
    },
    {
      icon: <Zap className="w-10 h-10" />,
      title: "سرعة الإنجاز",
      desc: "نحترم المواعيد ونعمل بكفاءة زمنية عالية لتسليم كافة المشاريع في جداولها المحددة.",
    }
  ];

  return (
    <section className="py-10 bg-white text-right overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl relative">
        {/* Header - Simple & Clean */}
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <span className="text-primary-500 font-extrabold text-sm uppercase tracking-[0.4em] block mb-4">قيمنا الراسخة</span>
          <h2 className="text-5xl md:text-6xl font-black text-secondary-900 leading-tight">
             التزامُنا بـ <span className="text-primary-500">التميز</span> هو سرُّ نجاحنا
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="relative p-10 bg-white rounded-[3rem] border border-gray-100 shadow-xl transition-all duration-500 group overflow-hidden"
            >
              {/* Graphic Background Shapes */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary-50 rounded-bl-[5rem] -z-0 transition-transform duration-700 group-hover:scale-125"></div>
              
              <div className="relative z-10">
                <div className="w-16 h-16 bg-primary-500 rounded-2xl flex items-center justify-center text-secondary-950 mb-8 transition-all duration-500  ">
                  {React.cloneElement(value.icon, { size: 32, className: "" })}
                </div>
                
                <h3 className="text-xl font-black text-secondary-900 mb-4 group-hover:text-primary-500 transition-colors">
                  {value.title}
                </h3>
                
                <p className="text-gray-500 text-base leading-relaxed font-bold">
                  {value.desc}
                </p>
              </div>

              {/* Bottom Decoration */}
              <div className="absolute bottom-0 right-0 left-0 h-2 bg-gradient-to-r from-transparent via-primary-500/30 to-transparent scale-x-100   transition-transform duration-700"></div>            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutValues;
