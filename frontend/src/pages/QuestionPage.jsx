import { useEffect, useState } from "react";

function QuestionPage() {

  const [skills, setSkills] = useState([]);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/generate-questions")
      .then((res) => res.json())
      .then((data) => {
        setSkills(data.skills);
        setQuestions(data.questions);
      });
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-white p-10">

      <h1 className="text-4xl font-bold mb-8">
        AI Interview Questions
      </h1>

      <h2 className="text-2xl text-green-400 mb-4">
        Skills Found
      </h2>

      <ul className="mb-8">
        {skills.map((skill, index) => (
          <li key={index}>✅ {skill}</li>
        ))}
      </ul>

      <h2 className="text-2xl text-blue-400 mb-4">
        Interview Questions
      </h2>

      {questions.map((question, index) => (
        <div
          key={index}
          className="bg-slate-800 p-4 rounded-lg mb-4"
        >
          <b>Q{index + 1}.</b> {question}
        </div>
      ))}

    </div>
  );
}

export default QuestionPage;