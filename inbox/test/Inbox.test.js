const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const { interface, bytecode } = require('../compile')

const web3 = new Web3(ganache.provider());
const INITIAL_STRING_VALUE = 'Hi there!';

let accounts, inbox;

beforeEach(async () => {
  // get a list of all accounts
  accounts = await web3.eth.getAccounts()
  // use one of those account to deploy
  // the contract
  // console.log(interface);
  inbox = await new web3.eth.Contract(interface)
    .deploy({ data: bytecode, arguments: [INITIAL_STRING_VALUE] })
    .send({ from: accounts[0], gas: '1000000' })
});

describe('Inbox', () => {
  it('deploys a contract', () => {
    // console.log(inbox);
    // console.log(accounts);
    // console.log(interface, bytecode);
    assert.ok(inbox.options.address)
  })
  it('has a default message', async () => {
    const message = await inbox.methods.message().call();
    assert.equal(message, INITIAL_STRING_VALUE)
  })
  it('can change the message', async () => {
    await inbox.methods.setMessage('bye').send({
      from: accounts[0]
    });
    const message = await inbox.methods.message().call();
    assert.equal(message, 'bye')
  })
});
