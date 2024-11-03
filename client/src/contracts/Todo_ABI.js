// import web3 from './web3';
// // import TodoApp from '../../../build/contracts/TodoApp.json';
// import TodoApp from './TodoApp.json';

// const networkId = String(await web3.eth.net.getId());
// const CONTRACT_ADDRESS = TodoApp.networks[networkId].address;
// //const address ='0x7D67FFF638868717A3c4ccd8f3e18B8d1f3c8413';//Ganache
// export default new web3.eth.Contract(TodoApp.abi, CONTRACT_ADDRESS);
// // export default new web3.eth.Contract(abi, address);

// client/src/contracts/Todo_ABI.js
import { ethers } from 'ethers';
import contractAddress from './contract-address.json';
import TodoAppArtifact from './TodoApp.json';

const getTodoContract = (signerOrProvider) => {
  return new ethers.Contract(contractAddress.TodoApp, TodoAppArtifact.abi, signerOrProvider);
};

export default getTodoContract; // defaultエクスポートに変更

