import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {

    e.preventDefault();

    try {

      const response = await fetch("http://127.0.0.1:8000/register", {

        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          username,
          email,
          password,
        }),

      });

      const data = await response.json();

      if (data.error) {

        alert(data.error);

      } else {

        alert(data.message);

        navigate("/login");

      }

    } catch (error) {

      alert("Cannot connect to backend.");

    }

  };

  return (

    <div className="min-h-screen flex justify-center items-center bg-slate-900">

      <div className="bg-slate-800 w-[430px] p-8 rounded-2xl shadow-xl">

        <h1 className="text-4xl font-bold text-center text-white">
          Create Account
        </h1>

        <p className="text-center text-gray-400 mt-2">
          Join AI Interview Assistant
        </p>

        <form onSubmit={handleRegister} className="mt-8">

          <label className="text-gray-300">
            Username
          </label>

          <input
            type="text"
            placeholder="Enter Username"
            className="w-full mt-2 p-3 rounded-lg bg-slate-700 text-white"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label className="text-gray-300 block mt-5">
            Email
          </label>

          <input
            type="email"
            placeholder="Enter Email"
            className="w-full mt-2 p-3 rounded-lg bg-slate-700 text-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className="text-gray-300 block mt-5">
            Password
          </label>

          <input
            type="password"
            placeholder="Enter Password"
            className="w-full mt-2 p-3 rounded-lg bg-slate-700 text-white"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="w-full mt-8 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-bold"
          >
            Register
          </button>

        </form>

        <p className="text-center text-gray-400 mt-6">

          Already have an account?{" "}

          <Link
            to="/login"
            className="text-blue-400 hover:underline"
          >
            Login
          </Link>

        </p>

      </div>

    </div>

  );

}

export default Register;