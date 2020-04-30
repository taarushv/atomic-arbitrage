const TokenA = artifacts.require('TokenA')

module.exports = function(deployer) {
	deployer.deploy(TokenA);
}
