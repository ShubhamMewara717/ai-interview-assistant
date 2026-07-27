import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function History() {

  const navigate = useNavigate();

  const [history, setHistory] = useState([]);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {

    try {

      const response = await fetch(
        "http://127.0.0.1:8000/history/Shubham"
      );

      const data = await response.json();

      console.log(data);

      if (Array.isArray(data)) {
        setHistory(data);
      } else {
        console.log("API Response:", data);
        setHistory([]);
      }

    } catch (error) {

      console.log(error);

      alert("Cannot load interview history.");

    }

  };

  return (

    <div className="min-h-screen bg-slate-900 text-white flex justify-center items-center">

      <div className="bg-slate-800 w-[900px] p-8 rounded-xl">

        <h1 className="text-4xl font-bold text-center mb-8">
          Interview History
        </h1>

        <table className="w-full">

          <thead>

            <tr className="bg-slate-700">

              <th className="p-3">Date</th>

              <th className="p-3">Score</th>

              <th className="p-3">Questions</th>

              <th className="p-3">Percentage</th>

              <th className="p-3">Performance</th>

            </tr>

          </thead>

          <tbody>

            {history.length > 0 ? (

              history.map((item) => (

                <tr
                  key={item.id}
                  className="border-b border-slate-700 text-center"
                >

                  <td className="p-3">
                    {new Date(item.created_at).toLocaleDateString()}
                  </td>

                  <td className="p-3">
                    {item.total_score}
                  </td>

                  <td className="p-3">
                    {item.total_questions}
                  </td>

                  <td className="p-3">
                    {item.percentage}%
                  </td>

                  <td className="p-3">
                    {item.performance}
                  </td>

                </tr>

              ))

            ) : (

              <tr>

                <td
                  colSpan="5"
                  className="p-6 text-center text-gray-400"
                >
                  No Interview History Found
                </td>

              </tr>

            )}

          </tbody>

        </table>

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

export default History;