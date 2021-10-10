const HDWalletProvider = require('truffle-hdwallet-provider')
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

const provider = new HDWalletProvider(
  'chronic require road pelican purchase side robot asset across sting path debate',
  // 'https://rinkeby.infura.io/v3/d5451401ea734c22b21e648bb01a3e46'
  'https://ropsten.infura.io/v3/4a822aac00924231b4a8f2b4db6c00bb'
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts()

  const inbox = await new web3.eth.Contract(interface)
    .deploy({ data: bytecode })
    .send({ from: accounts[0], gas: '700000' })

  console.log(JSON.stringify(interface, null, 2));
  console.log('Contract deployed to', inbox.options.address);
};
deploy();
