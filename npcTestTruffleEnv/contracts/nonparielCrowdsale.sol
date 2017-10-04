pragma solidity ^0.4.15;

import './nonparielCoin.sol';
import 'zeppelin-solidity/contracts/crowdsale/Crowdsale.sol';

contract nonparielCrowdsale is Crowdsale {

	function nonparielCrowdsale(uint256 _startBlock, uint256 _endBlock, uint256 _rate, address _wallet) 
        Crowdsale(_startBlock, _endBlock, _rate, _wallet) {
	}

	function createTokenContract() internal returns (MintableToken) {
		return new nonparielCoin();
	}
}
