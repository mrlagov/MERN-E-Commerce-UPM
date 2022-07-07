import React from "react";
import Main from './Main';
import { BrowserRouter } from "react-router-dom";
import "./App.css";

function App() {
  return <BrowserRouter>
            <Main/>
        </BrowserRouter>
}

export default App;