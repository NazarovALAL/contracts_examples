const HDWalletProvider = require('truffle-hdwallet-provider')
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

const provider = new HDWalletProvider(
  'chronic require road pelican purchase side robot asset across sting path debate',
  'https://rinkeby.infura.io/v3/d5451401ea734c22b21e648bb01a3e46'
);
const web3 = new Web3(provider);
const INITIAL_STRING_VALUE = 'Hi there!';

const deploy = async () => {
  console.log('smth');
  const accounts = await web3.eth.getAccounts()
  console.log('hahaha');

  const inbox = await new web3.eth.Contract(interface)
    .deploy({ data: bytecode, arguments: [INITIAL_STRING_VALUE] })
    .send({ from: accounts[0], gas: '500000' })

  console.log('address ', inbox.options.address);
};
deploy();
