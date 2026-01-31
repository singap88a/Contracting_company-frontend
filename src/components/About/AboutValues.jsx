import React from 'react';
import { motion } from 'framer-motion';
import { HardHat, Ruler, ShieldCheck, Zap } from 'lucide-react';

const AboutValues = () => {
  const values = [
    {
      icon: <HardHat className="w-10 h-10" />,
      title: "احترافية التنفيذ",
      desc: "نلتزم بمعايير صارمة في التنفيذ لضمان أعلى مستويات الجودة والأمان في كل موقع."
    },
    {
      icon: <Ruler className="w-10 h-10" />,
      title: "دقة التخطيط",
      desc: "نعتمد على أدوات هندسية متطورة لتخطيط كل تفصيلة بدقة متناهية قبل البدء."
    },
    {
      icon: <ShieldCheck className="w-10 h-10" />,
      title: "ضمان الجودة",
      desc: "نقدم ضمانات حقيقية على كافة الأعمال الإنشائية لنمنحك راحة البال التامة."
    },
    {
      icon: <Zap className="w-10 h-10" />,
      title: "سرعة الإنجاز",
      desc: "نحترم المواعيد ونعمل بكفاءة عالية لتسليم المشاريع في جداولها الزمنية المحددة."
    }
  ];

  return (
    <section className="py-24 bg-white text-right">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-20">
          <span className="text-primary-500 font-black text-sm uppercase tracking-widest block mb-4">قيمنا الجوهرية</span>
          <h2 className="text-4xl md:text-5xl font-black text-secondary-900 leading-tight">
             نقدم أفضل الحلول <br /> لضمان <span className="text-primary-500">جودة البناء</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-10 bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-500 group text-right"
            >
              <div className="w-20 h-20 bg-primary-500/10 rounded-2xl flex items-center justify-center text-primary-500 mb-8 group-hover:bg-primary-500 group-hover:text-white transition-all duration-500">
                {value.icon}
              </div>
              <h3 className="text-2xl font-black text-secondary-900 mb-6 group-hover:text-primary-500 transition-colors uppercase tracking-tight">
                {value.title}
              </h3>
              <p className="text-gray-500 leading-relaxed font-medium">
                {value.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutValues;
