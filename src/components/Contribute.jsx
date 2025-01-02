import React, { useState } from 'react';
import { ethers } from 'ethers';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../utils/contract';

export const Contribute = ({ campaignId }) => {
  const [amount, setAmount] = useState('');

  const contribute = async () => {
    if (!window.ethereum) return alert('MetaMask is required');
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

    try {
      await contract.contribute(campaignId, { value: ethers.utils.parseEther(amount) });
      alert('Contribution successful!');
      setAmount('');
    } catch (err) {
      console.error(err);
      alert('Failed to contribute.');
    }
  };

  return (
    <div className="p-6 bg-darkBlack text-neonGreen rounded-lg shadow-lg max-w-md mx-auto mt-10">
      <h3 className="text-xl font-semibold text-center mb-4">Contribute to Campaign</h3>

      <label className="block text-lg font-medium mb-2" htmlFor="amount">Amount (ETH)</label>
      <input
        type="number"
        id="amount"
        className="w-full p-3 mb-4 bg-gray-800 text-neonGreen border-2 border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-neonGreen"
        placeholder="Enter amount to contribute"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <button
        type="button"
        onClick={contribute}
        className="w-full py-3 bg-neonGreen text-darkBlack rounded-lg font-semibold hover:bg-neonGreenDark transform transition duration-300 hover:scale-105"
      >
        Contribute
      </button>
    </div>
  );
};
