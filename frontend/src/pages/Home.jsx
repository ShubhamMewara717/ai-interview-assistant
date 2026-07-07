import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* Navbar */}
      <nav className="flex justify-between items-center px-10 py-6 border-b border-slate-800">

        <h1 className="text-3xl font-bold text-blue-500">
          AI Interview Assistant
        </h1>

        <div className="space-x-4">
          <Link
            to="/login"
            className="px-5 py-2 border border-blue-500 rounded-lg hover:bg-blue-500 transition"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="px-5 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition"
          >
            Register
          </Link>
        </div>

      </nav>

      {/* Hero */}

      <div className="flex flex-col justify-center items-center text-center mt-32">

        <h2 className="text-6xl font-bold">
          Crack Your Dream Job
        </h2>

        <h3 className="text-6xl font-bold text-blue-500 mt-3">
          With AI
        </h3>

        <p className="text-gray-400 text-xl mt-8 max-w-2xl">
          Upload your resume, practice technical interviews,
          receive AI feedback and improve your confidence.
        </p>

        <div className="mt-12 flex gap-6">

          <Link
            to="/login"
            className="bg-blue-600 px-8 py-4 rounded-xl text-xl hover:bg-blue-700"
          >
            Get Started
          </Link>

          <Link
            to="/register"
            className="border border-white px-8 py-4 rounded-xl text-xl hover:bg-white hover:text-black transition"
          >
            Create Account
          </Link>

        </div>

      </div>

      {/* Features */}

      <div className="grid md:grid-cols-3 gap-8 px-20 mt-32">

        <div className="bg-slate-900 rounded-2xl p-8">
          <h2 className="text-2xl font-bold">
            Resume Analysis
          </h2>

          <p className="text-gray-400 mt-4">
            Upload resume and extract technical skills automatically.
          </p>
        </div>

        <div className="bg-slate-900 rounded-2xl p-8">
          <h2 className="text-2xl font-bold">
            AI Interview
          </h2>

          <p className="text-gray-400 mt-4">
            Practice unlimited HR and technical interview questions.
          </p>
        </div>

        <div className="bg-slate-900 rounded-2xl p-8">
          <h2 className="text-2xl font-bold">
            Instant Feedback
          </h2>

          <p className="text-gray-400 mt-4">
            Receive score and suggestions to improve every interview.
          </p>
        </div>

      </div>

    </div>
  );
}

export default Home;