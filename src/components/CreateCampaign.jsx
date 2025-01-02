import React, { useState } from 'react';
import { ethers } from 'ethers';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../utils/contract';

export const CreateCampaign = () => {
  const [form, setForm] = useState({ title: '', description: '', targetAmount: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, description, targetAmount } = form;
  
    if (!title || !description || !targetAmount) {
      setError("All fields are required.");
      return;
    }
  
    try {
      setIsLoading(true);
      setError('');
  
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
  
      // Try to estimate gas limit
      let estimatedGasLimit;
      try {
        estimatedGasLimit = await contract.estimateGas.createCampaign(
          title, 
          description, 
          ethers.utils.parseEther(targetAmount)
        );
      } catch (gasError) {
        console.error("Gas estimation failed:", gasError);
        estimatedGasLimit = 500000; // Fallback to a high gas limit
      }
  
      // Send transaction with estimated gas
      const tx = await contract.createCampaign(
        title, 
        description, 
        ethers.utils.parseEther(targetAmount), 
        { gasLimit: estimatedGasLimit.toString() }
      );
  
      await tx.wait();
      alert('Campaign created successfully!');
    } catch (err) {
      console.error('Error creating campaign:', err);
      setError(err.message || "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <div className="max-w-lg mx-auto mt-10">
      <form className="p-6 bg-darkBlack text-neonGreen rounded-lg shadow-lg" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold text-center mb-6">Create a Campaign</h2>

        {/* Title Input */}
        <label className="block text-lg font-medium mb-2" htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          placeholder="Campaign Title"
          className="w-full p-3 mb-4 bg-gray-800 text-neonGreen rounded-lg focus:outline-none focus:ring-2 focus:ring-neonGreen"
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          value={form.title}
        />

        {/* Description Input */}
        <label className="block text-lg font-medium mb-2" htmlFor="description">Description</label>
        <textarea
          id="description"
          placeholder="Campaign Description"
          className="w-full p-3 mb-4 bg-gray-800 text-neonGreen rounded-lg focus:outline-none focus:ring-2 focus:ring-neonGreen"
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          value={form.description}
        />

        {/* Target Amount Input */}
        <label className="block text-lg font-medium mb-2" htmlFor="targetAmount">Target Amount (ETH)</label>
        <input
          type="text"
          id="targetAmount"
          placeholder="Target Amount in ETH"
          className="w-full p-3 mb-6 bg-gray-800 text-neonGreen rounded-lg focus:outline-none focus:ring-2 focus:ring-neonGreen"
          onChange={(e) => setForm({ ...form, targetAmount: e.target.value })}
          value={form.targetAmount}
        />

        {/* Error Message */}
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 bg-neonGreen text-darkBlack rounded-lg font-semibold hover:bg-neonGreenDark transform transition duration-300 hover:scale-105"
          disabled={isLoading}
        >
          {isLoading ? 'Creating Campaign...' : 'Create Campaign'}
        </button>
      </form>
    </div>
  );
};
