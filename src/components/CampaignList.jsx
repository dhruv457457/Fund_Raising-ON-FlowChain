import React from 'react';
import { ethers } from 'ethers';

export const CampaignList = ({ campaigns }) => {
  return (
    <div className="p-6 bg-darkBlack rounded-lg shadow-lg max-w-3xl mx-auto mt-12">
      <h2 className="text-neonGreen text-center font-bold text-2xl mb-6">Active Campaigns</h2>
      {campaigns.length === 0 ? (
        <p className="text-center text-gray-400">No active campaigns at the moment. Please check back later!</p>
      ) : (
        campaigns.map((campaign, index) => (
          <div
            key={index}
            className="bg-gray-900 p-6 rounded-lg shadow-lg mb-4 hover:shadow-2xl transition-shadow duration-300"
          >
            <h3 className="text-neonGreen text-xl font-semibold mb-2">{campaign.title}</h3>
            <p className="text-gray-300 mb-4">{campaign.description}</p>
            <div className="flex justify-between text-sm text-gray-400">
              <p>
                <span className="font-bold">Target:</span> {ethers.utils.formatEther(campaign.targetAmount)} ETH
              </p>
              <p>
                <span className="font-bold">Funds Raised:</span> {ethers.utils.formatEther(campaign.fundsRaised)} ETH
              </p>
            </div>
            <div className="flex justify-end mt-4">
              <button
                className="px-4 py-2 bg-neonGreen text-darkBlack font-semibold rounded-lg hover:bg-neonGreenDark transition duration-300"
              >
                View Details
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};
