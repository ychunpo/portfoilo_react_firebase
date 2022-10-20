import React from 'react';
import { Route } from 'react-router-dom';
import Layout from './admin/admin_components/Layout';
import Dashboard from './admin/dashboard';
import AdminSkillsView from './admin/skills/AdminSkillsView';
import AdminProjectsView from './admin/projects/AdminProjectsView';
import AdminProjectForm from './admin/projects/AdminProjectForm';

const AdminSystem = () => {
  <>
    <Route path="/admin" element={<Layout />} >
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="skills" element={<AdminSkillsView />} />
      <Route path="projects" element={<AdminProjectsView />} />
      <Route path="project/:type" element={<AdminProjectForm />} />
      <Route path="project/edit/:id" element={<AdminProjectForm />} />
    </Route>
  </>
}

export default AdminSystem;