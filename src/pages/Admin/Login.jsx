import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, Mail, ArrowRight, Loader2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { API_URL } from '../../config';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok) {
                try {
                    // Fetch user info to store in context
                    const userRes = await fetch(`${API_URL}/auth/me`, {
                        headers: { 'x-auth-token': data.token }
                    });
                    
                    let userData = null;
                    if (userRes.ok) {
                        userData = await userRes.json();
                    }
                    
                    login(data.token, userData);
                    navigate('/admin');
                } catch (userErr) {
                    console.error('User info fetch error:', userErr);
                    // Fallback: login just with token if /me fails
                    login(data.token, null);
                    navigate('/admin');
                }
            } else {
                setError(data.msg || 'بيانات الدخول غير صحيحة');
            }
        } catch (err) {
            console.error('Login connection error:', err);
            setError('حدث خطأ في الاتصال بالسيرفر. تأكد من تشغيل السيرفر وعدم وجود تضارب في العمليات.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-4 font-cairo" dir="rtl">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md w-full bg-white rounded-2xl shadow-2xl overflow-hidden"
            >
                <div className="p-8">
                    <div className="text-center mb-10">
                        <div className="w-16 h-16 bg-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-orange-500/30">
                            <Lock className="text-white w-8 h-8" />
                        </div>
                        <h1 className="text-2xl font-bold text-slate-900 mb-2">تسجيل دخول المسؤول</h1>
                        <p className="text-slate-500">مرحباً بك مجدداً، يرجى إدخال بياناتك</p>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border-r-4 border-red-500 text-red-700 text-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">البريد الإلكتروني</label>
                            <div className="relative">
                                <Mail className="absolute right-3 top-3 w-5 h-5 text-slate-400" />
                                <input 
                                    type="email" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full pr-10 pl-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                                    placeholder="admin@example.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">كلمة المرور</label>
                            <div className="relative">
                                <Lock className="absolute right-3 top-3 w-5 h-5 text-slate-400" />
                                <input 
                                    type="password" 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="w-full pr-10 pl-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <button 
                            type="submit"
                            disabled={loading}
                            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl shadow-lg shadow-orange-500/25 transition-all flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <>
                                    <span>دخول</span>
                                    <ArrowRight className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>
                </div>
                
                <div className="px-8 py-4 bg-slate-50 border-t border-slate-100 text-center">
                    <p className="text-sm text-slate-500">فقدت كلمة المرور؟ اتصل بالدعم الفني</p>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
