import React, { useState } from "react";
import PropTypes from "prop-types";
import { ethers } from "ethers";

// Helper functions
const formatDate = (timestamp) => {
  const date = new Date(timestamp * 1000); // Convert to milliseconds
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
};

const shortenAddress = (address) => `${address.slice(0, 6)}...${address.slice(-4)}`;

const CampaignCard = ({ campaign, onContribute }) => {
  const [loading, setLoading] = useState(false);

  // Format values
  const formattedTargetAmount = ethers.utils.formatEther(campaign.targetAmount);
  const formattedAmountCollected = ethers.utils.formatEther(campaign.amountCollected);
  const formattedDeadline = formatDate(campaign.deadline);

  // Determine status
  const isExpired = new Date().getTime() / 1000 > campaign.deadline;
  const status = campaign.isCompleted
    ? "Completed"
    : isExpired
    ? "Expired"
    : "Active";

  const statusColor =
    status === "Completed" ? "text-green-500" : status === "Expired" ? "text-red-500" : "text-yellow-500";

  const handleContribute = async () => {
    try {
      setLoading(true);
      await onContribute(campaign.id);
    } catch (error) {
      console.error("Contribution failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
      <h3 className="text-xl font-semibold text-gray-800 truncate">{campaign.title || "Untitled Campaign"}</h3>
      <p className="text-gray-600 mt-2 line-clamp-3">
        {campaign.description || "No description provided."}
      </p>

      <div className="mt-4">
        <div className="flex justify-between">
          <span className="text-gray-600">Target:</span>
          <span className="text-gray-800">{formattedTargetAmount} ETH</span>
        </div>

        <div className="flex justify-between mt-2">
          <span className="text-gray-600">Collected:</span>
          <span className="text-gray-800">{formattedAmountCollected} ETH</span>
        </div>

        <div className="flex justify-between mt-2">
          <span className="text-gray-600">Creator:</span>
          <span className="text-gray-800">{shortenAddress(campaign.creator)}</span>
        </div>

        <div className="flex justify-between mt-2">
          <span className="text-gray-600">Deadline:</span>
          <span className="text-gray-800">{formattedDeadline}</span>
        </div>

        <div className="mt-4 text-center">
          <span className={`font-semibold ${statusColor}`}>{status}</span>
        </div>

        {!campaign.isCompleted && !isExpired && (
          <button
            onClick={handleContribute}
            className={`mt-4 w-full py-2 rounded-lg transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
            disabled={loading}
          >
            {loading ? "Processing..." : "Contribute"}
          </button>
        )}
      </div>
    </div>
  );
};

CampaignCard.propTypes = {
  campaign: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string,
    description: PropTypes.string,
    targetAmount: PropTypes.string.isRequired,
    amountCollected: PropTypes.string.isRequired,
    creator: PropTypes.string.isRequired,
    deadline: PropTypes.number.isRequired,
    isCompleted: PropTypes.bool.isRequired,
  }).isRequired,
  onContribute: PropTypes.func.isRequired,
};

export default CampaignCard;
