import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import MyTokenABI from './abi/MyToken.json'; // ABIファイルのインポート

function App() {
  const [account, setAccount] = useState(null);
  const [token, setToken] = useState(null);
  const [balance, setBalance] = useState('0');
const [recipient, setRecipient] = useState('');
const [amount, setAmount] = useState('');

  const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;

  // ウォレットへの接続をリクエスト
  async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
  }

  // ウォレットを接続して情報を取得
  async function connectWallet() {
    if (typeof window.ethereum !== 'undefined') {
      try {
        await requestAccount();

        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const userAccount = await signer.getAddress();
        setAccount(userAccount);

        // コントラクトインスタンスの作成
        const myTokenContract = new ethers.Contract(contractAddress, MyTokenABI, signer);
        setToken(myTokenContract);

        // トークン残高の取得
        const userBalance = await myTokenContract.balanceOf(userAccount);
        setBalance(ethers.formatEther(userBalance));
      } catch (err) {
        console.error('Error:', err);
      }
    } else {
      alert('MetaMaskをインストールしてください！');
    }
  }
// トークン転送関数を追加
async function transferTokens() {
  if (token) {
    try {
      const tx = await token.transfer(recipient, ethers.parseEther(amount));
      await tx.wait();
      console.log('Tokens transferred');
      // 残高の更新
      const userBalance = await token.balanceOf(account);
      setBalance(ethers.formatEther(userBalance));
    } catch (err) {
      console.error('Error:', err);
    }
  }
}

  return (
    <div>
      <h1>My DApp</h1>
      {!account ? (
        <button onClick={connectWallet}>ウォレットを接続</button>
      ) : (
        <div>
          <p>アカウント: {account}</p>
          <p>残高: {balance} MTK</p>
        </div>
      )}
        <h2>トークン転送</h2>
  <input
    type="text"
    placeholder="受信者のアドレス"
    value={recipient}
    onChange={(e) => setRecipient(e.target.value)}
  />
  <input
    type="text"
    placeholder="金額"
    value={amount}
    onChange={(e) => setAmount(e.target.value)}
  />
  <button onClick={transferTokens}>送信</button>
    </div>
  );
}

export default App;
