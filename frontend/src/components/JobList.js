import React, { useState, useEffect, useContext } from 'react';
import { BlockchainContext } from '../context/BlockchainContext';
import { ethers } from 'ethers';
import JobDetailModal from './JobDetailModal';

const JobCard = ({ job, onViewJob }) => (
    <div className="bg-gray-800 bg-opacity-40 border border-gray-700 rounded-xl shadow-lg p-6 space-y-4 transform hover:-translate-y-2 transition-transform duration-300 ease-in-out flex flex-col justify-between">
        <div>
            <div className="flex justify-between items-start">
                <h3 className="text-xl font-bold text-white">Job ID: {job.jobId.toString()}</h3>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                    job.status === "Open" ? "bg-green-500 text-green-100" : "bg-yellow-500 text-yellow-100"
                }`}>{job.status}</span>
            </div>
            <div className="mt-4">
                <p className="text-sm text-gray-400">Client</p>
                <p className="text-xs font-mono text-purple-300 truncate" title={job.client}>{job.client}</p>
            </div>
            <div className="mt-2">
                <p className="text-sm text-gray-400">Budget</p>
                <p className="text-lg font-bold text-white">{ethers.formatEther(job.budget)} ETH</p>
            </div>
        </div>
        <button 
            onClick={() => onViewJob(job)}
            className="w-full mt-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
        >
            View Details
        </button>
    </div>
);

function JobList() {
    const { jobManager, account } = useContext(BlockchainContext);
    const [jobs, setJobs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedJob, setSelectedJob] = useState(null);

    useEffect(() => {
        const fetchJobs = async () => {
            if (!jobManager) return;
            try {
                setIsLoading(true);
                const jobCount = await jobManager.nextJobId();
                const jobsPromises = [];
                for (let i = 0; i < jobCount; i++) {
                    jobsPromises.push(jobManager.getJob(i));
                }
                const fetchedJobs = await Promise.all(jobsPromises);
                const jobsWithStatus = fetchedJobs.map(job => ({
                    ...job,
                    status: ["Open", "Assigned", "Completed", "Disputed"][job.status]
                }));
                setJobs(jobsWithStatus.reverse());
            } catch (error) {
                console.error("Failed to fetch jobs:", error);
            } finally {
                setIsLoading(false);
            }
        };

        const interval = setInterval(fetchJobs, 5000);
        fetchJobs();

        return () => clearInterval(interval);
    }, [jobManager, account]);

    if (isLoading && jobs.length === 0) {
        return <div className="text-center p-10 animate-pulse">Loading Available Jobs...</div>;
    }

    return (
        <div className="my-16">
            <h2 className="text-3xl font-bold text-center mb-8 text-white">Open Jobs</h2>
            {jobs.length === 0 ? (
                <p className="text-center text-gray-400">No open jobs at the moment. Why not post one?</p>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {jobs.map((job) => (
                        <JobCard key={job.jobId.toString()} job={job} onViewJob={setSelectedJob} />
                    ))}
                </div>
            )}

            {selectedJob && (
                <JobDetailModal job={selectedJob} onClose={() => setSelectedJob(null)} />
            )}
        </div>
    );
}

export default JobList;