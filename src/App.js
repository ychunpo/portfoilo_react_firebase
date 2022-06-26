//import { BrowserRouter, Routes, Route, Redirect } from 'react-router-dom';
import './App.css';
//import Login from './pages/admin/Login'
//import Panel from './pages/admin/Panel'
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Portfolio from './pages/Portfolio';
import Skills from './pages/Skills';
import Contact from './pages/Contact';
import Footer from './components/Footer';


function App() {
  return (

    <div className="App">
      <Navbar />
      <Home />
      <About />
      <Portfolio />
      <Skills />
      <Contact />
      <Footer />
    </div>


  );
}

export default App;
