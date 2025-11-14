// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./PlatformToken.sol";

contract DAO is Ownable {
    PlatformToken public platformToken;

    enum ProposalState { Pending, Active, Succeeded, Defeated, Executed }

    struct Proposal {
        uint256 id;
        address proposer;
        string description;
        uint256 votingDeadline;
        uint256 forVotes;
        uint256 againstVotes;
        bool executed;
    }

    uint256 public nextProposalId;
    mapping(uint256 => Proposal) public proposals;
    mapping(uint256 => mapping(address => bool)) public hasVoted;

    event ProposalCreated(uint256 indexed proposalId, address indexed proposer);
    event Voted(uint256 indexed proposalId, address indexed voter, bool inFavor);

    constructor(address _tokenAddress, address initialOwner) Ownable(initialOwner) {
        platformToken = PlatformToken(_tokenAddress);
    }

    function createProposal(string memory description) external {
        uint256 proposalId = nextProposalId++;
        proposals[proposalId] = Proposal({
            id: proposalId,
            proposer: msg.sender,
            description: description,
            votingDeadline: block.timestamp + 7 days,
            forVotes: 0,
            againstVotes: 0,
            executed: false
        });

        emit ProposalCreated(proposalId, msg.sender);
    }

    function vote(uint256 proposalId, bool inFavor) external {
        Proposal storage proposal = proposals[proposalId];
        require(block.timestamp < proposal.votingDeadline, "Voting period has ended");
        require(!hasVoted[proposalId][msg.sender], "Already voted");

        uint256 votingPower = platformToken.balanceOf(msg.sender);
        require(votingPower > 0, "No voting power");

        hasVoted[proposalId][msg.sender] = true;

        if (inFavor) {
            proposal.forVotes += votingPower;
        } else {
            proposal.againstVotes += votingPower;
        }

        emit Voted(proposalId, msg.sender, inFavor);
    }

    function executeProposal(uint256 proposalId) external onlyOwner {
        Proposal storage proposal = proposals[proposalId];
        require(block.timestamp >= proposal.votingDeadline, "Voting still in progress");
        require(!proposal.executed, "Proposal already executed");
        require(proposal.forVotes > proposal.againstVotes, "Proposal did not pass");

        proposal.executed = true;
    }
}