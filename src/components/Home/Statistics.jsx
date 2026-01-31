import React from 'react';
import { motion } from 'framer-motion';
import { Users, Building2, Trophy, Clock } from 'lucide-react';

const Statistics = () => {
  const stats = [
    { 
      id: 1, 
      number: '+15', 
      label: 'عاماً من التميز',
      icon: Clock,
    },
    { 
      id: 2, 
      number: '+500', 
      label: 'مشروع ناجح',
      icon: Building2,
    },
    { 
      id: 3, 
      number: '+50', 
      label: 'جائزة محلية',
      icon: Trophy,
    },
    { 
      id: 4, 
      number: '+120', 
      label: 'خبير ومهندس',
      icon: Users,
    },
  ];

  return (
    <section className="py-16 bg-gray-50 relative overflow-hidden border-b border-gray-100">
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative bg-white rounded-3xl p-8 md:p-12 border-2 border-gray-100 shadow-2xl overflow-hidden"
        >
          {/* Professional Background Pattern */}
          <div className="absolute inset-0 opacity-[0.03]">
            <div className="absolute top-0 right-0 w-96 h-96 bg-secondary-900 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary-500 rounded-full blur-3xl"></div>
          </div>
          
          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.02]"></div>
          
          {/* Decorative Lines */}
          <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-secondary-900 via-primary-500 to-secondary-900 opacity-20"></div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary-500 to-transparent opacity-20"></div>

          <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center group relative"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-secondary-900 flex items-center justify-center text-white shadow-lg group-hover:bg-primary-500 group-hover:scale-110 transition-all duration-300">
                  <stat.icon size={24} strokeWidth={2} />
                </div>
                
                <h3 className="text-4xl font-black text-secondary-900 mb-2 group-hover:text-primary-600 transition-colors duration-300">
                  {stat.number}
                </h3>
                
                <p className="text-gray-600 font-bold text-sm">
                  {stat.label}
                </p>
                
                {index < stats.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 left-full w-px h-16 bg-gradient-to-b from-transparent via-gray-200 to-transparent transform -translate-y-1/2 -translate-x-4"></div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Statistics;
