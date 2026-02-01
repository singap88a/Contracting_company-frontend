import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Projects from './pages/Projects/Projects';
import ProjectDetails from './pages/Projects/ProjectDetails';
import Services from './pages/Services/Services';
import Careers from './pages/Careers/Careers';
import Contact from './pages/Contact/Contact';
import ServiceRequest from './pages/ServiceRequest/ServiceRequest';
import Terms from './pages/Legal/Terms';
import Privacy from './pages/Legal/Privacy';
import Articles from './pages/Articles/Articles';
import ArticleDetails from './pages/Articles/ArticleDetails';

// Dashboard imports
import DashboardLayout from './dashboard/layout/DashboardLayout';
import DashboardHome from './dashboard/pages/DashboardHome';
import ServicesManagement from './dashboard/pages/ServicesManagement';
import ProjectsManagement from './dashboard/pages/ProjectsManagement';
import JobsManagement from './dashboard/pages/JobsManagement';
import TestimonialsManagement from './dashboard/pages/TestimonialsManagement';
import ServiceRequestsInbox from './dashboard/pages/ServiceRequestsInbox';
import JobApplicationsInbox from './dashboard/pages/JobApplicationsInbox';
import ContactMessagesInbox from './dashboard/pages/ContactMessagesInbox';
import Settings from './dashboard/pages/Settings';
import Login from './pages/Admin/Login';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Routes>
      {/* Main Website Routes */}
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

      {/* Admin Routes */}
      <Route path="/admin/login" element={<Login />} />
      
      <Route 
        path="/admin" 
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardHome />} />
        <Route path="services" element={<ServicesManagement />} />
        <Route path="projects" element={<ProjectsManagement />} />
        <Route path="jobs" element={<JobsManagement />} />
        <Route path="testimonials" element={<TestimonialsManagement />} />
        <Route path="service-requests" element={<ServiceRequestsInbox />} />
        <Route path="job-applications" element={<JobApplicationsInbox />} />
        <Route path="contact-messages" element={<ContactMessagesInbox />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}

export default App;