import { useState } from "react";

function Interview() {

  const [answer, setAnswer] = useState("");
  const [score, setScore] = useState("");
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);

  const submitAnswer = async () => {

    if (answer.trim() === "") {
      alert("Please write your answer first.");
      return;
    }

    setLoading(true);

    try {

      const response = await fetch(
        "http://127.0.0.1:8000/evaluate-answer",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            question: "Explain Python Decorators.",
            answer: answer
          })
        }
      );

      const data = await response.json();

      setScore(data.score);
      setFeedback(data.feedback);

    } catch (error) {

      console.error(error);
      alert("Cannot connect to backend.");

    }

    setLoading(false);

  };

  return (

    <div className="min-h-screen bg-slate-900 text-white flex justify-center items-center">

      <div className="bg-slate-800 w-[700px] p-8 rounded-xl shadow-xl">

        <h1 className="text-3xl font-bold text-center mb-6">
          AI Mock Interview
        </h1>

        <h2 className="text-xl font-semibold mb-4">
          Q1. Explain Python Decorators.
        </h2>

        <textarea
          rows="8"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Write your answer here..."
          className="w-full p-4 rounded-lg bg-slate-700 outline-none"
        />

        <button
          onClick={submitAnswer}
          disabled={loading}
          className="mt-5 w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg font-bold"
        >
          {loading ? "Evaluating..." : "Submit Answer"}
        </button>

        {score !== "" && (

          <div className="mt-8 bg-slate-700 p-5 rounded-lg">

            <h2 className="text-2xl font-bold text-green-400">
              Score: {score}
            </h2>

            <h3 className="mt-4 text-xl font-semibold">
              Feedback
            </h3>

            <p className="mt-2">
              {feedback}
            </p>

          </div>

        )}

      </div>

    </div>

  );

}

export default Interview;