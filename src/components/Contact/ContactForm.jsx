import React from 'react';
import { Send } from 'lucide-react';

const ContactForm = () => {
  return (
    <>
    <div className="pt-0">
       <h3 className="text-2xl font-black text-secondary-900 mb-6">أرسل لنا رسالة</h3>
       <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <input type="text" placeholder="الاسم بالكامل" className="w-full px-5 py-3 rounded-2xl border border-gray-100 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/5 outline-none bg-gray-50/50 transition-all font-medium" />
             <input type="email" placeholder="البريد الإلكتروني" className="w-full px-5 py-3 rounded-2xl border border-gray-100 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/5 outline-none bg-gray-50/50 transition-all font-medium" />
          </div>
          <input type="text" placeholder="الموضوع" className="w-full px-5 py-3 rounded-2xl border border-gray-100 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/5 outline-none bg-gray-50/50 transition-all font-medium" />
          <textarea rows="4" placeholder="نص الرسالة..." className="w-full px-5 py-3 rounded-2xl border border-gray-100 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/5 outline-none bg-gray-50/50 transition-all font-medium resize-none"></textarea>
          <button className="w-full py-4 bg-secondary-900 text-white rounded-2xl font-black hover:bg-primary-500 hover:text-secondary-950 transition-all duration-300 flex items-center justify-center gap-3 group">
            <Send size={20} className="group-hover:translate-x-1 transition-transform" />
            <span>إرسال الرسالة</span>
          </button>
       </form>
    </div>
    </>
  );
};

export default ContactForm;
