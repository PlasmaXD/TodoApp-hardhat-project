// scripts/deploy.js
const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  const TodoApp = await hre.ethers.getContractFactory("TodoApp");
  const todoApp = await TodoApp.deploy();

  // Hardhatでは、.deployed() の代わりに .waitForDeployment() を使用
  await todoApp.waitForDeployment();

  // コントラクトのアドレスを取得
  const address = await todoApp.getAddress();
  console.log("TodoApp deployed to:", address);

  // ABIとアドレスを保存
  saveFrontendFiles(todoApp);
}

function saveFrontendFiles(todoApp) {
  const contractsDir = path.join(__dirname, "../client/src/contracts");

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir, { recursive: true });
  }

  // コントラクトのアドレスを保存
  fs.writeFileSync(
    path.join(contractsDir, "contract-address.json"),
    JSON.stringify({ TodoApp: todoApp.target }, null, 2)
  );

  // ABIを保存
  const TodoAppArtifact = hre.artifacts.readArtifactSync("TodoApp");

  fs.writeFileSync(
    path.join(contractsDir, "TodoApp.json"),
    JSON.stringify(TodoAppArtifact, null, 2)
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Error in deployment:", error);
    process.exit(1);
  })
