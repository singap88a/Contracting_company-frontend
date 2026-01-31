import React from 'react';
import { motion } from 'framer-motion';

const AboutStatsBar = () => {
  const stats = [
    { number: "10K+", label: "عميل سعيد" },
    { number: "6", label: "سنوات خبرة" },
    { number: "25+", label: "جائزة تقديرية" },
    { number: "30+", label: "مهندس متخصص" }
  ];

  return (
    <section className="relative z-20 -mt-10 md:-mt-16 container mx-auto px-4 max-w-7xl">
      <div className="bg-primary-500 rounded-2xl shadow-2xl overflow-hidden">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-x-reverse divide-white/20 py-8 md:py-12">
          {stats.map((stat, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center px-4"
            >
              <h3 className="text-3xl md:text-5xl font-black text-white mb-2">{stat.number}</h3>
              <p className="text-white/80 font-bold text-sm md:text-base uppercase tracking-wider">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutStatsBar;
