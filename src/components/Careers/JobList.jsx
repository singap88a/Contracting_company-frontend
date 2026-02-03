import React from 'react';
import { Briefcase, MapPin, Clock } from 'lucide-react';

const JobList = ({ jobs, selectedJob, setSelectedJob }) => {
  const translateType = (type) => {
    const types = {
      'Full-time': 'دوام كامل',
      'Part-time': 'دوام جزئي',
      'Contract': 'عقد مشروع',
      'Internship': 'تدريب'
    };
    return types[type] || type;
  };

  return (
    <div className="lg:col-span-1 space-y-4">
      <h3 className="font-bold text-xl text-secondary-900 mb-4">الوظائف المتاحة</h3>
      {jobs.map((job) => (
        <div 
          key={job.id}
          onClick={() => setSelectedJob(job)}
          className={`group bg-white p-6 rounded-2xl shadow-sm cursor-pointer transition-all duration-300 border ${
            selectedJob?.id === job.id 
              ? 'border-primary-500 ring-4 ring-primary-500/5 bg-primary-50/10' 
              : 'border-gray-100 hover:border-primary-200 hover:shadow-md'
          }`}
        >
          <div className="flex justify-between items-start mb-3">
            <h4 className={`font-bold text-lg transition-colors ${selectedJob?.id === job.id ? 'text-primary-600' : 'text-secondary-900 group-hover:text-primary-500'}`}>
              {job.title}
            </h4>
            <div className={`p-2 rounded-lg transition-colors ${selectedJob?.id === job.id ? 'bg-primary-500 text-white' : 'bg-gray-50 text-gray-400 group-hover:bg-primary-50 group-hover:text-primary-500'}`}>
              <Briefcase size={18} />
            </div>
          </div>
          <div className="flex flex-wrap gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1.5 bg-gray-50 px-3 py-1 rounded-full"><MapPin size={14} className="text-secondary-400" /> {job.location}</span>
            <span className="flex items-center gap-1.5 bg-gray-50 px-3 py-1 rounded-full"><Clock size={14} className="text-secondary-400" /> {translateType(job.type)}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default JobList;
