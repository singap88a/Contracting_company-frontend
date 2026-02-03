import React, { useState, useEffect } from 'react';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';
import FormInput from '../components/FormInput';
import { Plus, X, Loader2, Trash2, AlertTriangle } from 'lucide-react';
import { API_URL } from '../../config';
import { useAuth } from '../../context/AuthContext';

const JobsManagement = () => {
  const { token, logout } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [jobToDelete, setJobToDelete] = useState(null);
  const [editingJob, setEditingJob] = useState(null);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    requirements: [''],
    location: '',
    type: 'Full-time',
    status: 'Open'
  });

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await fetch(`${API_URL}/jobs`);
      if (response.ok) {
        const data = await response.json();
        setJobs(data.map(j => ({ ...j, id: j._id })));
      }
    } catch (err) {
      console.error('Error fetching jobs:', err);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { key: 'title', label: 'العنوان', sortable: true },
    { key: 'location', label: 'الموقع', sortable: true },
    { 
      key: 'type', 
      label: 'نوع الدوام',
      render: (type) => {
        const types = {
          'Full-time': 'دوام كامل',
          'Part-time': 'دوام جزئي',
          'Contract': 'عقد مشروع',
          'Internship': 'تدريب'
        };
        return types[type] || type;
      }
    },
    { 
      key: 'status', 
      label: 'الحالة',
      render: (status) => (
        <span className={`dashboard-badge ${status === 'Open' ? 'badge-success' : 'badge-danger'}`}>
          {status === 'Open' ? 'مفتوح' : 'مغلق'}
        </span>
      )
    }
  ];

  const handleAdd = () => {
    setEditingJob(null);
    setFormData({
      title: '',
      description: '',
      requirements: [''],
      location: '',
      type: 'Full-time',
      status: 'Open'
    });
    setIsModalOpen(true);
  };

  const handleEdit = (job) => {
    setEditingJob(job);
    setFormData({
      ...job,
      requirements: Array.isArray(job.requirements) && job.requirements.length > 0 ? job.requirements : ['']
    });
    setIsModalOpen(true);
  };

  const handleDeleteClick = (job) => {
    setJobToDelete(job);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!jobToDelete) return;
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/jobs/${jobToDelete.id}`, {
        method: 'DELETE',
        headers: { 'x-auth-token': token }
      });

      if (response.ok) {
        setJobs(jobs.filter(j => j.id !== jobToDelete.id));
        setIsDeleteModalOpen(false);
        setJobToDelete(null);
      } else if (response.status === 401) {
        logout();
      }
    } catch (err) {
      console.error('Error deleting job:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const method = editingJob ? 'PUT' : 'POST';
    const url = editingJob ? `${API_URL}/jobs/${editingJob.id}` : `${API_URL}/jobs`;

    const payload = {
      ...formData,
      requirements: formData.requirements.filter(r => r.trim() !== '')
    };

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        await fetchJobs();
        setIsModalOpen(false);
      } else if (response.status === 401) {
        logout();
      }
    } catch (err) {
      console.error('Error saving job:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRequirementChange = (index, value) => {
    const newReqs = [...formData.requirements];
    newReqs[index] = value;
    setFormData(prev => ({ ...prev, requirements: newReqs }));
  };

  const addRequirement = () => {
    setFormData(prev => ({
      ...prev,
      requirements: [...prev.requirements, '']
    }));
  };

  const removeRequirement = (index) => {
    if (formData.requirements.length > 1) {
      const newReqs = formData.requirements.filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, requirements: newReqs }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#1a2332]">إدارة الوظائف</h2>
          <p className="text-gray-600 mt-1">إضافة وتعديل وحذف الوظائف المتاحة</p>
        </div>
        <button
          onClick={handleAdd}
          className="dashboard-btn dashboard-btn-primary flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          إضافة وظيفة جديدة
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center p-20 bg-white rounded-2xl shadow-sm">
          <Loader2 className="w-10 h-10 text-orange-500 animate-spin" />
        </div>
      ) : (
        <DataTable
          columns={columns}
          data={jobs}
          onEdit={handleEdit}
          onDelete={handleDeleteClick}
        />
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingJob ? 'تعديل الوظيفة' : 'إضافة وظيفة جديدة'}
        size="lg"
      >
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              label="العنوان الوظيفي"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="مثال: مهندس مدني"
              required
            />
            <FormInput
              label="الموقع"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="مثال: الرياض، المملكة العربية السعودية"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              label="نوع الدوام"
              name="type"
              type="select"
              value={formData.type}
              onChange={handleChange}
              options={[
                { value: 'Full-time', label: 'دوام كامل' },
                { value: 'Part-time', label: 'دوام جزئي' },
                { value: 'Contract', label: 'عقد مشروع' },
                { value: 'Internship', label: 'تدريب' }
              ]}
              required
            />
            <FormInput
              label="حالة الوظيفة"
              name="status"
              type="select"
              value={formData.status}
              onChange={handleChange}
              options={[
                { value: 'Open', label: 'مفتوح' },
                { value: 'Closed', label: 'مغلق' }
              ]}
              required
            />
          </div>

          <FormInput
            label="الوصف الوظيفي"
            name="description"
            type="textarea"
            value={formData.description}
            onChange={handleChange}
            placeholder="وصف تفصيلي للوظيفة والمهام المطلوبة..."
            rows={4}
            required
          />

          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <label className="text-sm font-bold text-gray-700">المتطلبات الوظيفية</label>
              <button
                type="button"
                onClick={addRequirement}
                className="text-sm text-[#ff6b35] hover:text-[#e55a2b] font-medium flex items-center gap-1"
              >
                <Plus className="w-4 h-4" />
                إضافة متطلب
              </button>
            </div>
            <div className="space-y-3">
              {formData.requirements.map((req, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={req}
                    onChange={(e) => handleRequirementChange(index, e.target.value)}
                    placeholder="مثال: خبرة 5 سنوات في الهندسة المدنية"
                    className="dashboard-input flex-1"
                  />
                  {formData.requirements.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeRequirement(index)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3 mt-6">
            <button type="submit" className="dashboard-btn dashboard-btn-primary flex-1">
              {editingJob ? 'تحديث الوظيفة' : 'إضافة الوظيفة'}
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
            أنت على وشك حذف الوظيفة <span className="font-bold text-red-600">"{jobToDelete?.title}"</span>. 
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

export default JobsManagement;
