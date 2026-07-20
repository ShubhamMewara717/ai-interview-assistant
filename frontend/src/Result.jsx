import { useNavigate } from "react-router-dom";

function Result() {

  const navigate = useNavigate();

  return (

    <div className="min-h-screen bg-slate-900 text-white flex justify-center items-center">

      <div className="bg-slate-800 w-[700px] p-8 rounded-xl shadow-xl">

        <h1 className="text-4xl font-bold text-center text-green-400">
          🎉 Interview Completed
        </h1>

        <div className="mt-8 space-y-4 text-xl">

          <div className="flex justify-between">
            <span>Total Questions</span>
            <span>12</span>
          </div>

          <div className="flex justify-between">
            <span>Answered</span>
            <span>12</span>
          </div>

          <div className="flex justify-between">
            <span>Average Score</span>
            <span>8.5 / 10</span>
          </div>

          <div className="flex justify-between">
            <span>Percentage</span>
            <span>85%</span>
          </div>

          <div className="flex justify-between">
            <span>Grade</span>
            <span className="text-yellow-400 font-bold">
              A ⭐⭐⭐⭐☆
            </span>
          </div>

        </div>

        <button
          onClick={() => navigate("/dashboard")}
          className="mt-10 w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg font-bold"
        >
          Back To Dashboard
        </button>

      </div>

    </div>

  );

}

export default Result;