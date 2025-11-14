// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Reputation is Ownable {
    struct ReputationScore {
        uint256 jobsCompleted;
        uint256 totalRating;
        uint256 ratingCount;
    }

    mapping(address => ReputationScore) public reputations;

    event ReputationUpdated(
        address indexed user,
        uint256 jobsCompleted,
        uint256 averageRating
    );

    constructor(address initialOwner) Ownable(initialOwner) {}

    function updateReputation(address user, uint256 rating) external onlyOwner {
        require(rating >= 1 && rating <= 5, "Rating must be between 1 and 5");

        ReputationScore storage reputation = reputations[user];

        reputation.jobsCompleted++;
        reputation.totalRating += rating;
        reputation.ratingCount++;

        uint256 averageRating = reputation.totalRating / reputation.ratingCount;

        emit ReputationUpdated(user, reputation.jobsCompleted, averageRating);
    }

    function getReputation(address user)
        external
        view
        returns (
            uint256 jobsCompleted,
            uint256 averageRating
        )
    {
        ReputationScore storage reputation = reputations[user];
        if (reputation.ratingCount == 0) {
            return (0, 0);
        }
        return (
            reputation.jobsCompleted,
            reputation.totalRating / reputation.ratingCount
        );
    }
}