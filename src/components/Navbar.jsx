import React from 'react';

const Navbar = ({ account, onConnectWallet }) => {
  // Helper function to shorten Ethereum address
  const shortenAddress = (address) =>
    `${address.slice(0, 6)}...${address.slice(-4)}`;

  return (
    <nav className="bg-blue-500 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Fundraiser DApp</h1>
        <div className="flex items-center space-x-4">
          {account ? (
            <p className="bg-gray-700 text-white py-2 px-4 rounded">
              Connected: {shortenAddress(account)}
            </p>
          ) : (
            <button
              onClick={onConnectWallet || (() => alert('Connect wallet function not provided.'))}
              className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition"
            >
              Connect Wallet
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
