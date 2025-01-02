import React, { useState } from 'react';

export const ConnectWallet = ({ onWalletConnected }) => {
  const [walletAddress, setWalletAddress] = useState(null);

  const connectWallet = async () => {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setWalletAddress(accounts[0]);
      onWalletConnected(accounts[0]);
    } else {
      alert('Please install MetaMask to use this app!');
    }
  };

  return (
    <div className="text-center p-6 bg-darkBlack rounded-lg shadow-lg max-w-md mx-auto mt-12">
      {walletAddress ? (
        <div className="text-neonGreen">
          <p className="font-semibold text-lg">Connected Wallet:</p>
          <p className="truncate text-sm">{walletAddress}</p>
        </div>
      ) : (
        <button
          onClick={connectWallet}
          className="w-full py-3 bg-neonGreen text-darkBlack font-semibold rounded-lg hover:bg-neonGreenDark transform transition duration-300 hover:scale-105"
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
};
