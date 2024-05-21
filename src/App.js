import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";

import ProjectPage from "./pages/ProjectPage/ProjectPage";
import Folder from "./pages/ProjectPage/components/Folder/Folder";
import Schedule from "./pages/ProjectPage/components/Schedule/Schedule";
import Task from "./pages/ProjectPage/components/Task/Task";
import Setting from "./pages/ProjectPage/components/Settings/Setting";

import PersonalPage from "./pages/PersonalPage/PersonalPage";
import TaskChecklist from "./pages/PersonalPage/components/TaskChecklist";
import TaskCalendar from "./pages/PersonalPage/components/TaskCalendar";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/project" element={<ProjectPage />} />
        <Route path="/project/folder" element={<Folder />} />
        <Route path="/project/schedule" element={<Schedule />} />
        <Route path="/project/task" element={<Task />} />
        <Route path="/project/setting" element={<Setting />} />
        <Route path="/person" element={<PersonalPage />} />
        <Route path="/person/task-checklist" element={<TaskChecklist />} />
        <Route path="/person/task-calendar-view" element={<TaskCalendar />} />
      </Routes>
    </Router>
  );
}

export default App;
