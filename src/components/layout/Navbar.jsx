import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const links = [
    { name: 'الرئيسية', path: '/' },
    { name: 'من نحن', path: '/about' },
    { name: 'خدماتنا', path: '/services' },
    { name: 'مشاريعنا', path: '/projects' },
    { name: 'الوظائف', path: '/careers' },
    { name: 'اتصل بنا', path: '/contact' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100 py-4 transition-all duration-300">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 bg-secondary-900 rounded-xl flex items-center justify-center text-white font-black text-2xl shadow-lg shadow-secondary-900/20 group-hover:scale-105 transition-transform duration-300 relative overflow-hidden">
               <div className="absolute inset-0 bg-primary-500/20 rounded-xl"></div>
               <span className="relative z-10">C</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black leading-none text-secondary-900">
                شركة المقاولات
              </span>
              <span className="text-xs font-bold tracking-widest uppercase text-primary-600">
                للتعمير والإنشاء
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-4 py-2 rounded-lg text-base font-bold transition-all duration-300 ${
                  isActive(link.path)
                    ? 'text-white bg-secondary-900'
                    : 'text-gray-500 hover:text-secondary-900 hover:bg-gray-50'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-4">
             <Link 
              to="/request-service"
              className="group relative px-6 py-2.5 bg-primary-500 hover:bg-primary-600 text-white rounded-full font-bold shadow-lg shadow-primary-500/25 transition-all overflow-hidden active:scale-95"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              <span className="relative flex items-center gap-2 text-sm">
                 طلب عرض سعر
                 <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
              </span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-secondary-900 hover:bg-gray-50 rounded-lg transition-colors"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-100 overflow-hidden absolute top-full left-0 right-0 shadow-xl"
          >
            <div className="container mx-auto px-4 py-6 flex flex-col gap-2">
              {links.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`px-4 py-4 rounded-xl text-lg font-bold flex items-center justify-between transition-colors ${
                    isActive(link.path)
                      ? 'bg-secondary-900 text-white'
                      : 'text-gray-500 hover:bg-gray-50 hover:text-secondary-900'
                  }`}
                >
                  {link.name}
                  {isActive(link.path) && <div className="w-2 h-2 rounded-full bg-primary-500"></div>}
                </Link>
              ))}
              <div className="h-px bg-gray-100 my-4" />
              <Link
                to="/request-service"
                onClick={() => setIsOpen(false)}
                className="w-full text-center py-4 bg-primary-500 hover:bg-primary-600 text-white rounded-xl font-bold shadow-lg flex items-center justify-center gap-2 transition-colors"
              >
                طلب عرض سعر
                <ArrowLeft size={20} />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
