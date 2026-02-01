import React, { useState, useEffect } from 'react';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';
import FormInput from '../components/FormInput';
import { Plus, X, Upload, Loader2, AlertCircle } from 'lucide-react';
import { API_URL } from '../../config';
import { useAuth } from '../../context/AuthContext';

const ProjectsManagement = () => {
  const { token, logout } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch(`${API_URL}/projects`);
      const data = await response.json();
      if (response.ok) {
        // Map backend fields back to frontend naming if needed
        const mappedData = data.map(p => ({
          ...p,
          id: p._id, // Use MongoDB _id
          name: p.title,
          sector: p.category,
          executionYear: p.year,
          totalArea: p.area,
          technicalFeatures: p.features || []
        }));
        setProjects(mappedData);
      }
    } catch (err) {
      console.error('Error fetching projects:', err);
    } finally {
      setLoading(false);
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);
  const [editingProject, setEditingProject] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    sector: '',
    description: '',
    client: '',
    executionYear: new Date().getFullYear().toString(),
    totalArea: '',
    location: '',
    technicalFeatures: [''],
    images: []
  });

  const columns = [
    { key: 'name', label: 'اسم المشروع', sortable: true },
    { key: 'sector', label: 'نوع القطاع', sortable: true },
    { key: 'client', label: 'العميل' },
    { key: 'location', label: 'الموقع' },
    { key: 'executionYear', label: 'سنة التنفيذ', sortable: true },
    { 
      key: 'totalArea', 
      label: 'المساحة',
      render: (area) => `${area} م²`
    }
  ];

  const handleAdd = () => {
    setEditingProject(null);
    setFormData({
      name: '',
      sector: '',
      description: '',
      client: '',
      executionYear: new Date().getFullYear().toString(),
      totalArea: '',
      location: '',
      technicalFeatures: [''],
      images: []
    });
    setIsModalOpen(true);
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setFormData({
      ...project,
      technicalFeatures: project.technicalFeatures.length > 0 ? project.technicalFeatures : ['']
    });
    setIsModalOpen(true);
  };

  const handleDeleteClick = (project) => {
    setProjectToDelete(project);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!projectToDelete) return;
    
    setLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_URL}/projects/${projectToDelete.id}`, {
        method: 'DELETE',
        headers: {
          'x-auth-token': token
        }
      });
      if (response.ok) {
        setProjects(projects.filter(p => p.id !== projectToDelete.id));
        setIsDeleteModalOpen(false);
        setProjectToDelete(null);
      } else if (response.status === 401) {
        alert('انتهت صلاحية الجلسة، يرجى تسجيل الدخول مرة أخرى.');
        logout();
      } else {
        const errorData = await response.json();
        alert(errorData.msg || 'حدث خطأ أثناء حذف المشروع.');
      }
    } catch (err) {
      console.error('Error deleting project:', err);
      alert('حدث خطأ أثناء حذف المشروع.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const cleanedFeatures = formData.technicalFeatures.filter(f => f.trim() !== '');
    
    // Map frontend fields to backend
    const projectData = {
      title: formData.name,
      category: formData.sector,
      description: formData.description,
      client: formData.client,
      year: formData.executionYear,
      area: formData.totalArea,
      location: formData.location,
      features: cleanedFeatures,
      images: formData.images || []
    };

    try {
      const token = localStorage.getItem('adminToken');
      const url = editingProject 
        ? `${API_URL}/projects/${editingProject.id}`
        : `${API_URL}/projects`;
      
      const method = editingProject ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token
        },
        body: JSON.stringify(projectData)
      });

      if (response.ok) {
        await fetchProjects();
        setIsModalOpen(false);
      } else if (response.status === 401) {
        alert('انتهت صلاحية الجلسة، يرجى تسجيل الدخول مرة أخرى.');
        logout();
      } else {
        const errorData = await response.json();
        alert(errorData.msg || 'حدث خطأ أثناء حفظ المشروع.');
      }
    } catch (err) {
      console.error('Error saving project:', err);
      alert('حدث خطأ في الاتصال بالسيرفر.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFeatureChange = (index, value) => {
    const newFeatures = [...formData.technicalFeatures];
    newFeatures[index] = value;
    setFormData(prev => ({ ...prev, technicalFeatures: newFeatures }));
  };

  const addFeature = () => {
    setFormData(prev => ({
      ...prev,
      technicalFeatures: [...prev.technicalFeatures, '']
    }));
  };

  const removeFeature = (index) => {
    if (formData.technicalFeatures.length > 1) {
      const newFeatures = formData.technicalFeatures.filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, technicalFeatures: newFeatures }));
    }
  };

  const compressImage = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;

          // Max dimensions
          const MAX_WIDTH = 1200;
          const MAX_HEIGHT = 800;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);

          // Get base64 at 0.7 quality
          const dataUrl = canvas.toDataURL('image/jpeg', 0.7);
          resolve(dataUrl);
        };
      };
    });
  };

  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files || files.length === 0) return;

    setLoading(true);
    try {
      const base64Images = await Promise.all(files.map(file => compressImage(file)));
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...base64Images]
      }));
    } catch (err) {
      console.error('Error uploading files:', err);
      alert('حدث خطأ أثناء معالجة الصور.');
    } finally {
      setLoading(false);
      e.target.value = '';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#1a2332]">إدارة المشاريع</h2>
          <p className="text-gray-600 mt-1">إضافة وتعديل وحذف المشاريع</p>
        </div>
        <button
          onClick={handleAdd}
          className="dashboard-btn dashboard-btn-primary flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          إضافة مشروع جديد
        </button>
      </div>

      {/* Projects Table */}
      {loading ? (
        <div className="flex items-center justify-center p-20 bg-white rounded-2xl shadow-sm">
          <Loader2 className="w-10 h-10 text-orange-500 animate-spin" />
        </div>
      ) : (
        <DataTable
          columns={columns}
          data={projects}
          onEdit={handleEdit}
          onDelete={handleDeleteClick}
        />
      )}

      {/* Add/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingProject ? 'تعديل المشروع' : 'إضافة مشروع جديد'}
        size="lg"
      >
        <form onSubmit={handleSubmit}>
          {/* Basic Info */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-[#1a2332] mb-4">المعلومات الأساسية</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput
                label="اسم المشروع"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="مثال: برج الأعمال التجاري"
                required
              />

              <FormInput
                label="نوع القطاع"
                name="sector"
                type="select"
                value={formData.sector}
                onChange={handleChange}
                options={[
                  { value: 'سكني', label: 'سكني' },
                  { value: 'تجاري', label: 'تجاري' },
                  { value: 'صناعي', label: 'صناعي' },
                  { value: 'حكومي', label: 'حكومي' },
                  { value: 'تعليمي', label: 'تعليمي' },
                  { value: 'صحي', label: 'صحي' }
                ]}
                required
              />
            </div>

            <FormInput
              label="وصف المشروع"
              name="description"
              type="textarea"
              value={formData.description}
              onChange={handleChange}
              placeholder="وصف تفصيلي للمشروع..."
              rows={4}
              required
            />
          </div>

          {/* Project Specifications */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-[#1a2332] mb-4">مواصفات المشروع</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput
                label="العميل المستفيد"
                name="client"
                value={formData.client}
                onChange={handleChange}
                placeholder="مثال: شركة الاستثمار العقاري"
                required
              />

              <FormInput
                label="سنة التنفيذ"
                name="executionYear"
                type="number"
                value={formData.executionYear}
                onChange={handleChange}
                required
              />

              <FormInput
                label="المساحة الإجمالية (م²)"
                name="totalArea"
                type="number"
                value={formData.totalArea}
                onChange={handleChange}
                placeholder="مثال: 15000"
                required
              />

              <FormInput
                label="الموقع"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="مثال: الرياض"
                required
              />
            </div>
          </div>

          {/* Technical Features */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-[#1a2332]">المميزات التقنية</h3>
              <button
                type="button"
                onClick={addFeature}
                className="text-sm text-[#ff6b35] hover:text-[#e55a2b] font-medium flex items-center gap-1"
              >
                <Plus className="w-4 h-4" />
                إضافة ميزة
              </button>
            </div>
            <div className="space-y-3">
              {formData.technicalFeatures.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={feature}
                    onChange={(e) => handleFeatureChange(index, e.target.value)}
                    placeholder="مثال: نظام إدارة المباني الذكي"
                    className="dashboard-input flex-1"
                  />
                  {formData.technicalFeatures.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeFeature(index)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Images Section */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-[#1a2332] mb-4">صور المشروع</h3>
            <div className="flex flex-col gap-4 p-5 bg-gray-50 rounded-2xl border border-gray-100">
              <div className="flex flex-wrap items-center gap-4">
                {/* File Upload Button */}
                <div className="relative">
                  <input
                    type="file"
                    id="fileUploadInput"
                    multiple
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileUpload}
                  />
                  <button
                    type="button"
                    onClick={() => document.getElementById('fileUploadInput').click()}
                    className="flex items-center gap-2 px-6 py-3 bg-white text-primary-600 border-2 border-primary-100 rounded-xl hover:bg-primary-50 hover:border-primary-500 transition-all text-sm font-black shadow-sm"
                  >
                    <Upload className="w-5 h-5" />
                    رفع صور من الجهاز
                  </button>
                </div>

                <div className="hidden md:block h-10 w-px bg-gray-200"></div>

                {/* URL Input */}
                <div className="flex flex-1 gap-2">
                  <input
                    type="text"
                    id="imageUrlInput"
                    placeholder="أو أدخل رابط الصورة هنا..."
                    className="dashboard-input text-sm py-2.5 flex-1"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        const val = e.target.value.trim();
                        if (val) {
                          setFormData(prev => ({ ...prev, images: [...prev.images, val] }));
                          e.target.value = '';
                        }
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const input = document.getElementById('imageUrlInput');
                      const val = input.value.trim();
                      if (val) {
                        setFormData(prev => ({ ...prev, images: [...prev.images, val] }));
                        input.value = '';
                      }
                    }}
                    className="bg-primary-500 text-white p-3 rounded-xl hover:bg-primary-600 transition-colors shadow-lg shadow-primary-500/20"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-6 p-4 bg-white rounded-xl border-2 border-dashed border-gray-100">
              {formData.images.length === 0 ? (
                <div className="col-span-full py-8 text-center text-gray-400">
                  <Upload className="w-8 h-8 mx-auto mb-2 opacity-20" />
                  <p className="text-sm">لم يتم إضافة صور بعد</p>
                </div>
              ) : (
                formData.images.map((img, index) => (
                  <div key={index} className="relative group aspect-video rounded-lg overflow-hidden border border-gray-200 bg-white">
                    <img src={img} alt={`Preview ${index}`} className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => {
                        const newImages = formData.images.filter((_, i) => i !== index);
                        setFormData(prev => ({ ...prev, images: newImages }));
                      }}
                      className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="flex items-center gap-3 mt-6 pt-6 border-t">
            <button
              type="submit"
              className="dashboard-btn dashboard-btn-primary flex-1"
            >
              {editingProject ? 'تحديث المشروع' : 'إضافة المشروع'}
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
        size="md"
      >
        <div className="p-6 text-center">
          <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <X className="w-10 h-10" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">هل أنت متأكد من حذف المشروع؟</h3>
          <p className="text-gray-500 mb-8">
            سيتم حذف المشروع <span className="font-bold text-gray-900">"{projectToDelete?.name}"</span> نهائياً. لا يمكن التراجع عن هذا الإجراء.
          </p>
          <div className="flex gap-4">
            <button
              onClick={confirmDelete}
              disabled={loading}
              className="flex-1 py-3 bg-red-500 text-white rounded-xl font-bold hover:bg-red-600 transition-colors disabled:opacity-50"
            >
              {loading ? 'جاري الحذف...' : 'نعم، احذف المشروع'}
            </button>
            <button
              onClick={() => setIsDeleteModalOpen(false)}
              disabled={loading}
              className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition-colors disabled:opacity-50"
            >
              إلغاء
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ProjectsManagement;
