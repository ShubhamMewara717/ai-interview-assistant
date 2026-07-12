import { useState } from "react";

function UploadResume() {
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a resume.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://127.0.0.1:8000/upload-resume", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        alert("✅ Resume Uploaded Successfully");
        console.log(data);
      } else {
        alert(data.error || "Upload Failed");
      }
    } catch (error) {
      alert("Cannot connect to backend.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex justify-center items-center">
      <div className="bg-slate-800 p-8 rounded-xl w-[450px] text-white">

        <h1 className="text-3xl font-bold mb-6 text-center">
          Upload Resume
        </h1>

       <input
         type="file"
         accept=".pdf"
         onChange={(e) => setFile(e.target.files[0])}
         className="mb-6 w-full bg-white text-black p-2 rounded"
       />
        <button
          onClick={handleUpload}
          className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg"
        >
          Upload Resume
        </button>

      </div>
    </div>
  );
}

export default UploadResume;