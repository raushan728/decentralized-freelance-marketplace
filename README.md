# Decentralized Freelance Marketplace (DFM)

## Goal
Build a real-world advanced blockchain project that teaches everything from setting up Ganache and MetaMask to writing, testing, and deploying smart contracts with full frontend integration. The project is a decentralized version of Upwork or Fiverr, where clients and freelancers interact directly on the blockchain. Payments are handled by escrow smart contracts, reputation scores are tracked on-chain, and disputes are resolved using DAO-based governance. The system eliminates intermediaries and ensures transparent, secure, and automated transactions.

## Project Overview
The Decentralized Freelance Marketplace (DFM) is a fully decentralized platform built on Ethereum, enabling direct interactions between clients and freelancers without intermediaries. Key components include wallet-based authentication, on-chain job posting and bidding, secure escrow payments, reputation systems, and DAO governance for dispute resolution. Off-chain storage via IPFS reduces gas costs, while oracles provide price feeds for stability.

## Key Features

### 1. User System
- Wallet-based authentication using MetaMask.
- Profiles stored on IPFS (bio, skills, portfolio).
- No centralized login or database.

### 2. Job Posting and Bidding
- Clients can post jobs with details and budgets.
- Jobs stored on IPFS; only hash is saved on-chain.
- Freelancers can bid, and clients can select one.

### 3. Escrow Payment System
- Clients deposit payment in escrow smart contracts.
- Milestone-based payments supported.
- Funds are released after approval or disputed if needed.

### 4. DAO-Based Dispute Resolution
- Disputes are resolved by DAO (Decentralized Autonomous Organization).
- Token holders vote to decide outcomes.
- On-chain and transparent resolution process.

### 5. Token and Staking Mechanism
- Platform uses its own ERC-20 token (DFMT).
- Freelancers and arbitrators stake tokens to build trust.
- Fraud leads to token slashing or reputation loss.

### 6. Reputation System
- Reputation stored on-chain and updated after each job.
- Clients and freelancers both have visible reputation scores.
- Promotes fair behavior in the ecosystem.

### 7. Off-Chain File Storage (IPFS)
- Job descriptions, portfolios, and deliverables stored on IPFS.
- Blockchain stores only IPFS hashes to reduce gas costs.

### 8. Oracles and Price Feeds
- Chainlink integration for ETH/USD price feeds.
- Allows payment stability and cross-token conversions.

### 9. DAO Governance
- Token holders manage platform rules, fees, and updates.
- Voting rights proportional to token holdings.

### 10. Frontend DApp
- React.js frontend with ethers.js for blockchain communication.
- Users can connect wallets, post jobs, and release payments.
- Real-time status updates and transaction tracking.

## Tech Stack

| Layer                  | Tools / Frameworks                  |
|------------------------|-------------------------------------|
| Smart Contracts        | Solidity, OpenZeppelin              |
| Blockchain Network     | Ganache (local), Ethereum Testnet (Goerli/Sepolia) |
| Framework              | Hardhat (preferred) / Truffle       |
| Wallet                 | MetaMask                            |
| Storage                | IPFS / Pinata                       |
| Oracles                | Chainlink                           |
| Frontend               | React.js + Ethers.js                |
| Testing                | Mocha / Chai / Hardhat Testing      |
| Indexing / Analytics   | The Graph (optional)                |
| Security               | Slither, MythX, Reentrancy Guards   |
| CI/CD                  | GitHub Actions (optional)           |
| Deployment             | Hardhat Scripts                     |

## Architecture Overview

```
Frontend (React + Ethers.js)
        ↓
MetaMask (Wallet Connection)
        ↓
Smart Contracts (Escrow, Jobs, Reputation, DAO, Token)
        ↓
Ethereum Network (Local/Testnet)
        ↓
IPFS (File and Metadata Storage)
```

## Project Structure

```
decentralized-freelance-marketplace/
├── .gitignore
├── hardhat.config.js
├── package.json
├── package-lock.json
├── README.md
├── contracts/
│   ├── DAO.sol
│   ├── Escrow.sol
│   ├── JobManager.sol
│   ├── PlatformToken.sol
│   └── Reputation.sol
├── scripts/
│   ├── deployAll.js
│   ├── deployToken.js
│   └── upload.js
├── test/
│   ├── job.test.js
│   └── escrow.test.js
├── ignition/
│   └── modules/
│       └── Lock.js
└── frontend/
    ├── .gitignore
    ├── package.json
    ├── package-lock.json
    ├── postcss.config.js
    ├── tailwind.config.js
    ├── README.md
    ├── public/
    │   ├── favicon.ico
    │   ├── index.html
    │   ├── logo192.png
    │   ├── logo512.png
    │   ├── manifest.json
    │   └── robots.txt
    └── src/
        ├── App.css
        ├── App.js
        ├── App.test.js
        ├── index.css
        ├── index.js
        ├── logo.svg
        ├── reportWebVitals.js
        ├── setupTests.js
        ├── components/
        │   ├── CreateJob.js
        │   ├── Footer.js
        │   ├── JobDetailModal.js
        │   ├── JobList.js
        │   ├── Navbar.js
        │   └── StakeForm.js
        ├── constants/
        │   └── contractInfo.js
        ├── context/
        │   └── BlockchainContext.js
        └── utils/
            └── pinata.js
```

## Development Roadmap (Completed Milestones)

This project has been built following these milestones. As a user or contributor, you can explore the code to understand the implementation. The setup guide below helps you run the existing project locally.

### Milestone 0 — Environment Setup (Completed)
- Node.js, npm/yarn, MetaMask, Ganache, and Hardhat are required.
- Connect MetaMask to the local Ganache blockchain.
- Hardhat project is initialized.
- **Goal:** Local blockchain running and connected to MetaMask.

### Milestone 1 — Core Smart Contracts (Completed)
- Smart contracts: `JobManager.sol`, `Escrow.sol`, `Reputation.sol`, and `PlatformToken.sol` are implemented.
- Core logic includes job creation, bidding, accepting, and escrow deposit.
- Tests are written and run using Mocha/Chai with Hardhat.
- **Goal:** Jobs can be created, bid on, and escrowed successfully.

### Milestone 2 — Escrow and IPFS Integration (Completed)
- Milestone-based payments added in Escrow.
- Job metadata and deliverables stored on IPFS (using Pinata).
- **Goal:** Files stored off-chain; their hashes verified on-chain.

### Milestone 3 — Reputation and Staking System (Completed)
- Staking mechanism implemented for freelancers/arbitrators.
- Reputation updates after successful or failed projects.
- **Goal:** Trust and reputation management on-chain.

### Milestone 4 — DAO and Dispute Resolution (Completed)
- DAO contract implemented for voting and dispute resolution.
- Token-weighted voting system for governance and disputes.
- **Goal:** Decentralized decision-making via DAO.

### Milestone 5 — Frontend DApp Development (Completed)
- React.js frontend built with wallet connection via MetaMask.
- All smart contracts integrated using ethers.js.
- Features: job posting, bidding, escrow tracking, and deliverable upload.
- **Goal:** Fully functional local DApp with working frontend and backend.

### Milestone 6 — Testing and Security (Completed)
- Hardhat gas reporter added; Slither/MythX security analysis run.
- Comprehensive test cases written for different scenarios.
- Gas-heavy functions optimized; reentrancy protection ensured.
- **Goal:** Secure, optimized, and well-tested smart contracts.

### Milestone 7 — Deployment and Monitoring (Ready for Testnet)
- Contracts can be deployed on Ethereum testnet (Goerli or Sepolia).
- IPFS data hosted using Pinata.
- Optionally integrate The Graph for analytics and transaction indexing.
- **Goal:** Live DApp running on testnet with monitoring tools.

## Optional Advanced Features
- Fiat onramp integration using oracles.
- Layer-2 deployment (Polygon or zk-rollups) for lower gas costs.
- NFT-based freelancer identities or certifications.
- Analytics dashboard using The Graph.
- WalletConnect integration for mobile support.

## Learning Focus
- **Solidity:** Events, modifiers, reentrancy guards, inheritance, and upgradeable contracts.
- **Testing:** Write both success and failure path test cases.
- **Gas Optimization:** Avoid loops and redundant storage; use structs efficiently.
- **Security:** Use OpenZeppelin libraries, static analysis, and access control.
- **IPFS:** Store only hashes on-chain; pin large files separately.
- **Frontend:** Clear MetaMask transaction prompts and visual feedback.
- **Dev Workflow:** Use Ganache for testing, then Hardhat for deployments and automation.

## Minimum Viable Product (MVP)
The MVP should include:
- Wallet connection via MetaMask.
- Job posting and bidding.
- Escrow deposit and release.
- Basic reputation tracking.
- Local DApp frontend working with contracts.

## Future Enhancements
- Multi-milestone job handling.
- DAO governance and arbitration.
- Token staking with slashing.
- Integration with Chainlink oracles.
- Migration to Layer-2 for scalability.

## Guidance Expectations
The mentor or AI assisting should:
1. Guide me step-by-step from setup to deployment.
2. Provide code snippets for each stage.
3. Explain the logic and reasoning behind each contract.
4. Help debug errors during development and testing.
5. Show how to connect smart contracts with frontend using ethers.js.
6. Assist with deployment on testnet and IPFS integration.
7. Review code for optimization, gas efficiency, and security best practices.

## Getting Started (Local Setup)

This guide will help you set up and run the project locally.

### Prerequisites

- Node.js (v18 or later)
- MetaMask browser extension
- Ganache desktop application

### Installation & Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/raushan728/decentralized-freelance-marketplace.git
   cd decentralized-freelance-marketplace
   ```

2. Install backend dependencies:
   ```bash
   npm install
   ```

3. Install frontend dependencies:
   ```bash
   cd frontend
   npm install --legacy-peer-deps
   cd ..
   ```

### Environment Configuration (Important!)

This project requires you to create your own environment files for secret keys. These files are not and should not be committed to GitHub.

1. Pinata API Keys:
   - Go to [Pinata.cloud](https://pinata.cloud), create a free account, and generate an API key.
   - In the `frontend` folder, create a new file named `.env`.
   - Add your Pinata keys to this file like this:
     ```
     REACT_APP_PINATA_API_KEY=Your_Pinata_API_Key
     REACT_APP_PINATA_API_SECRET=Your_Pinata_API_Secret
     ```

2. Ganache Private Key:
   - Open your Ganache application.
   - Copy the private key from one of the accounts (by clicking the key icon).
   - Open the `hardhat.config.js` file in the project root.
   - Find the `accounts` array inside the `ganache` network configuration and paste your private key there.
     ```javascript
     networks: {
       ganache: {
         url: "http://127.0.0.1:7545",
         accounts: [
           "YOUR_GANACHE_PRIVATE_KEY_HERE"
         ]
       }
     }
     ```

### Running the Application

1. Compile the smart contracts:
   ```bash
   npx hardhat compile
   ```

2. Deploy the contracts to your local Ganache network:
   ```bash
   npx hardhat run scripts/deployAll.js --network ganache
   ```

3. Update Frontend with New Addresses:
   - After running the deploy script, your terminal will show a "Deployment Summary" with the new contract addresses.
   - Copy these new addresses.
   - Go to `frontend/src/constants/contractInfo.js`.
   - Paste the new addresses in the corresponding variables at the bottom of the file.

4. Start the frontend application:
   ```bash
   cd frontend
   npm start
   ```
   Your DApp should now be running on `http://localhost:3000`!

## How It Works

### Overview
The Decentralized Freelance Marketplace (DFM) is a blockchain-based platform that connects clients and freelancers without intermediaries. All transactions, job postings, bidding, and payments are handled through smart contracts on the Ethereum blockchain, ensuring transparency, security, and automation.

### Key Components

#### Smart Contracts
- **PlatformToken (DFMT)**: ERC20 token used for staking and platform governance.
- **Reputation**: Tracks freelancer reputation based on completed jobs and ratings.
- **JobManager**: Handles job creation, bidding, freelancer selection, and staking.
- **Escrow**: Manages secure payment holding and release upon job completion.
- **DAO**: Basic decentralized autonomous organization for future governance.

#### Frontend (React App)
- Connects to MetaMask for wallet interaction.
- Allows users to create jobs, stake tokens, place bids, and manage transactions.
- Displays job listings, bids, and user balances.

### Workflow

1. **Setup**:
   - Deployer deploys all contracts using `deployAll.js`.
   - PlatformToken is minted (1 million DFMT initially).
   - Ownership of Reputation contract is transferred to JobManager.

2. **User Registration**:
   - Users connect their MetaMask wallet.
   - Freelancers stake 100 DFMT tokens to participate in bidding.

3. **Job Creation**:
   - Clients create jobs with budget and IPFS hash of job details.
   - Job details are stored off-chain on IPFS for cost efficiency.

4. **Bidding Process**:
   - Staked freelancers can place bids on open jobs.
   - Bids include proposed amount and IPFS hash of bid details.

5. **Freelancer Selection**:
   - Client selects the best freelancer from bids.
   - Job status changes to "Assigned".

6. **Escrow Funding**:
   - Client funds the escrow with the job budget.
   - Funds are locked in the Escrow contract.

7. **Job Completion**:
   - Upon completion, client releases payment from escrow.
   - 95% goes to freelancer, 5% to platform wallet.

8. **Reputation Update**:
   - After job completion, reputation can be updated (future feature).

9. **DAO Governance**:
   - Token holders can create and vote on proposals (basic implementation).

### Security Features
- ReentrancyGuard on escrow releases.
- Only staked users can bid.
- Clients can only fund assigned jobs.
- Platform fee deduction for sustainability.

### Future Enhancements
- Dispute resolution mechanism.
- Multi-sig escrow for complex jobs.
- Advanced DAO features like proposal execution.
- Integration with decentralized identity systems.
