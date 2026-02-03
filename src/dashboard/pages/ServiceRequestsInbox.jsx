import React, { useState, useEffect } from 'react';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';
import { API_URL } from '../../config';
import { useAuth } from '../../context/AuthContext';
import { Loader2 } from 'lucide-react';

const ServiceRequestsInbox = () => {
  const { token, logout } = useAuth();
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRequests();
  }, []);

  useEffect(() => {
    if (activeFilter === 'all') {
      setFilteredRequests(requests);
    } else {
      setFilteredRequests(requests.filter(r => r.category === activeFilter));
    }
  }, [activeFilter, requests]);

  const fetchRequests = async () => {
    try {
      const response = await fetch(`${API_URL}/service-requests`, {
        headers: {
          'x-auth-token': token
        }
      });
      if (response.ok) {
        const data = await response.json();
        const mappedData = data.map(r => ({ ...r, id: r._id }));
        setRequests(mappedData);
        setFilteredRequests(mappedData);
      } else if (response.status === 401) {
        logout();
      }
    } catch (err) {
      console.error('Error fetching requests:', err);
    } finally {
      setLoading(false);
    }
  };

  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const columns = [
    { key: 'fullName', label: 'الاسم الكامل', sortable: true },
    { 
      key: 'category', 
      label: 'القسم',
      render: (cat) => cat === 'safety' ? 'السلامة' : (cat === 'contracting' ? 'المقاولات' : '-')
    },
    { key: 'mobile', label: 'رقم الجوال' },
    { key: 'serviceType', label: 'نوع الخدمة' },
    { key: 'city', label: 'المدينة' },
    { key: 'date', label: 'التاريخ', sortable: true },
    { 
      key: 'status', 
      label: 'الحالة',
      render: (status) => (
        <span className={`dashboard-badge ${
          status === 'جديد' ? 'badge-info' : 
          status === 'قيد المراجعة' ? 'badge-warning' : 
          'badge-success'
        }`}>
          {status}
        </span>
      )
    }
  ];

  const handleView = (request) => {
    setSelectedRequest(request);
    setIsModalOpen(true);
  };

  const handleStatusChange = async (newStatus) => {
    try {
      const response = await fetch(`${API_URL}/service-requests/${selectedRequest.id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (response.ok) {
        setRequests(requests.map(r => 
          r.id === selectedRequest.id ? { ...r, status: newStatus } : r
        ));
        setSelectedRequest({ ...selectedRequest, status: newStatus });
      } else if (response.status === 401) {
        alert('انتهت صلاحية الجلسة، يرجى تسجيل الدخول مرة أخرى.');
        logout();
      }
    } catch (err) {
      console.error('Error updating status:', err);
      alert('حدث خطأ أثناء تحديث الحالة.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-[#1a2332]">طلبات الخدمات</h2>
        <p className="text-gray-600 mt-1">جميع طلبات الخدمات الواردة من العملاء</p>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => setActiveFilter('all')}
          className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${
            activeFilter === 'all'
              ? 'bg-[#1a2332] text-white shadow-lg'
              : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-100'
          }`}
        >
          الكل
        </button>
        <button
          onClick={() => setActiveFilter('contracting')}
          className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${
            activeFilter === 'contracting'
              ? 'bg-blue-600 text-white shadow-lg'
              : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-100'
          }`}
        >
          قسم المقاولات
        </button>
        <button
          onClick={() => setActiveFilter('safety')}
          className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${
            activeFilter === 'safety'
              ? 'bg-orange-600 text-white shadow-lg'
              : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-100'
          }`}
        >
          قسم السلامة
        </button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="dashboard-card p-4">
          <p className="text-gray-600 text-sm">طلبات جديدة</p>
          <p className="text-2xl font-bold text-blue-600">
            {requests.filter(r => r.status === 'جديد').length}
          </p>
        </div>
        <div className="dashboard-card p-4">
          <p className="text-gray-600 text-sm">قيد المراجعة</p>
          <p className="text-2xl font-bold text-orange-600">
            {requests.filter(r => r.status === 'قيد المراجعة').length}
          </p>
        </div>
        <div className="dashboard-card p-4">
          <p className="text-gray-600 text-sm">مكتملة</p>
          <p className="text-2xl font-bold text-green-600">
            {requests.filter(r => r.status === 'مكتمل').length}
          </p>
        </div>
      </div>

      {/* Requests Table */}
      <div className="dashboard-card">
        {loading ? (
          <div className="flex items-center justify-center p-20 bg-white rounded-2xl shadow-sm">
            <Loader2 className="w-10 h-10 text-orange-500 animate-spin" />
          </div>
        ) : (
          <DataTable
            columns={columns}
            data={filteredRequests}
            onEdit={handleView}
          />
        )}
      </div>

      {/* View Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="تفاصيل طلب الخدمة"
        size="lg"
      >
        {selectedRequest && (
          <div className="space-y-6">
            {/* Client Data */}
            <div>
              <h3 className="text-lg font-semibold text-[#1a2332] mb-3">بيانات العميل</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">الاسم الكامل</p>
                  <p className="font-semibold">{selectedRequest.fullName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">رقم الجوال</p>
                  <p className="font-semibold">{selectedRequest.mobile}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">البريد الإلكتروني</p>
                  <p className="font-semibold">{selectedRequest.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">التاريخ</p>
                  <p className="font-semibold">{selectedRequest.date}</p>
                </div>
              </div>
            </div>

            {/* Project Details */}
            <div className="border-t pt-4">
              <h3 className="text-lg font-semibold text-[#1a2332] mb-3">تفاصيل المشروع</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">نوع الخدمة</p>
                  <p className="font-semibold bg-blue-50 text-blue-700 px-3 py-2 rounded-lg inline-block">
                    {selectedRequest.serviceType} 
                    {selectedRequest.category && ` (${selectedRequest.category === 'safety' ? 'سلامة' : 'مقاولات'})`}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">المدينة</p>
                  <p className="font-semibold">{selectedRequest.city}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">الميزانية التقريبية (ريال)</p>
                  <p className="font-semibold">{selectedRequest.budget}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">المساحة (م²)</p>
                  <p className="font-semibold">{selectedRequest.area}</p>
                </div>
              </div>

              <div className="mt-4">
                <p className="text-sm text-gray-600 mb-2">وصف المشروع</p>
                <p className="bg-gray-100 p-4 rounded-lg">{selectedRequest.projectDescription}</p>
              </div>
            </div>

            {/* Status Management */}
            <div className="border-t pt-4">
              <p className="text-sm text-gray-600 mb-2">تغيير الحالة</p>
              <div className="flex gap-2">
                <button
                  onClick={() => handleStatusChange('جديد')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedRequest.status === 'جديد'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  جديد
                </button>
                <button
                  onClick={() => handleStatusChange('قيد المراجعة')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedRequest.status === 'قيد المراجعة'
                      ? 'bg-orange-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  قيد المراجعة
                </button>
                <button
                  onClick={() => handleStatusChange('مكتمل')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedRequest.status === 'مكتمل'
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  مكتمل
                </button>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ServiceRequestsInbox;
