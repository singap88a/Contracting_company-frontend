import React, { useState, useEffect } from 'react';
import { User, Phone, Mail, Box, MapPin, Layers, MessageSquare, Send, Loader2, CheckCircle } from 'lucide-react';
import { API_URL } from '../../config';

const ServiceForm = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    email: '',
    serviceType: '',
    category: '',
    city: '',
    budget: '',
    area: '',
    projectDescription: ''
  });

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(`${API_URL}/services`);
        if (response.ok) {
          const data = await response.json();
          setServices(data);
          if (data.length > 0) {
            setFormData(prev => ({ 
              ...prev, 
              serviceType: data[0].name,
              category: data[0].category
            }));
          }
        }
      } catch (err) {
        console.error('Error fetching services for form:', err);
      }
    };
    fetchServices();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'serviceType') {
      const selectedService = services.find(s => s.name === value);
      setFormData(prev => ({ 
        ...prev, 
        serviceType: value,
        category: selectedService ? selectedService.category : ''
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/service-requests`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSuccess(true);
        setFormData({
          fullName: '',
          mobile: '',
          email: '',
          serviceType: services[0]?.name || '',
          category: services[0]?.category || '',
          city: '',
          budget: '',
          area: '',
          projectDescription: ''
        });
      } else {
        alert('حدث خطأ أثناء إرسال الطلب، يرجى المحاولة مرة أخرى.');
      }
    } catch (err) {
      console.error('Error submitting request:', err);
      alert('حدث خطأ في الاتصال بالسيرفر.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="p-8 md:p-14 text-center space-y-6" dir="rtl">
        <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={48} />
        </div>
        <h3 className="text-3xl font-black text-secondary-900">تم إرسال طلبك بنجاح!</h3>
        <p className="text-gray-600 text-lg">شكراً لتواصلك معنا. سيقوم فريقنا بمراجعة طلبك والتواصل معك قريباً.</p>
        <button 
          onClick={() => setSuccess(false)}
          className="px-8 py-3 bg-secondary-900 text-white font-bold rounded-xl hover:bg-primary-500 transition-colors"
        >
          إرسال طلب آخر
        </button>
      </div>
    );
  }

  return (
    <div className="p-8 md:p-14">
      <form className="space-y-12" onSubmit={handleSubmit}>
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
                <input 
                  type="text" 
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/5 outline-none bg-gray-50/30 transition-all font-medium" 
                  placeholder="مثال: أحمد محمد" 
                  required
                />
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-secondary-900 mr-2">رقم الجوال</label>
              <div className="relative">
                <input 
                  type="tel" 
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  className="w-full px-10 py-4 rounded-2xl border border-gray-200 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/5 outline-none bg-gray-50/30 transition-all font-medium text-left" 
                  placeholder="05xxxxxxxx" 
                  dir="ltr" 
                  required
                />
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              </div>
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-sm font-bold text-secondary-900 mr-2">البريد الإلكتروني</label>
              <div className="relative">
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-10 py-4 rounded-2xl border border-gray-200 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/5 outline-none bg-gray-50/30 transition-all font-medium text-left" 
                  placeholder="example@mail.com" 
                  dir="ltr" 
                  required
                />
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
                 <select 
                   name="serviceType"
                   value={formData.serviceType}
                   onChange={handleChange}
                   className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/5 outline-none bg-gray-50/30 transition-all font-medium appearance-none"
                   required
                 >
                   {services.map(service => (
                     <option key={service._id} value={service.name}>{service.name}</option>
                   ))}
                   <option value="أخرى">أخرى</option>
                 </select>
                 <Layers className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
               </div>
            </div>
            <div className="space-y-2">
               <label className="text-sm font-bold text-secondary-900 mr-2">المدينة</label>
               <div className="relative">
                 <input 
                   type="text" 
                   name="city"
                   value={formData.city}
                   onChange={handleChange}
                   className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/5 outline-none bg-gray-50/30 transition-all font-medium" 
                   placeholder="مثال: الرياض" 
                   required
                 />
                 <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
               </div>
            </div>
            <div className="space-y-2">
               <label className="text-sm font-bold text-secondary-900 mr-2">الميزانية التقريبية (ريال)</label>
               <div className="relative">
                 <input 
                   type="number" 
                   name="budget"
                   value={formData.budget}
                   onChange={handleChange}
                   className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/5 outline-none bg-gray-50/30 transition-all font-medium" 
                   placeholder="0" 
                 />
                </div>
            </div>
            <div className="space-y-2">
               <label className="text-sm font-bold text-secondary-900 mr-2">المساحة (م²)</label>
               <div className="relative">
                 <input 
                   type="number" 
                   name="area"
                   value={formData.area}
                   onChange={handleChange}
                   className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/5 outline-none bg-gray-50/30 transition-all font-medium" 
                   placeholder="0" 
                 />
                </div>
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-sm font-bold text-secondary-900 mr-2">وصف المشروع</label>
              <div className="relative">
                <textarea 
                  name="projectDescription"
                  value={formData.projectDescription}
                  onChange={handleChange}
                  rows="5" 
                  className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/5 outline-none bg-gray-50/30 transition-all font-medium resize-none placeholder:text-gray-400" 
                  placeholder="اكتب تفاصيل إضافية عن رؤيتك للمشروع..."
                  required
                ></textarea>
                <MessageSquare className="absolute left-4 top-6 text-gray-400" size={18} />
              </div>
            </div>
          </div>
        </section>

        <div className="pt-6">
          <button 
            type="submit" 
            disabled={loading}
            className="group w-full py-5 bg-secondary-900 text-white font-black text-xl rounded-2xl hover:bg-primary-500 hover:text-secondary-950 transition-all duration-500 flex items-center justify-center gap-4 shadow-xl hover:shadow-primary-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={24} />
            ) : (
              <>
                <span>إرسال طلب الخدمة الآن</span>
                <Send size={24} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </>
            )}
          </button>
          <p className="text-center text-gray-400 text-sm mt-6">سيقوم فريقنا بالتواصل معك خلال 24 ساعة عمل.</p>
        </div>
      </form>
    </div>
  );
};

export default ServiceForm;
