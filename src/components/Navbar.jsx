import React, { useState } from "react";
import { ethers } from "ethers";
import { Link } from "react-router-dom";
import WalletConnection from './WalletConnection'; // If using a separate WalletConnection component

const Navbar = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);

  // Connect wallet and setup Ethereum provider
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        // Request account access
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setWalletAddress(accounts[0]);

        // Setup provider and contract
        const _provider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(_provider);
        
        const signer = _provider.getSigner();
        const contractAddress = "YOUR_CONTRACT_ADDRESS"; // Replace with your contract address
        const contractABI = [
          // Replace with your contract's ABI
          "function yourFunction() public view returns (string)"
        ];

        const _contract = new ethers.Contract(contractAddress, contractABI, signer);
        setContract(_contract);

      } catch (error) {
        console.error("Wallet connection failed:", error);
      }
    } else {
      alert("MetaMask is required to connect!");
    }
  };

  // Example function to interact with the smart contract
  const fetchDataFromContract = async () => {
    if (contract) {
      try {
        const data = await contract.yourFunction();
        console.log("Contract Data:", data);
      } catch (error) {
        console.error("Error fetching data from contract:", error);
      }
    }
  };

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center shadow-lg rounded-lg">
      {/* Left: Logo */}
      <div>
        <Link to="/" className="text-3xl font-extrabold text-pink-500 neon-text">
          Quiz DApp
        </Link>
      </div>

      {/* Middle: Navigation Links */}
      <div className="hidden md:flex space-x-6">
        <Link
          to="/"
          className="text-lg font-semibold hover:text-green-500 transition-all duration-300 neon-link"
        >
          Home
        </Link>
        <Link
          to="/quiz"
          className="text-lg font-semibold hover:text-green-500 transition-all duration-300 neon-link"
        >
          Play Quiz
        </Link>
        <Link
          to="/leaderboard"
          className="text-lg font-semibold hover:text-green-500 transition-all duration-300 neon-link"
        >
          Leaderboard
        </Link>
        <Link
          to="/about"
          className="text-lg font-semibold hover:text-green-500 transition-all duration-300 neon-link"
        >
          About
        </Link>
      </div>

      {/* Right: Wallet Connect */}
      <div>
        {walletAddress ? (
          <span className="px-4 py-2 rounded bg-green-500 neon-box">
            {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
          </span>
        ) : (
          <WalletConnection setWalletAddress={setWalletAddress} />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
