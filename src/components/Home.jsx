import React from 'react';

export const Home = () => (
  <div className="p-8 bg-gradient-to-r from-blue-500 via-green-500 to-yellow-500 text-white min-h-screen flex flex-col justify-center items-center">
    <h1 className="text-4xl font-extrabold text-center shadow-lg text-shadow-lg">
      Welcome to Decentralized Fundraising
    </h1>
    <p className="mt-4 text-xl text-center max-w-xl">
      Browse and contribute to campaigns or create your own! The future of fundraising is decentralized, transparent, and accessible for everyone.
    </p>
    <div className="mt-8">
      <button className="px-6 py-3 bg-neonGreen text-darkBlack rounded-lg text-lg font-semibold shadow-lg hover:bg-neonGreenDark transform hover:scale-105 transition duration-300">
        Explore Campaigns
      </button>
    </div>
  </div>
);
