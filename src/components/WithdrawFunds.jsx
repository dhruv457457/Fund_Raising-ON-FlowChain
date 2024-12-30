import React, { useState } from 'react';
import { ethers } from 'ethers';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../utils/contract';

export const WithdrawFunds = ({ campaignId }) => {
  const [isLoading, setIsLoading] = useState(false); // To manage loading state
  const [message, setMessage] = useState(''); // To display success or error messages

  const withdraw = async () => {
    if (!window.ethereum) {
      setMessage('MetaMask is required');
      return;
    }
    
    setIsLoading(true); // Start loading
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

    try {
      const tx = await contract.withdrawFunds(campaignId);
      await tx.wait(); // Wait for the transaction to be mined
      setMessage('Funds withdrawn successfully!');
    } catch (err) {
      console.error(err);
      setMessage('Failed to withdraw funds.');
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <div className="p-4">
      {message && (
        <p className={`text-xl font-semibold ${message.includes('Failed') ? 'text-red-500' : 'text-green-500'}`}>
          {message}
        </p>
      )}
      <button
        className={`mt-4 p-3 bg-neonGreen text-darkBlack font-bold rounded-lg focus:outline-none 
          ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-neonGreenDark focus:ring-2 focus:ring-neonGreen'}`}
        onClick={withdraw}
        disabled={isLoading}
      >
        {isLoading ? (
          <span className="animate-spin">⏳</span> // Simple spinner
        ) : (
          'Withdraw Funds'
        )}
      </button>
    </div>
  );
};
