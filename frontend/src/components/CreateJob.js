import React, { useState, useContext } from 'react';
import { BlockchainContext } from '../context/BlockchainContext';
import { ethers } from 'ethers';
import { uploadJSONToPinata } from '../utils/pinata';

function CreateJob() {
  const { jobManager, account } = useContext(BlockchainContext);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [budget, setBudget] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCreateJob = async (e) => {
    e.preventDefault();
    if (!title || !description || !budget) {
      setError('Please fill out all fields.');
      return;
    }
    if (!jobManager) {
      setError('JobManager contract not connected. Please connect your wallet.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const jobData = { title, description };
      const jobDetailsIpfsHash = await uploadJSONToPinata(jobData);
      
      if (!jobDetailsIpfsHash) {
        throw new Error("Could not get IPFS hash for job details.");
      }
      const budgetInWei = ethers.parseEther(budget);
      const tx = await jobManager.createJob(budgetInWei, jobDetailsIpfsHash);
      
      console.log("Transaction sent:", tx.hash);
      await tx.wait();
      
      console.log("Transaction confirmed!");
      alert("Job created successfully and details pinned to IPFS!");
      
      setTitle('');
      setDescription('');
      setBudget('');

    } catch (err) {
      console.error("Error creating job:", err);
      setError(err.message || "An error occurred.");
      alert("Error creating job. See console for details.");
    } finally {
      setIsLoading(false);
    }
  };
  const InputField = ({ id, label, type, value, onChange, placeholder }) => (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-300 mb-2">{label}</label>
      <input type={type} id={id} value={value} onChange={onChange} placeholder={placeholder} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-200" />
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto mt-10 p-8 bg-gray-900 bg-opacity-50 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-700">
        <h2 className="text-3xl font-bold text-center mb-6 text-white">Post a New Job</h2>
        <form onSubmit={handleCreateJob} className="space-y-6">
            <InputField id="title" label="Job Title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g., Build a DApp Frontend" />
            <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">Job Description</label>
                <textarea id="description" rows="4" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe the work to be done, deliverables, and required skills..." className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-200"></textarea>
            </div>
            <InputField id="budget" label="Budget (in ETH)" type="text" value={budget} onChange={(e) => setBudget(e.target.value)} placeholder="e.g., 0.5" />
            {error && <p className="text-red-400 text-sm text-center">{error}</p>}
            <button type="submit" disabled={isLoading || !account} className={`w-full font-bold py-3 px-4 rounded-lg text-white transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 ${isLoading || !account ? 'bg-gray-600 cursor-not-allowed' : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600'}`}>
                {isLoading ? 'Processing...' : (account ? 'Create Job' : 'Connect Wallet to Post')}
            </button>
        </form>
    </div>
  );
}

export default CreateJob;