import React from 'react';

const Map = () => {
  return (
    <div className="w-full h-full min-h-[400px] bg-gray-100 relative">
       <iframe 
         src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115993.47953835676!2d46.60228771485906!3d24.72314646700589!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2f03890d489399%3A0xba974d1c98e79fd5!2sRiyadh%20Saudi%20Arabia!5e0!3m2!1sen!2seg!4v1706698123456!5m2!1sen!2seg" 
         width="100%" 
         height="100%" 
         style={{ border: 0, display: 'block' }} 
         allowFullScreen="" 
         loading="lazy" 
         referrerPolicy="no-referrer-when-downgrade"
         title="Google Map"
       ></iframe>
    </div>
  );
};

export default Map;
