import "./App.css";
import * as React from "react";
import { ChakraProvider, Container } from "@chakra-ui/react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import {Landing} from "./pages/LandingPage/Landing";
import Project from "./pages/ProjectPage/Project";
import Details from "./pages/ProjectDetailsPage/Details";
import Members from "./pages/RAOverviewPage/Members";
import { Login } from "./pages/LoginPage/Login";
import { Signup } from "./pages/SignupPage/Signup";
import { AddTask } from "./pages/AddTask/AddTask";

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/addtask" element={<AddTask />} />
          <Route path="/project/:projectId" element={<Project />} />
          <Route path="/project/:projectId/details" element={<Details />} />
          <Route path="/project/:projectId/members" element={<Members />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
