import './App.css';
import { ChakraProvider} from "@chakra-ui/react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Studies from "./pages/Studies";
import Login from "./pages/Login";

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Routes>
          
          <Route path="/" element={<Home/>}/>
          <Route path="/Login" element={<Login/>}/>
          <Route path="/studies" element={<Studies/>}/>
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
