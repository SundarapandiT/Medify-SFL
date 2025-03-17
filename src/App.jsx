import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {React,useState} from "react";
import RegisterPage from "./views/pages/RegisterPage";
import "./index.css"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RegisterPage />} />
      </Routes>
    </Router>
  );
}

export default App;
