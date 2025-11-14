const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log(
    "Deploying contracts with the account:",
    deployer.address
  );

  const platformToken = await hre.ethers.deployContract("PlatformToken");

  await platformToken.waitForDeployment();

  console.log(
    `PlatformToken deployed to: ${platformToken.target}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});