const axios = require("axios");
const fs = require("fs");
const FormData = require("form-data");
const path = require("path");

async function uploadToPinata() {
  const apiKey = process.env.PINATA_API_KEY;
  const apiSecret = process.env.PINATA_API_SECRET;
  const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;

  // Create a sample JSON file to upload
  const sampleJob = {
    title: "Build a Website",
    description: "Need a professional website for my new coffee shop.",
    skills: ["React", "Solidity", "Design"],
  };
  const filePath = path.join(__dirname, "job.json");
  fs.writeFileSync(filePath, JSON.stringify(sampleJob));

  // Prepare the file to be sent
  let data = new FormData();
  data.append("file", fs.createReadStream(filePath));

  console.log("Uploading file to Pinata...");

  try {
    const response = await axios.post(url, data, {
      headers: {
        "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
        pinata_api_key: apiKey,
        pinata_secret_api_key: apiSecret,
      },
    });

    console.log("File uploaded successfully!");
    console.log("IPFS Hash (CID):", response.data.IpfsHash);
    fs.unlinkSync(filePath);
    
    return response.data.IpfsHash;
  } catch (error) {
    console.error("Error uploading to Pinata:", error.response ? error.response.data : error.message);
  }
}

uploadToPinata().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});