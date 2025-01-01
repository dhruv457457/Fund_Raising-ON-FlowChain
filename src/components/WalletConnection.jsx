import React, { useState } from 'react';

const WalletConnection = ({ setWalletAddress }) => {
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });
        setWalletAddress(accounts[0]);
      } catch (error) {
        console.error('Wallet connection failed:', error);
      }
    } else {
      alert('MetaMask is required to connect!');
    }
  };

  return (
    <div>
      <button
        onClick={connectWallet}
        className="px-6 py-3 rounded-lg bg-pink-500 hover:bg-pink-600 neon-button font-semibold text-lg"
      >
        Connect Wallet
      </button>
    </div>
  );
};

export default WalletConnection;
