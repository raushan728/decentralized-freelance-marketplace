import axios from 'axios';

export const uploadJSONToPinata = async (jsonData) => {
    const apiKey = process.env.REACT_APP_PINATA_API_KEY;
    const apiSecret = process.env.REACT_APP_PINATA_API_SECRET;
    const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;

    if (!apiKey || !apiSecret) {
        throw new Error("Pinata API Key or Secret is missing in your .env file");
    }

    console.log("Uploading JSON to Pinata...");

    try {
        const response = await axios.post(url, jsonData, {
            headers: {
                pinata_api_key: apiKey,
                pinata_secret_api_key: apiSecret
            }
        });
        console.log("Successfully uploaded to Pinata. CID:", response.data.IpfsHash);
        return response.data.IpfsHash;
    } catch (error) {
        console.error("Error uploading to Pinata:", error.response ? error.response.data : error.message);
        throw new Error("Failed to upload to Pinata");
    }
};