import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import PersonalPage from "./pages/PersonalPage/PersonPage";
import ProjectPage from "./pages/ProjectPage/ProjectPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import Folder from "./pages/ProjectPage/components/Folder";
import Schedule from "./pages/ProjectPage/components/Schedule";
import Task from "./pages/ProjectPage/components/Task";
import Setting from "./pages/ProjectPage/components/Setting";

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/project" element={<ProjectPage />} />
          <Route path="/person" element={<PersonalPage />} />
          <Route path="/project/folder" element={<Folder />} />
          <Route path="/project/schedule" element={<Schedule />} />
          <Route path="/project/task" element={<Task />} />
          <Route path="/project/setting" element={<Setting />} />
        </Routes>
    </Router>
  );
}

export default App;
