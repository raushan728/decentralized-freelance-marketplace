import React, { useState } from 'react';
import { ethers } from 'ethers';

function Navbar() {
  const [account, setAccount] = useState(null);

  async function connectWallet() {
    if (window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
        console.log("Connected Account:", address);
      } catch (error) {
        console.error("Error connecting to MetaMask:", error);
      }
    } else {
      alert("MetaMask is not installed. Please install it to use this DApp.");
    }
  }

  return (
    <nav className="bg-white bg-opacity-10 backdrop-blur-md shadow-lg p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold">DFM</div>
        <div>
          {account ? (
            <div className="bg-purple-500 text-white font-bold py-2 px-4 rounded-full">
              {`${account.substring(0, 6)}...${account.substring(account.length - 4)}`}
            </div>
          ) : (
            <button
              onClick={connectWallet}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
            >
              Connect Wallet
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;