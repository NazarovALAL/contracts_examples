const path = require('path');
const fs = require('fs');
const solc = require('solc');

const lotteryPath = path.resolve(__dirname, 'contracts', 'Inbox.sol');
const source = fs.readFileSync(lotteryPath, 'utf8')

var input = {
    language: 'Solidity',
    sources: {
      'Inbox.sol': {
        content: source
      }
    },
    settings: {
      outputSelection: {
        '*': {
          '*': ['*']
        }
      }
    }
  };

var output = JSON.parse(solc.compile(JSON.stringify(input)));
const contract = output.contracts['Inbox.sol'].Inbox;
const bytecode = contract.evm.bytecode.object;
const interface = contract.abi;

module.exports = {interface, bytecode};
