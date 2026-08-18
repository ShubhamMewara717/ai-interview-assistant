import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

function Performance() {

  const navigate = useNavigate();

  const [data, setData] = useState(null);

  useEffect(() => {
    loadPerformance();
  }, []);

  const loadPerformance = async () => {

    try {

      const username = localStorage.getItem("username");

      const response = await fetch(
    `http://127.0.0.1:8000/performance/${username}`
    );

      const result = await response.json();

      setData(result);

    } catch {

      alert("Cannot load performance.");

    }

  };

  if (!data) {

    return (
      <div className="min-h-screen bg-slate-900 flex justify-center items-center text-white text-2xl">
        Loading...
      </div>
    );

  }

  const pieData = [
    {
      name: "Average %",
      value: data.average_percentage,
    },
    {
      name: "Remaining",
      value: 100 - data.average_percentage,
    },
  ];

  const COLORS = ["#3B82F6", "#475569"];

  return (

    <div className="min-h-screen bg-slate-900 text-white p-10">

      <h1 className="text-5xl font-bold text-center mb-10">
        Performance Dashboard
      </h1>

      <div className="grid grid-cols-2 gap-6">

        <div className="bg-slate-800 rounded-xl p-6">

          <h2 className="text-xl text-gray-400">
            Total Interviews
          </h2>

          <p className="text-5xl font-bold mt-3">
            {data.total_interviews}
          </p>

        </div>

        <div className="bg-slate-800 rounded-xl p-6">

          <h2 className="text-xl text-gray-400">
            Best Score
          </h2>

          <p className="text-5xl font-bold mt-3 text-green-400">
            {data.best_score}
          </p>

        </div>

        <div className="bg-slate-800 rounded-xl p-6">

          <h2 className="text-xl text-gray-400">
            Average Score
          </h2>

          <p className="text-5xl font-bold mt-3 text-yellow-400">
            {data.average_score}
          </p>

        </div>

        <div className="bg-slate-800 rounded-xl p-6">

          <h2 className="text-xl text-gray-400">
            Average Percentage
          </h2>

          <p className="text-5xl font-bold mt-3 text-blue-400">
            {data.average_percentage}%
          </p>

        </div>

      </div>
            <div className="mt-10 bg-slate-800 rounded-xl p-6">

        <h2 className="text-2xl font-bold mb-6">
          Score History
        </h2>

        <ResponsiveContainer width="100%" height={300}>

          <BarChart data={data.scores}>

            <XAxis dataKey="id" />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="score"
              fill="#3B82F6"
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

      <div className="mt-10 bg-slate-800 rounded-xl p-6">

        <h2 className="text-2xl font-bold mb-6">
          Average Performance
        </h2>

        <div className="flex justify-center">

          <PieChart width={350} height={350}>

            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              outerRadius={120}
              dataKey="value"
              label
            >

              {pieData.map((entry, index) => (

                <Cell
                  key={index}
                  fill={COLORS[index]}
                />

              ))}

            </Pie>

            <Tooltip />

          </PieChart>

        </div>

      </div>

      <button
        onClick={() => navigate("/dashboard")}
        className="mt-10 w-full bg-blue-600 hover:bg-blue-700 py-4 rounded-xl text-xl font-bold"
      >
        Back to Dashboard
      </button>

    </div>

  );

}

export default Performance;