const HDWalletProvider = require('truffle-hdwallet-provider')
const Web3 = require('web3');
const compiledFactory = require('./build/CampaignFactory.json')

const provider = new HDWalletProvider(
  'chronic require road pelican purchase side robot asset across sting path debate',
  'https://ropsten.infura.io/v3/4a822aac00924231b4a8f2b4db6c00bb'
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts()

  const inbox = await new web3.eth.Contract(compiledFactory.abi)
    .deploy({ data: compiledFactory.evm.bytecode.object })
    .send({ from: accounts[0], gas: '2000000' })

  console.log(JSON.stringify(compiledFactory.abi, null, 2));
  console.log('Contract deployed to', inbox.options.address);
};
deploy();
