import React, { useState, useEffect } from 'react';
import './App.css';
import web3 from './web3'
import lottery from './lottery';

function App() {
  const [manager, setManager] = useState('');
  const [players, setPlayers] = useState([]);
  const [balance, setBalance] = useState('');
  const [value, setValue] = useState('');
  const [loadingMessage, setLoadingMessage] = useState('');

  useEffect(() => {
    async function fetchData() {
      const manager = await lottery.methods.manager().call()
      const players = await lottery.methods.getPlayers().call()
      const balance = await web3.eth.getBalance(lottery.options.address);
      setManager(manager)
      setPlayers(players)
      setBalance(balance)
    }
    fetchData();
  });

  const pickWinner = async () => {
    setLoadingMessage('Waiting on transaction success...')

    const accounts = await web3.eth.getAccounts();
    await lottery.methods.pickWinner().send({
      from: accounts[0]
    })

    setLoadingMessage('A winner has been picked!')
  }

  const onSubmit = async (e) => {
    e.preventDefault();

    setLoadingMessage('Waiting on transaction success...')

    const accounts = await web3.eth.getAccounts();
    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(value, 'ether')
    })

    setLoadingMessage('You have been entered!')
  }

  return (
    <div>
      <div>
        <h2>Lottery Contract</h2>
        <p>This contract is managed by {manager}</p>
        <p>There are currently {players.length} people entered</p>
        <p>Compeating to get {web3.utils.fromWei(balance, 'ether')} ether!</p>
      </div>
      <form onSubmit={onSubmit}>
        <h4>Want to try your luck?</h4>
        <div>
          <label>Amount of ether to enter</label>
          <input type="text" value={value}
            onChange={e => setValue(e.target.value)} />
        </div>
        <button>Enter</button>
      </form>
      <h1>{loadingMessage}</h1>
      <h4>Ready to pick a winner?</h4>
      <button onClick={pickWinner}>Pick a winner!</button>
    </div>
  );
}

export default App;
