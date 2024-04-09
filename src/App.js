import './App.css';
import * as React from 'react';
import { ChakraProvider } from '@chakra-ui/react';

function App() {
  return (
    <ChakraProvider>  
      <div className="App">
        <h1>Hello World</h1>
        <h1>Concord App</h1>
      </div>
    </ChakraProvider>
  );
}

export default App;
