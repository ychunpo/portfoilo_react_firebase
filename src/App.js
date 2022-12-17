import { Routes, Route } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import Main from './front_pages/Main';
import Login from './auth';
import { AuthContextProvider } from './auth/AuthContext';
import ProtectedRouter from './auth/ProtectedRouter';
import AdminSkillsView from './admin/skills/AdminSkillsView';
import AdminProjectsView from './admin/projects/AdminProjectsView';
import AdminProjectCreate from './admin/projects/imageWithUrl/AdminProjectIWUCreate';
import AdminProjectEdit from './admin/projects/imageWithUrl/AdminProjectIWUEdit';
//import AdminProjectImageView from './admin/projectsImageList/noDropZone/AdminProjectImageView'
//import AdminSliderController from './admin/setting/AdminSliderController';
import ImagesGallery from './admin/imagesGallery/ImagesGallery';
import Layout from './admin/admin_components/Layout';
import NotFound from './front_pages/front_components/NotFound';

function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/auth" element={<Login />} />
          <Route path="*" element={<NotFound />} />

          <Route path="/admin" element={<ProtectedRouter><Layout /></ProtectedRouter>}>
            <Route path="skills" element={<ProtectedRouter><AdminSkillsView /></ProtectedRouter>} />
            <Route path="projects" element={<ProtectedRouter><AdminProjectsView /></ProtectedRouter>} />
            <Route path="project/:type" element={<ProtectedRouter><AdminProjectCreate /></ProtectedRouter>} />
            <Route path="project/edit/:id" element={<ProtectedRouter><AdminProjectEdit /></ProtectedRouter>} />
            <Route path="project/image-list" element={<ProtectedRouter><ImagesGallery /></ProtectedRouter>} />
          </Route>
        </Routes>
      </AuthContextProvider>
      <ToastContainer position="top-center" />
    </div>
  );
}

export default App;