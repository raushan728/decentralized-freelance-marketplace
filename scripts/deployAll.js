const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  const platformWallet = deployer;

  console.log("Deploying contracts with the account:", deployer.address);

  const PlatformTokenFactory = await hre.ethers.getContractFactory("PlatformToken");
  const platformToken = await PlatformTokenFactory.deploy();
  await platformToken.waitForDeployment();
  console.log(`PlatformToken deployed to: ${platformToken.target}`);

  const ReputationFactory = await hre.ethers.getContractFactory("Reputation");
  const reputation = await ReputationFactory.deploy(deployer.address);
  await reputation.waitForDeployment();
  console.log(`Reputation deployed to: ${reputation.target}`);

  const JobManagerFactory = await hre.ethers.getContractFactory("JobManager");
  const jobManager = await JobManagerFactory.deploy(reputation.target, platformToken.target, deployer.address);
  await jobManager.waitForDeployment();
  console.log(`JobManager deployed to: ${jobManager.target}`);

  const EscrowFactory = await hre.ethers.getContractFactory("Escrow");
  const escrow = await EscrowFactory.deploy(jobManager.target, platformWallet.address, deployer.address);
  await escrow.waitForDeployment();
  console.log(`Escrow deployed to: ${escrow.target}`);

  // This part will now find the DAO contract
  const DaoFactory = await hre.ethers.getContractFactory("DAO");
  const dao = await DaoFactory.deploy(platformToken.target, deployer.address);
  await dao.waitForDeployment();
  console.log(`DAO deployed to: ${dao.target}`);

  console.log("Transferring ownership of Reputation contract to JobManager...");
  const tx = await reputation.transferOwnership(jobManager.target);
  await tx.wait();
  console.log("Ownership transferred successfully.");

  console.log("\n--- Deployment Summary ---");
  console.log(`PlatformToken: "${platformToken.target}"`);
  console.log(`Reputation: "${reputation.target}"`);
  console.log(`JobManager: "${jobManager.target}"`);
  console.log(`Escrow: "${escrow.target}"`);
  console.log(`DAO: "${dao.target}"`);
  console.log("--------------------------");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});