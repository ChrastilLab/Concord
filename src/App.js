import "./App.css";
import * as React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Landing from "./pages/LandingPage/Landing";
import Project from "./pages/ProjectPage/Project";

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/project" element={<Project />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
