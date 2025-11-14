import React, { useState, useEffect, createContext } from 'react';
import { ethers } from 'ethers';

import { 
    jobManagerABI, jobManagerAddress,
    platformTokenABI, platformTokenAddress,
} from '../constants/contractInfo';

export const BlockchainContext = createContext();

export const BlockchainProvider = ({ children }) => {
    const [account, setAccount] = useState(null);

    const [jobManager, setJobManager] = useState(null);
    const [platformToken, setPlatformToken] = useState(null);

    const connectWallet = async () => {
        if (window.ethereum) {
            try {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                if (accounts.length > 0) {
                    await setupConnection(accounts[0]);
                }
            } catch (error) {
                console.error("User rejected connection:", error);
            }
        } else {
            alert("Please install MetaMask.");
        }
    };

    const setupConnection = async (address) => {
        try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner(address);

            setAccount(address);
            setJobManager(new ethers.Contract(jobManagerAddress, jobManagerABI, signer));
            setPlatformToken(new ethers.Contract(platformTokenAddress, platformTokenABI, signer));

            console.log("Wallet connected/changed to:", address);
        } catch (error) {
            console.error("Error setting up connection:", error);
        }
    };

    useEffect(() => {
        const handleAccountsChanged = (accounts) => {
            console.log("Account changed detected!");
            if (accounts.length > 0) {
                setupConnection(accounts[0]);
            } else {
                setAccount(null);
                setJobManager(null);
                setPlatformToken(null);
                console.log("Wallet disconnected.");
            }
        };

        if (window.ethereum) {
            window.ethereum.on('accountsChanged', handleAccountsChanged);
        }
        return () => {
            if (window.ethereum) {
                window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
            }
        };
    }, []);

    return (
        <BlockchainContext.Provider value={{
            account,
            connectWallet,
            jobManager,
            platformToken
        }}>
            {children}
        </BlockchainContext.Provider>
    );
};