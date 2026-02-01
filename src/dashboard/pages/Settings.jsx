import { Save, User, Lock, Loader2, CheckCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { API_URL } from '../../config';

const Settings = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password && password !== confirmPassword) {
            return setError('كلمات المرور غير متطابقة');
        }

        setLoading(true);
        setError('');
        setSuccess(false);

        try {
            const token = localStorage.getItem('adminToken');
            const response = await fetch(`${API_URL}/auth/settings`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token
                },
                body: JSON.stringify({ email: email || undefined, password: password || undefined })
            });

            const data = await response.json();

            if (response.ok) {
                // Refresh user info in context
                const userRes = await fetch(`${API_URL}/auth/me`, {
                    headers: { 'x-auth-token': token }
                });
                if (userRes.ok) {
                    const userData = await userRes.json();
                    login(token, userData);
                }

                setSuccess(true);
                setEmail('');
                setPassword('');
                setConfirmPassword('');
            } else {
                setError(data.msg || 'حدث خطأ أثناء التحديث');
            }
        } catch (err) {
            setError('حدث خطأ في الاتصال بالسيرفر');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">إعدادات الحساب</h2>
                        <p className="text-sm text-gray-500">تحديث البريد الإلكتروني وكلمة المرور للمدير</p>
                    </div>
                    {success && (
                        <div className="flex items-center gap-2 text-green-600 bg-green-50 px-4 py-2 rounded-lg">
                            <CheckCircle className="w-5 h-5" />
                            <span className="text-sm font-medium">تم التحديث بنجاح</span>
                        </div>
                    )}
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-8">
                    {error && (
                        <div className="p-4 bg-red-50 border-r-4 border-red-500 text-red-700 text-sm">
                            {error}
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Email Section */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">تغيير البريد الإلكتروني</h3>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">البريد الإلكتروني الجديد</label>
                                <div className="relative">
                                    <User className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
                                    <input 
                                        type="email" 
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full pr-10 pl-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all font-medium"
                                        placeholder="اتركه فارغاً إذا لا تريد تغييره"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Password Section */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">تغيير كلمة المرور</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">كلمة المرور الجديدة</label>
                                    <div className="relative">
                                        <Lock className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
                                        <input 
                                            type="password" 
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="w-full pr-10 pl-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                                            placeholder="••••••••"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">تأكيد كلمة المرور</label>
                                    <div className="relative">
                                        <Lock className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
                                        <input 
                                            type="password" 
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            className="w-full pr-10 pl-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                                            placeholder="••••••••"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pt-6 border-t border-gray-100 flex justify-end">
                        <button 
                            type="submit"
                            disabled={loading}
                            className="bg-[#1a2332] hover:bg-[#2a3442] text-white px-8 py-3 rounded-xl font-bold shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                        >
                            {loading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <>
                                    <Save className="w-5 h-5" />
                                    <span>حفظ التغييرات</span>
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
            
            <div className="bg-orange-50 rounded-2xl p-6 border border-orange-100">
                <div className="flex gap-4">
                    <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center shrink-0 shadow-lg shadow-orange-500/20">
                        <Lock className="text-white w-6 h-6" />
                    </div>
                    <div>
                        <h4 className="text-orange-900 font-bold mb-1">نصيحة أمان</h4>
                        <p className="text-orange-700/80 text-sm leading-relaxed">
                            تأكد من اختيار كلمة مرور قوية تحتوي على أحرف وأرقام ورموز. لا تشارك بيانات الدخول مع أي شخص آخر للحفاظ على أمان موقعك.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
