import { User, Phone, Mail, Box, MapPin, Calculator, Layers, MessageSquare, Send, Ruler } from 'lucide-react';

const ServiceForm = () => {
  return (
    <div className="p-8 md:p-14">
      <form className="space-y-12">
        {/* Personal Info */}
        <section dir="rtl">
          <div className="flex items-center gap-3 mb-8 border-b border-gray-100 pb-4">
            <div className="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center text-primary-500">
              <User size={20} />
            </div>
            <h3 className="text-2xl font-black text-secondary-900">بيانات العميل</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-sm font-bold text-secondary-900 mr-2">الاسم بالكامل</label>
              <div className="relative">
                <input type="text" className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/5 outline-none bg-gray-50/30 transition-all font-medium" placeholder="مثال: أحمد محمد" />
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-secondary-900 mr-2">رقم الجوال</label>
              <div className="relative">
                <input type="tel" className="w-full px-10 py-4 rounded-2xl border border-gray-200 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/5 outline-none bg-gray-50/30 transition-all font-medium text-left" placeholder="05xxxxxxxx" dir="ltr" />
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              </div>
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-sm font-bold text-secondary-900 mr-2">البريد الإلكتروني</label>
              <div className="relative">
                <input type="email" className="w-full px-10 py-4 rounded-2xl border border-gray-200 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/5 outline-none bg-gray-50/30 transition-all font-medium text-left" placeholder="example@mail.com" dir="ltr" />
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              </div>
            </div>
          </div>
        </section>

        {/* Project Info */}
        <section dir="rtl">
          <div className="flex items-center gap-3 mb-8 border-b border-gray-100 pb-4">
            <div className="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center text-primary-500">
              <Box size={20} />
            </div>
            <h3 className="text-2xl font-black text-secondary-900">تفاصيل المشروع</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
               <label className="text-sm font-bold text-secondary-900 mr-2">نوع الخدمة</label>
               <div className="relative">
                 <select className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/5 outline-none bg-gray-50/30 transition-all font-medium appearance-none">
                   <option>بناء وتشييد</option>
                   <option>تصميم معماري</option>
                   <option>تصميم داخلي</option>
                   <option>تشطيب</option>
                   <option>ترميم</option>
                   <option>أخرى</option>
                 </select>
                 <Layers className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
               </div>
            </div>
            <div className="space-y-2">
               <label className="text-sm font-bold text-secondary-900 mr-2">المدينة</label>
               <div className="relative">
                 <input type="text" className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/5 outline-none bg-gray-50/30 transition-all font-medium" placeholder="مثال: الرياض" />
                 <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
               </div>
            </div>
            <div className="space-y-2">
               <label className="text-sm font-bold text-secondary-900 mr-2">الميزانية التقريبية (ريال)</label>
               <div className="relative">
                 <input type="number" className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/5 outline-none bg-gray-50/30 transition-all font-medium" placeholder="0" />
                </div>
            </div>
            <div className="space-y-2">
               <label className="text-sm font-bold text-secondary-900 mr-2">المساحة (م²)</label>
               <div className="relative">
                 <input type="number" className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/5 outline-none bg-gray-50/30 transition-all font-medium" placeholder="0" />
                </div>
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-sm font-bold text-secondary-900 mr-2">وصف المشروع</label>
              <div className="relative">
                <textarea rows="5" className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/5 outline-none bg-gray-50/30 transition-all font-medium resize-none placeholder:text-gray-400" placeholder="اكتب تفاصيل إضافية عن رؤيتك للمشروع..."></textarea>
                <MessageSquare className="absolute left-4 top-6 text-gray-400" size={18} />
              </div>
            </div>
          </div>
        </section>

        <div className="pt-6">
          <button type="button" className="group w-full py-5 bg-secondary-900 text-white font-black text-xl rounded-2xl hover:bg-primary-500 hover:text-secondary-950 transition-all duration-500 flex items-center justify-center gap-4 shadow-xl hover:shadow-primary-500/30">
            <span>إرسال طلب الخدمة الآن</span>
            <Send size={24} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </button>
          <p className="text-center text-gray-400 text-sm mt-6">سيقوم فريقنا بالتواصل معك خلال 24 ساعة عمل.</p>
        </div>
      </form>
    </div>
  );
};

export default ServiceForm;
