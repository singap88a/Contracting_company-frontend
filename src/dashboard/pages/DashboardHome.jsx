import React, { useState, useEffect } from 'react';
import StatCard from '../components/StatCard';
import { Briefcase, FolderKanban, Users, MessageSquare, TrendingUp, Clock, Loader2 } from 'lucide-react';
import { API_URL } from '../../config';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

const DashboardHome = () => {
  const { token, logout } = useAuth();
  const [stats, setStats] = useState({
    counts: {
      projects: 0,
      services: 0,
      jobs: 0,
      applications: 0,
      serviceRequests: 0,
      contactMessages: 0,
      newApplications: 0,
      newServiceRequests: 0,
      newContactMessages: 0
    },
    recentActivity: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const response = await fetch(`${API_URL}/dashboard/stats`, {
        headers: { 'x-auth-token': token }
      });
      
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      } else if (response.status === 401) {
        logout();
      }
    } catch (err) {
      console.error('Error fetching dashboard stats:', err);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      icon: Briefcase,
      title: 'طلبات الخدمات',
      value: stats.counts.serviceRequests,
      change: `+${stats.counts.newServiceRequests} جديد`,
      changeType: 'increase',
      gradient: 'primary'
    },
    {
      icon: FolderKanban,
      title: 'المشاريع المنجزة',
      value: stats.counts.projects,
      change: 'إجمالي',
      changeType: 'neutral',
      gradient: 'secondary'
    },
    {
      icon: Users,
      title: 'طلبات التوظيف',
      value: stats.counts.applications,
      change: `+${stats.counts.newApplications} جديد`,
      changeType: 'increase',
      gradient: 'success'
    },
    {
      icon: MessageSquare,
      title: 'رسائل اتصل بنا',
      value: stats.counts.contactMessages,
      change: `+${stats.counts.newContactMessages} جديد`,
      changeType: 'increase',
      gradient: 'info'
    }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center p-20">
        <Loader2 className="w-10 h-10 text-orange-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-[#1a2332] to-[#2a3442] rounded-xl p-8 text-white shadow-lg">
        <h2 className="text-3xl font-bold mb-2">مرحباً بك في لوحة التحكم! 👋</h2>
        <p className="text-gray-300">إليك نظرة عامة شاملة على نشاط موقعك اليوم</p>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, idx) => (
          <StatCard key={idx} {...stat} />
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="dashboard-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-[#1a2332]">آخر النشاطات</h3>
            <Clock className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {stats.recentActivity.length > 0 ? (
              stats.recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors border-b border-gray-50 last:border-0">
                  <div className={`p-2 rounded-lg bg-gray-100 ${
                    activity.type === 'service_request' ? 'text-blue-600' :
                    activity.type === 'job_application' ? 'text-green-600' :
                    activity.type === 'contact' ? 'text-orange-600' :
                    'text-purple-600'
                  }`}>
                    {activity.type === 'service_request' ? <Briefcase className="w-5 h-5" /> :
                     activity.type === 'job_application' ? <Users className="w-5 h-5" /> :
                     activity.type === 'contact' ? <MessageSquare className="w-5 h-5" /> :
                     <FolderKanban className="w-5 h-5" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-gray-800">{activity.message}</p>
                    <p className="text-xs text-gray-500 mt-1" dir="ltr">
                      {new Date(activity.time).toLocaleString('ar-SA')}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 py-4">لا توجد نشاطات حديثة</p>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="dashboard-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-[#1a2332]">إجراءات سريعة</h3>
            <TrendingUp className="w-5 h-5 text-gray-400" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Link to="/admin/services" className="p-4 bg-gradient-to-br from-[#ff6b35] to-[#e55a2b] text-white rounded-xl hover:shadow-lg transition-all hover:scale-[1.02] flex flex-col items-center justify-center text-center">
              <Briefcase className="w-8 h-8 mb-2" />
              <p className="font-semibold">إدارة الخدمات</p>
            </Link>
            <Link to="/admin/projects" className="p-4 bg-gradient-to-br from-[#1a2332] to-[#2a3442] text-white rounded-xl hover:shadow-lg transition-all hover:scale-[1.02] flex flex-col items-center justify-center text-center">
              <FolderKanban className="w-8 h-8 mb-2" />
              <p className="font-semibold">إدارة المشاريع</p>
            </Link>
            <Link to="/admin/jobs" className="p-4 bg-gradient-to-br from-[#10b981] to-[#059669] text-white rounded-xl hover:shadow-lg transition-all hover:scale-[1.02] flex flex-col items-center justify-center text-center">
              <Users className="w-8 h-8 mb-2" />
              <p className="font-semibold">إدارة الوظائف</p>
            </Link>
            <Link to="/admin/contact-messages" className="p-4 bg-gradient-to-br from-[#3b82f6] to-[#2563eb] text-white rounded-xl hover:shadow-lg transition-all hover:scale-[1.02] flex flex-col items-center justify-center text-center">
              <MessageSquare className="w-8 h-8 mb-2" />
              <p className="font-semibold">رسائل العملاء</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
