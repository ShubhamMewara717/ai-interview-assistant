import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import UploadResume from "./pages/UploadResume";
import ResumeAnalysis from "./pages/ResumeAnalysis";
import Interview from "./pages/Interview";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/upload-resume" element={<UploadResume />} />

        <Route path="/resume-analysis" element={<ResumeAnalysis />}/>
       
        <Route path="/interview" element={<Interview />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;