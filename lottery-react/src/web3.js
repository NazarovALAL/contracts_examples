import Web3 from 'web3';

// подсунуть провайдер метомаска
// const web3 = new Web3(window.web3.currentProvider);
const web3 = new Web3(window.ethereum);

// const ethEnabled = async () => {
//   await window.ethereum.send('eth_requestAccounts');
//   return new Web3(window.ethereum);
// }

// const web3 = ethEnabled()

export default web3;
