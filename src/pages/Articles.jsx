import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Clock, User, Tag } from 'lucide-react';

const articles = [
  {
    id: 1,
    title: "بدء تنفيذ مشروع برج الريادة الذكي في قلب العاصمة",
    excerpt: "مشروع برج الريادة يمثل نقلة نوعية في عالم الأبراج الذكية والمستدامة في المنطقة، حيث نستخدم أحدث تقنيات البناء...",
    date: "31 يناير 2026",
    author: "أحمد محمد",
    category: "مشاريع",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "حصول الشركة على جائزة الابتكار الهندسي للعام الثاني",
    excerpt: "تفخر صرح البناء بحصولها على هذه الجائزة المرموقة التي تتوج جهود فريقنا في الابتكار والتطوير الهيكلي...",
    date: "25 يناير 2026",
    author: "سارة علي",
    category: "جوائز",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb194882e?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "توسيع شراكتنا مع كبرى المكاتب الاستشارية العالمية",
    excerpt: "خطوة استراتيجية جديدة تهدف إلى تبادل الخبرات ونقل أحدث تقنيات التصميم المعماري لمشاريعنا القادمة...",
    date: "15 يناير 2026",
    author: "خالد عمر",
    category: "شراكات",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 4,
    title: "مستقبل المدن المستدامة: رؤية 2030 في قطاع المقاولات",
    excerpt: "كيف تساهم التقنيات الخضراء في تقليل البصمة الكربونية للمباني الحديثة وضمان جودة حياة أفضل...",
    date: "10 يناير 2026",
    author: "منى عبدالله",
    category: "استدامة",
    image: "https://images.unsplash.com/photo-1503387762-592fe58ef452?q=80&w=800&auto=format&fit=crop"
  },
];

const Articles = () => {
  return (
    <div className="bg-gray-50 pb-24 text-right">
      {/* Header */}
      <section className="relative py-32 bg-secondary-950 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20 bg-[radial-gradient(#f97316_1px,transparent_1px)] [background-size:40px_40px]"></div>
        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <span className="text-primary-500 font-black uppercase tracking-[0.4em] text-sm mb-6 block">المدونة والأخبار</span>
            <h1 className="text-5xl md:text-7xl font-black text-white leading-tight">آخر <span className="text-primary-500">المستجدات</span> والبصمات</h1>
          </motion.div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {articles.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group bg-white rounded-[3.5rem] overflow-hidden border border-gray-100 shadow-xl hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] transition-all duration-500"
              >
                <Link to={`/articles/${article.id}`} className="block relative aspect-[4/3] overflow-hidden">
                   <img 
                      src={article.image} 
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                      alt={article.title} 
                   />
                   <div className="absolute top-6 right-6 py-2 px-5 bg-primary-500 text-secondary-950 rounded-xl font-black text-[10px] uppercase tracking-widest">
                     {article.category}
                   </div>
                </Link>
                
                <div className="p-10">
                  <div className="flex items-center gap-6 text-gray-400 text-xs font-bold mb-6 justify-end">
                    <div className="flex items-center gap-2">
                      <span>{article.date}</span>
                      <Clock size={14} />
                    </div>
                    <div className="flex items-center gap-2">
                       <span>{article.author}</span>
                       <User size={14} />
                    </div>
                  </div>

                  <Link to={`/articles/${article.id}`}>
                    <h3 className="text-2xl font-black text-secondary-950 mb-6 group-hover:text-primary-500 transition-colors leading-tight line-clamp-2">
                      {article.title}
                    </h3>
                  </Link>
                  
                  <p className="text-gray-500 leading-relaxed mb-10 line-clamp-3 font-medium">
                    {article.excerpt}
                  </p>
                  
                  <Link 
                    to={`/articles/${article.id}`} 
                    className="flex items-center gap-3 text-primary-500 font-black uppercase tracking-widest text-sm group-hover:gap-5 transition-all justify-end"
                  >
                    <span>إقرأ التفاصيل</span>
                    <ArrowLeft size={18} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Articles;
