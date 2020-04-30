pragma solidity ^0.6.2;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";


contract TokenA is ERC20 {
    constructor() public ERC20("TokenA", "A") {
        _mint(msg.sender, 100 * (10 ** uint256(18))); // 100 tokens
    }
}
