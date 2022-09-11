import { Route, Routes } from "react-router-dom";
import "./App.css";
import MainNavigation from "./components/layout/MainNavigation.js";
import Curriculum from "./components/pages/Curriculum.js";
import Grades from "./components/pages/Grades.js";

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <MainNavigation />
      </header>
      <Routes>
        <Route path='/' element={<Curriculum />} />
        <Route path='/curriculum' element={<Curriculum />} />
        <Route path='/grades' element={<Grades />} />
      </Routes>
    </div>
  );
}

export default App;
