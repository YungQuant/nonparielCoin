pragma solidity ^0.4.2;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/nonparielCoin.sol";

contract Testnonparielcoin {

  function testInitialBalanceUsingDeployedContract() {
    nonparielCoin nonpariel = nonparielCoin(DeployedAddresses.nonparielCoin());

    uint expected = 10000;

    Assert.equal(nonpariel.getBalance(tx.origin), expected, "Owner should have 10000 nonparielCoin initially");
  }

  function testInitialBalanceWithNewnonparielCoin() {
    nonparielCoin nonpariel = new nonparielCoin();

    uint expected = 10000;

    Assert.equal(nonpariel.getBalance(tx.origin), expected, "Owner should have 10000 nonparielCoin initially");
  }

}
