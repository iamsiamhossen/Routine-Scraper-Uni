import React from "react";

const routines = [
  {
    name: "Lab Routine",
    url: "https://drive.google.com/file/d/1rJUJb7BcQvzT28QtrsguMRxwAeifx2iL/view?usp=sharing",
  },

  {
    name: "Theory Exam Routine",
    url: "https://drive.google.com/file/d/1MeS8CCrbB4dK4PC-Ls3Mpe4k2WBqQeXQ/view?usp=sharing",
  },
  {
    name: "Class Routine",
    url: "https://drive.google.com/file/d/1oeZf8j5nDs_xz4I5BCqmIJNpW5H2Jl4f/view?usp=sharing",
  },
];

const RoutineDownload = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white overflow-x-auto pt-15 px-6">
      <h1 className="text-5xl font-extrabold text-center mb-16 pt-10">
        Routine Download
      </h1>

      <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto w-full">
        {routines.map(({ name, url }) => (
          <div
            key={name}
            className="bg-gray-800 rounded-xl shadow-lg p-8 flex flex-col justify-between hover:bg-gray-700 transition-colors duration-300"
          >
            <h2 className="text-2xl font-semibold mb-6 text-indigo-400">{name}</h2>
            <a
              href={url}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto inline-block px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg text-center hover:bg-indigo-700 transition-colors"
            >
              Download PDF
            </a>
          </div>
        ))}
      </div>

    </div>
  );
};

export default RoutineDownload;
