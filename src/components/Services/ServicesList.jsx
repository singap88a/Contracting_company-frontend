import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Building2, ArrowLeft, Loader2 } from 'lucide-react';
import { API_URL } from '../../config';

const ServicesList = () => {
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(`${API_URL}/services`);
        if (response.ok) {
          const data = await response.json();
          const mappedData = data.map(s => ({
            ...s,
            id: s._id,
            title: s.name,
            desc: s.description,
            // Use emoji if available, else fallback icon component
            iconDisplay: s.icon ? s.icon : <Building2 size={32} strokeWidth={1.5} />,
            image: s.image || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000&auto=format&fit=crop'
          }));
          setServices(mappedData);
          setFilteredServices(mappedData);
        }
      } catch (err) {
        console.error('Error fetching services:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  useEffect(() => {
    if (activeFilter === 'all') {
      setFilteredServices(services);
    } else {
      setFilteredServices(services.filter(s => s.category === activeFilter));
    }
  }, [activeFilter, services]);

  const filters = [
    { id: 'all', label: 'الكل' },
    { id: 'contracting', label: 'قسم المقاولات' },
    { id: 'safety', label: 'قسم السلامة' }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="w-12 h-12 text-primary-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 max-w-7xl relative z-10 py-12">
      {/* Simplified Grouped Filters */}
      <div className="flex justify-center mb-20 px-4">
        <div className="inline-flex p-1.5 bg-gray-100/80 rounded-[2rem] backdrop-blur-xl border border-gray-200 shadow-inner">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`relative px-8 md:px-12 py-3.5 rounded-[1.7rem] text-sm font-bold transition-all duration-500 whitespace-nowrap ${
                activeFilter === filter.id
                  ? 'bg-secondary-900 text-white shadow-xl shadow-secondary-900/20'
                  : 'text-secondary-600 hover:text-secondary-900'
              }`}
            >
              {activeFilter === filter.id && (
                <motion.div 
                  layoutId="activePillServices"
                  className="absolute inset-0 bg-secondary-900 rounded-[1.7rem] -z-10"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">{filter.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {filteredServices.map((service, index) => (
          <Link to="/request-service" key={service.id}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="group relative h-[480px] rounded-[2.5rem] overflow-hidden cursor-pointer shadow-xl transition-all duration-500 hover:shadow-primary-500/20"
            >
              {/* Background Image - Always Visible */}
              <div className="absolute inset-0">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary-900 via-secondary-900/60 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-80"></div>
              </div>
              
              <div className="relative h-full p-10 flex flex-col justify-end z-10 text-right" dir="rtl">
                 <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-primary-500 mb-6 border border-white/20 group-hover:bg-primary-500 group-hover:text-white transition-all duration-500 group-hover:rotate-[360deg]">
                    <span className="text-3xl">{service.iconDisplay}</span>
                 </div>
                 
                 <h3 className="text-3xl font-black text-white mb-4 font-cairo group-hover:text-primary-500 transition-colors">
                   {service.title}
                 </h3>
                 
                 <p className="text-gray-300 text-lg leading-relaxed mb-8 opacity-100 transform translate-y-0 transition-all duration-500">
                   {service.desc}
                 </p>
                 
                 <div className="w-full h-[1px] bg-white/20 group-hover:bg-primary-500 transition-colors duration-300 flex items-center justify-end">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileHover={{ width: '100%' }}
                      className="h-full bg-primary-500 origin-right transition-all duration-500"
                    />
                 </div>
                 
                 {/* Floating Arrow for better UX */}
                 <div className="absolute top-8 left-8 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-500 transform -translate-x-4 group-hover:translate-x-0">
                    <ArrowLeft size={24} />
                 </div>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ServicesList;
