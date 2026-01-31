import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

const FloatingScrollButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 50 }}
          onClick={scrollToTop}
          className="fixed bottom-10 right-10 z-[100] w-16 h-16 bg-primary-500 text-secondary-950 rounded-2xl shadow-2xl flex items-center justify-center hover:bg-secondary-950 hover:text-white transition-all transform hover:-translate-y-2 group"
          aria-label="Scroll to top"
        >
          <div className="absolute inset-0 bg-white/20 rounded-2xl scale-0 group-hover:scale-100 transition-transform duration-500"></div>
          <ArrowUp size={30} className="relative z-10" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default FloatingScrollButton;
