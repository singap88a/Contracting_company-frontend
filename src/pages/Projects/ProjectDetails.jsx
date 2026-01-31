import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  Ruler, 
  CheckCircle, 
  Building2, 
  Maximize2,
  ChevronRight,
  ChevronLeft,
  Briefcase,
  Layers3
} from 'lucide-react';

const ProjectDetails = () => {
  const { id } = useParams();
  const [activeImage, setActiveImage] = useState(0);

  // Mock data - normally would fetch based on ID
  const project = {
    title: 'برج الأفق التجاري',
    subtitle: 'مشروع هندسي متكامل يجمع بين الفخامة والذكاء المعماري في قلب العاصمة',
    category: 'قطاع التجاري',
    location: 'الرياض، المملكة العربية السعودية',
    client: 'شركة الاستثمار العقاري السعودية',
    area: '25,000 م²',
    year: '2025',
    description: 'يعد برج الأفق التجاري نموذجاً فريداً للعمارة الحديثة التي تجمع بين الجمالية التصميمية والكفاءة الوظيفية. يقع المشروع في قلب المركز المالي للعاصمة، حيث تم تصميمه ليكون محوراً رئيساً للأعمال يواكب رؤية المملكة 2030.\n\nتم تنفيذ المشروع باستخدام أحدث تقنيات البناء المستدام، مع التركيز على توفير بيئة عمل ذكية ومحفزة للإبداع من خلال المساحات المفتوحة والزوايا البصرية المبتكرة التي تسمح بدخول الضوء الطبيعي وتوفر إطلالات بانورامية خلابة على مدينة الرياض.',
    features: [
      'نظام إدارة مباني ذكي (BMS) متكامل',
      'واجهات زجاجية مزدوجة عازلة للحرارة والصوت',
      'مواقف سيارات ذكية بسعة 500 مركبة',
      'أنظمة مراقبة وأمان ذكاء اصطناعي',
      'مناطق خضراء وجلسات عمل مفتوحة',
      'مصاعد بانورامية سريعة'
    ],
    details: [
      { label: 'العميل المستفيد', value: 'شركة الاستثمار العقاري', icon: Building2 },
      { label: 'سنة التنفيذ', value: '2025', icon: Calendar },
      { label: 'المساحة الإجمالية', value: '25,000 متر مربع', icon: Ruler },
      { label: 'الموقع', value: 'الرياض، العليا', icon: MapPin },
    ],
    images: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1554469384-e58fac16e23a?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=1200&auto=format&fit=crop'
    ]
  };

  return (
    <div className="bg-white min-h-screen text-right font-cairo" dir="rtl">
      {/* Breadcrumb / Top Navigation */}
      <nav className="bg-gray-50/50 border-b border-gray-100 sticky top-0 z-50 backdrop-blur-md">
        <div className="container mx-auto px-4 max-w-7xl h-16 flex items-center justify-between">
          <Link to="/projects" className="flex items-center gap-2 text-secondary-900 font-bold hover:text-primary-500 transition-colors">
            <ArrowLeft size={18} className="translate-x-1" />
            <span>العودة للمعرض</span>
          </Link>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-400 font-medium">المشاريع</span>
            <ChevronLeft size={14} className="text-gray-300" />
            <div className="flex items-center gap-1.5 font-black">
               <span className="text-secondary-900">{project.title.split(' ')[0]}</span>
               <span className="text-primary-500">{project.title.split(' ').slice(1).join(' ')}</span>
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-6 md:pt-10 pb-20">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Header Title Section */}
          <div className="mb-10">
               <motion.div
                 initial={{ opacity: 0, y: 15 }}
                 animate={{ opacity: 1, y: 0 }}
               >
                 <div className="flex items-center gap-3 mb-4">
                   <div className="w-10 h-px bg-primary-500"></div>
                   <span className="text-primary-600 font-black uppercase tracking-widest text-xs">{project.category}</span>
                 </div>
                 <h1 className="text-4xl md:text-5xl font-black text-secondary-950 mb-6 leading-tight">
                    <span className="text-secondary-950">{project.title.split(' ')[0]}</span>{' '}
                    <span className="text-primary-500">{project.title.split(' ').slice(1).join(' ')}</span>
                 </h1>
                 <p className="text-lg text-secondary-900/60 font-medium max-w-3xl leading-relaxed">
                   {project.subtitle}
                 </p>
               </motion.div>
            </div>

          {/* Main Layout Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            
            {/* Gallery Column */}
            <div className="lg:col-span-8 space-y-8">
               <motion.div 
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 className="relative rounded-[2rem] overflow-hidden bg-gray-100 shadow-xl aspect-[16/10]"
               >
                 <AnimatePresence mode="wait">
                   <motion.img 
                      key={activeImage}
                      src={project.images[activeImage]} 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className="w-full h-full object-cover" 
                   />
                 </AnimatePresence>
                 
                 {/* Navigation Arrows Overlay */}
                 <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none">
                    <button 
                      onClick={() => setActiveImage((prev) => (prev > 0 ? prev - 1 : project.images.length - 1))}
                      className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center justify-center pointer-events-auto hover:bg-primary-500 transition-all"
                    >
                      <ChevronRight size={20} />
                    </button>
                    <button 
                      onClick={() => setActiveImage((prev) => (prev < project.images.length - 1 ? prev + 1 : 0))}
                      className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center justify-center pointer-events-auto hover:bg-primary-500 transition-all"
                    >
                      <ChevronLeft size={20} />
                    </button>
                 </div>
               </motion.div>

               {/* Thumbnails */}
               <div className="grid grid-cols-4 gap-4 md:gap-6">
                  {project.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImage(i)}
                      className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${activeImage === i ? 'border-primary-500 scale-95 shadow-lg' : 'border-transparent opacity-60 hover:opacity-100'}`}
                    >
                      <img src={img} className="w-full h-full object-cover" />
                    </button>
                  ))}
               </div>

               {/* Description Section */}
               <div className="pt-10 border-t border-gray-100">
                  <h2 className="text-2xl font-black text-secondary-950 mb-6 flex items-center gap-3">
                     <div className="w-1.5 h-6 bg-primary-500 rounded-full"></div>
                     عن المشروع
                  </h2>
                  <div className="prose prose-lg max-w-none">
                     <p className="text-secondary-900 font-medium leading-[2.1] text-lg whitespace-pre-wrap">
                        {project.description}
                     </p>
                  </div>
               </div>
            </div>

            {/* Sticky Sidebar / Specs Column */}
            <aside className="lg:col-span-4">
              <div className="sticky top-24 space-y-8">
                
                {/* Specs Card */}
                <div className="bg-gray-50 p-8 rounded-[2rem] border border-gray-100 shadow-sm">
                   <h3 className="text-xl font-black text-secondary-950 mb-8 border-b border-gray-200 pb-5 flex items-center gap-2">
                      <Layers3 size={20} className="text-primary-500" />
                      مواصفات المشروع
                   </h3>
                   <div className="space-y-6">
                      {project.details.map((detail, i) => (
                        <div key={i} className="flex items-center gap-4 group">
                           <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-primary-500 shadow-sm group-hover:bg-primary-500 group-hover:text-white transition-all duration-300">
                              <detail.icon size={18} />
                           </div>
                           <div>
                              <span className="block text-[10px] text-gray-400 font-black uppercase tracking-wider mb-0.5">{detail.label}</span>
                              <span className="text-secondary-900 font-black text-sm">{detail.value}</span>
                           </div>
                        </div>
                      ))}
                   </div>
                </div>

                {/* Technical Features Section - Redesigned for Visibility */}
                <div className="bg-white p-8 rounded-[2rem] border-2 border-primary-500/10 shadow-lg shadow-primary-500/5">
                   <h3 className="text-lg font-black text-secondary-950 mb-8 flex items-center gap-3 border-b border-gray-100 pb-5">
                      <CheckCircle size={20} className="text-primary-500" />
                      المميزات التقنية
                   </h3>
                   <ul className="space-y-5">
                      {project.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-4 group">
                           <div className="w-6 h-6 rounded-lg bg-primary-50 flex items-center justify-center text-primary-600 mt-0.5 shrink-0 group-hover:bg-primary-500 group-hover:text-white transition-all duration-300 shadow-sm">
                              <CheckCircle size={14} />
                           </div>
                           <p className="text-[15px] font-bold text-secondary-900 group-hover:text-primary-600 transition-colors duration-300 leading-relaxed">
                              {feature}
                           </p>
                        </li>
                      ))}
                   </ul>
                </div>

              <div className="p-8 bg-primary-50 rounded-[2rem] border border-primary-100 text-center">
                   <h4 className="text-primary-900 font-black mb-4">هل لديك مشروع مماثل؟</h4>
                   <Link 
                     to="/contact" 
                     className="block w-full py-4 bg-primary-500 text-white rounded-xl font-black text-sm hover:bg-secondary-950 transition-colors shadow-lg shadow-primary-500/20"                   >
                     تواصل معنا الآن
                   </Link>
                </div>

              </div>
            </aside>

          </div>
        </div>
      </main>
    </div>
  );
};

export default ProjectDetails;
