import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Interview() {

  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [answer, setAnswer] = useState("");
  const [score, setScore] = useState("");
  const [feedback, setFeedback] = useState([]);

  const [loading, setLoading] = useState(false);
  const [totalScore, setTotalScore] = useState(0);

  // 5 Minutes Timer
  const [timeLeft, setTimeLeft] = useState(300);

  // Load Questions
  useEffect(() => {
    loadQuestions();
  }, []);

  // Timer
  useEffect(() => {

    const timer = setInterval(() => {

      setTimeLeft((prev) => {

        if (prev <= 1) {

          clearInterval(timer);

          localStorage.setItem("totalScore", totalScore);
          localStorage.setItem("totalQuestions", questions.length);

          alert("Time is over!");

          navigate("/result");

          return 0;
        }

        return prev - 1;

      });

    }, 1000);

    return () => clearInterval(timer);

  }, [navigate, totalScore, questions.length]);

  const loadQuestions = async () => {

    try {

      const response = await fetch(
        "http://127.0.0.1:8000/generate-questions"
      );

      const data = await response.json();

      setQuestions(data.questions);

    } catch {

      alert("Cannot load questions.");

    }

  };

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
            question: questions[currentQuestion],
            answer: answer
          })
        }
      );

      const data = await response.json();

      const currentScore = Number(data.score);

      setScore(currentScore);
      setFeedback(data.feedback);
      setTotalScore(prev => prev + currentScore);

    } catch {

      alert("Backend not running.");

    }

    setLoading(false);

  };

  const nextQuestion = () => {

    if (currentQuestion + 1 < questions.length) {

      setCurrentQuestion(prev => prev + 1);

      setAnswer("");
      setScore("");
      setFeedback([]);

    } else {

      localStorage.setItem("totalScore", totalScore);
      localStorage.setItem("totalQuestions", questions.length);

      navigate("/result");

    }

  };

  return (

    <div className="min-h-screen bg-slate-900 text-white flex justify-center items-center">

      <div className="bg-slate-800 w-[750px] p-8 rounded-xl shadow-xl">

        <h1 className="text-3xl font-bold text-center">
          AI Mock Interview
        </h1>

        {/* Timer */}

        <div className="text-center text-xl font-bold text-yellow-400 mt-4">

          ⏰ Time Left :
          {" "}
          {Math.floor(timeLeft / 60)}:
          {(timeLeft % 60).toString().padStart(2, "0")}

        </div>

        {questions.length > 0 ? (

          <>

            {/* Progress */}

            <div className="mt-6">

              <div className="flex justify-between mb-2">

                <span>
                  Question {currentQuestion + 1} of {questions.length}
                </span>

                <span>

                  {Math.round(
                    ((currentQuestion + 1) /
                      questions.length) * 100
                  )}%

                </span>

              </div>

              <div className="w-full bg-slate-700 rounded-full h-3">

                <div
                  className="bg-blue-500 h-3 rounded-full transition-all duration-500"
                  style={{
                    width:
                      `${((currentQuestion + 1) /
                        questions.length) * 100}%`
                  }}
                />

              </div>

            </div>

            <h2 className="text-xl font-semibold mt-8 mb-4">

              Q{currentQuestion + 1}. {questions[currentQuestion]}

            </h2>

            <textarea
              rows="8"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Write your answer..."
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

                  Score : {score}/10

                </h2>

                <h3 className="mt-5 text-xl font-semibold">

                  AI Feedback

                </h3>

                <ul className="mt-3 list-disc list-inside space-y-2">

                  {feedback.map((item, index) => (

                    <li key={index}>

                      {item}

                    </li>

                  ))}

                </ul>

                <button
                  onClick={nextQuestion}
                  className="mt-6 w-full bg-green-600 hover:bg-green-700 py-3 rounded-lg font-bold"
                >

                  {currentQuestion + 1 === questions.length
                    ? "Finish Interview"
                    : "Next Question"}

                </button>

              </div>

            )}

          </>

        ) : (

          <h2 className="text-center text-xl mt-10">

            Loading Questions...

          </h2>

        )}

      </div>

    </div>

  );

}

export default Interview;