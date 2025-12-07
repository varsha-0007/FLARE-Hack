const hre = require("hardhat");

async function main() {
  const Factory = await hre.ethers.getContractFactory("LedgeManager");
  const contract = await Factory.deploy();
  await contract.deployed();
  console.log("✓ LedgeManager deployed to:", contract.address);
  console.log("→ Set CONTRACT_ADDRESS=" + contract.address + " in .env");
}

main().catch(e => {
  console.error(e);
  process.exitCode = 1;
});