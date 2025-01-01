import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="bg-gradient-to-r from-purple-700 via-pink-500 to-red-500 text-white min-h-screen flex flex-col justify-center items-center text-center py-16">
      {/* Hero Section */}
      <div className="space-y-6">
        {/* Title */}
        <h1 className="text-5xl font-extrabold text-cyan-100 neon-text">
          Welcome to Quiz DApp
        </h1>
        <p className="text-lg text-white max-w-2xl mx-auto mt-4">
          Test your knowledge and compete with players worldwide in this fun blockchain-powered quiz app. Play now and win exciting rewards!
        </p>
        
        {/* Call to Action Button */}
        <Link
          to="/quiz"
          className="mt-6 px-8 py-4 rounded-lg bg-pink-500 hover:bg-pink-600 neon-button text-xl font-semibold transition-all duration-300"
        >
          Start Quiz
        </Link>
      </div>

      {/* Quick Links to Main Sections */}
      <div className="mt-12 space-x-6">
        <Link
          to="/leaderboard"
          className="text-lg font-semibold hover:text-green-500 transition-all duration-300 neon-link"
        >
          Leaderboard
        </Link>
        <Link
          to="/about"
          className="text-lg font-semibold hover:text-green-500 transition-all duration-300 neon-link"
        >
          About
        </Link>
      </div>
    </div>
  );
};

export default Home;
