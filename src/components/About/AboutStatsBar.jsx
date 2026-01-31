import React from 'react';
import { motion } from 'framer-motion';
import { Users, Briefcase, Award, HardHat } from 'lucide-react';

const AboutStatsBar = () => {
  const stats = [
    { number: "10K+", label: "عميل سعيد", icon: <Users className="w-6 h-6" /> },
    { number: "15+", label: "سنوات خبرة", icon: <Briefcase className="w-6 h-6" /> },
    { number: "25+", label: "جائزة جودة", icon: <Award className="w-6 h-6" /> },
    { number: "50+", label: "مهندس متخصص", icon: <HardHat className="w-6 h-6" /> }
  ];

  return (
    <section className="relative z-20 -mt-16 md:-mt-24 container mx-auto px-4 max-w-7xl">
      <div className="bg-secondary-900/80 backdrop-blur-2xl rounded-[3rem] p-4 border border-white/10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)]">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group relative flex flex-col items-center justify-center py-8 md:py-12 px-6 rounded-[2.5rem] hover:bg-white/5 transition-all duration-500"
            >
              {/* Highlight background on hover */}
              <div className="absolute inset-10 bg-primary-500/20 blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              
              <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-primary-500 mb-6 group-hover:bg-primary-500 group-hover:text-secondary-950 transition-all duration-500 scale-110">
                {stat.icon}
              </div>
              
              <div className="text-center relative z-10">
                <h3 className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tighter">
                  {stat.number}
                </h3>
                <p className="text-gray-400 font-bold text-xs md:text-sm uppercase tracking-widest group-hover:text-primary-400 transition-colors">
                  {stat.label}
                </p>
              </div>
              
              {/* Divider for desktop */}
              {index < stats.length - 1 && (
                <div className="hidden lg:block absolute -left-2 top-1/4 bottom-1/4 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent"></div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutStatsBar;
