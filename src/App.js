import { Routes, Route } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import Home from './pages/Home';
import Login from './auth';
import ControlPanel from './pages/admin/ControlPanel';
import SkillsList from './pages/admin/SkillsList';
import ProjectsList from './pages/admin/ProjectsList';
import ProjectItem from './pages/ProjectItem';
import NotFound from './pages/NotFound';
import AddProject from './components/admin/AddProject';

function App() {
  return (

    <div className="App">
      <ToastContainer position="top-center" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project/:id" element={<ProjectItem />} />
        <Route path="/auth" element={<Login />} />
        <Route path="/panel" element={<ControlPanel />} />
        <Route path="/skills-list" element={<SkillsList />} />
        <Route path="/projects-list" element={<ProjectsList />} />
        <Route path="/create-project" element={<AddProject />} />
        <Route path="*" element={<NotFound />} />
      </Routes>


    </div>


  );
}

export default App;
