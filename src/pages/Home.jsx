import React from 'react';
import RoutineSearch from '../components/RoutineSearch';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white overflow-x-auto pt-15">
      <div className="flex-grow w-full px-4 py-8">
        <div className="max-w-4xl mx-auto">

          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white drop-shadow-lg">
              📅 Routine Scraper
            </h1>
            <p className="mt-4 text-gray-300 text-lg md:text-xl">
              Smart Routine Management System for University Students
            </p>
          </div>

          {/* Routine Search Card Only */}
          
            <RoutineSearch />
          
          
        </div>
      </div>

  
    </div>
  );
};

export default Home;
