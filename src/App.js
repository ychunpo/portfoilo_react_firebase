import { Routes, Route } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";

import Home from './pages/Home';
import Login from './auth';
import { AuthContextProvider } from './auth/AuthContext';
import ProtectedRouter from './auth/ProtectedRouter';
import Dashboard from './admin/dashboard';
import SkillsForm from './admin/skills/SkillsForm';
import AdminProjects from './admin/projects/AdminProjects';
import AdminProjectHandle from './admin/projects/AdminProjectHandle';
import AdminProjectHandle2 from './admin/projects/AdminProjectHandle2';
import Layout from './admin/components/Layout';
import NotFound from './pages/NotFound';


function App() {
  return (
    <div className="App">
      <ToastContainer position="top-center" />
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Login />} />
          <Route path="*" element={<NotFound />} />

          <Route path="/admin" element={<ProtectedRouter><Layout /></ProtectedRouter>}>
            <Route path="dashboard" element={<ProtectedRouter><Dashboard /></ProtectedRouter>} />
            <Route path="skill" element={<ProtectedRouter><SkillsForm /></ProtectedRouter>} />
            <Route path="project" element={<ProtectedRouter><AdminProjects /></ProtectedRouter>} />
            <Route path="project/edit/:id" element={<ProtectedRouter><AdminProjectHandle /></ProtectedRouter>} />
            <Route path="project/create" element={<ProtectedRouter><AdminProjectHandle /></ProtectedRouter>} />
            <Route path="project/create2" element={<ProtectedRouter><AdminProjectHandle2 /></ProtectedRouter>} />
          </Route>

        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
