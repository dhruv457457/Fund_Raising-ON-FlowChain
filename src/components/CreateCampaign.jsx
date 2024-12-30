import React, { useState } from 'react';
import { ethers } from 'ethers';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../utils/contract';

export const CreateCampaign = () => {
  const [form, setForm] = useState({ title: '', description: '', targetAmount: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, description, targetAmount } = form;
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

      const tx = await contract.createCampaign(title, description, ethers.utils.parseEther(targetAmount));
      await tx.wait();
      alert('Campaign created successfully!');
    } catch (err) {
      console.error('Error creating campaign:', err);
    }
  };

  return (
    <form className="p-6 bg-darkBlack text-neonGreen rounded-lg shadow-lg max-w-lg mx-auto mt-10" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold text-center mb-6">Create a Campaign</h2>

      <label className="block text-lg font-medium mb-2" htmlFor="title">Title</label>
      <input
        type="text"
        id="title"
        placeholder="Campaign Title"
        className="w-full p-3 mb-4 bg-gray-800 text-neonGreen rounded-lg focus:outline-none focus:ring-2 focus:ring-neonGreen"
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        value={form.title}
      />

      <label className="block text-lg font-medium mb-2" htmlFor="description">Description</label>
      <textarea
        id="description"
        placeholder="Campaign Description"
        className="w-full p-3 mb-4 bg-gray-800 text-neonGreen rounded-lg focus:outline-none focus:ring-2 focus:ring-neonGreen"
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        value={form.description}
      />

      <label className="block text-lg font-medium mb-2" htmlFor="targetAmount">Target Amount (ETH)</label>
      <input
        type="text"
        id="targetAmount"
        placeholder="Target Amount in ETH"
        className="w-full p-3 mb-6 bg-gray-800 text-neonGreen rounded-lg focus:outline-none focus:ring-2 focus:ring-neonGreen"
        onChange={(e) => setForm({ ...form, targetAmount: e.target.value })}
        value={form.targetAmount}
      />

      <button
        type="submit"
        className="w-full py-3 bg-neonGreen text-darkBlack rounded-lg font-semibold hover:bg-neonGreenDark transform transition duration-300 hover:scale-105"
      >
        Create Campaign
      </button>
    </form>
  );
};
