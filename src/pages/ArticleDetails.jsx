import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { Clock, User, Share2, ArrowLeft, ArrowRight, MessageSquare, Twitter, Facebook, Linkedin, Quote } from 'lucide-react';

const allArticles = [
  {
    id: 1,
    title: "بدء تنفيذ مشروع برج الريادة الذكي في قلب العاصمة",
    content: "يعد مشروع برج الريادة الذكي واحداً من أكثر المشاريع طموحاً في محفظة صرح البناء. يقع البرج في المركز المالي لمدينة الرياض، ويتميز بتصميمه المعماري المستوحى من جذور العمارة النجدية بلمسة عصرية عالمية.\n\nمن المتوقع أن يتم الانتهاء من هيكل البرج بحلول نهاية العام الجاري، حيث نستخدم تقنيات الخرسانة عالية الإجهاد والأنظمة الذكية في إدارة استهلاك الطاقة والمياه.\n\nإن هذا المشروع ليس مجرد مبنى، بل هو تجسيد لرؤية المملكة 2030 في قطاع الإنشاءات والاستدامة.",
    date: "31 يناير 2026",
    author: "أحمد محمد",
    authorRole: "المدير التنفيذي",
    category: "مشاريع",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "حصول الشركة على جائزة الابتكار الهندسي للعام الثاني",
    content: "للعام الثاني على التوالي، تتوج شركة صرح البناء بجائزة الابتكار الهندسي المرموقة. جاء هذا التكريم خلال الحفل السنوي لجوائز الإنشاءات العربية، تقديراً لابتكارات الشركة في تقليل الهدر الإنشائي بنسبة تفوق 30%.\n\nأكدت لجنة التحكيم أن الحلول التقنية التي قدمتها الشركة تمثل نموذجاً يحتذى به في كفاءة التنفيذ وجودة المنتج النهائي.\n\nنحن نهدي هذا الإنجاز لكل فرد في فريقنا كونه المحرك الأساسي وراء كل نجاحنا.",
    date: "25 يناير 2026",
    author: "سارة علي",
    authorRole: "مهندسة معمارية",
    category: "جوائز",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb194882e?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "توسيع شراكتنا مع كبرى المكاتب الاستشارية العالمية",
    content: "أعلنت صرح البناء اليوم عن توقيع اتفاقية تعاون استراتيجي مع مكتب 'جراند ديزاين' العالمي ومقره لندن. تهدف هذه الشراكة إلى جلب الخبرات الدولية في تصميم المستشفيات والمراكز الحيوية المتخصصة.\n\nستعمل شركتنا جنباً إلى جنب مع الخبراء الدوليين لنقل المعرفة وتطوير كوادرنا الوطنية في مجالات متخصصة جداً.\n\nنؤمن بأن التعاون الدولي هو مفتاح الريادة في عالم البناء الحديث.",
    date: "15 يناير 2026",
    author: "خالد عمر",
    authorRole: "مدير المشاريع",
    category: "شراكات",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: 4,
    title: "مستقبل المدن المستدامة: رؤية 2030 في قطاع المقاولات",
    content: "الاستدامة لم تعد خياراً بل ضرورة حتمية في مواجهة التغير المناخي. في هذا المقال نستعرض كيف تتبنى صرح البناء مفهوم 'المباني صفرية الطاقة'.\n\nنستخدم في مشاريعنا الحديثة تقنيات العزل الحراري المتقدمة، وأنظمة الحصاد المائي، وتوليد الطاقة الشمسية المتكاملة مع الأسطح.\n\nرؤيتنا هي أن تكون كل مبانينا جزءاً من الحل للبيئة وليست عبئاً عليها.",
    date: "10 يناير 2026",
    author: "منى عبدالله",
    authorRole: "مصممة داخلية",
    category: "استدامة",
    image: "https://images.unsplash.com/photo-1503387762-592fe58ef452?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: 5,
    title: "أهمية الصيانة الدورية للمرافق التجارية الكبرى",
    content: "الصيانة ليست مجرد إصلاح للأعطال، بل هي استثمار في عمر المنشأة وقيمتها السوقية. نحن نقدم برنامج صيانة استباقية يعتمد على إنترنت الأشياء (IoT).",
    date: "05 يناير 2026",
    author: "سالم العلي",
    authorRole: "مدير العمليات",
    category: "خدمات",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 6,
    title: "تقنيات البناء الحديثة باستخدام الذكاء الاصطناعي",
    content: "كيف يغير الذكاء الاصطناعي طريقة تخطيط وتنفيذ المشاريع؟ من المحاكاة الرقمية إلى إدارة التوريد الذكية، نحن في طليعة هذا التحول الرقمي.",
    date: "01 يناير 2026",
    author: "م. محمد كمال",
    authorRole: "رئيس قسم التقنية",
    category: "تقنية",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 7,
    title: "تصميم المكاتب العصرية بعد عام 2025",
    content: "المكاتب الآن يجب أن توفر بيئة تعزز الإبداع والرفاهية. نركز في تصاميمنا على الإضاءة الطبيعية والخصوصية المرنة والمساحات التفاعلية.",
    date: "28 ديسمبر 2025",
    author: "منى عبدالله",
    authorRole: "مصممة داخلية",
    category: "تصميم",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 8,
    title: "كيف تختار مقاولك لبناء منزل أحلامك؟",
    content: "نصائح ذهبية تقدمها صرح البناء لكل المقبلين على بناء منازلهم. الجودة والشفافية في التعامل والالتزام القانوني هي أهم الركائز.",
    date: "20 ديسمبر 2025",
    author: "أحمد محمد",
    authorRole: "المدير التنفيذي",
    category: "نصائح",
    image: "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?q=80&w=800&auto=format&fit=crop"
  }
];

const ArticleDetails = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [recentArticles, setRecentArticles] = useState([]);

  useEffect(() => {
    const currentParamId = parseInt(id);
    const foundArticle = allArticles.find(a => a.id === currentParamId) || allArticles[0];
    setArticle(foundArticle);
    
    // Set 8 sidebar articles excluding current if possible
    setRecentArticles(allArticles.slice(0, 8));
    
    // Smooth scroll to top when article changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  if (!article) return null;

  return (
    <div className="bg-white min-h-screen pt-32 pb-24 text-right">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Main Content (8/12 equivalent in grid) */}
          <div className="lg:w-2/3">
            <AnimatePresence mode="wait">
              <motion.article
                 key={article.id}
                 initial={{ opacity: 0, scale: 0.98 }}
                 animate={{ opacity: 1, scale: 1 }}
                 exit={{ opacity: 0, scale: 1.02 }}
                 transition={{ duration: 0.5 }}
              >
                {/* Meta Header */}
                <div className="flex items-center gap-4 text-primary-500 font-black text-sm uppercase tracking-widest mb-6">
                   <div className="w-10 h-1px bg-primary-500"></div>
                   <span>{article.category}</span>
                </div>
                
                <h1 className="text-4xl md:text-6xl font-black text-secondary-950 mb-10 leading-[1.1]">
                   {article.title}
                </h1>

                {/* Author & Info bar */}
                <div className="flex flex-wrap items-center justify-end gap-x-10 gap-y-6 py-8 border-y border-gray-100 mb-12">
                   <div className="flex items-center gap-4">
                      <div className="text-right">
                         <h5 className="font-black text-secondary-900 text-sm leading-none">{article.author}</h5>
                         <span className="text-xs text-gray-400 font-bold">{article.authorRole}</span>
                      </div>
                      <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden border-2 border-primary-500/20">
                         <img src={`https://ui-avatars.com/api/?name=${article.author}&background=f97316&color=fff`} className="w-full h-full object-cover" />
                      </div>
                   </div>

                   <div className="flex items-center gap-3 text-gray-500 font-bold text-sm">
                      <span>{article.date}</span>
                      <Clock size={16} className="text-primary-500" />
                   </div>

                   <div className="flex items-center gap-4 mr-auto">
                      <span className="text-xs font-black text-gray-400 uppercase tracking-widest">مشاركة:</span>
                      <div className="flex gap-2">
                        <button className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-primary-500 hover:text-white transition-all transform hover:-translate-y-1">
                          <Twitter size={18} />
                        </button>
                        <button className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-primary-500 hover:text-white transition-all transform hover:-translate-y-1">
                          <Facebook size={18} />
                        </button>
                        <button className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-primary-500 hover:text-white transition-all transform hover:-translate-y-1">
                          <Linkedin size={18} />
                        </button>
                      </div>
                   </div>
                </div>

                <div className="rounded-[4rem] overflow-hidden mb-16 shadow-2xl relative group">
                   <img src={article.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                   <div className="absolute inset-0 bg-gradient-to-t from-secondary-950/20 to-transparent"></div>
                </div>

                <div className="prose prose-xl max-w-none prose-headings:font-black prose-headings:text-secondary-950 prose-p:text-gray-600 prose-p:leading-[1.8] prose-p:font-medium text-right mb-20 whitespace-pre-wrap">
                   {article.content}
                   
                   <blockquote className="border-r-8 border-primary-500 bg-gray-50 p-12 rounded-3xl my-12 italic text-2xl text-secondary-900 font-black relative overflow-hidden">
                      <Quote className="absolute -top-6 -left-6 text-primary-500/10 w-40 h-40 -z-0" />
                      "نحن لا نبني الأبنية فقط، بل نصنع معالم المستقبل بلمسات وطنية وخبرات عالمية."
                   </blockquote>
                   
                   <p>إن التزامنا في صرح البناء يمتد إلى ما بعد تسليم المفاتيح. نحن نبني علاقات مستدامة مع عملائنا، مبنية على الثقة المتبادلة والجودة التي لا تقبل المساومة.</p>
                </div>

                {/* Tags & Footer Meta */}
                <div className="flex items-center justify-between border-t border-gray-100 pt-12">
                   <div className="flex items-center gap-4">
                      <button className="flex items-center gap-2 py-3 px-8 bg-gray-50 text-gray-500 rounded-xl font-black text-sm hover:bg-primary-500 hover:text-white transition-all">
                        <Share2 size={16} />
                        <span>نشر المقال</span>
                      </button>
                      <button className="flex items-center gap-2 py-3 px-8 bg-gray-50 text-gray-500 rounded-xl font-black text-sm hover:bg-secondary-950 hover:text-white transition-all">
                        <MessageSquare size={16} />
                        <span>تعليقات</span>
                      </button>
                   </div>
                   
                   <div className="flex gap-3">
                      {["مقاولات", "هندسة", "تطوير"].map((tag, i) => (
                        <span key={i} className="py-2 px-5 bg-primary-100/50 text-primary-600 rounded-lg text-sm font-black select-none">#{tag}</span>
                      ))}
                   </div>
                </div>
              </motion.article>
            </AnimatePresence>
          </div>

          {/* Sidebar (8 Articles list) */}
          <aside className="lg:w-1/3">
             <div className="sticky top-32">
                <div className="p-10 bg-gray-50 rounded-[3rem] border border-gray-100">
                   <h4 className="text-2xl font-black text-secondary-950 mb-10 flex items-center justify-end gap-3">
                      <span>مقالات قد تهمك</span>
                      <div className="w-2 h-8 bg-primary-500 rounded-full"></div>
                   </h4>

                   <div className="space-y-8">
                      {recentArticles.map((ra) => (
                        <Link 
                          key={ra.id} 
                          to={`/articles/${ra.id}`}
                          className={`flex items-start gap-4 group text-right transition-all p-4 rounded-2xl hover:bg-white hover:shadow-lg ${ra.id === article.id ? 'bg-white shadow-md border-r-4 border-primary-500' : ''}`}
                        >
                           <div className="flex-1">
                              <span className="text-[10px] font-black text-primary-500 uppercase tracking-widest block mb-1">{ra.category}</span>
                              <h5 className="text-base font-black text-secondary-900 group-hover:text-primary-500 transition-colors leading-snug line-clamp-2">
                                 {ra.title}
                              </h5>
                              <span className="text-[10px] text-gray-400 font-bold mt-2 block">{ra.date}</span>
                           </div>
                           <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0 shadow-sm border border-gray-100">
                              <img src={ra.image} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                           </div>
                        </Link>
                      ))}
                   </div>

                   <Link to="/articles" className="mt-12 w-full py-5 bg-secondary-950 text-white rounded-2xl font-black flex items-center justify-center gap-3 hover:bg-primary-500 transition-all transform hover:-translate-y-1">
                      <span>عرض جميع المقالات</span>
                      <ArrowLeft size={20} />
                   </Link>
                </div>

                {/* Newsletter Sidebar box */}
                <div className="mt-10 p-10 bg-primary-500 text-secondary-950 rounded-[3rem] text-center relative overflow-hidden">
                   <div className="relative z-10">
                     <h4 className="text-2xl font-black mb-4 leading-tight">اشترك في <br />نشرتنا البريدية</h4>
                     <p className="text-secondary-950/70 font-bold text-sm mb-8">ابقى على اطلاع بأحدث أخبار ومشاريع صرح البناء</p>
                     <div className="space-y-3">
                       <input className="w-full py-4 px-6 bg-white/20 border border-white/20 rounded-xl placeholder:text-secondary-950/50 text-secondary-950 font-bold focus:outline-none focus:ring-2 ring-white/50" placeholder="بريدك الإلكتروني" />
                       <button className="w-full py-4 bg-white text-secondary-950 rounded-xl font-black hover:bg-secondary-950 hover:text-white transition-all">اشترك الآن</button>
                     </div>
                   </div>
                   <Quote className="absolute -bottom-10 -right-10 w-40 h-40 text-white/10" />
                </div>
             </div>
          </aside>

        </div>
      </div>
    </div>
  );
};

export default ArticleDetails;
