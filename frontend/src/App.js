import React from 'react'
import { HashRouter } from "react-router-dom";
import './App.css';
import Home from './Components/Pages/Home';

function App() {
  return (
    <>
      <HashRouter>
        <Home/>
      </HashRouter>
    </>
  );
}

export default App;
