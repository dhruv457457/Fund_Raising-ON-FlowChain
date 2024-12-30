import React, { useState } from 'react';
import { ethers } from 'ethers';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../utils/contract';

export const WithdrawFunds = ({ campaignId }) => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const withdraw = async () => {
    setErrorMessage(null); // Reset any previous errors
    setLoading(true);

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

      // Check if the campaign has already withdrawn funds (you need to implement this in your smart contract)
      const hasWithdrawn = await contract.hasWithdrawnFunds(campaignId);

      if (hasWithdrawn) {
        setErrorMessage('Funds have already been withdrawn for this campaign.');
        setLoading(false);
        return;
      }

      // Proceed with withdrawing funds if not already withdrawn
      const tx = await contract.withdrawFunds(campaignId);
      await tx.wait();
      alert('Funds withdrawn successfully!');
    } catch (err) {
      console.error('Error withdrawing funds:', err);
      setErrorMessage(err.message || 'An error occurred while withdrawing funds.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={withdraw}
        disabled={loading}
        className="bg-neonGreen text-darkBlack p-2 rounded mt-2"
      >
        {loading ? 'Withdrawing...' : 'Withdraw Funds'}
      </button>
      {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
    </div>
  );
};
