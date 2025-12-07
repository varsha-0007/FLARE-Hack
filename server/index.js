const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");
const { ethers } = require("ethers");

dotenv.config();
const PORT = process.env.PORT || 4000;
const app = express();
app.use(cors());
app.use(express.json());

const rpc = process.env.RPC_URL || "http://127.0.0.1:8545";
const provider = new ethers.JsonRpcProvider(rpc);
const signer = process.env.PRIVATE_KEY
  ? new ethers.Wallet(process.env.PRIVATE_KEY, provider)
  : provider;

let contract = null;

function loadContract() {
  try {
    const artifactsPath = path.join(
      process.cwd(),
      "artifacts",
      "contracts",
      "LedgeManager.sol",
      "LedgeManager.json"
    );
    const raw = JSON.parse(fs.readFileSync(artifactsPath, "utf8"));
    const addr = process.env.CONTRACT_ADDRESS;
    if (!addr) {
      console.warn("⚠ CONTRACT_ADDRESS not set in .env");
      return;
    }
    contract = new ethers.Contract(addr, raw.abi, signer);
    console.log("✓ Contract loaded at", addr);
  } catch (e) {
    console.warn("⚠ Contract not ready:", e.message);
  }
}

app.get("/health", (req, res) => res.json({ ok: true }));

app.get("/ledge/:address", async (req, res) => {
  try {
    if (!contract)
      return res.status(500).json({ error: "Contract not loaded" });
    const [score, count] = await contract.getLedge(req.params.address);
    res.json({
      address: req.params.address,
      score: score.toString(),
      eventsCount: count.toString(),
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post("/simulate-event", async (req, res) => {
  try {
    if (!contract)
      return res.status(500).json({ error: "Contract not loaded" });
    const { address, txHash, eventType, delta } = req.body;
    if (!address || !txHash || !eventType)
      return res
        .status(400)
        .json({ error: "Missing fields: address, txHash, eventType required" });

    const tx = await contract.recordEvent(
      address,
      txHash,
      eventType,
      delta || 1
    );
    const receipt = await tx.wait();
    res.json({ success: true, txHash: receipt.hash });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.listen(PORT, () => {
  console.log(`✓ API listening on http://localhost:${PORT}`);
  loadContract();
});
