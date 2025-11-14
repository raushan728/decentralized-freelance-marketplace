import React, { useState, useContext, useEffect } from 'react';
import { BlockchainContext } from '../context/BlockchainContext';

function StakeForm() {
  const { platformToken, jobManager, account } = useContext(BlockchainContext);
  const [isStaked, setIsStaked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const checkStakingStatus = async () => {
      if (jobManager && account) {
        try {
          const stakedStatus = await jobManager.isStaked(account);
          setIsStaked(stakedStatus);
        } catch (e) {
            console.log("Checking stake status failed, will retry.")
        }
      }
    };
    const timer = setTimeout(() => {
        checkStakingStatus();
    }, 500);

    return () => clearTimeout(timer);
  }, [jobManager, account]);

  const handleStake = async () => {
    if (!platformToken || !jobManager) {
      setError('Contracts not connected.');
      return;
    }
    
    setIsLoading(true);
    setError('');

    try {
      const stakeAmount = await jobManager.STAKE_AMOUNT();
      console.log('Requesting approval...');
      const approveTx = await platformToken.approve(await jobManager.getAddress(), stakeAmount);
      await approveTx.wait();
      console.log('Approval confirmed!');
      console.log('Requesting stake...');
      const stakeTx = await jobManager.stake();
      await stakeTx.wait();
      console.log('Staking confirmed!');
      
      alert('You have successfully staked 100 DFMT!');
      setIsStaked(true);

    } catch (err) {
      console.error("Staking failed:", err);
      setError(err.message || 'An error occurred.');
      alert('Staking failed. See console for details.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isStaked) {
    return (
      <div className="w-full max-w-md mx-auto my-12 p-6 bg-green-900 bg-opacity-50 backdrop-blur-md rounded-xl shadow-2xl border border-green-700 text-center">
        <h3 className="text-2xl font-bold text-white mb-2">You are a Verified Freelancer!</h3>
        <p className="text-green-200">You are all set to bid on jobs.</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto my-12 p-6 bg-gray-900 bg-opacity-50 backdrop-blur-md rounded-xl shadow-2xl border border-gray-700 text-center">
      <h3 className="text-2xl font-bold text-white mb-4">Become a Verified Freelancer</h3>
      <p className="text-gray-300 mb-6">Stake 100 DFMT to start bidding on jobs.</p>
      
      <button
        onClick={handleStake}
        disabled={isLoading || !account}
        className={`w-full font-bold py-3 px-4 rounded-lg text-white transition duration-300 ease-in-out transform hover:scale-105 ${ (isLoading || !account) ? 'bg-gray-600 cursor-not-allowed' : 'bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600' }`}
      >
        {isLoading ? 'Processing...' : (account ? 'Stake 100 DFMT' : 'Connect Wallet to Stake')}
      </button>

      {error && <p className="text-red-400 text-sm mt-4">{error}</p>}
    </div>
  );
}

export default StakeForm;