import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Clock, Users, Star, CheckCircle } from 'lucide-react';

const AboutBrief = () => {
  const features = [
    {
      icon: Shield,
      title: 'معايير جودة صارمة',
      description: 'نطبق أعلى معايير الجودة العالمية في جميع مراحل التنفيذ لضمان مخرجات استثنائية.'
    },
    {
      icon: Clock,
      title: 'التزام دقيق بالمواعيد',
      description: 'نحترم وقت عملائنا ونعتبر التسليم في الموعد المحدد مقدساً لا يمكن التنازل عنه.'
    },
    {
      icon: Users,
      title: 'فريق عمل نخبوي',
      description: 'يضم فريقنا أفضل الكفاءات الهندسية والفنية ذوي الخبرات الطويلة في المجال.'
    },
    {
      icon: Star,
      title: 'خبرة تتحدث عن نفسها',
      description: 'سجل حافل بالإنجازات والمشاريع الناجحة التي نالت رضا وثقة عملائنا.'
    }
  ];

  return (
    <section className="py-24 bg-gray-50 relative overflow-hidden border-b border-gray-100">
      {/* Background Shapes */}
      <div className="absolute top-0 right-0 w-full h-full opacity-[0.03] pointer-events-none">
        <div className="absolute top-20 right-20 w-96 h-96 bg-secondary-900 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-primary-500 rounded-full blur-3xl"></div>
      </div>
      
      {/* Grid Pattern */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.02] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:32px_32px]"></div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Text Content */}
          <div>
            <span className="text-secondary-500 font-bold tracking-widest uppercase mb-4 block">لماذا تختارنا</span>
            <h2 className="text-3xl lg:text-5xl font-black text-secondary-900 mb-8 leading-[1.1]">
              نحن نبني <br />
              <span className="text-primary-500 relative">
                 الثقة
                 <svg className="absolute w-full h-3 -bottom-1 right-0 text-primary-200 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none"/></svg>
              </span> قبل البناء
            </h2>
            <p className="text-xl text-gray-500 leading-relaxed mb-10 text-justify">
              في عالم المقاولات، التميز ليس مجرد خيار، بل هو نهج حياة. نحن نؤمن بأن كل مشروع هو قصة نجاح نكتبها مع عملائنا، نراعي فيها أدق التفاصيل ونحرص على تحقيق تطلعاتهم.
            </p>
            
            <ul className="space-y-4 mb-12">
               {['ضمان شامل على جميع الأعمال', 'استخدام أفضل المواد وحلول مستدامة', 'إشراف هندسي متكامل'].map((item, i) => (
                 <li key={i} className="flex items-center gap-3 text-secondary-800 font-bold text-lg">
                    <CheckCircle className="text-primary-500" size={24} />
                    {item}
                 </li>
               ))}
            </ul>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             {features.map((feature, index) => {
                const isHighlighted = index === 1 || index === 2; // Highlight "Deadlines" and "Team"
                
                return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`border p-8 rounded-[2rem] group transition-all duration-300 hover:shadow-xl ${
                      isHighlighted 
                      ? 'bg-secondary-900 border-secondary-900 text-white' 
                      : 'bg-gray-50 border-gray-100 text-secondary-900 hover:bg-secondary-900 hover:text-white hover:border-secondary-900'
                  }`}
                >
                   <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-sm transition-colors ${
                       isHighlighted
                       ? 'bg-primary-500 text-white'
                       : 'bg-white text-secondary-900 group-hover:bg-primary-500 group-hover:text-white'
                   }`}>
                      <feature.icon size={28} />
                   </div>
                   <h3 className={`text-xl font-black mb-3 transition-colors ${
                       isHighlighted ? 'text-white' : 'text-secondary-900 group-hover:text-white'
                   }`}>
                      {feature.title}
                   </h3>
                   <p className={`text-sm leading-relaxed transition-colors ${
                       isHighlighted ? 'text-gray-400' : 'text-gray-500 group-hover:text-gray-400'
                   }`}>
                      {feature.description}
                   </p>
                </motion.div>
             )})}
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutBrief;
