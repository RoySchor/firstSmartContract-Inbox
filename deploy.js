const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const {interface, bytecode} = require('./compile');

const provider = new HDWalletProvider(
        'maze suggest ensure retreat journey supreme fit ghost cousin clinic swallow banana',
        'https://rinkeby.infura.io/v3/3ec7bf63ff434a55bf3e50e1effc76f2');
const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    
    console.log('Attempting to deploy from account', accounts[0]);
    
    const resultHash = await new web3.eth.Contract(JSON.parse(interface))
            .deploy({data: bytecode, arguments: ['Hello, World!']})
            .send({from: accounts[0], gas: '1000000'});
    
    console.log('Contract deployed to: ', resultHash.options.address);
    provider.engine.stop();
};
deploy();