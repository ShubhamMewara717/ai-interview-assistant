import { useState } from "react";

function ResumeAnalysis() {

  const [skills, setSkills] = useState([]);
  const [questions, setQuestions] = useState([]);


  const analyzeResume = async () => {

  try {

    const response = await fetch(
      "http://127.0.0.1:8000/generate-questions"
    );

    const data = await response.json();

    setSkills(data.skills);
    setQuestions(data.questions);

  } catch {

    alert("Cannot connect to backend");

  }

};
  return (

    <div className="min-h-screen bg-slate-900 text-white flex justify-center items-center">

      <div className="bg-slate-800 p-8 rounded-xl w-[600px]">

        <h1 className="text-3xl font-bold text-center mb-6">

          Resume Analysis

        </h1>

        <button

          onClick={analyzeResume}

          className="bg-blue-600 w-full py-3 rounded-lg hover:bg-blue-700"

        >

          Analyze Resume

        </button>

        <div className="mt-8">

          <h2 className="text-2xl mb-4">

            Skills Detected

          </h2>

          {

            skills.map((skill,index)=>(

              <div

                key={index}

                className="bg-slate-700 p-3 rounded-lg mb-2"

              >

                ✅ {skill}

              </div>
              
            ))
            
          }
         
        </div>

        <div className="mt-8">

  <h2 className="text-2xl mb-4">
    Interview Questions
  </h2>

  {
    questions.map((question, index) => (

      <div
        key={index}
        className="bg-slate-700 p-3 rounded-lg mb-2"
      >
        <b>Q{index + 1}.</b> {question}
      </div>

    ))
  }

</div>

      </div>

    </div>

  );

}

export default ResumeAnalysis;