import AboutHero from '../components/About/AboutHero';
import AboutStatsBar from '../components/About/AboutStatsBar';
 import AboutIntro from '../components/About/AboutIntro';
import AboutValues from '../components/About/AboutValues';
import Team from '../components/About/Team';
import TestimonialsImmersive from '../components/About/TestimonialsImmersive';
import LatestNews from '../components/About/LatestNews';
import Brands from '../components/Home/Brands';

const About = () => {
  return (
    <div className="bg-white min-h-screen" dir="rtl">
      {/* 1. Buildland-Style Hero (Image 2) */}
      <AboutHero />

      {/* 2. Orange Stats Bar (Image 2) */}
      <AboutStatsBar />

          <Brands />


      {/* 4. Layered Intro (Who We Are) (Image 1/2) */}
      <AboutIntro />

      {/* 5. Modular Values Grid (Image 2) */}
      <AboutValues />

      {/* 6. Rounded-Top Team Cards (Image 1) */}
      <Team />

      {/* 7. Floating Testimonials Slider (Image 3) */}
      <div className="bg-gray-50/30">
        <TestimonialsImmersive />
      </div>

      {/* 8. Latest News & Stories (Image 3) */}
      <LatestNews />
    </div>
  );
};

export default About;
