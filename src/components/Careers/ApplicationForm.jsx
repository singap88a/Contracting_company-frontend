import React, { useState, useEffect } from 'react';
import { Upload, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { API_URL } from '../../config';

const ApplicationForm = ({ selectedJob }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    position: '',
    coverLetter: '',
    cv: ''
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  useEffect(() => {
    if (selectedJob) {
      setFormData(prev => ({ ...prev, position: selectedJob.title }));
    }
  }, [selectedJob]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setStatus({ type: 'error', message: 'حجم الملف كبير جداً (الأقصى 5 ميجابايت)' });
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, cv: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.cv) {
      setStatus({ type: 'error', message: 'يرجى تحميل السيرة الذاتية' });
      return;
    }

    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const response = await fetch(`${API_URL}/job-applications`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          jobId: selectedJob?.id
        })
      });

      if (response.ok) {
        setStatus({ type: 'success', message: 'تم إرسال طلبك بنجاح! سنتواصل معك قريباً.' });
        setFormData({
          fullName: '',
          email: '',
          mobile: '',
          position: selectedJob?.title || '',
          coverLetter: '',
          cv: ''
        });
      } else {
        setStatus({ type: 'error', message: 'حدث خطأ أثناء إرسال الطلب، يرجى المحاولة لاحقاً.' });
      }
    } catch (err) {
      console.error('Error submitting application:', err);
      setStatus({ type: 'error', message: 'فشل الاتصال بالسيرفر، يرجى المحاولة لاحقاً.' });
    } finally {
      setLoading(false);
    }
  };

  if (status.type === 'success') {
    return (
      <div className="lg:col-span-2 flex flex-col items-center justify-center p-12 bg-white rounded-3xl border border-primary-100 text-center space-y-4">
        <CheckCircle2 size={64} className="text-green-500 animate-bounce" />
        <h3 className="text-2xl font-bold text-secondary-900">{status.message}</h3>
        <button 
          onClick={() => setStatus({ type: '', message: '' })}
          className="px-8 py-3 bg-primary-500 text-white rounded-xl font-bold"
        >
          إرسال طلب آخر
        </button>
      </div>
    );
  }

  return (
    <div className="lg:col-span-2">
      <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
        <h3 className="text-2xl font-bold text-secondary-900 mb-2">
          {selectedJob ? `التقديم لوظيفة: ${selectedJob.title}` : 'المعلومات الشخصية'}
        </h3>
        <p className="text-gray-500 mb-8">يرجى تعبئة النموذج أدناه وسيتم التواصل معك في أقرب وقت.</p>

        {selectedJob && (
          <div className="mb-10 p-6 bg-gray-50/50 rounded-2xl border border-gray-100 space-y-6">
            <div>
              <h4 className="font-bold text-secondary-900 mb-2 flex items-center gap-2">
                <div className="w-1.5 h-6 bg-primary-500 rounded-full"></div>
                الوصف الوظيفي
              </h4>
              <p className="text-gray-600 leading-relaxed mr-3">{selectedJob.description}</p>
            </div>
            
            {selectedJob.requirements && selectedJob.requirements.length > 0 && (
              <div>
                <h4 className="font-bold text-secondary-900 mb-3 flex items-center gap-2">
                  <div className="w-1.5 h-6 bg-primary-500 rounded-full"></div>
                  المتطلبات
                </h4>
                <ul className="space-y-2 mr-3">
                  {selectedJob.requirements.map((req, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-gray-600">
                      <div className="mt-2 w-1.5 h-1.5 rounded-full bg-primary-300 flex-shrink-0"></div>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {status.type === 'error' && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl flex items-center gap-2 border border-red-100">
            <AlertCircle size={20} />
            <p className="font-bold text-sm">{status.message}</p>
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">الاسم الكامل</label>
              <input 
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                type="text" 
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all" 
                placeholder="الاسم الثلاثي" 
                required 
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">البريد الإلكتروني</label>
              <input 
                name="email"
                value={formData.email}
                onChange={handleChange}
                type="email" 
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all" 
                placeholder="example@domain.com" 
                required 
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">رقم الهاتف</label>
              <input 
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                type="tel" 
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all" 
                placeholder="05xxxxxxxx" 
                dir="ltr" 
                required 
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">المسمى الوظيفي المستهدف</label>
              <input 
                name="position"
                value={formData.position}
                onChange={handleChange}
                type="text" 
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all" 
                placeholder="مثال: مهندس مدني" 
                required 
              />
            </div>
          </div>

          <div>
             <label className="block text-sm font-bold text-gray-700 mb-2">السيرة الذاتية</label>
             <label className="relative border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-primary-500 transition-colors cursor-pointer bg-gray-50 flex flex-col items-center">
                <input type="file" className="hidden" accept=".pdf,.doc,.docx" onChange={handleFileChange} />
                <Upload size={32} className={`${formData.cv ? 'text-green-500' : 'text-gray-400'} mb-2`} />
                <p className="text-gray-600 font-medium">
                  {formData.cv ? 'تم اختيار الملف بنجاح' : 'اسحب الملف هنا أو اضغط للتحميل'}
                </p>
                <p className="text-xs text-gray-400 mt-1">PDF, DOC, DOCX (Max 5MB)</p>
             </label>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">رسالة تعريفية (اختياري)</label>
            <textarea 
              name="coverLetter"
              value={formData.coverLetter}
              onChange={handleChange}
              rows="4" 
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all" 
              placeholder="حدثنا قليلاً عن نفسك..."
            ></textarea>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-4 bg-primary-500 text-white rounded-xl font-bold hover:bg-primary-600 transition-colors shadow-lg shadow-primary-500/20 flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin" /> : 'إرسال الطلب'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ApplicationForm;
