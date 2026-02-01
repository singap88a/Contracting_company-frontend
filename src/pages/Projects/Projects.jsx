import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, MapPin, Sparkles, Loader2 } from 'lucide-react';
import { API_URL } from '../../config';

// Static data removed, fetching from backend

const ProjectCard = ({ project }) => (
    <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="group relative h-[420px] rounded-[2rem] overflow-hidden cursor-pointer shadow-xl hover:shadow-2xl transition-all duration-500 bg-gray-900 border border-gray-200"
    >
        <Link to={`/projects/${project._id}`} className="absolute inset-0 z-30"></Link>
        <div className="absolute inset-0 z-0">
            <img 
                src={project.images?.[0] || 'https://images.unsplash.com/photo-1503387762-592dea58ef21?q=80&w=1000&auto=format&fit=crop'} 
                alt={project.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-secondary-900 via-secondary-900/50 to-transparent opacity-85 group-hover:opacity-75 transition-opacity duration-300"></div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/10 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-tr-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>

        <div className="absolute bottom-0 left-0 w-full p-8 z-20 text-right">
            <div className="mb-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <span className="inline-block px-5 py-2 bg-white/15 backdrop-blur-md border border-white/30 text-white text-xs font-black rounded-full mb-5 uppercase tracking-wider shadow-lg">
                    {project.category}
                </span>
                <h3 className="text-3xl font-black text-white mb-3 font-cairo leading-tight group-hover:text-primary-300 transition-colors duration-300">
                    {project.title}
                </h3>
                <div className="flex items-center justify-end gap-2 text-gray-200 text-sm font-bold">
                    <span>{project.location}</span>
                    <MapPin size={18} className="text-primary-400" />
                </div>
            </div>
            
            <div className="w-full h-[1px] bg-white/20 mb-6 group-hover:bg-primary-500 group-hover:h-[2px] transition-all duration-300"></div>

            <div className="inline-flex items-center gap-3 text-white font-black group-hover:gap-6 transition-all duration-300 flex-row-reverse">
                عرض التفاصيل
                <div className="w-12 h-12 rounded-full bg-white/15 backdrop-blur-md border border-white/30 flex items-center justify-center group-hover:bg-primary-500 group-hover:border-primary-500 group-hover:scale-110 transition-all duration-300 shadow-lg">
                   <ArrowUpRight size={20} />
                </div>
            </div>
        </div>
    </motion.div>
);

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch(`${API_URL}/projects`);
                const data = await response.json();
                if (response.ok) {
                    setProjects(data);
                }
            } catch (err) {
                console.error('Error fetching projects:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, []);

  return (
    <div className="bg-white pb-24 text-right min-h-screen">
      {/* Compact Header */}
      <section className="relative py-16 bg-white overflow-hidden border-b border-gray-50">
        <div className="absolute inset-0 z-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(#1E3A8A 1px, transparent 1px)', backgroundSize: '16px 16px' }}></div>
        
        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-6"
          >
            <div className="text-right">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-px bg-primary-500"></div>
                <span className="text-primary-500 font-black uppercase tracking-[0.3em] text-[10px]">مشاريعنا ومعارضنا</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-secondary-950 leading-tight">
                <span className="text-secondary">معرض</span> <span className="text-primary-500">الإنجازات</span> <span className="text-secondary">والبصمات</span>
              </h2>
            </div>
            
            <div className="group bg-primary-50 px-6 py-3 rounded-full border border-primary-100 hidden md:flex items-center gap-3 transition-all hover:bg-primary-500 hover:shadow-lg hover:shadow-primary-500/20 cursor-default">
              <Sparkles size={14} className="text-primary-500 group-hover:text-white transition-colors animate-pulse" />
              <p className="text-[10px] text-primary-900 group-hover:text-white font-black uppercase tracking-[0.2em] transition-colors">
                 نسطر التاريخ بإنجازات هندسية رائدة
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-12 h-12 text-primary-500 animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project) => (
                <ProjectCard key={project._id} project={project} />
                ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Projects;
