import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, MapPin, Loader2 } from 'lucide-react';
import { API_URL } from '../../config';

const HomeProjects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch(`${API_URL}/projects`);
                const data = await response.json();
                if (response.ok) {
                    setProjects(data.slice(0, 3)); // Show only 3 projects
                }
            } catch (err) {
                console.error('Error fetching projects:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, []);

    const ProjectCard = ({ project }) => (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group relative h-[420px] rounded-[2rem] overflow-hidden cursor-pointer shadow-xl hover:shadow-2xl transition-all duration-500 bg-gray-900 border border-gray-200"
        >
            <div className="absolute inset-0">
                <img 
                    src={project.images?.[0] || 'https://images.unsplash.com/photo-1503387762-592dea58ef21?q=80&w=1000&auto=format&fit=crop'} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary-900 via-secondary-900/50 to-transparent opacity-85 group-hover:opacity-75 transition-opacity duration-300"></div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/10 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-tr-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <div className="absolute bottom-0 left-0 w-full p-8 z-20">
                <div className="mb-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <span className="inline-block px-5 py-2 bg-white/15 backdrop-blur-md border border-white/30 text-white text-xs font-black rounded-full mb-5 uppercase tracking-wider shadow-lg">
                        {project.category}
                    </span>
                    <h3 className="text-3xl font-black text-white mb-3 font-cairo leading-tight group-hover:text-primary-300 transition-colors duration-300">
                        {project.title}
                    </h3>
                    <div className="flex items-center gap-2 text-gray-200 text-sm font-bold">
                        <MapPin size={18} className="text-primary-400" />
                        {project.location}
                    </div>
                </div>
                
                <div className="w-full h-[1px] bg-white/20 mb-6 group-hover:bg-primary-500 group-hover:h-[2px] transition-all duration-300"></div>

                <Link 
                    to={`/projects/${project._id}`} 
                    className="inline-flex items-center gap-3 text-white font-black group-hover:gap-6 transition-all duration-300"
                >
                    عرض التفاصيل
                    <div className="w-12 h-12 rounded-full bg-white/15 backdrop-blur-md border border-white/30 flex items-center justify-center group-hover:bg-primary-500 group-hover:border-primary-500 group-hover:scale-110 transition-all duration-300 shadow-lg">
                       <ArrowUpRight size={20} />
                    </div>
                </Link>
            </div>
        </motion.div>
    );

  return (
    <section className="py-24 bg-gray-50 border-b border-gray-100 relative overflow-hidden">
      {/* Background Shapes */}
      <div className="absolute top-0 right-0 w-full h-full opacity-[0.03] pointer-events-none">
        <div className="absolute top-20 right-20 w-96 h-96 bg-secondary-900 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-primary-500 rounded-full blur-3xl"></div>
      </div>
      
      {/* Grid Pattern */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.02] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:32px_32px]"></div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        
        {/* Header & Nav */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="flex-1 flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
                <div className="max-w-3xl">
                    <span className="text-secondary-500 font-bold tracking-widest uppercase mb-4 block">معرض الأعمال</span>
                    <h2 className="text-3xl lg:text-5xl font-black text-secondary-900 leading-[1.1]">
                      أحدث <span className="text-primary-500 relative">
                        مشاريعنا
                        <svg className="absolute w-full h-3 -bottom-1 right-0 text-primary-200 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none"/></svg>
                      </span> المتميزة
                    </h2>
                </div>

                {/* Button in Header - Orange */}
                <Link 
                  to="/projects"
                  className="inline-flex items-center gap-3 px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-bold rounded-xl transition-all duration-300 shadow-xl shadow-primary-500/20 group whitespace-nowrap"
                >
                  <span className="text-sm md:text-base">استكشف كافة المشاريع</span>
                  <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                </Link>
            </div>
        </div>

        {/* Projects Grid - 3 Cards Only */}
        {loading ? (
            <div className="flex items-center justify-center py-20">
                <Loader2 className="w-10 h-10 text-primary-500 animate-spin" />
            </div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project, index) => (
                    <ProjectCard key={project._id} project={project} />
                ))}
            </div>
        )}

      </div>
    </section>
  );
};

export default HomeProjects;
