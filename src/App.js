import { Routes, Route } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";

import Home from './front_pages/Home';
import Login from './auth';
import { AuthContextProvider } from './auth/AuthContext';
import ProtectedRouter from './auth/ProtectedRouter';
import Dashboard from './admin/dashboard';
import AdminSkillsView from './admin/skills/AdminSkillsView';
import AdminProjectsView from './admin/projects/AdminProjectsView';
import AdminProjectForm from './admin/projects/AdminProjectForm';
import AdminProjectEdit from './admin/projects/AdminProjectEdit';
import Layout from './admin/admin_components/Layout';
import NotFound from './front_pages/NotFound';


function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Login />} />
          <Route path="*" element={<NotFound />} />

          <Route path="/admin" element={<ProtectedRouter><Layout /></ProtectedRouter>}>
            <Route path="dashboard" element={<ProtectedRouter><Dashboard /></ProtectedRouter>} />
            <Route path="skills" element={<ProtectedRouter><AdminSkillsView /></ProtectedRouter>} />
            <Route path="projects" element={<ProtectedRouter><AdminProjectsView /></ProtectedRouter>} />
            <Route path="project/:type" element={<ProtectedRouter><AdminProjectForm /></ProtectedRouter>} />
            <Route path="project/edit/:id" element={<ProtectedRouter><AdminProjectEdit /></ProtectedRouter>} />
          </Route>

        </Routes>
      </AuthContextProvider>
      <ToastContainer position="top-center" />

    </div>
  );
}

export default App;
