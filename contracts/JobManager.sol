// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./Reputation.sol";
import "./PlatformToken.sol";

contract JobManager is Ownable {
    Reputation public reputationContract;
    PlatformToken public platformToken;

    uint256 public constant STAKE_AMOUNT = 100 * (10**18); // Staking 100 DFMT

    mapping(address => uint256) public stakes;
    mapping(address => bool) public isStaked;

    enum JobStatus { Open, Assigned, Completed, Disputed }

    struct Bid {
        address freelancer;
        uint256 amount;
        string detailsIpfsHash;
    }

    struct Job {
        uint256 jobId;
        address client;
        address selectedFreelancer;
        uint256 budget;
        string jobDetailsIpfsHash;
        JobStatus status;
        Bid[] bids;
    }

    mapping(uint256 => Job) private _jobs;
    uint256 public nextJobId;

    event JobCreated(uint256 indexed jobId, address indexed client, uint256 budget);
    event BidPlaced(uint256 indexed jobId, address indexed freelancer);
    event FreelancerSelected(uint256 indexed jobId, address indexed freelancer);
    event Staked(address indexed user, uint256 amount);
    event Unstaked(address indexed user, uint256 amount);

    constructor(
        address _reputationAddress,
        address _tokenAddress,
        address initialOwner
    ) Ownable(initialOwner) {
        reputationContract = Reputation(_reputationAddress);
        platformToken = PlatformToken(_tokenAddress);
    }

    function stake() external {
        require(!isStaked[msg.sender], "User has already staked");
        
        // Transfer STAKE_AMOUNT from user to this contract
        bool success = platformToken.transferFrom(msg.sender, address(this), STAKE_AMOUNT);
        require(success, "Token transfer failed. Did you approve the contract?");

        stakes[msg.sender] = STAKE_AMOUNT;
        isStaked[msg.sender] = true;
        emit Staked(msg.sender, STAKE_AMOUNT);
    }

    function unstake() external {
        require(isStaked[msg.sender], "User has not staked");
        
        uint256 amount = stakes[msg.sender];
        
        // Reset staking status first to prevent re-entrancy attacks
        stakes[msg.sender] = 0;
        isStaked[msg.sender] = false;

        bool success = platformToken.transfer(msg.sender, amount);
        require(success, "Token transfer failed");

        emit Unstaked(msg.sender, amount);
    }

    function getJob(uint256 jobId) external view returns (Job memory) {
        return _jobs[jobId];
    }

    function createJob(uint256 budget, string memory jobDetailsIpfsHash) external {
        require(budget > 0, "Budget must be greater than zero");
        uint256 jobId = nextJobId++;
        Job storage newJob = _jobs[jobId];
        newJob.jobId = jobId;
        newJob.client = msg.sender;
        newJob.budget = budget;
        newJob.jobDetailsIpfsHash = jobDetailsIpfsHash;
        newJob.status = JobStatus.Open;

        emit JobCreated(jobId, msg.sender, budget);
    }

    function placeBid(uint256 jobId, uint256 amount, string memory detailsIpfsHash) external {
        Job storage job = _jobs[jobId];
        require(isStaked[msg.sender], "Freelancer must stake tokens to bid");
        require(job.status == JobStatus.Open, "Job is not open for bidding");
        require(msg.sender != job.client, "Client cannot bid on their own job");

        job.bids.push(Bid(msg.sender, amount, detailsIpfsHash));
        emit BidPlaced(jobId, msg.sender);
    }

    function selectFreelancer(uint256 jobId, address freelancer) external {
        Job storage job = _jobs[jobId];
        require(msg.sender == job.client, "Only the client can select a freelancer");
        require(job.status == JobStatus.Open, "Job is not open");
        
        job.selectedFreelancer = freelancer;
        job.status = JobStatus.Assigned;
        
        emit FreelancerSelected(jobId, freelancer);
    }
}