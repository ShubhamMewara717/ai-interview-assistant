import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ResumeAnalysis() {

  const navigate = useNavigate();

  const [skills, setSkills] = useState([]);

  const analyzeResume = async () => {

    try {

      const response = await fetch(
        "http://127.0.0.1:8000/generate-questions"
      );

      const data = await response.json();

      setSkills(data.skills);

    } catch {

      alert("Cannot connect to backend");

    }

  };

  return (

    <div className="min-h-screen bg-slate-900 flex justify-center items-center">

      <div className="bg-slate-800 p-8 rounded-xl w-[650px] text-white">

        <h1 className="text-3xl font-bold text-center mb-6">
          Resume Analysis
        </h1>

        <button
          onClick={analyzeResume}
          className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg font-bold"
        >
          Analyze Resume
        </button>

        {skills.length > 0 && (

          <>

            <h2 className="text-2xl mt-8 mb-4 text-green-400">
              Skills Detected
            </h2>

            <div className="grid grid-cols-2 gap-3">

              {skills.map((skill, index) => (

                <div
                  key={index}
                  className="bg-slate-700 p-3 rounded-lg text-center"
                >
                  ✅ {skill}
                </div>

              ))}

            </div>

            <button
              onClick={() => navigate("/interview")}
              className="mt-8 w-full bg-green-600 hover:bg-green-700 py-3 rounded-lg font-bold"
            >
              Start Interview
            </button>

          </>

        )}

      </div>

    </div>

  );

}

export default ResumeAnalysis;