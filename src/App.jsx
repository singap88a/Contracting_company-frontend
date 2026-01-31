import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import ProjectDetails from './pages/ProjectDetails';
import Services from './pages/Services';
import Careers from './pages/Careers';
import Contact from './pages/Contact';
import ServiceRequest from './pages/ServiceRequest';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Articles from './pages/Articles';
import ArticleDetails from './pages/ArticleDetails';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="services" element={<Services />} />
        <Route path="projects" element={<Projects />} />
        <Route path="projects/:id" element={<ProjectDetails />} />
        <Route path="articles" element={<Articles />} />
        <Route path="articles/:id" element={<ArticleDetails />} />
        <Route path="careers" element={<Careers />} />
        <Route path="contact" element={<Contact />} />
        <Route path="request-service" element={<ServiceRequest />} />
        <Route path="terms" element={<Terms />} />
        <Route path="privacy" element={<Privacy />} />
      </Route>
    </Routes>
  );
}

export default App;