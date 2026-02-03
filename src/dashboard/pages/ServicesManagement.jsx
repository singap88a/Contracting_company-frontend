import React, { useState, useEffect } from 'react';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';
import FormInput from '../components/FormInput';
import { Plus, Loader2, Trash2, AlertTriangle } from 'lucide-react';
import { API_URL } from '../../config';
import { useAuth } from '../../context/AuthContext';

const ServicesManagement = () => {
  const { token, logout } = useAuth();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await fetch(`${API_URL}/services`);
      if (response.ok) {
        const data = await response.json();
        setServices(data.map(s => ({ ...s, id: s._id })));
      }
    } catch (err) {
      console.error('Error fetching services:', err);
    } finally {
      setLoading(false);
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState(null);
  const [editingService, setEditingService] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    icon: '🏗️',
    image: null,
    category: 'contracting'
  });

  const commonEmojis = [
    '🏗️', '🏢', '🏠', '📐', '🔧', '🔨', '🎨', '🧹', '🔌', '🚿', 
    '🧱', '🚇', '🌉', '🏫', '🏪', '🏭', '🏛️', '🏕️', '🌳', '💡',
    '🌳', '🌱', '🚜', '🚚', '📦', '🔑', '🛡️', '📊', '🤝', '💰'
  ];

  const columns = [
    { 
      key: 'icon', 
      label: 'الأيقونة',
      render: (icon) => <span className="text-2xl bg-gray-50 w-12 h-12 flex items-center justify-center rounded-xl">{icon}</span>
    },
    { key: 'name', label: 'اسم الخدمة', sortable: true },
    { 
      key: 'category', 
      label: 'القسم',
      sortable: true,
      render: (cat) => cat === 'safety' ? 'قسم السلامة' : 'قسم المقاولات'
    },
    { key: 'description', label: 'الوصف' }
  ];

  const handleAdd = () => {
    setEditingService(null);
    setFormData({ name: '', description: '', icon: '', image: null, category: 'contracting' });
    setIsModalOpen(true);
  };

  const handleEdit = (service) => {
    setEditingService(service);
    setFormData(service);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (service) => {
    setServiceToDelete(service);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!serviceToDelete) return;
    
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/services/${serviceToDelete.id}`, {
        method: 'DELETE',
        headers: {
          'x-auth-token': token
        }
      });

      if (response.ok) {
        setServices(services.filter(s => s.id !== serviceToDelete.id));
        setIsDeleteModalOpen(false);
        setServiceToDelete(null);
      } else if (response.status === 401) {
        alert('انتهت صلاحية الجلسة، يرجى تسجيل الدخول مرة أخرى.');
        logout();
      }
    } catch (err) {
      console.error('Error deleting service:', err);
      alert('حدث خطأ أثناء حذف الخدمة.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const method = editingService ? 'PUT' : 'POST';
    const url = editingService 
      ? `${API_URL}/services/${editingService.id}`
      : `${API_URL}/services`;

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        await fetchServices();
        setIsModalOpen(false);
        setFormData({ name: '', description: '', icon: '', image: null, category: 'contracting' });
      } else if (response.status === 401) {
        alert('انتهت صلاحية الجلسة، يرجى تسجيل الدخول مرة أخرى.');
        logout();
      }
    } catch (err) {
      console.error('Error saving service:', err);
      alert('حدث خطأ أثناء حفظ الخدمة.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image' && files && files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, [name]: reader.result }));
      };
      reader.readAsDataURL(files[0]);
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#1a2332]">إدارة الخدمات</h2>
          <p className="text-gray-600 mt-1">إضافة وتعديل وحذف الخدمات</p>
        </div>
        <button
          onClick={handleAdd}
          className="dashboard-btn dashboard-btn-primary flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          إضافة خدمة جديدة
        </button>
      </div>

      {/* Services Table */}
      {loading ? (
        <div className="flex items-center justify-center p-20 bg-white rounded-2xl shadow-sm">
          <Loader2 className="w-10 h-10 text-orange-500 animate-spin" />
        </div>
      ) : (
        <DataTable
          columns={columns}
          data={services}
          onEdit={handleEdit}
          onDelete={handleDeleteClick}
        />
      )}

      {/* Add/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingService ? 'تعديل الخدمة' : 'إضافة خدمة جديدة'}
      >
        <form onSubmit={handleSubmit}>
          <FormInput
            label="اسم الخدمة"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="مثال: البناء والتشييد"
            required
          />

          <FormInput
            label="وصف الخدمة"
            name="description"
            type="textarea"
            value={formData.description}
            onChange={handleChange}
            placeholder="وصف تفصيلي للخدمة..."
            rows={4}
            required
          />

          <FormInput
            label="القسم"
            name="category"
            type="select"
            value={formData.category}
            onChange={handleChange}
            options={[
              { value: 'contracting', label: 'قسم المقاولات' },
              { value: 'safety', label: 'قسم السلامة' }
            ]}
            required
          />

          <div className="space-y-2 mb-6">
            <label className="block text-sm font-bold text-gray-700">اختيار الأيقونة</label>
            <div className="grid grid-cols-10 gap-2 p-3 bg-gray-50 rounded-2xl border border-gray-100 max-h-[150px] overflow-y-auto">
              {commonEmojis.map(emoji => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, icon: emoji }))}
                  className={`text-2xl p-2 rounded-xl transition-all ${
                    formData.icon === emoji 
                      ? 'bg-orange-500 text-white scale-110 shadow-lg shadow-orange-500/30' 
                      : 'hover:bg-white hover:shadow-sm'
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-3 mt-2">
              <span className="text-sm text-gray-500">الأيقونة المختارة:</span>
              <span className="text-2xl bg-white w-12 h-12 flex items-center justify-center rounded-xl border border-orange-200 text-orange-600 font-bold shadow-sm">
                {formData.icon}
              </span>
            </div>
          </div>

          <FormInput
            label="صورة الخدمة"
            name="image"
            type="file"
            accept="image/*"
            onChange={handleChange}
          />

          <div className="flex items-center gap-3 mt-6">
            <button
              type="submit"
              className="dashboard-btn dashboard-btn-primary flex-1"
            >
              {editingService ? 'تحديث الخدمة' : 'إضافة الخدمة'}
            </button>
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="dashboard-btn dashboard-btn-outline flex-1"
            >
              إلغاء
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="تأكيد الحذف"
      >
        <div className="text-center py-6">
          <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertTriangle size={40} />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">هل أنت متأكد؟</h3>
          <p className="text-gray-600 mb-8 px-4">
            أنت على وشك حذف الخدمة <span className="font-bold text-red-600">"{serviceToDelete?.name}"</span>. 
            هذا الإجراء لا يمكن التراجع عنه.
          </p>
          <div className="flex items-center gap-3">
            <button
              onClick={confirmDelete}
              className="px-6 py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-colors flex-1 flex items-center justify-center gap-2"
            >
              <Trash2 size={18} />
              حذف الآن
            </button>
            <button
              onClick={() => setIsDeleteModalOpen(false)}
              className="px-6 py-3 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition-colors flex-1"
            >
              إلغاء
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ServicesManagement;
