// hardhat.config.js
require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
const fs = require("fs");
const path = require("path");

// カスタムタスクの定義
task("copyAbi", "Copy ABI files to frontend/src/abi")
  .addOptionalParam("contract", "Contract name")
  .setAction(async (taskArgs, hre) => {
    const contractName = taskArgs.contract || "MyToken";
    const artifactsPath = path.join(__dirname, "artifacts/contracts", `${contractName}.sol`, `${contractName}.json`);
    const abiDir = path.join(__dirname, "frontend/src/abi");

    if (!fs.existsSync(artifactsPath)) {
      console.error(`Artifacts for ${contractName} not found at ${artifactsPath}`);
      return;
    }

    const artifact = JSON.parse(fs.readFileSync(artifactsPath, "utf8"));
    const abi = artifact.abi;

    if (!fs.existsSync(abiDir)) {
      fs.mkdirSync(abiDir, { recursive: true });
    }

    const abiPath = path.join(abiDir, `${contractName}.json`);
    fs.writeFileSync(abiPath, JSON.stringify(abi, null, 2));

    console.log(`ABI for ${contractName} copied to ${abiPath}`);
  });

module.exports = {
  solidity: "0.5.0", // 正確なバージョン番号を指定
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545/",
    },
    // 他のネットワーク設定
  },

  networks: {
    sepolia: {
      url: `https://sepolia.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
      accounts: [`0x${process.env.PRIVATE_KEY}`],
      network_id: '11155111',
      gas: 10000000,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true,
      networkCheckTimeout: 1000000 // 必要に応じてタイムアウトを延長
    }
  }

};


task("compile", "Compiles the entire project, building all artifacts", async (taskArgs, hre, runSuper) => {
  await runSuper(); // 標準のコンパイルを実行
  await hre.run("copyAbi"); // コンパイル後にcopyAbiタスクを実行
});