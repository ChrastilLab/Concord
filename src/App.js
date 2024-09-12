import "./App.css";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Studies from "./pages/Studies";
import Login from "./pages/Login/Login";
import LabSheets from "./pages/LabSheet";
import Members from "./pages/Members";
import Folder from "./pages/Folder";
import Organization from './pages/Organization';
import Tasks from './pages/Tasks';
import RASummary from './pages/RASummary';
import IndividualProject from './pages/IndividualProject';


function App() {
  const theme = extendTheme({
    colors: {
      table: {
        100: "#D0EAF9",
      },
    },
  });

  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/:organization/tasks" element={<Tasks />} />
          <Route path="/studies/:organization" element={<Studies />} />
          <Route path="/:organization/labsheet" element={<LabSheets />} />
          <Route path="/:organization/members" element={<Members />} />
          {/* <Route path="/announcements" element={}/> */}
          <Route path='/:orgName' element={<Organization />} />
          <Route path="/folder" element={<Folder/>}/>
          <Route path="/ra-summary" element={<RASummary/>}/>
          <Route path="/studies/:organization/:project_name" element={<IndividualProject/>}/>
          <Route path="/personal-summary" element={<PersonalSummary />} />

        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
