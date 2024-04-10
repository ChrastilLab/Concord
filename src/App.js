import "./App.css";
import * as React from "react";
import { ChakraProvider, Container } from "@chakra-ui/react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Landing from "./pages/LandingPage/Landing";
import Project from "./pages/ProjectPage/Project";
import Details from "./pages/ProjectDetailsPage/Details"

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/project/:projectId" element={<Project />} />
          <Route path="/project/:projectId/details" element={<Details />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
