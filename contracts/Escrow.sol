// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "./JobManager.sol";

contract Escrow is Ownable, ReentrancyGuard {
    JobManager public jobManager;
    address public platformWallet;

    enum EscrowState { Funded, Released, Refunded }

    struct EscrowDetails {
        address client;
        address freelancer;
        uint256 amount;
        EscrowState state;
    }

    mapping(uint256 => EscrowDetails) public escrows;

    event EscrowFunded(uint256 indexed jobId, uint256 amount);
    event PaymentReleased(uint256 indexed jobId, address indexed freelancer, uint256 amount);
    event PaymentRefunded(uint256 indexed jobId, address indexed client, uint256 amount);

    constructor(
        address _jobManagerAddress,
        address _platformWallet,
        address initialOwner
    ) Ownable(initialOwner) {
        jobManager = JobManager(_jobManagerAddress);
        platformWallet = _platformWallet;
    }

    function fundEscrow(uint256 jobId) external payable {
        // CHANGE: Using the new getJob function
        JobManager.Job memory job = jobManager.getJob(jobId);
        require(msg.sender == job.client, "Only the client can fund");
        require(job.status == JobManager.JobStatus.Assigned, "Job not assigned");
        require(msg.value == job.budget, "Incorrect fund amount");

        escrows[jobId] = EscrowDetails(
            job.client,
            job.selectedFreelancer,
            msg.value, 
            EscrowState.Funded
        );

        emit EscrowFunded(jobId, msg.value);
    }

    function releasePayment(uint256 jobId) external nonReentrant {
        EscrowDetails storage escrow = escrows[jobId];
        
        // JobManager.Job memory job = jobManager.getJob(jobId); 

        require(msg.sender == escrow.client, "Only client can release payment");
        require(escrow.state == EscrowState.Funded, "Escrow not in funded state");
        
        escrow.state = EscrowState.Released;
        uint256 platformFee = (escrow.amount * 5) / 100;
        uint256 freelancerAmount = escrow.amount - platformFee;

        (bool success1, ) = escrow.freelancer.call{value: freelancerAmount}("");
        require(success1, "Freelancer payment failed");

        (bool success2, ) = platformWallet.call{value: platformFee}("");
        require(success2, "Platform fee transfer failed");

        emit PaymentReleased(jobId, escrow.freelancer, freelancerAmount);
    }
}