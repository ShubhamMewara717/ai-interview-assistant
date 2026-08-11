import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();

  const username = localStorage.getItem("username");
  const email = localStorage.getItem("email");

  const [stats, setStats] = useState({
    total_interviews: 0,
    best_score: 0,
    average_score: 0,
    average_percentage: 0,
  });

  useEffect(() => {
    loadPerformance();
  }, []);

  const loadPerformance = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/performance/${username}`
      );

      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-slate-900 flex justify-center items-center text-white">

      <div className="bg-slate-800 w-[600px] rounded-xl p-8 shadow-xl">

        <h1 className="text-4xl font-bold text-center mb-8">
          👤 My Profile
        </h1>

        <div className="space-y-4 text-xl">

          <div className="flex justify-between">
            <span className="text-gray-400">Username</span>
            <span>{username}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-400">Email</span>
            <span>{email}</span>
          </div>

          <hr className="border-slate-600 my-4" />

          <div className="flex justify-between">
            <span>Total Interviews</span>
            <span>{stats.total_interviews}</span>
          </div>

          <div className="flex justify-between">
            <span>Best Score</span>
            <span>{stats.best_score}</span>
          </div>

          <div className="flex justify-between">
            <span>Average Score</span>
            <span>{stats.average_score}</span>
          </div>

          <div className="flex justify-between">
            <span>Average Percentage</span>
            <span>{stats.average_percentage}%</span>
          </div>

        </div>

        <button
          onClick={() => navigate("/dashboard")}
          className="w-full mt-8 bg-blue-600 hover:bg-blue-700 py-3 rounded-lg font-bold"
        >
          Back to Dashboard
        </button>

        <button
          onClick={logout}
          className="w-full mt-4 bg-red-600 hover:bg-red-700 py-3 rounded-lg font-bold"
        >
          Logout
        </button>

      </div>

    </div>
  );
}

export default Profile;