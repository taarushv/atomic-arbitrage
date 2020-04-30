var Factory = artifacts.require("uniswap_factory");
var Exchange = artifacts.require("uniswap_exchange");
var TokenA = artifacts.require("TokenA");
var Web3 = require('web3');
var web3 = new Web3('ws://localhost:8546');

module.exports = async function(deployer, ) {
  /*  
    Steps:
      - Deploy UniswapExchange (exchange template) contract
      - Deploy UniswapFactory contract
      - Initialize UniswapFactory with UniswapExchange address
      - Deploy Token A UniswapExchange contract
      - Approve Token A UniswapExchange contract to transfer $A
      - Add liquidity to $A UniswapExchange
    */
    const TokenAInstance = await TokenA.deployed();
    await deployer.deploy(Exchange)
    await deployer.deploy(Factory)
    const FactoryInstance = await Factory.at(Factory.address)
    await FactoryInstance.initializeFactory(Exchange.address)    
    await FactoryInstance.createExchange(TokenAInstance.address);
    const TokenAExchangeAddress = await FactoryInstance.getExchange(TokenAInstance.address);
    // Let contract use upto 100 $A
    await TokenAInstance.approve(TokenAExchangeAddress,web3.utils.toBN("100000000000000000000"));
    const TokenAExchangeInstance = await Exchange.at(TokenAExchangeAddress);
    // Add 50 A tokens and 50 ETH to pool
    await TokenAExchangeInstance.addLiquidity(0, web3.utils.toBN("50000000000000000000"), Math.floor(Date.now() / 1000) + 300, {
      value: 50000000000000000000
    });
};

