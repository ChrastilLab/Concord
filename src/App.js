import './App.css';
import { ChakraProvider, extendTheme} from "@chakra-ui/react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Studies from "./pages/Studies";
import Login from "./pages/Login/Login";
import LabSheets from "./pages/LabSheet";
import Members from "./pages/Members";
import Folder from "./pages/Folder";
import Tasks from './pages/Tasks';
import RASummary from './pages/RASummary';


function App() {
  const theme = extendTheme({
    colors: {
      table: {
        100: "#D0EAF9",
      },
    },
  })
  
  return (
    <ChakraProvider theme={theme}> 
      <Router>
        <Routes>
          
          <Route path="/" element={<Home/>}/>
          <Route path="/Login" element={<Login/>}/>
          <Route path='/tasks' element={<Tasks/>}/>
          <Route path="/studies/:organization" element={<Studies/>}/>
          <Route path="/labsheet" element={<LabSheets/>}/>
          <Route path="/members" element={<Members/>}/>
          {/* <Route path="/announcements" element={}/> */}
          <Route path="/folder" element={<Folder/>}/>
          <Route path="/ra-summary" element={<RASummary/>}/>
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;

