import React, { useState, useEffect, useRef } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { Menu, Bell, Search, Info } from 'lucide-react';
import '../styles/dashboard.css';
import { API_URL } from '../../config';
import { useAuth } from '../../context/AuthContext';

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [stats, setStats] = useState({
    counts: {
        newApplications: 0,
        newServiceRequests: 0,
        newContactMessages: 0
    },
    recentActivity: []
  });
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationRef = useRef(null);
  
  const location = useLocation();
  const navigate = useNavigate();
  const { token, logout } = useAuth();

  // Close notifications on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Fetch stats for badges and notifications
  useEffect(() => {
      const fetchStats = async () => {
          try {
            const response = await fetch(`${API_URL}/dashboard/stats`, {
                headers: { 'x-auth-token': token }
            });
            if (response.ok) {
                const data = await response.json();
                setStats(data);
            } else if (response.status === 401) {
                logout();
                navigate('/admin/login');
            }
          } catch (error) {
              console.error("Error fetching layout stats:", error);
          }
      };

      fetchStats();
      // Optional: Poll every 60 seconds
      const interval = setInterval(fetchStats, 60000);
      return () => clearInterval(interval);
  }, [token, logout, navigate]);

  // Get page title based on route
  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/admin') return 'لوحة التحكم';
    if (path.includes('/services')) return 'إدارة الخدمات';
    if (path.includes('/projects')) return 'إدارة المشاريع';
    if (path.includes('/jobs')) return 'إدارة الوظائف';
    if (path.includes('/testimonials')) return 'آراء العملاء';
    if (path.includes('/service-requests')) return 'طلبات الخدمات';
    if (path.includes('/job-applications')) return 'طلبات التوظيف';
    if (path.includes('/contact-messages')) return 'رسائل اتصل بنا';
    if (path.includes('/settings')) return 'إعدادات الحساب';
    return 'لوحة التحكم';
  };

  const totalNewNotifications = stats.counts.newApplications + stats.counts.newServiceRequests + stats.counts.newContactMessages;

  return (
    <div className="min-h-screen bg-[#f8f9fa]" dir="rtl">
      {/* Sidebar - Pass stats for badges */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} stats={stats} />

      {/* Main Content */}
      <div className="lg:mr-72 min-h-screen">
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
          <div className="px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              {/* Left Side */}
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <Menu className="w-6 h-6" />
                </button>
                <div>
                  <h1 className="text-2xl font-bold text-[#1a2332]">{getPageTitle()}</h1>
                  <p className="text-sm text-gray-500 mt-1">
                    مرحباً بك في لوحة التحكم
                  </p>
                </div>
              </div>

              {/* Right Side */}
              <div className="flex items-center gap-4">
                {/* Search Bar */}
                <div className="hidden md:flex items-center gap-2 bg-gray-100 rounded-lg px-4 py-2 w-64">
                  <Search className="w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="بحث..."
                    className="bg-transparent border-none outline-none text-sm w-full"
                  />
                </div>

                {/* Notifications */}
                <div className="relative" ref={notificationRef}>
                    <button 
                        onClick={() => setShowNotifications(!showNotifications)}
                        className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                    <Bell className="w-6 h-6" />
                    {totalNewNotifications > 0 && (
                        <span className="absolute top-1 right-1 w-2 h-2 bg-[#ff6b35] rounded-full animate-pulse"></span>
                    )}
                    </button>

                    {/* Notification Dropdown */}
                    {showNotifications && (
                        <div className="absolute left-0 mt-3 w-80 bg-white rounded-xl shadow-xl border border-gray-100 z-50 overflow-hidden">
                            <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                                <h3 className="font-bold text-gray-800">الإشعارات</h3>
                                <span className="bg-[#ff6b35] text-white text-xs px-2 py-0.5 rounded-full">{totalNewNotifications} جديد</span>
                            </div>
                            <div className="max-h-80 overflow-y-auto dashboard-scrollbar">
                                {stats.recentActivity && stats.recentActivity.length > 0 ? (
                                    stats.recentActivity.map((activity, index) => (
                                        <div key={index} className="p-3 border-b border-gray-50 hover:bg-gray-50 transition-colors flex gap-3 items-start">
                                            <div className={`mt-1 min-w-[8px] h-2 rounded-full ${
                                                activity.type === 'service_request' ? 'bg-blue-500' :
                                                activity.type === 'job_application' ? 'bg-green-500' :
                                                activity.type === 'contact' ? 'bg-orange-500' : 'bg-purple-500'
                                            }`} />
                                            <div>
                                                <p className="text-sm text-gray-800 font-medium leading-tight mb-1">{activity.message}</p>
                                                <p className="text-xs text-gray-400" dir="ltr">
                                                    {new Date(activity.time).toLocaleTimeString('ar-SA', { hour: '2-digit', minute:'2-digit' })}
                                                </p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="p-6 text-center text-gray-400 flex flex-col items-center">
                                        <Info className="w-8 h-8 mb-2 opacity-50" />
                                        <p className="text-sm">لا توجد إشعارات حديثة</p>
                                    </div>
                                )}
                            </div>
                            <div className="p-3 bg-gray-50 text-center border-t border-gray-100">
                                <button onClick={() => navigate('/admin')} className="text-xs font-bold text-primary-600 hover:text-primary-700">
                                    عرض كل النشاطات
                                </button>
                            </div>
                        </div>
                    )}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
