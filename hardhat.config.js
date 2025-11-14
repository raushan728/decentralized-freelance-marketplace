require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks: {
    ganache: {
      url: "http://127.0.0.1:7545",
      accounts: [
        "0x6a23725c04332ef80f49d9ea1245185d75006689c2722c1acf6c5878598c0401"
      ]
    }
  }
};