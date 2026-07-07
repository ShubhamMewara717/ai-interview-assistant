import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

    if (data.error) {
    alert(data.error);
} else {
    alert(data.message);
    navigate("/dashboard");
}
    } catch (error) {
      alert("Cannot connect to backend.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">

      <div className="bg-slate-900 w-[420px] rounded-2xl shadow-xl p-8">

        <h1 className="text-4xl font-bold text-center text-white">
          AI Interview Assistant
        </h1>

        <p className="text-center text-gray-400 mt-2">
          Welcome Back 👋
        </p>

        <form onSubmit={handleLogin} className="mt-8">

          <label className="text-gray-300">Email</label>

          <input
            type="email"
            placeholder="Enter Email"
            className="w-full mt-2 p-3 rounded-lg bg-slate-800 text-white border border-slate-700"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className="text-gray-300 block mt-6">
            Password
          </label>

          <input
            type="password"
            placeholder="Enter Password"
            className="w-full mt-2 p-3 rounded-lg bg-slate-800 text-white border border-slate-700"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="w-full mt-8 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
          >
            Login
          </button>

        </form>

        <p className="text-center text-gray-400 mt-6">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-blue-400 hover:underline"
          >
            Create Account
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Login;