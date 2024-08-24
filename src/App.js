import './App.css';
import { ChakraProvider } from "@chakra-ui/react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Studies from "./pages/Studies";
import LabSheets from "./pages/LabSheet";
import Table from "./pages/Table";
import RASummary from "./pages/RASummary";

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/studies" element={<Studies/>}/>
          <Route path="/labsheet" element={<LabSheets/>}/>
          <Route path="/announcements" element={<Table/>}/>
          <Route path="/RASummary" element={<RASummary/>}/>
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;

