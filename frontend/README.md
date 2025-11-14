# DFM Frontend

This is the React.js frontend for the Decentralized Freelance Marketplace. It provides a modern, responsive user interface built with React and Tailwind CSS for interacting with the blockchain-based freelance platform.

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

For full project setup, including backend and blockchain deployment, refer to the main `README.md` file in the project's root directory.
