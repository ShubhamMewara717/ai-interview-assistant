import { useNavigate } from "react-router-dom";

function Result() {

  const navigate = useNavigate();

  const totalScore = localStorage.getItem("totalScore") || 0;
  const totalQuestions = localStorage.getItem("totalQuestions") || 1;

  const percentage = Math.round((totalScore / (totalQuestions * 10)) * 100);

  let performance = "";

  if (percentage >= 80) {
    performance = "Excellent";
  } else if (percentage >= 60) {
    performance = "Good";
  } else if (percentage >= 40) {
    performance = "Average";
  } else {
    performance = "Needs Improvement";
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white flex justify-center items-center">

      <div className="bg-slate-800 p-8 rounded-xl w-[700px]">

        <h1 className="text-4xl font-bold text-center">
          Interview Result
        </h1>

        <div className="mt-8 space-y-4">

          <div className="bg-slate-700 p-4 rounded-lg">
            <h2 className="text-2xl font-bold">
              Total Score : {totalScore}
            </h2>
          </div>

          <div className="bg-slate-700 p-4 rounded-lg">
            <h2 className="text-xl">
              Questions : {totalQuestions}
            </h2>
          </div>

          <div className="bg-slate-700 p-4 rounded-lg">
            <h2 className="text-xl">
              Percentage : {percentage}%
            </h2>
          </div>

          <div className="bg-slate-700 p-4 rounded-lg">
            <h2 className="text-xl">
              Performance : {performance}
            </h2>
          </div>

        </div>

        <button
          onClick={() => navigate("/dashboard")}
          className="mt-8 w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg font-bold"
        >
          Back to Dashboard
        </button>

      </div>

    </div>
  );
}

export default Result;