// client/src/App.js
import React, { useEffect, useState } from 'react';
import { Container, Navbar } from 'react-bootstrap';
import TodoInput from './components/TodoInput';
import getTodoContract from './contracts/Todo_ABI';
import TodoList from './components/TodoList';
import { ethers } from 'ethers';

function App() {
  const [todolist, setTodolist] = useState([]);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);

  useEffect(() => {
    const loadBlockchainData = async () => {
      if (window.ethereum) {
        try {
          // MetaMaskからアカウントを取得
          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
          setAccount(accounts[0]);

          // プロバイダーとサイナーを設定
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();

          // サイナーを使用してコントラクトインスタンスを取得
          const todoContract = getTodoContract(signer);
          setContract(todoContract);

          // Todosを取得
          const result = await todoContract.getTodosByOwner(accounts[0]);

          const todos = await Promise.all(
            result.map(async (id) => {
              const todo = await todoContract.todos(id);
              return {
                id: todo.taskid.toNumber(),
                task: todo.task,
                completed: todo.flag
              };
            })
          );

          setTodolist(todos);
        } catch (error) {
          console.error("Error loading blockchain data:", error);
        }
      } else {
        alert("MetaMask is not installed. Please install MetaMask to use this app.");
      }
    };

    loadBlockchainData();
  }, []);

  const handleTodoCreated = () => {
    // Todoが作成された後にリストを再取得
    if (contract && account) {
      contract.getTodosByOwner(account).then(async (result) => {
        const todos = await Promise.all(
          result.map(async (id) => {
            const todo = await contract.todos(id);
            return {
              id: todo.taskid.toNumber(),
              task: todo.task,
              completed: todo.flag
            };
          })
        );
        setTodolist(todos);
      });
    }
  };

  const handleTodoRemoved = () => {
    // Todoが削除された後にリストを再取得
    handleTodoCreated();
  };

  return (
    <div>
      <Container>
        <Navbar bg="primary" variant="dark">
          <Navbar.Brand href="#home">TodoApp</Navbar.Brand>
        </Navbar>
        <TodoInput contract={contract} account={account} onTodoCreated={handleTodoCreated} />
        <TodoList todolist={todolist} contract={contract} onTodoRemoved={handleTodoRemoved} />
      </Container>
    </div>
  );
}

export default App;
