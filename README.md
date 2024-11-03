# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a Hardhat Ignition module that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat ignition deploy ./ignition/modules/Lock.js
```
Hardhatは、Truffleと同様にスマートコントラクトのコンパイル、デプロイ、テストなどをサポートするEthereum開発者向けのフレームワーク  
プラグインが豊富で、特にTypeScriptやEthers.jsとの統合が強力らしい



### deploy手順

1. **Hardhat Networkのローカルノードを起動**

   別のターミナルウィンドウを開き、以下のコマンドでHardhat Networkをローカルで起動します。

   ```bash
   npx hardhat node
   ```

   このコマンドで、ローカルネットワーク（localhost:8545）が起動し、Hardhatが自動的に提供するアカウントやテストETHが利用可能になります。

2. **デプロイスクリプトの実行**

   別のターミナルウィンドウで、以下のコマンドを実行してデプロイを試みてください。

   ```bash
   npx hardhat run scripts/deploy.js --network localhost
   ```

   これで、Hardhatのローカルノードに対してスマートコントラクトがデプロイされるはずです。

3. **デプロイの確認**

   成功すると、`TodoApp deployed to: <コントラクトアドレス>` のようなメッセージが表示され、デプロイ先のアドレスが出力されます。

これでローカルネットワークを使用したHardhatでのデプロイが完了します。

## 備忘録
コントラクトアドレスの取得むずすぎてうざい


chatgptは  
    JSON.stringify({ TodoApp: todoApp.address }, null, 2)  
って言ってくるけど  
    JSON.stringify({ TodoApp: todoApp.target }, null, 2)  
が正しい