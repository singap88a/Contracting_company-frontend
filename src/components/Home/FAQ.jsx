import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, MessageCircle, Phone, Mail, ArrowLeft, Clock, MapPin, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const FAQ = () => {
  const faqs = [
    {
      question: 'ما هي المناطق التي تغطونها؟',
      answer: 'نقدم خدماتنا في جميع أنحاء المملكة العربية السعودية، مع تركيز خاص على المناطق الرئيسية (الرياض، جدة، الدمام). لدينا فرق عمل متنقلة جاهزة للوصول إليكم أينما كنتم.'
    },
    {
      question: 'كيف يتم تحديد تكلفة المشروع؟',
      answer: 'تعتمد التكلفة على عدة عوامل منها حجم المشروع، المواصفات المطلوبة، ونوعية المواد المستخدمة. نقوم بتقديم عرض سعر مفصل وشفاف بعد دراسة المخططات وزيارة الموقع.'
    },
    {
      question: 'هل تقدمون ضمانات على التنفيذ؟',
      answer: 'نعم، نقدم ضمانات شاملة على جميع أعمال الهيكل والإنشاءات والتشطيبات وفقاً للأنظمة واللوائح المعمول بها، لضمان راحة بال عملائنا.'
    },
    {
      question: 'هل يمكنكم المساعدة في التصميم واستخراج التصاريح؟',
      answer: 'بالتأكيد، لدينا قسم هندسي متكامل يساعدكم في التصميم المعماري والإنشائي، كما نقوم بمتابعة واستخراج كافة التراخيص اللازمة لبدء العمل.'
    },
    {
        question: 'كم تستغرق عملية البناء عادة؟',
        answer: 'تختلف المدة حسب حجم وتعقيد المشروع. نقوم بوضع جدول زمني مفصل قبل البدء، ونلتزم بالموعد المحدد للتسليم بدقة متناهية.'
    }
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="relative py-24 overflow-hidden border-b border-gray-100 bg-gray-50 text-secondary-900">
      {/* Background Shapes */}
      <div className="absolute top-0 right-0 w-full h-full opacity-[0.03] pointer-events-none">
        <div className="absolute rounded-full top-20 right-20 w-96 h-96 bg-secondary-900 blur-3xl"></div>
        <div className="absolute rounded-full bottom-20 left-20 w-80 h-80 bg-primary-500 blur-3xl"></div>
      </div>
      
      {/* Grid Pattern */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.02] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:32px_32px]"></div>

      <div className="container relative z-10 px-4 mx-auto max-w-7xl">
        <div className="grid items-start grid-cols-1 gap-12 lg:grid-cols-3">
            
            {/* Left Column: FAQs */}
            <div className="lg:col-span-2">
                <div className="mb-12">
                    <span className="block mb-4 font-bold tracking-widest uppercase text-secondary-500">الأسئلة الشائعة</span>
                    <h2 className="text-3xl lg:text-5xl font-black text-secondary-900 leading-[1.1] mb-6">
                       هل لديك <span className="relative text-primary-500">
                         استفسارات؟
                         <svg className="absolute right-0 w-full h-3 -bottom-1 text-primary-200 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none"/></svg>
                       </span>
                    </h2>
                    <p className="max-w-2xl text-lg text-gray-500">
                        جمعنا لك أهم الأسئلة التي قد تدور في ذهنك حول خدماتنا وإجراءات العمل.
                    </p>
                </div>

                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className={`rounded-[2rem] transition-all duration-300 overflow-hidden border-2 ${activeIndex === index ? 'bg-white border-primary-500 shadow-xl shadow-primary-500/10' : 'bg-white border-gray-100 hover:border-primary-200 hover:shadow-lg'}`}
                    >
                      <button
                        onClick={() => toggleFAQ(index)}
                        className="flex items-center justify-between w-full p-6 text-right group"
                      >
                        <span className={`text-lg font-black transition-colors ${activeIndex === index ? 'text-primary-600' : 'text-secondary-900 group-hover:text-primary-600'}`}>
                          {faq.question}
                        </span>
                        <span className={`transform transition-all duration-300 flex-shrink-0 mr-4 w-10 h-10 rounded-full flex items-center justify-center ${activeIndex === index ? 'rotate-180 bg-primary-500 text-white shadow-lg' : 'bg-gray-50 text-gray-400 group-hover:bg-primary-50 group-hover:text-primary-500'}`}>
                          {activeIndex === index ? <HelpCircle size={20} /> : <ChevronDown size={20} />}
                        </span>
                      </button>
                      
                      <AnimatePresence>
                        {activeIndex === index && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <div className="px-6 pt-5 pb-6 font-medium leading-relaxed text-gray-600 border-t border-gray-100">
                              {faq.answer}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>
            </div>

            {/* Right Column: CTA Card (Sticky & Styled) */}
            <div className="lg:col-span-1 lg:sticky lg:top-28">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-[2rem] p-8 border-2 border-gray-100 shadow-2xl shadow-gray-200/50 relative overflow-hidden group hover:border-primary-200 transition-all duration-300"
                >
                    {/* Background Shapes - More Complex */}
                    <div className="absolute top-0 right-0 w-40 h-40 transition-transform duration-500 rounded-bl-full bg-gradient-to-br from-primary-500/15 to-transparent -z-10 group-hover:scale-125"></div>
                    <div className="absolute bottom-0 left-0 w-32 h-32 transition-transform duration-500 rounded-tr-full bg-gradient-to-tr from-secondary-900/10 to-transparent -z-10 group-hover:scale-110"></div>
                    <div className="absolute w-24 h-24 transition-colors duration-500 transform -translate-x-1/2 -translate-y-1/2 rounded-full top-1/2 left-1/2 bg-primary-500/8 blur-2xl -z-10 group-hover:bg-primary-500/15"></div>
                    
                    {/* Additional Geometric Shapes */}
                    <div className="absolute w-16 h-16 transition-all duration-500 rotate-45 border-2 rounded-lg top-8 left-8 border-primary-500/10 -z-10 group-hover:border-primary-500/20 group-hover:rotate-90"></div>
                    <div className="absolute w-12 h-12 transition-all duration-500 rounded-full bottom-8 right-8 bg-secondary-900/5 -z-10 group-hover:bg-secondary-900/10 group-hover:scale-150"></div>
                    <div className="absolute w-8 h-8 transition-transform duration-500 rounded-full top-1/4 right-1/4 bg-primary-500/10 -z-10 group-hover:scale-200"></div>
                    
                    {/* Grid Pattern */}
                    <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px] -z-10"></div>
                    
                    {/* Diagonal Lines Pattern */}
                    <div className="absolute inset-0 opacity-[0.02] -z-10" style={{
                      backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,0.05) 10px, rgba(0,0,0,0.05) 20px)'
                    }}></div>
                    
                    <div className="relative z-10">
                        <div className="flex items-center justify-center w-16 h-16 mb-6 text-white transition-all duration-300 shadow-lg bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl group-hover:rotate-6 group-hover:scale-110">
                            <MessageCircle size={28} strokeWidth={2} />
                        </div>
                        
                        <h3 className="mb-3 text-2xl font-black transition-colors duration-300 text-secondary-900 group-hover:text-primary-600">هل لديك سؤال آخر؟</h3>
                        <p className="mb-8 text-sm font-medium leading-relaxed text-gray-600">
                            نحن هنا لمساعدتك. تواصل معنا مباشرة للحصول على الاستشارة المناسبة.
                        </p>
                        
                        <div className="space-y-5"> 
                            <div className="flex items-start gap-4 p-4 transition-colors duration-300 rounded-xl bg-gray-50 group-hover:bg-primary-50">
                                <div className="flex items-center justify-center w-10 h-10 transition-colors duration-300 rounded-lg bg-primary-100 text-primary-600 group-hover:bg-primary-500 group-hover:text-white">
                                    <MapPin size={18} />
                                </div>
                                <div>
                                    <p className="mb-1 text-sm font-black text-secondary-900">الرياض، حي الصحافة</p>
                                    <p className="text-xs font-medium text-gray-400">المقر الرئيسي</p>
                                </div>
                            </div>
                            
                            <div className="flex items-start gap-4 p-4 transition-colors duration-300 rounded-xl bg-gray-50 group-hover:bg-primary-50">
                                <div className="flex items-center justify-center w-10 h-10 transition-colors duration-300 rounded-lg bg-primary-100 text-primary-600 group-hover:bg-primary-500 group-hover:text-white">
                                    <Clock size={18} />
                                </div>
                                <div>
                                    <p className="mb-1 text-sm font-black text-secondary-900">9:00 ص - 6:00 م</p>
                                    <p className="text-xs font-medium text-gray-400">الأحد - الخميس</p>
                                </div>
                            </div>

                            <div className="h-[1px] bg-gradient-to-r from-transparent via-gray-200 to-transparent w-full my-4"></div>

                            <Link to="/contact" className="flex items-center justify-center w-full gap-2 py-4 font-black text-white transition-all shadow-lg bg-secondary-900 hover:bg-primary-600 rounded-xl shadow-secondary-900/20 active:scale-95 group/btn">
                                تواصل معنا
                                <ArrowLeft size={18} className="transition-transform group-hover/btn:-translate-x-1" />
                            </Link>
                            
                            <div className="flex gap-3">
                                <a href="tel:+966500000000" className="flex items-center justify-center flex-1 py-3 text-sm font-black text-gray-600 transition-all border-2 border-gray-200 hover:border-primary-500 hover:bg-primary-50 hover:text-primary-600 rounded-xl group">
                                    <Phone size={16} className="ml-2 transition-transform group-hover:scale-110" />
                                    اتصال
                                </a>
                                <a href="mailto:info@company.com" className="flex items-center justify-center flex-1 py-3 text-sm font-black text-gray-600 transition-all border-2 border-gray-200 hover:border-primary-500 hover:bg-primary-50 hover:text-primary-600 rounded-xl group">
                                    <Mail size={16} className="ml-2 transition-transform group-hover:scale-110" />
                                    إيميل
                                </a>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

        </div>
      </div>
    </section>
  );
};

export default FAQ;
