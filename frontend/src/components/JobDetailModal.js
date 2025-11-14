import React, { useContext } from 'react';
import { BlockchainContext } from '../context/BlockchainContext';
import { ethers } from 'ethers';
function JobDetailModal({ job, onClose }) {
    const { account, jobManager } = useContext(BlockchainContext);
    const isClient = account && job.client.toLowerCase() === account.toLowerCase();

    const handleSelectFreelancer = async (freelancerAddress) => {
        if (!jobManager) return;
        try {
            const tx = await jobManager.selectFreelancer(job.jobId, freelancerAddress);
            await tx.wait();
            alert('Freelancer selected! You can now fund the escrow.');
            onClose();
        } catch (error) {
            console.error("Failed to select freelancer:", error);
            alert('Failed to select freelancer.');
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex justify-center items-center z-50" onClick={onClose}>
            <div className="bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl p-8 w-full max-w-2xl transform transition-all" onClick={(e) => e.stopPropagation()}>
                <h2 className="text-2xl font-bold text-white mb-2">Job Details (ID: {job.jobId.toString()})</h2>
                <p className="text-gray-400 mb-6">Status: <span className="font-semibold text-purple-400">{job.status}</span></p>
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white border-b border-gray-600 pb-2">Bids Received ({job.bids.length})</h3>
                    {job.bids.length > 0 ? (
                        job.bids.map((bid, index) => (
                            <div key={index} className="bg-gray-800 p-4 rounded-lg flex justify-between items-center">
                                <div>
                                    <p className="text-sm text-gray-400">Freelancer:</p>
                                    <p className="text-xs font-mono text-purple-300 truncate" title={bid.freelancer}>{bid.freelancer}</p>
                                    <p className="text-white mt-1">Amount: <span className="font-bold">{ethers.formatEther(bid.amount)} ETH</span></p>
                                </div>
                                {isClient && job.status === 'Open' && (
                                    <button 
                                        onClick={() => handleSelectFreelancer(bid.freelancer)}
                                        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition"
                                    >
                                        Accept Bid
                                    </button>
                                )}
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500">No bids have been placed yet.</p>
                    )}
                </div>
                {isClient && job.status === 'Assigned' && (
                    <div className="mt-6 text-center">
                         <p className="text-green-400 mb-4">You have selected a freelancer! Now, fund the escrow to begin the work.</p>
                         <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition">Fund Escrow</button>
                    </div>
                )}
                 {isClient && job.status === 'Funded' && (
                    <div className="mt-6 text-center">
                         <p className="text-yellow-400 mb-4">Work in progress. Release payment once the job is completed to your satisfaction.</p>
                         <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-6 rounded-lg transition">Release Payment</button>
                    </div>
                )}

                <div className="flex justify-end pt-6">
                    <button type="button" onClick={onClose} className="font-bold py-2 px-4 rounded-lg text-gray-300 hover:bg-gray-700 transition">Close</button>
                </div>
            </div>
        </div>
    );
}

export default JobDetailModal;