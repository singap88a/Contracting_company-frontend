import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Twitter, Mail, ArrowUpRight } from 'lucide-react';

const Team = () => {
  const team = [
    {
      name: 'أحمد محمد',
      role: 'المدير التنفيذي',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop',
      bio: 'خبرة تزيد عن 20 عاماً في إدارة المشاريع الكبرى وتطوير استراتيجيات النمو.'
    },
    {
      name: 'سارة علي',
      role: 'مهندسة معمارية',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop',
      bio: 'متخصصة في التصميم المستدام وحاصلة على عدة جوائز في التصميم المعماري الحديث.'
    },
    {
      name: 'خالد عمر',
      role: 'مدير المشاريع',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop',
      bio: 'سجل حافل في تسليم المشاريع المعقدة في الوقت المحدد وضمن الميزانية المحددة.'
    },
    {
      name: 'منى عبدالله',
      role: 'مصممة داخلية',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop',
      bio: 'تبدع في خلق مساحات داخلية تجمع بين الجمال والوظيفة بلمسة عصرية فريدة.'
    },
  ];

  return (
    <section className="py-32 relative overflow-hidden bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
             <span className="text-primary-600 font-[1000] tracking-[0.4em] uppercase mb-4 block">نخبة الخبراء</span>
             <h2 className="text-5xl md:text-7xl font-[1000] text-secondary-900 mb-6 leading-none">فريق <span className="text-primary-500">الإبداع</span></h2>
             <div className="w-32 h-2 bg-gradient-to-r from-transparent via-primary-500 to-transparent mx-auto rounded-full"></div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="relative rounded-[3.5rem] overflow-hidden bg-white border border-gray-100 mb-8 aspect-[4/5] shadow-2xl">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                />
                
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-secondary-900/95 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-10 text-white translate-y-full group-hover:translate-y-0 text-right">
                  <p className="text-lg leading-relaxed text-gray-300 mb-8 font-medium">
                    {member.bio}
                  </p>
                  <div className="flex gap-4 justify-end">
                    <a href="#" className="w-12 h-12 rounded-2xl bg-white/10 hover:bg-primary-500 flex items-center justify-center transition-all transform hover:rotate-12 border border-transparent hover:border-primary-500">
                      <Linkedin size={22} />
                    </a>
                    <a href="#" className="w-12 h-12 rounded-2xl bg-white/10 hover:bg-primary-500 flex items-center justify-center transition-all transform hover:rotate-12 border border-transparent hover:border-primary-500">
                      <Mail size={22} />
                    </a>
                  </div>
                </div>

                {/* Floating role tag */}
                <div className="absolute top-8 right-8 py-2 px-6 bg-primary-500 text-secondary-950 rounded-full shadow-lg font-black text-[10px] uppercase tracking-widest">
                   {member.role}
                </div>
              </div>
              
              <div className="flex items-center justify-between px-6">
                <div className="text-right">
                  <h3 className="text-2xl font-black text-secondary-900 mb-1 group-hover:text-primary-500 transition-colors uppercase tracking-widest leading-none">{member.name}</h3>
                  <p className="text-gray-400 text-sm font-black uppercase tracking-widest group-hover:text-primary-500 transition-colors">
                    {member.role}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-white border-2 border-primary-500 flex items-center justify-center group-hover:bg-primary-500 transition-all duration-500">
                   <ArrowUpRight size={24} className="text-primary-500 group-hover:text-white transition-colors" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
