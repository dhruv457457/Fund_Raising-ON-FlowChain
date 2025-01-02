import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { Home } from './components/Home';
import { CreateCampaign } from './components/CreateCampaign';
import { CampaignList } from './components/CampaignList';
import { ConnectWallet } from './components/ConnectWallet';
import { Contribute } from './components/Contribute';
import { WithdrawFunds } from './components/WithdrawFunds';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from './utils/contract';

function App() {
  const [connectedWallet, setConnectedWallet] = useState('');
  const [campaigns, setCampaigns] = useState([]); // State to hold campaigns
  const [loading, setLoading] = useState(false); // State for loading

  useEffect(() => {
    if (connectedWallet) {
      fetchCampaigns();
    }
  }, [connectedWallet]);

  const fetchCampaigns = async () => {
    setLoading(true); // Start loading
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
      const campaignsData = await contract.getCampaigns();
      setCampaigns(campaignsData);
    } catch (err) {
      console.error('Error fetching campaigns:', err);
      alert('Error fetching campaigns. Please try again later.');
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="bg-darkBlack text-neonGreen min-h-screen">
      <header className="p-4 bg-gray-900 text-center">
        <ConnectWallet onWalletConnected={(address) => setConnectedWallet(address)} />
      </header>
      <main className="container mx-auto px-4 py-8">
        <Home />
        <CreateCampaign />
        
        {loading ? (
          <div className="text-center text-gray-400">Loading campaigns...</div>
        ) : (
          <CampaignList campaigns={campaigns} />
        )}
        
        {connectedWallet && campaigns.length > 0 && (
          <section className="mt-8">
            <h2 className="text-2xl font-bold p-4 text-center">Campaign Actions</h2>
            <div className="space-y-6">
              {campaigns.map((campaign, index) => (
                <div key={index} className="bg-gray-800 p-4 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
                  <h3 className="text-xl font-semibold mb-2">{campaign.title}</h3>
                  <div className="space-y-2 mb-4">
                    <Contribute campaignId={index} />
                    <WithdrawFunds campaignId={index} />
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
