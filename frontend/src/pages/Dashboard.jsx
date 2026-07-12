import { useNavigate } from "react-router-dom";
function Dashboard() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-slate-900 text-white">

      {/* Navbar */}
      <div className="bg-slate-800 flex justify-between items-center p-5 shadow-lg">

        <h1 className="text-3xl font-bold text-blue-400">
          AI Interview Assistant
        </h1>

        <button className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-lg">
          Logout
        </button>

      </div>

      {/* Welcome */}
      <div className="text-center mt-10">

        <h2 className="text-4xl font-bold">
          Welcome Shubham 👋
        </h2>

        <p className="text-gray-400 mt-2">
          Prepare for your dream interview with AI.
        </p>

      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-10">
        
        <div 
          onClick={() => navigate("/upload-resume")}
          className="bg-slate-800 rounded-xl p-6 hover:bg-slate-700 cursor-pointer shadow-lg"
          >
          <h3 className="text-2xl font-bold">📄 Upload Resume</h3>
          <p className="mt-3 text-gray-400">
            Upload your latest resume.
          </p>
        </div>

        <div
          onClick={() => navigate("/resume-analysis")}
          className="bg-slate-800 rounded-xl p-6 hover:bg-slate-700 cursor-pointer shadow-lg"
        >
          <h3 className="text-2xl font-bold">🤖 Resume Analysis</h3>
          <p className="mt-3 text-gray-400">
            Detect skills using AI.
          </p>
        </div>

        <div className="bg-slate-800 rounded-xl p-6 hover:bg-slate-700 cursor-pointer shadow-lg">
          <h3 className="text-2xl font-bold">🎤 Start Interview</h3>
          <p className="mt-3 text-gray-400">
            Begin AI mock interview.
          </p>
        </div>

        <div className="bg-slate-800 rounded-xl p-6 hover:bg-slate-700 cursor-pointer shadow-lg">
          <h3 className="text-2xl font-bold">📊 History</h3>
          <p className="mt-3 text-gray-400">
            View previous interviews.
          </p>
        </div>

        <div className="bg-slate-800 rounded-xl p-6 hover:bg-slate-700 cursor-pointer shadow-lg">
          <h3 className="text-2xl font-bold">🏆 Performance</h3>
          <p className="mt-3 text-gray-400">
            Check your AI score.
          </p>
        </div>

        <div className="bg-slate-800 rounded-xl p-6 hover:bg-slate-700 cursor-pointer shadow-lg">
          <h3 className="text-2xl font-bold">👤 Profile</h3>
          <p className="mt-3 text-gray-400">
            Manage your account.
          </p>
        </div>

      </div>

    </div>
  );
}

export default Dashboard;