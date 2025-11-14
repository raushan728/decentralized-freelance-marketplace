import React, { useContext } from 'react';
import { BlockchainContext } from './context/BlockchainContext';
import Navbar from './components/Navbar';
import CreateJob from './components/CreateJob';
import StakeForm from './components/StakeForm';
import JobList from './components/JobList';
import Footer from './components/Footer';

function App() {
  const { account } = useContext(BlockchainContext);

  // Jab wallet connect nahi hoga, to ye message dikhega
  const WelcomeMessage = () => (
    <div className="text-center py-20 animate-fade-in">
      <h2 className="text-3xl font-bold mb-4 text-white">Welcome to the Future of Work</h2>
      <p className="text-gray-300 max-w-xl mx-auto">Please connect your MetaMask wallet to post jobs, place bids, and interact with the decentralized marketplace.</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white flex flex-col">
      <Navbar />
      <main className="container mx-auto p-4 md:p-8 flex-grow">
        <div className="text-center mb-12 mt-12 animate-fade-in-down">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Decentralized Freelance Marketplace
          </h1>
          <p className="text-lg mt-4 text-gray-300">
            Connecting Talent with Opportunity, On-Chain.
          </p>
        </div>
        
        {/* Yahan Logic Hai: Agar account connected hai, to main content dikhao */}
        {account ? (
          <div className="animate-fade-in-up">
            {/* Forms ko side-by-side dikhane ke liye Grid ka use */}
            <div className="grid lg:grid-cols-5 gap-12 items-start mb-16">
              <div className="lg:col-span-3">
                <CreateJob />
              </div>
              <div className="lg:col-span-2">
                <StakeForm />
              </div>
            </div>
            
            {/* Jobs ki List */}
            <JobList />
          </div>
        ) : (
          // Agar account connected nahi hai, to Welcome Message dikhao
          <WelcomeMessage />
        )}

      </main>
      <Footer />
    </div>
  );
}

export default App;