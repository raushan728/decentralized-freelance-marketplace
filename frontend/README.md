# Decentralized Freelance Marketplace (DFM) - Frontend

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Configuration](#environment-configuration)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [How to Use](#how-to-use)
- [Contributing](#contributing)
- [License](#license)

This is the React.js frontend for the Decentralized Freelance Marketplace (DFM). It provides a modern, responsive user interface built with React and Tailwind CSS for interacting with the blockchain-based freelance platform. The DApp allows users to connect their MetaMask wallets, post jobs, stake tokens, place bids, and manage escrow payments seamlessly.

## Features

- **Wallet Connection**: Secure connection to MetaMask for blockchain interactions.
- **Job Posting**: Clients can create jobs with budgets and IPFS-stored details.
- **Bidding System**: Freelancers can stake tokens and bid on open jobs.
- **Escrow Management**: Track and release payments securely through smart contracts.
- **Staking Interface**: Stake DFMT tokens to participate in bidding.
- **Responsive Design**: Modern UI with animations and professional styling.
- **Real-time Updates**: Live status updates for jobs, bids, and transactions.

## Tech Stack

- **Frontend Framework**: React.js
- **Styling**: Tailwind CSS
- **Blockchain Interaction**: Ethers.js
- **Wallet**: MetaMask
- **Off-Chain Storage**: IPFS via Pinata
- **Build Tool**: Create React App

## Prerequisites

- Node.js (v18 or later)
- MetaMask browser extension
- Ganache desktop application (for local blockchain development)

## Installation

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install --legacy-peer-deps
   ```

## Environment Configuration

This frontend requires API keys and contract addresses to function properly. Create a `.env` file in the `frontend` folder.

### Pinata API Keys

- Go to [Pinata.cloud](https://pinata.cloud), create a free account, and generate an API key.
- In the `frontend` folder, create a new file named `.env`.
- Add your Pinata keys to this file:
  ```
  REACT_APP_PINATA_API_KEY=Your_Pinata_API_Key
  REACT_APP_PINATA_API_SECRET=Your_Pinata_API_Secret
  ```

### Contract Addresses

After deploying the smart contracts (see main README for deployment instructions), update the contract addresses in `frontend/src/constants/contractInfo.js` with the new addresses from the deployment summary.

## Running the Application

1. Ensure the smart contracts are compiled and deployed (see main README).
2. Start the frontend:
   ```bash
   npm start
   ```
   The app will run on `http://localhost:3000`.

## Project Structure

```
frontend/
  src/
    components/
      CreateJob.js      # Job creation form
      JobList.js        # Display list of jobs
      JobDetailModal.js # Detailed job view with bidding
      StakeForm.js      # Token staking interface
      Navbar.js         # Navigation bar with wallet connection
      Footer.js         # Footer component
    constants/
      contractInfo.js   # Smart contract addresses and ABIs
    context/
      BlockchainContext.js # Blockchain state management
    utils/
      pinata.js         # IPFS upload utilities
    App.js              # Main app component
    index.js            # App entry point
  public/
    index.html          # HTML template
    manifest.json       # PWA manifest
  package.json          # Dependencies and scripts
```

## How to Use

1. **Connect Wallet**: Click "Connect Wallet" in the navbar to link your MetaMask.
2. **Stake Tokens**: As a freelancer, stake 100 DFMT tokens to enable bidding.
3. **Post a Job**: Clients can create jobs with budgets and IPFS details.
4. **Place Bids**: Freelancers bid on jobs with proposed amounts.
5. **Select Freelancer**: Clients choose the best bid and assign the job.
6. **Fund Escrow**: Clients deposit payment into escrow.
7. **Release Payment**: Upon completion, clients release funds to freelancers.

## Contributing

For full project setup, including backend and blockchain deployment, refer to the main `README.md` file in the project's root directory.

## License

This project is licensed under the **MIT License**.
