pragma solidity ^0.4.11;

import 'zeppelin-solidity/contracts/token/MintableToken.sol';

contract nonparielCoin is MintableToken {
	string public name = "NonparielCoin";
	string public symbol = "NPC";
	uint256 public decimals = 8;
}
