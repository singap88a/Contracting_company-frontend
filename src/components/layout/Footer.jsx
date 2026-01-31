import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, MapPin, Phone, Mail, ArrowRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-secondary-900 text-white pt-10 pb-5 mt-auto">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                C
              </div>
              <span className="text-2xl font-bold">شركة المقاولات</span>
            </div>
            <p className="text-gray-400 leading-relaxed mb-6">
              نحن شركة رائدة في مجال المقاولات والبناء، نسعى دائماً لتقديم أفضل الخدمات بجودة عالية واحترافية تامة لتحقيق رؤية عملائنا.
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-primary-500 hover:text-white transition-all duration-300"
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-primary-500">روابط سريعة</h3>
            <ul className="space-y-4">
              {[
                { name: 'الرئيسية', path: '/' },
                { name: 'من نحن', path: '/about' },
                { name: 'خدماتنا', path: '/services' },
                { name: 'المشاريع', path: '/projects' },
                { name: 'الوظائف', path: '/careers' },
                { name: 'تواصل معنا', path: '/contact' },
              ].map((link) => (
                <li key={link.path}>
                  <Link 
                    to={link.path}
                    className="text-gray-400 hover:text-primary-500 transition-colors flex items-center gap-2 group"
                  >
                    <ArrowRight size={16} className="text-primary-500 opacity-0 group-hover:opacity-100 transition-all -mr-4 group-hover:mr-0" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-primary-500">خدماتنا</h3>
            <ul className="space-y-4">
              {[
                'التصميم المعماري',
                'البناء والتشييد',
                'التصميم الداخلي',
                'ادارة المشاريع',
                'تنسيق الحدائق',
                'ترميم المباني'
              ].map((service, i) => (
                <li key={i}>
                  <Link to="/services" className="text-gray-400 hover:text-primary-500 transition-colors">
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-primary-500">معلومات التواصل</h3>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary-500/10 flex items-center justify-center flex-shrink-0 text-primary-500">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="font-bold mb-1">العنوان</h4>
                  <p className="text-gray-400 text-sm">شارع التخصصي، الرياض، المملكة العربية السعودية</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary-500/10 flex items-center justify-center flex-shrink-0 text-primary-500">
                  <Phone size={20} />
                </div>
                <div>
                  <h4 className="font-bold mb-1">الهاتف</h4>
                  <p className="text-gray-400 text-sm" dir="ltr">+966 11 234 5678</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary-500/10 flex items-center justify-center flex-shrink-0 text-primary-500">
                  <Mail size={20} />
                </div>
                <div>
                  <h4 className="font-bold mb-1">البريد الإلكتروني</h4>
                  <p className="text-gray-400 text-sm">info@contracting-co.com</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} جميع الحقوق محفوظة لشركة المقاولات
          </p>
          <div className="flex gap-6 text-sm text-gray-500">
            <Link to="/privacy" className="hover:text-primary-500 transition-colors">سياسة الخصوصية</Link>
            <Link to="/terms" className="hover:text-primary-500 transition-colors">الشروط والأحكام</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
