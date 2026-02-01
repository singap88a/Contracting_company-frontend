import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Briefcase, 
  FolderKanban, 
  Users, 
  MessageSquare,
  Mail,
  UserCheck,
  Star,
  Settings as SettingsIcon,
  LogOut,
  X
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Sidebar = ({ isOpen, onClose }) => {
  const menuSections = [
    {
      title: 'لوحة التحكم',
      items: [
        { path: '/admin', icon: LayoutDashboard, label: 'الرئيسية', exact: true }
      ]
    },
    {
      title: 'إدارة المحتوى',
      items: [
        { path: '/admin/services', icon: Briefcase, label: 'الخدمات' },
        { path: '/admin/projects', icon: FolderKanban, label: 'المشاريع' },
        { path: '/admin/jobs', icon: Users, label: 'الوظائف' },
        { path: '/admin/testimonials', icon: Star, label: 'آراء العملاء' }
      ]
    },
    {
      title: 'صندوق الوارد',
      items: [
        { path: '/admin/service-requests', icon: MessageSquare, label: 'طلبات الخدمات' },
        { path: '/admin/job-applications', icon: UserCheck, label: 'طلبات التوظيف' },
        { path: '/admin/contact-messages', icon: Mail, label: 'رسائل اتصل بنا' }
      ]
    },
    {
      title: 'النظام',
      items: [
        { path: '/admin/settings', icon: SettingsIcon, label: 'الإعدادات' }
      ]
    }
  ];

  const navigate = useNavigate();

  const { logout, user } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`
          fixed top-0 right-0 h-full bg-gradient-to-b from-[#1a2332] to-[#2a3442] 
          w-72 z-50 transform transition-transform duration-300 ease-in-out
          lg:translate-x-0 shadow-2xl flex flex-col
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        {/* Header */}
        <div className="p-6 border-b border-white/10 shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#ff6b35] to-[#e55a2b] rounded-lg flex items-center justify-center">
                <LayoutDashboard className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-white font-bold text-lg">لوحة التحكم</h2>
                <p className="text-gray-400 text-xs">إدارة الموقع</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="lg:hidden text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 overflow-y-auto flex-1 dashboard-scrollbar">
          {menuSections.map((section, idx) => (
            <div key={idx} className="mb-6">
              <h3 className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-3 px-3">
                {section.title}
              </h3>
              <div className="space-y-1">
                {section.items.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.exact}
                    onClick={() => window.innerWidth < 1024 && onClose()}
                    className={({ isActive }) => `
                      flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200
                      ${isActive 
                        ? 'bg-gradient-to-r from-[#ff6b35] to-[#e55a2b] text-white shadow-lg shadow-orange-500/30' 
                        : 'text-gray-300 hover:bg-white/5 hover:text-white'
                      }
                    `}
                  >
                    {({ isActive }) => (
                      <>
                        <item.icon className={`w-5 h-5 ${isActive ? 'animate-pulse' : ''}`} />
                        <span className="font-medium">{item.label}</span>
                      </>
                    )}
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-white/10 bg-[#1a2332] shrink-0">
          <div className="flex items-center gap-3 px-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#ff6b35] to-[#e55a2b] rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-white font-medium text-sm truncate">المسؤول</p>
              <p className="text-gray-400 text-xs truncate" title={user?.email || 'تحميل...'}>
                {user?.email || 'admin@company.com'}
              </p>
            </div>
            <button 
              onClick={handleLogout}
              className="p-2 text-gray-400 hover:text-red-500 transition-colors"
              title="تسجيل الخروج"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
