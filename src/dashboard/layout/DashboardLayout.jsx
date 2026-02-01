import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { Menu, Bell, Search } from 'lucide-react';
import '../styles/dashboard.css';

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

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

  return (
    <div className="min-h-screen bg-[#f8f9fa]" dir="rtl">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

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
                <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                  <Bell className="w-6 h-6" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-[#ff6b35] rounded-full"></span>
                </button>
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
