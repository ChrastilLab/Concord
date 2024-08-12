import './App.css';
import { ChakraProvider} from "@chakra-ui/react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Studies from "./pages/Studies";
import Login from "./pages/Login/Login";
import LabSheets from "./pages/LabSheet";
import Folder from "./pages/Folder";
import Organization from './pages/Organization';


function App() {
  return (
    <ChakraProvider>
      <Router>
        <Routes>
          
          <Route path="/" element={<Home/>}/>
          <Route path="/Login" element={<Login/>}/>
          <Route path="/studies" element={<Studies/>}/>
          <Route path="/labsheet" element={<LabSheets/>}/>
          <Route path='/:orgName' element={<Organization />} />
          <Route path="/folder" element={<Folder/>}/>
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;

