import "./App.css";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import Login from "./pages/Login/Login";
import Home from "./pages/Home";
import Studies from "./pages/Studies";
import IndividualProject from './pages/IndividualProject';
import LabSheets from "./pages/LabSheet";
import Members from "./pages/Members";
import Folder from "./components/Folder";
import Tasks from './pages/Tasks';
import RASummary from './pages/RASummary';
import PersonalSummary from './pages/PersonalSummary';
import ProjectDocuments from './pages/ProjectDocuments';
import BioSummary from './pages/BioSummary';

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
          <Route path="/:organization_id/tasks" element={<Tasks />} />
          <Route path="/studies/:organization_id" element={<Studies />} />
          <Route path="/:organization_id/labsheet" element={<LabSheets />} />
          <Route path="/:organization_id/members" element={<Members />} />
          {/* <Route path="/announcements" element={}/> */}
          <Route path="/studies/:organization/:project_name/documents" element={<ProjectDocuments />}/>
          <Route path="/ra-summary" element={<RASummary/>}/>
          <Route path="/studies/:organization_id/:project_id" element={<IndividualProject/>}/>
          <Route path="/personal-summary" element={<PersonalSummary />} />
          <Route path="/bio-summary" element={<BioSummary/>} />

        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
