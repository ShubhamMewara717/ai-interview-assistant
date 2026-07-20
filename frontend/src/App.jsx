import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import UploadResume from "./pages/UploadResume";
import ResumeAnalysis from "./pages/ResumeAnalysis";
import QuestionPage from "./pages/QuestionPage";
import Interview from "./pages/Interview";
import Result from "./pages/Result";


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

        <Route path="/questions" element={<QuestionPage />}/>
        
        <Route path="/interview" element={<Interview />} />
         
        <Route path="/result" element={<Result />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;