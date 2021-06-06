import React from 'react'
import { BrowserRouter} from "react-router-dom";
import './App.css';
import Quizcontainer from './Components/Quizcontainer';
import Register from "./Components/Register"
function App() {
  return (
    <>
      <BrowserRouter>
        {/* <Quizcontainer/> */}
        <Register/>
      </BrowserRouter>
    </>
  );
}

export default App;
