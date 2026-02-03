import React, { useState, useEffect } from 'react';
import JobList from '../../components/Careers/JobList';
import ApplicationForm from '../../components/Careers/ApplicationForm';
import { motion } from 'framer-motion';
import { API_URL } from '../../config';
import { Loader2 } from 'lucide-react';

const Careers = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await fetch(`${API_URL}/jobs`);
      if (response.ok) {
        const data = await response.json();
        const openJobs = data.filter(j => j.status === 'Open').map(j => ({ ...j, id: j._id }));
        setJobs(openJobs);
        if (openJobs.length > 0) {
          setSelectedJob(openJobs[0]);
        }
      }
    } catch (err) {
      console.error('Error fetching jobs:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Banner Section (Contact Style) */}
      <section className="relative h-[40vh] md:h-[50vh] flex items-center overflow-hidden" dir="rtl">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop" 
            className="w-full h-full object-cover brightness-[0.4] contrast-110" 
            alt="Construction" 
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-secondary-900/60 to-secondary-900/90"></div>
          
          {/* Decorative Elements */}
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
        </div>

        <div className="container mx-auto px-4 max-w-7xl relative z-10 text-right">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3  ">
              <div className="w-12 h-px bg-primary-500/50"></div>
              <span className="text-primary-500 font-extrabold uppercase tracking-widest text-sm">مسيرتك المهنية تبدأ هنا</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black text-white leading-tight">
              انضم إلى <span className="text-primary-500">عائـلتنا</span>
            </h1>
            
            <p className="text-gray-300 text-lg md:text-xl mt-6 max-w-2xl">
              نبحث دائماً عن المبدعين والموهوبين للانضمام إلى فريقنا. اكتشف الفرص المتاحة وكن جزءاً من مسيرة نجاحنا وبناء المستقبل.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content Section Section (Overlapping Hero) */}
      <div className="container mx-auto px-4 max-w-7xl -mt-20 relative z-20 pb-24">
        <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-secondary-900/10 p-8 md:p-12 border border-gray-100">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Job Listings */}
            <JobList jobs={jobs} selectedJob={selectedJob} setSelectedJob={setSelectedJob} />

            {/* Application Form */}
            <ApplicationForm selectedJob={selectedJob} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Careers;
