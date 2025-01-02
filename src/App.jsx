import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";

import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import Leaderboard from "./pages/Leaderboard";
import AdminPanel from "./pages/AdminPanel"; // Import Admin Panel
import Navbar from "./components/Navbar";

function App() {
  return (
<<<<<<< Updated upstream
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/admin" element={<AdminPanel />} /> {/* Admin Panel */}
      </Routes>
    </Router>
=======
    <div className="bg-darkBlack text-neonGreen min-h-screen">
      <header className="p-4 bg-black-900 text-center">
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
>>>>>>> Stashed changes
  );
}

export default App;
